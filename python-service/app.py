from flask import Flask, request, jsonify
from flask_cors import CORS
from services.sentiment_analysis import analyze_sentiment
from services.engagement import calculate_engagement
from services.report_generator import generate_report
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin123@localhost:5432/event_analytics'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route("/")
def home():
    return jsonify({"message": "Python Microservice is running!"})

# Sentiment Analysis Endpoint
@app.route("/sentiment", methods=["POST"])
def sentiment():
    pass

# Engagement Scoring Endpoint
@app.route("/engagement", methods=["POST"])
def engagement():
    pass
    
# Analytics Dashboard Endpoint
@app.route("/analytics/<int:event_id>", methods=["POST"])
def analytics(event_id):
    try:
        if not event_id:
            return jsonify({"error": "No event_id provided"}), 400 
        
        result = [
            {
            "message_count": 10,
            "question_count": 5,
            "reaction_count": 20,
            "time_spent": 300,
            "sentiment_score": 0.8
            },
            {
            "message_count": 15,
            "question_count": 3,
            "reaction_count": 25,
            "time_spent": 450,
            "sentiment_score": 0.6
            }
        ]
    
        if result:
            message_count = sum(row['message_count'] for row in result)
            question_count = sum(row['question_count'] for row in result)
            reaction_count = sum(row['reaction_count'] for row in result)
            avg_time_spent = sum(row['time_spent'] for row in result) / len(result) if result else 0
            sentiment_score = sum(row['sentiment_score'] for row in result) / len(result) if result else 0

            return jsonify({
            "message_count": message_count,
            "question_count": question_count,
            "reaction_count": reaction_count,
            "avg_time_spent": avg_time_spent,
            "sentiment_score": sentiment_score
            })
    
        else:
            return jsonify({"error": "No data found for the given event_id"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Report Generation Endpoint
@app.route("/generate_report", methods=["POST"])
def report():
    pass

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
