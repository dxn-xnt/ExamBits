from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import PyPDF2
import json
import io
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration
AI_SERVICE = os.getenv('AI_SERVICE', 'openrouter')
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
AI_MODEL = os.getenv('AI_MODEL', 'openai/gpt-4-turbo-preview')


def call_ai_model(messages, temperature=0.7, max_tokens=2000):
    """Call OpenRouter API for AI completions"""
    try:
        if not OPENROUTER_API_KEY:
            raise Exception("OpenRouter API key not configured")

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "ExamBits"
            },
            json={
                "model": AI_MODEL,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens
            },
            timeout=60
        )

        if response.status_code != 200:
            error_data = response.json() if response.text else {}
            raise Exception(f"OpenRouter API error ({response.status_code}): {error_data.get('error', {}).get('message', response.text)}")

        data = response.json()
        return data['choices'][0]['message']['content']

    except requests.exceptions.Timeout:
        raise Exception("AI request timed out. Please try again.")
    except requests.exceptions.RequestException as e:
        raise Exception(f"Network error: {str(e)}")
    except Exception as e:
        raise Exception(f"AI API call failed: {str(e)}")


# Original routes (keeping your existing structure)
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask API is working!",
        "service": "ExamBits AI Service",
        "version": "1.0.0"
    })


@app.route("/generate", methods=["POST"])
def generate():
    """Your original generate endpoint - keeping for compatibility"""
    data = request.json
    text = data.get("text", "")

    # Example response
    return jsonify({
        "input_text": text,
        "msg": "This is where AI processing will happen."
    })


# New API routes for ExamBits
@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "ExamBits AI",
        "ai_service": AI_SERVICE,
        "model": AI_MODEL,
        "api_key_configured": bool(OPENROUTER_API_KEY)
    })


@app.route("/api/ai/extract-pdf", methods=["POST"])
def extract_pdf():
    """Extract text content from uploaded PDF file"""
    try:
        if 'file' not in request.files:
            return jsonify({"success": False, "error": "No file provided"}), 400

        file = request.files['file']

        if not file.filename:
            return jsonify({"success": False, "error": "No file selected"}), 400

        if not file.filename.lower().endswith('.pdf'):
            return jsonify({"success": False, "error": "File must be a PDF"}), 400

        # Read PDF
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))

        text = ""
        for page_num, page in enumerate(pdf_reader.pages):
            try:
                extracted = page.extract_text()
                if extracted:
                    text += f"\n--- Page {page_num + 1} ---\n"
                    text += extracted
            except Exception as e:
                print(f"Warning: Could not extract text from page {page_num + 1}: {str(e)}")

        if not text.strip():
            return jsonify({
                "success": False,
                "error": "Could not extract text from PDF. The PDF might be image-based or encrypted."
            }), 400

        return jsonify({
            "success": True,
            "content": text.strip(),
            "pages": len(pdf_reader.pages),
            "char_count": len(text)
        })

    except PyPDF2.errors.PdfReadError:
        return jsonify({
            "success": False,
            "error": "Invalid or corrupted PDF file"
        }), 400
    except Exception as e:
        return jsonify({
            "success": False,
            "error": "PDF extraction failed",
            "details": str(e)
        }), 500


