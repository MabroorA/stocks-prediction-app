from flask import Flask, request, jsonify
import your_ml_module  # Import your machine learning model

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    ticker = data['ticker']
    prediction = your_ml_module.predict(ticker)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)