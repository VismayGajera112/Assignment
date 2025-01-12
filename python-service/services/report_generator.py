import pandas as pd

def generate_report(report_type):
    # Example: Loading data from a CSV file (mocking database)
    data = {
        "event_name": ["Event A", "Event B", "Event C"],
        "active_users": [120, 80, 95],
        "total_users": [150, 100, 100],
        "engagement_score": [80, 75, 95],
    }
    df = pd.DataFrame(data)
    
    if report_type == "summary":
        return df.describe().to_dict()
    elif report_type == "detailed":
        return df.to_dict(orient="records")
    else:
        return {"error": "Invalid report type"}
