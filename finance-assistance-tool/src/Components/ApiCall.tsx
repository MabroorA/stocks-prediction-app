import { useEffect, useState } from "react";

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
        <h1>api call</h1>
        <div>
        <p>
        {JSON.stringify(data)}
        </p>
        </div>
        </>
    );
}