@app.route("/api/ai/generate-questions", methods=["POST"])
def generate_questions():
    """Generate exam questions from content using AI"""
    try:
        data = request.json

        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400

        content = data.get('content', '')
        num_questions = int(data.get('num_questions', 5))
        difficulty = data.get('difficulty', 'medium')
        question_type = data.get('type', 'multiple-choice')

        # Validation
        if not content or len(content.strip()) < 50:
            return jsonify({
                "success": False,
                "error": "Content is too short. Please provide at least 50 characters."
            }), 400

        if num_questions < 1 or num_questions > 50:
            return jsonify({
                "success": False,
                "error": "Number of questions must be between 1 and 50"
            }), 400

        # Limit content length to avoid token limits
        max_content_length = 4000
        if len(content) > max_content_length:
            content = content[:max_content_length] + "\n...(content truncated)"

        # Build format example based on question type
        if question_type == 'multiple-choice':
            format_example = '''[
  {
    "question": "What is the primary function of photosynthesis?",
    "options": ["Produce oxygen and glucose", "Absorb water only", "Release carbon dioxide", "Create soil nutrients"],
    "correct_answer": "Produce oxygen and glucose",
    "explanation": "Photosynthesis converts light energy into chemical energy, producing oxygen and glucose."
  }
]'''
        elif question_type == 'true-false':
            format_example = '''[
  {
    "question": "Photosynthesis requires sunlight to occur",
    "options": ["True", "False"],
    "correct_answer": "True",
    "explanation": "Photosynthesis is a light-dependent process that requires sunlight."
  }
]'''
        else:  # short-answer
            format_example = '''[
  {
    "question": "Explain the main purpose of photosynthesis in plants",
    "options": [],
    "correct_answer": "To convert light energy into chemical energy stored in glucose",
    "explanation": "Acceptable answers should mention energy conversion and glucose production."
  }
]'''

        prompt = f"""You are an expert exam question generator. Create exactly {num_questions} {difficulty} difficulty {question_type} questions based on the following content.

CONTENT:
{content}

REQUIREMENTS:
- Generate exactly {num_questions} questions
- Difficulty level: {difficulty}
- Question type: {question_type}
- Questions should test comprehension and understanding, not just memorization
- Provide clear, unambiguous correct answers
- Include brief explanations for each answer
- For multiple choice, provide 4 distinct options

IMPORTANT: Return ONLY a valid JSON array with no additional text, markdown, or formatting:
{format_example}"""

        messages = [
            {
                "role": "system",
                "content": "You are an expert educational content creator. You must respond with valid JSON only, no markdown formatting or additional text."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]

        print(f"Calling AI model for {num_questions} questions...")

        # Call AI model
        response_text = call_ai_model(messages, temperature=0.7, max_tokens=2500)

        print(f"AI Response received: {len(response_text)} characters")

        # Clean response - remove markdown code blocks if present
        response_text = response_text.strip()

        if '```' in response_text:
            # Extract JSON from markdown code blocks
            parts = response_text.split('```')
            for part in parts:
                part = part.strip()
                if part.startswith('json'):
                    response_text = part[4:].strip()
                    break
                elif part.startswith('['):
                    response_text = part
                    break

        # Parse JSON
        try:
            questions = json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error: {str(e)}")
            print(f"Response text: {response_text[:500]}")
            return jsonify({
                "success": False,
                "error": "Failed to parse AI response. Please try again.",
                "details": str(e)
            }), 500

        # Validate response structure
        if not isinstance(questions, list):
            return jsonify({
                "success": False,
                "error": "Invalid response format from AI"
            }), 500

        if len(questions) == 0:
            return jsonify({
                "success": False,
                "error": "AI did not generate any questions"
            }), 500

        # Validate each question has required fields
        for i, q in enumerate(questions):
            if not isinstance(q, dict):
                return jsonify({
                    "success": False,
                    "error": f"Question {i+1} is not properly formatted"
                }), 500

            if 'question' not in q or 'correct_answer' not in q:
                return jsonify({
                    "success": False,
                    "error": f"Question {i+1} is missing required fields"
                }), 500

        print(f"Successfully generated {len(questions)} questions")

        return jsonify({
            "success": True,
            "questions": questions,
            "count": len(questions)
        })

    except Exception as e:
        print(f"Error in generate_questions: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Question generation failed",
            "details": str(e)
        }), 500


@app.route("/api/ai/evaluate-difficulty", methods=["POST"])
def evaluate_difficulty():
    """Analyze and rate the difficulty of a question"""
    try:
        data = request.json
        question = data.get('question', '')
        options = data.get('options', [])

        if not question:
            return jsonify({"success": False, "error": "No question provided"}), 400

        prompt = f"""Analyze this exam question and rate its difficulty:

Question: {question}
Options: {', '.join(options) if options else 'N/A'}

Provide a difficulty rating from 1-10 (where 1 is easiest, 10 is hardest) and categorize it.

Return ONLY this JSON format:
{{
  "score": 7,
  "level": "medium",
  "reasoning": "Brief explanation of why this difficulty rating"
}}"""

        messages = [{"role": "user", "content": prompt}]
        response_text = call_ai_model(messages, temperature=0.3, max_tokens=300)

        # Clean and parse
        response_text = response_text.strip()
        if '```' in response_text:
            response_text = response_text.split('```')[1].replace('json', '').strip()

        result = json.loads(response_text)

        return jsonify({
            "success": True,
            "evaluation": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Evaluation failed",
            "details": str(e)
        }), 500


@app.route("/api/ai/improve-question", methods=["POST"])
def improve_question():
    """Suggest improvements for an exam question"""
    try:
        data = request.json
        question = data.get('question', '')

        if not question:
            return jsonify({"success": False, "error": "No question provided"}), 400

        prompt = f"""Improve this exam question to make it clearer and more effective:

Original Question: {question}

Provide an improved version and explain what was changed.

Return ONLY this JSON format:
{{
  "improved_question": "The improved version of the question",
  "changes": "What was improved and why",
  "tips": "General tips for writing better questions"
}}"""

        messages = [{"role": "user", "content": prompt}]
        response_text = call_ai_model(messages, temperature=0.7, max_tokens=500)

        # Clean and parse
        response_text = response_text.strip()
        if '```' in response_text:
            response_text = response_text.split('```')[1].replace('json', '').strip()

        result = json.loads(response_text)

        return jsonify({
            "success": True,
            "improvement": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Improvement suggestion failed",
            "details": str(e)
        }), 500


# Run the Flask app
if __name__ == "__main__":
    # Validate configuration on startup
    print("\n" + "="*60)
    print("🚀 ExamBits AI Service Starting...")
    print("="*60)

    if not OPENROUTER_API_KEY:
        print("❌ ERROR: OPENROUTER_API_KEY not found in .env file")
        print("📝 Please create server/.env and add your OpenRouter API key:")
        print("   OPENROUTER_API_KEY=sk-or-v1-your-new-key-here")
        print("="*60)
        exit(1)

    print(f"✅ AI Service: {AI_SERVICE}")
    print(f"✅ Model: {AI_MODEL}")
    print(f"✅ API Key: {'*' * 40}{OPENROUTER_API_KEY[-8:]}")
    print(f"✅ Server: http://localhost:5000")
    print("="*60 + "\n")

    app.run(host='0.0.0.0', port=5000, debug=True)