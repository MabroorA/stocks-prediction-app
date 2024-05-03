# Stocks Prediction Tool
🚀 **[Checkout it out Live](https://stocks-prediction-app.pages.dev/)** 🚀

This project aims to develop a stocks investment decision tool through data analysis and simulation. It integrates various APIs for data collection and utilizes machine learning models for prediction. The tool provides allows investors to generate buy / sell signals by analysing historical data .


## Installation

1. **Clone the repository:**
    ```bash
    git clone https://campus.cs.le.ac.uk/gitlab/ug_project/23-24/ma942.git
    ```

2. **Install dependencies:**
   - For Frontend:
    ```bash
    cd /frontend
    npm install
    ```

   - For Backend:
    ```bash
    cd /backend-fct
    npm install
    ```

   - For Machine Learning Model:
    ```bash
    cd /Deploy-ML
    pip install -r requirements.txt
    ```

3. **Run the application:**

   - To run Frontend:
    ```bash
    npm run dev
    ```

   - To run Backend:
    ```bash
    npm run server:dev
    ```

   - To start the Machine Learning model:
    ```bash
    python app.py
    ```

Now you should be able to access the application in your browser at `http://localhost:5173`.



<details>
<summary> <strong>Tech Stack & Libraries used <strong></summary>
  
## Languages
- <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" width="20" height="20"> TypeScript
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python Logo" width="20" height="20"> Python

## **Front End**
- React (Typescript)

## **Back End**
- Node.js (Typescript)

## To Transfer API data from **frontend** to **Machine learning model**
- Flask (Python) was used to receive data from React 

## APIs Used
- [Twelve Data](https://twelvedata.com/)
- [Polygon.io ](https://polygon.io/)
- [financialmodelingprep.com](https://site.financialmodelingprep.com/)

### Visualization Libraries
The project utilizes Recharts and Charts.js libraries for visualizing data, enabling users to interpret trends and patterns effectively.
- [Recharts](https://recharts.org/en-US/)
- [Charts.js](https://www.chartjs.org/)


</details>

<details>

<summary> <strong>Current Kanban Board <strong></summary>


![image](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/015e1551-9fac-479a-8532-2b90b8f2817b)


</details>

## Home Page


| ![Home Page 1](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/d6508b6d-5a6c-4f0f-9a6f-73b8b5e2bd98) | ![Home Page 2](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/ed34c751-ed43-4da7-8a86-7b4933a9c160) |
|---|---|



## Predict Page


| ![Predict Page 1](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/1689c05f-ae99-4fa1-8520-a68ce0bb9199) | ![Predict Page 2](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/e5682472-009c-4844-ae53-e9bb2dfc450b) |
|---|---|

## ML model improves with predictions
| **First Prediction** | **Second Prediction** |
|---------------------|----------------------|
| ![first-prediction](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/c458b9b1-6ca4-4f33-ab7b-0a1cbe7ef596) | ![second-prediction](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/6b8cd2b9-a33b-48d9-857b-bee8d0d6c59b) |



### Current Features
- Top 5 Gainers and Losers in the stock market is displayed at home page.
- Search Ticker: Search for ticker information for a specific company which displays their financial information.
  - Auto fill is also possible when then the uses the search bar.
- Search to Display Ticker: Retrieve history daily for previous 5 years for visualization & to download.
- Latest News: Fetch the latest news related to stocks.
- Prediction is done using a LSTM machine learning model with live data to display data for the next 30 days.
- A Signal is provided for users to buy or sell their search stock.




