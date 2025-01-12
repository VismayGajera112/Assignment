def calculate_engagement(active_users, total_users):
    if total_users == 0:
        return 0
    engagement_score = (active_users / total_users) * 100  # Percentage
    return round(engagement_score, 2)
