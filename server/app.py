from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
import PyPDF2
import json
import io
import requests
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration
AI_SERVICE = os.getenv('AI_SERVICE', 'openrouter')
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
AI_MODEL = os.getenv('AI_MODEL', 'openai/gpt-4-turbo-preview')


def call_ai_model(messages, temperature=0.7, max_tokens=600):
    """Call OpenRouter API for AI completions with minimal token limit"""
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


def extract_main_topic(text, max_length=1000):
    """Extract and summarize the main topic from text using simple text analysis"""
    # Take a sample from the beginning, middle, and end
    text_length = len(text)

    if text_length <= max_length:
        sample_text = text
    else:
        # Sample from different parts
        part_size = max_length // 3
        beginning = text[:part_size]
        middle_start = (text_length // 2) - (part_size // 2)
        middle = text[middle_start:middle_start + part_size]
        end = text[-part_size:]
        sample_text = beginning + "\n...\n" + middle + "\n...\n" + end

    # Clean the text
    sample_text = re.sub(r'\s+', ' ', sample_text).strip()

    # Extract keywords and generate a simple topic description
    lines = sample_text.split('\n')
    # Get first few meaningful lines (likely titles/headers)
    meaningful_lines = [line.strip() for line in lines if len(line.strip()) > 20][:5]

    return ' '.join(meaningful_lines[:3]) if meaningful_lines else sample_text[:500]


def analyze_topic_with_ai(text_sample):
    """Use AI to extract the main topic in one sentence"""
    prompt = f"""Analyze this educational content and provide ONLY a one-sentence topic description (max 20 words).

Content sample:
{text_sample}

Respond with ONLY the topic sentence, nothing else."""

    messages = [
        {
            "role": "system",
            "content": "You are a content analyzer. Respond only with a brief topic description."
        },
        {
            "role": "user",
            "content": prompt
        }
    ]

    try:
        # Use minimal tokens for topic extraction
        topic = call_ai_model(messages, temperature=0.3, max_tokens=50)
        return topic.strip()
    except Exception as e:
        print(f"AI topic analysis failed, using fallback: {str(e)}")
        # Fallback to simple extraction
        return text_sample[:200]


# Original routes
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flask API is working!",
        "service": "ExamBits AI Service",
        "version": "2.0.0 (Topic-Based)"
    })


@app.route("/generate", methods=["POST"])
def generate():
    """Original generate endpoint"""
    data = request.json
    text = data.get("text", "")
    return jsonify({
        "input_text": text,
        "msg": "This is where AI processing will happen."
    })


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


@app.route("/api/ai/analyze-topic", methods=["POST"])
def analyze_topic():
    """Extract main topic from content"""
    try:
        data = request.json

        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400

        content = data.get('content', '')

        if not content or len(content.strip()) < 50:
            return jsonify({
                "success": False,
                "error": "Content is too short"
            }), 400

        print(f"Analyzing topic from {len(content)} characters...")

        # Extract a sample for analysis
        text_sample = extract_main_topic(content, max_length=1000)

        # Use AI to get concise topic
        topic = analyze_topic_with_ai(text_sample)

        print(f"Extracted topic: {topic}")

        return jsonify({
            "success": True,
            "topic": topic,
            "content_length": len(content)
        })

    except Exception as e:
        print(f"Error in analyze_topic: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Topic analysis failed",
            "details": str(e)
        }), 500


