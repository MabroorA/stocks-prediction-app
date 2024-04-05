from flask import Flask,request, render_template, jsonify
from flask_cors import CORS
from ml_model import predict


application = Flask(__name__)

app=application
CORS(app)


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
        print("Received TICKER DATA in test route:")
        
        # Send a response back to the frontend indicating success
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
    

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)