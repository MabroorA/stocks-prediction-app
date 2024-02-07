import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./Components/Menu";
import ApiCall from "./Components/ApiCall";
import HomePage from "./Pages/Home/HomePage";

async function fetchServerData() {
  const serverRequest = await fetch("http://localhost:3000//fetch-data");
  const response = await serverRequest.json();
  console.log(response, "IS THE SERVER RESPONSE");
  return response;
}

export default function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchServerData();
      console.log(response, "IS THE RESPOSNE FROM BACKEND");
    };
    fetchData();
  }, []);
  return (
    <>
      <HomePage />
    </>
  );
}