@app.route("/api/ai/generate-questions", methods=["POST"])
def generate_questions():
    """Generate exam questions from TOPIC (without explanations)"""
    try:
        data = request.json

        if not data:
            return jsonify({"success": False, "error": "No data provided"}), 400

        # Now expecting 'topic' instead of 'content'
        topic = data.get('topic', '')
        num_questions = int(data.get('num_questions', 5))
        difficulty = data.get('difficulty', 'medium')
        question_type = data.get('type', 'multiple-choice')

        # Validation
        if not topic or len(topic.strip()) < 10:
            return jsonify({
                "success": False,
                "error": "Topic is too short"
            }), 400

        if num_questions < 1 or num_questions > 50:
            return jsonify({
                "success": False,
                "error": "Number of questions must be between 1 and 50"
            }), 400

        # Build format example and specific instructions based on question type
        if question_type == 'multiple-choice':
            format_example = '''[{"question": "Question text?", "options": ["A", "B", "C", "D"], "correct_answer": "A"}]'''
            type_instruction = "MULTIPLE CHOICE with 4 options (A, B, C, D)"
        elif question_type == 'true-false':
            format_example = '''[{"question": "Statement text?", "options": ["True", "False"], "correct_answer": "True"}]'''
            type_instruction = "TRUE/FALSE with exactly 2 options: ['True', 'False']"
        else:  # identification
            format_example = '''[{"question": "Question text?", "options": [], "correct_answer": "Short answer"}]'''
            type_instruction = "IDENTIFICATION (fill-in-the-blank) with EMPTY options array []"

        # Ultra-simplified prompt with STRICT type enforcement
        prompt = f"""Generate {num_questions} {difficulty} {type_instruction} question(s) about: {topic}

CRITICAL: Question type MUST be {question_type}
{format_example}

Return ONLY valid JSON array, no markdown:"""

        messages = [
            {
                "role": "system",
                "content": f"You are an exam question generator. Generate ONLY {question_type} questions. Return JSON only."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]

        print(f"Generating {num_questions} questions from topic...")

        # Ultra-reduced max_tokens to work within credit limits
        max_tokens_needed = min(800, (num_questions * 150))

        response_text = None
        try:
            response_text = call_ai_model(messages, temperature=0.7, max_tokens=max_tokens_needed)
        except Exception as ai_error:
            # If we hit credit limits, try with even fewer tokens
            if "402" in str(ai_error) or "credits" in str(ai_error).lower():
                print("Hit credit limit, trying with reduced tokens...")
                max_tokens_needed = min(500, (num_questions * 100))
                try:
                    response_text = call_ai_model(messages, temperature=0.7, max_tokens=max_tokens_needed)
                except Exception as e:
                    raise Exception(f"Failed even with reduced tokens: {str(e)}")
            else:
                raise ai_error

        if not response_text:
            raise Exception("No response received from AI model")

        print(f"AI Response received: {len(response_text)} characters")

        # Clean response
        response_text = response_text.strip()

        if '```' in response_text:
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

        # Validate response
        if not isinstance(questions, list) or len(questions) == 0:
            return jsonify({
                "success": False,
                "error": "Invalid response from AI"
            }), 500

        # Validate and clean each question (remove explanation if present)
        cleaned_questions = []
        for i, q in enumerate(questions):
            if not isinstance(q, dict) or 'question' not in q or 'correct_answer' not in q:
                print(f"Question {i+1} is invalid - missing required fields")
                continue

            # Validate question type matches request
            options = q.get('options', [])
            is_valid = False

            if question_type == 'identification':
                # Identification must have empty or no options
                if not options or len(options) == 0:
                    is_valid = True
                else:
                    print(f"Skipping question {i+1}: Expected identification (no options) but got {len(options)} options")
            elif question_type == 'true-false':
                # True/false must have exactly 2 options
                if len(options) == 2:
                    is_valid = True
                else:
                    print(f"Skipping question {i+1}: Expected true-false (2 options) but got {len(options)} options")
            elif question_type == 'multiple-choice':
                # Multiple choice must have 3+ options
                if len(options) >= 3:
                    is_valid = True
                else:
                    print(f"Skipping question {i+1}: Expected multiple-choice (3+ options) but got {len(options)} options")

            if not is_valid:
                continue

            # Clean and add the question
            cleaned_q = {
                'question': q['question'],
                'options': options,
                'correct_answer': q['correct_answer'],
                'type': question_type
            }
            cleaned_questions.append(cleaned_q)

        if len(cleaned_questions) == 0:
            return jsonify({
                "success": False,
                "error": f"AI generated wrong question type. Expected {question_type} but got different format."
            }), 500

        print(f"Successfully generated {len(cleaned_questions)} questions")

        return jsonify({
            "success": True,
            "questions": cleaned_questions,
            "count": len(cleaned_questions)
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

        prompt = f"""Rate this question's difficulty (1-10):

Question: {question}
Options: {', '.join(options) if options else 'N/A'}

Return ONLY JSON:
{{
  "score": 7,
  "level": "medium",
  "reasoning": "Brief explanation"
}}"""

        messages = [{"role": "user", "content": prompt}]
        response_text = call_ai_model(messages, temperature=0.3, max_tokens=200)

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

        prompt = f"""Improve this question:

{question}

Return ONLY JSON:
{{
  "improved_question": "Improved version",
  "changes": "What changed",
  "tips": "Writing tips"
}}"""

        messages = [{"role": "user", "content": prompt}]
        response_text = call_ai_model(messages, temperature=0.7, max_tokens=400)

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
            "error": "Improvement failed",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 ExamBits AI Service Starting (Topic-Based Generation)...")
    print("="*60)

    if not OPENROUTER_API_KEY:
        print("❌ ERROR: OPENROUTER_API_KEY not found in .env file")
        print("📝 Please create server/.env and add your OpenRouter API key")
        print("="*60)
        exit(1)

    print(f"✅ AI Service: {AI_SERVICE}")
    print(f"✅ Model: {AI_MODEL}")
    print(f"✅ API Key: {'*' * 40}{OPENROUTER_API_KEY[-8:]}")
    print(f"✅ Server: http://localhost:5000")
    print(f"✅ Method: Topic Extraction (Token Optimized)")
    print("="*60 + "\n")

    app.run(host='0.0.0.0', port=5000, debug=True)