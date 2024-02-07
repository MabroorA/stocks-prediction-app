import { useEffect, useState } from "react";
import StockTable from "./StockTable";


interface StockData {
    "Meta Data": Record<string, string>;
    "Time Series (Daily)": Record<string, Record<string, string>>;
  }

async function fetchData() {
    const fetchResponse = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo")
    const result = await fetchResponse.json()

    console.log(result, 'IS THE RESULT AFTER JSON')
    return result
}

export default function ApiCall(){

    const [data, setData] = useState([])

    useEffect(() =>{
        const fetchDataAndSetData = async () => {
            const result = await fetchData();
            setData(result);
        };

        fetchDataAndSetData()
    }, [])

    return (
        <>
        <h1>Stock Data</h1>
        {Object.keys(data).length > 0 ? (
            <StockTable
            metaData={data["Meta Data"]}
            timeSeriesData={data["Time Series (Daily)"]}
            />
        ) : (
            <p>Loading...</p>
        )}
        </>
    );
}