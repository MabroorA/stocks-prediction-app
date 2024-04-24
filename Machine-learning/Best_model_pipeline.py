import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

def preprocess_data(data):
    try:
        # JSON to DataFrame
        df = pd.DataFrame(data['historical'])
        # 'date' column as index after formatting
        
        df['date'] = pd.to_datetime(df['date'])
        df.set_index('date', inplace=True)
        # Selected feature
        df_close = df[['close']]
        # Rolling average for 3 weeks (21 days)
        df_close_rolling_avg = df_close.rolling(window=21).mean()
        return df_close_rolling_avg
    except Exception as e:
        print("Error during data preprocessing:", e)
        return None

def build_model(input_shape):
    model = Sequential()
    model.add(LSTM(128, return_sequences=True, input_shape=input_shape))
    model.add(LSTM(64, return_sequences=False))
    model.add(Dense(25))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

def train_model(model, X_train, y_train, batch_size=32, epochs=10):
    try:
        model.fit(X_train, y_train, batch_size=batch_size, epochs=epochs)
        return model
    except Exception as e:
        print("Error during model training:", e)
        return None

def evaluate_model(model, X_test, y_test):
    try:
        predictions = model.predict(X_test)
        rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))
        r2 = r2_score(y_test, predictions)
        return rmse, r2
    except Exception as e:
        print("Error during model evaluation:", e)
        return None, None

def predict_future(model, recent_data, scaler, periods=30):
    try:
        scaled_recent_data = scaler.transform(recent_data.reshape(-1, 1))
        x_input = scaled_recent_data.reshape((1, 21, 1))
        predicted_prices = []

        for _ in range(periods):
            next_day_prediction = model.predict(x_input)
            predicted_prices.append(next_day_prediction[0, 0])
            x_input = np.append(x_input[:, 1:, :], np.expand_dims(next_day_prediction, axis=1), axis=1)

        predicted_prices = scaler.inverse_transform(np.array(predicted_prices).reshape(-1, 1))
        
        # Convert to list before returning
        predicted_prices_list = predicted_prices.flatten().tolist()
        return predicted_prices_list
    except Exception as e:
        print("Error during future prediction:", e)
        return None


def plot_original_vs_predicted(original_prices, predicted_prices):
    try:
        # Generate dates for the predicted prices
        last_date = original_prices.index[-1]
        next_30_days = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=30)
        
        # Plotting
        plt.figure(figsize=(12, 6))
        plt.plot(original_prices.index, original_prices, label='Original Close Prices', color='blue')
        plt.plot(next_30_days, predicted_prices, label='Predicted Close Prices', color='orange')
        plt.xlabel('Date')
        plt.ylabel('Close Price')
        plt.title('Original vs Predicted Close Prices')
        plt.legend()
        plt.grid(True)
        plt.show()
    except Exception as e:
        print("Error during plotting:", e)

def run_workflow(data):
    try:
        # Data Preprocessing
        df_close_rolling_avg = preprocess_data(data)
        df_close_values = df_close_rolling_avg.values
        
        # Scaling
        scaler = MinMaxScaler(feature_range=(0,1))
        scaled_data = scaler.fit_transform(df_close_values.reshape(-1, 1))

        # Train-Test Split
        training_data_len = int(np.ceil(len(df_close_values) * 0.95))
        train_data = scaled_data[~np.isnan(scaled_data[:, 0])][:training_data_len]
        x_train, y_train = [], []
        for i in range(21, len(train_data)):
            x_train.append(train_data[i-21:i, 0])
            y_train.append(train_data[i, 0])
        x_train, y_train = np.array(x_train), np.array(y_train)
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
        
        # Model Building
        model = build_model(input_shape=(x_train.shape[1], 1))
        
        # Model Training
        model = train_model(model, x_train, y_train)
        
        # Predict Future
        recent_data = df_close_values[-21:]
        predicted_prices = predict_future(model, recent_data, scaler, periods=30)





        # Get original close prices
        original_prices = df_close_rolling_avg[-30:]
        
        # Plot original vs predicted prices
        plot_original_vs_predicted(original_prices, predicted_prices)
        

        # Convert original prices to dictionary with date as index
        original_prices_dict = original_prices.reset_index().to_dict(orient='records')
        formatted_original_prices = [{'date': date.strftime('%d-%m-%Y'), 'close': price} for date, price in zip([item['date'] for item in original_prices_dict], [item['close'] for item in original_prices_dict])]
        
        # Convert predicted prices to dictionary with dates starting from the next day after the last date in original prices
        last_date = original_prices.index[-1]
        next_30_days = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=30)
        predicted_prices_dict = [{'date': date.strftime('%d-%m-%Y'), 'close': price} for date, price in zip(next_30_days, predicted_prices)]
        
        print(formatted_original_prices)
        print(predicted_prices_dict)
        
        return {'original_prices': formatted_original_prices, 'predicted_prices': predicted_prices_dict}
    except Exception as e:
        print("Error during workflow execution:", e)
        return None


