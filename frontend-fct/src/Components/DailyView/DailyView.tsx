import { useEffect, useState } from "react";
import "./DailyView.css";
function DailyView() {
  // getting data from server api call
  async function fetchServerData() {
    const serverRequest = await fetch("http://localhost:3000/daily-view");
    const response = await serverRequest.json();
    console.log(response, "IS THE SERVER RESPONSE");
    return response;
  }

  const [data, setData] = useState(null); // State to store the fetched data

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchServerData();
      setData(response); // Set the fetched data in state
      console.log(response, "Daily View Working");
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="daily-view">
        <div>DailyView Data </div>;
        {data && (
          <div>
            <h2>json data from server :</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default DailyView;
