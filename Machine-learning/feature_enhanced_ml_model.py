from flask.json import jsonify
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM

def define_model():
    #  model architecture
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(100, 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    return model

model = define_model()

def preprocess_data(data):
    try:
        # JSON to DataFrame
        df = pd.DataFrame(data['historical'])
        
        # 'date' column as index after formating
        df['date'] = pd.to_datetime(df['date'])
        df.set_index('date', inplace=True)
        
        #  'close' column for prediction
        df = df[['close']]
        
        # Scale the data for model to understand
        scaler = MinMaxScaler(feature_range=(0, 1))
        data_scaled = scaler.fit_transform(df)
        
        return data_scaled, scaler
    except Exception as e:
        print("Error during data preprocessing:", e)
        return None, None

def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset)-time_step):
        a = dataset[i:(i + time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

# predicting without outputformt
def predict(ticker_data):
    try:
        processed_data, scaler = preprocess_data(ticker_data)

        time_step = 100
        X, y = create_dataset(processed_data, time_step)

        X = X.reshape((X.shape[0], X.shape[1], 1))
        
        prediction = model.predict(X)

        prediction_original_scale = inverse_transform_predictions(prediction, scaler)
        return prediction_original_scale
    except Exception as e:
        print("Error during prediction:", e)
        return None
    
# turning data back to original form
def inverse_transform_predictions(predictions, scaler):
    predictions = np.array(predictions)
    if predictions.ndim == 1:
        predictions = predictions.reshape(-1, 1)
    predictions_original_scale = scaler.inverse_transform(predictions)
    return predictions_original_scale # tolist() has to be removed when using (predict_with_date_and_column) function


def calculate_accuracy(original_close_prices, predicted_close_prices):
    try:
       
        original_close = np.array(original_close_prices)
        predicted_close = np.array(predicted_close_prices)

        # absolute error between original and predicted close prices
        absolute_errors = np.abs(original_close - predicted_close)

        # mean absolute error (MAE)
        mae = np.mean(absolute_errors)

        # Calculate the accuracy as 1 - MAE (since lower MAE is better)
        accuracy = 1 - mae

        return accuracy
    
    except Exception as e:
        print("Error calculating accuracy:", e)
        return None



## predicting with correct output (date:selected feature prediction, feature original)
def predict_with_date_and_column(ticker_data):
    try:
        processed_data, scaler = preprocess_data(ticker_data)

        time_step = 100
        X, y = create_dataset(processed_data, time_step)

        X = X.reshape((X.shape[0], X.shape[1], 1))
        
        prediction = model.predict(X)

        prediction_original_scale = inverse_transform_predictions(prediction, scaler)
        
        # original dates from the ticker_data
        dates = [data['date'] for data in ticker_data['historical']]
        
        # original close prices
        original_close_prices = [data['close'] for data in ticker_data['historical']]
        
        # prediction ndarray to list
        prediction_list = prediction_original_scale.flatten().tolist()

        # Calculate accuracy
        accuracy = calculate_accuracy(original_close_prices[time_step:], prediction_list)
        # dict with dates and predictions
        predictions_dict  = {
            'date': dates[time_step:],  # Exclude initial rows used for prediction
            'original_close': original_close_prices[time_step:],  # Exclude initial rows used for prediction
            'predicted_close': prediction_list , # Flatten the predictions
            'accuracy': accuracy
        }
        
        return predictions_dict
    
    except Exception as e:
        print("Error during prediction:", e)
        return None
