from flask import Flask,request, render_template, jsonify
from flask_cors import CORS
from ml_model import predict


application = Flask(__name__)

app=application
CORS(app)


@app.route('/')
def index():
    return "hello"

@app.route('/test-ticker-data', methods=['POST'])
def test_ticker_data():
    # Get ticker data from the request sent by the frontend
    ticker_data = request.json['ticker_data']
    print("Received ticker data in test route:", ticker_data)
    # Send a response back to the frontend indicating success
    return jsonify({"message": "Data received successfully"})

# @app.route('/predict', methods=['POST'])
# def get_prediction():
#     # Get ticker data from the request sent by the frontend
#     ticker_data = request.json['ticker_data']
#     print("Received ticker data:", ticker_data)
#     # Call the predict function from ml_model.py to make predictions
#     prediction = predict(ticker_data)
    
#     # Return the prediction in JSON format
#     return prediction
if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)