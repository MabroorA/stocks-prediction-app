
import "./App.css";
import HomePage from "./Pages/Home/HomePage";

// async function fetchServerData() {
//   const serverRequest = await fetch("http://localhost:3000/fetch-data");
//   const response = await serverRequest.json();
//   console.log(response, "IS THE SERVER RESPONSE");
//   return response;
// }

export default function App() {
  // const [data, setData] = useState(null); // State to store the fetched data

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchServerData();
  //     setData(response); // Set the fetched data in state
  //     console.log(response, "RESPOSNE FROM BACKEND CAME");
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      <HomePage />
      {/* <HomePage /> */}
      {/* Render the fetched data */}
      {/* {data && (
        <div>
          <h2>Data from the server:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )} */}
    </>
  );
}
