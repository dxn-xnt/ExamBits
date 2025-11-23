from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is working!"})

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    text = data.get("text", "")

    # Example response
    return jsonify({
        "input_text": text,
        "msg": "This is where AI processing will happen."
    })

if __name__ == "__main__":
    app.run(debug=True)
