from flask import Flask,request, render_template, jsonify

from ml_model import predict


application = Flask(__name__)

app=application


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def get_prediction():
    # Get ticker data from the request sent by the frontend
    ticker_data = request.json['ticker_data']
    
    # Call the predict function from ml_model.py to make predictions
    prediction = predict(ticker_data)
    
    # Return the prediction in JSON format
    return prediction
if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)