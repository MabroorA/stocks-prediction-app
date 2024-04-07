from flask import Flask,request, jsonify
from flask_cors import CORS
import pandas as pd
from ml_model import predict,test_function, test_model


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


ticker_data = None

@app.route('/')
def index():
    return "hello"


@app.route('/test-ticker-data', methods=['GET','POST'])
def test_ticker_data():

    # get rid of ticker_data defined before getting sent using GET 
    global ticker_data
    if request.method == 'POST':

        # Get ticker data from the request sent by the frontend
        ticker_data = request.json['ticker_data']
        print("Received TICKER DATA in test route:",ticker_data)
        
        # Send a response back to the frontend 
        return jsonify({"message": "Data received successfully"})
    
# getting data after recieved from frontend
@app.route('/get-ticker-data', methods=['GET'])
def get_ticker_data():
    global ticker_data
    if ticker_data is not None:
        return jsonify(ticker_data)
    else:
        # If ticker_data is Nonn
        return jsonify({"message": "No data received yet"})    
    
# # route to handle CORS preflight OPTIONS request
# @app.route('/predict', methods=['OPTIONS'])
# def handle_options():
#     # Return the CORS headers
#     headers = {
#         'Access-Control-Allow-Origin': '*',
#         'Access-Control-Allow-Methods': 'POST',
#         'Access-Control-Allow-Headers': 'Content-Type'
#     }
#     return ('', 204, headers)

# getting data after recieved from frontend for prediction
@app.route('/get-predict', methods=['GET'])
def get_prediction_input():
    global ticker_data
    if ticker_data is not None:
        # ticker_data = request.json['ticker_data']
        close_prices = [data['close'] for data in ticker_data['historical']]
        return jsonify({"close": close_prices})
    else:
        # If ticker_data is Nonn
        return jsonify({"message": "No data received yet"}) 


@app.route('/predict', methods=['POST','GET'])
def get_prediction():
    global ticker_data

    if request.method == 'POST':
        # Get ticker data from the request sent by the frontend
        ticker_data = request.json['ticker_data']

        print("Received TICKER DATA in PREDICT route:")
        close_prices = [data['close'] for data in ticker_data['historical']]
        prediction = predict(close_prices)
        return  jsonify(prediction)
    if request.method == 'GET':
       

       close_prices = [data['close'] for data in ticker_data['historical']]
       prediction = predict(close_prices)
       return  jsonify(prediction) 
    # try:
    #     print("DATA RECIEVED FOR PREDICTION:")
    #     # Print the received data
    #     ticker_data = request.json["historical"]
    #     print(ticker_data)
    #     # only "high" price is sent from frontend

    #     # prediction = predict(ticker_data)
    #     return jsonify(ticker_data)
    # except Exception as e:
    #     print("Error:", e)
    #     return jsonify({"error": "Internal Server Error"}), 500


# !WORKS and returns predicted "close" price
@app.route('/model_testing', methods=['GET'])
def model_testing():
    try:
        result = test_model('ticker_data.csv')
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
       

    

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)