from ml_model import test_model

def main():
    prediction = test_model('ticker_data.csv')
    print("Prediction:", prediction)


if __name__ == "__main__":
    main()