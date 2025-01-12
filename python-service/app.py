from flask import Flask, request, jsonify
from flask_cors import CORS
from services.sentiment_analysis import analyze_sentiment
from services.engagement import calculate_engagement
from services.report_generator import generate_report

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route("/")
def home():
    return jsonify({"message": "Python Microservice is running!"})

# Sentiment Analysis Endpoint
@app.route("/sentiment", methods=["POST"])
def sentiment():
    try:
        data = request.json
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        sentiment_score = analyze_sentiment(text)
        return jsonify({"sentiment": sentiment_score})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Engagement Scoring Endpoint
@app.route("/engagement", methods=["POST"])
def engagement():
    try:
        data = request.json
        active_users = data.get("active_users", 0)
        total_users = data.get("total_users", 1)  # Avoid division by zero
        
        engagement_score = calculate_engagement(active_users, total_users)
        return jsonify({"engagement_score": engagement_score})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Report Generation Endpoint
@app.route("/generate_report", methods=["POST"])
def report():
    try:
        data = request.json
        report_type = data.get("report_type", "summary")
        
        report_data = generate_report(report_type)
        return jsonify({"report": report_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
