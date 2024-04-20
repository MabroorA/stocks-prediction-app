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

| ![Home Page 1](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/8042d13b-ba24-4dfb-875f-161e7fe46e93) | ![Home Page 2](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/cdad717a-ccd7-4ee2-9ffb-73048247989a) |
|---|---|



## Predict Page

| ![Predict Page 1](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/0bc3506f-9285-4ebb-83b7-da5970a280ef) | ![Predict Page 2](https://github.com/MabroorA/stocks-prediction-app/assets/109113298/d6fd662a-7126-428a-b9f3-68c04cd242d9) |
|---|---|



## Search Page

<img src="https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/714cb5dc-1a13-4afc-94f0-0e3ed0719ddf" alt="Predict Page" width="600" height="400">


### Current Features
- Top 5 Gainers and Losers in the stock market is displayed at home page.
- Daily Average Price: Retrieve daily average price data for a specific stock.
- Search Ticker: Search for ticker information for a specific company.
- Search to Display Ticker: Retrieve history daily for previous 5 years for visualization & to download.
- Latest News: Fetch the latest news related to stocks.
## Machine Learning 
Currently, the project is in the process of displaying the Long Short-Term Memory (LSTM) machine learning model result to predict price of future days.

![image](https://github.com/MabroorA/Stocks-Prediction-App/assets/109113298/24f86da0-dbb7-4a64-b88b-96c11c141e09)


## Installation
- Clone the repository.
- Install dependencies using npm install.
- Set up environment variables for API keys.
- Run the application using npm run dev in /frontend folder.
To run Server
- Run the application using npm run dev in /frontend folder
