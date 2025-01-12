from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('vader_lexicon')
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    lemmatizer = WordNetLemmatizer()
    filtered_text = [lemmatizer.lemmatize(w) for w in word_tokens if not w.lower() in stop_words]
    return ' '.join(filtered_text)

def analyze_sentiment(text):
    sia = SentimentIntensityAnalyzer()
    preprocessed_text = preprocess_text(text)
    sentiment_scores = sia.polarity_scores(preprocessed_text)
    compound_score = sentiment_scores['compound']
    if compound_score > 0:
        return "positive"
    elif compound_score < 0:
        return "negative"
    else:
        return "neutral"
