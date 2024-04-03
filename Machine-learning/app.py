from flask import Flask,request, render_template, jsonify




application = Flask(__name__)

app=application


@app.route('/')
def index():
    return render_template("index.html")

# @app.route('/predict', methods=['GET','POST'])
# def predict():
#     data = request.get_json()
#     ticker = data['ticker']
#     prediction = ml_model.predict(ticker)
#     return jsonify({'prediction': prediction})

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)