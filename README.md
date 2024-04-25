# Stocks Prediction Tool
This project aims to develop a stocks investment decision tool through data analysis and simulation. It integrates various APIs for data collection and utilizes machine learning models for prediction. The tool provides allows investors to generate buy / sell signals by analysing historical data and/or enabling to play what if games: what if I had invested £1000 how much I would have been well or worse off? in short, we would like to devise investment strategies and then evaluate them.

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

![image](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/6d2c1184-95d6-434d-8cfa-089f16fd315c)


</details>

## Home Page


| ![Home Page 1](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/185930e7-edf1-4a0e-8d57-9d371cc18f2f) | ![Home Page 2](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/5ce85d2c-2939-4ce5-ba76-cff1ad250fe7) |
|---|---|



## Predict Page



| ![Predict Page 1](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/d3c1cac7-623c-4b91-a5e6-dc146bd7b1c8) | ![Predict Page 2](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/e5682472-009c-4844-ae53-e9bb2dfc450b) |
|---|---|


## News page

![image](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/07dc1b66-6e87-46dc-8387-e9ab40bda514)




### Current Features
- Top 5 Gainers and Losers in the stock market is displayed at home page.
- Search Ticker: Search for ticker information for a specific company.
- Search to Display Ticker: Retrieve history daily for previous 5 years for visualization & to download.
- Latest News: Fetch the latest news related to stocks.
- Prediction is done using a LSTM machine learning model with live data to display data for the next 30 days. 
## UI
Currently, the project is in the process of redesigning the User interface to simplify stock research for user.

![image](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/06ac4713-0988-4c52-8eab-9dcc9fec4804)
## ML model
![image](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/24f86da0-dbb7-4a64-b88b-96c11c141e09)


## Installation
- Clone the repository.
- Install dependencies using npm install.
- Set up environment variables for API keys.
To run Frontend  
- execute "npm run dev" in /frontend folder.
To run Server
- execute "npm run server:dev" in /backend folder
To run the Machine learning model  
- execute "python app.py" in /Machine-learning folder for the flask app to be started.

