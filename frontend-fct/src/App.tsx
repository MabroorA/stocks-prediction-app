
import "./App.css";
import Analyse from "./Pages/Analyse/Analyse";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/Login/Login";
import NewsPage from "./Pages/News/NewsPage";
import PredictPage from "./Pages/Predict/Predict";
import SearchPage from "./Pages/SearchStocksPage/SearchPage";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
    [
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/analyse',
        element:<Analyse/>
      },
      {
        path:'/news',
        element:<NewsPage/>
      },
      {
        path:'/search',
        element:<SearchPage/>
      },
      {
        path:'/predict',
        element:<PredictPage/>
      },
      {
        path:'/account',
        element:<LoginPage/>
      }
    ]
);

export default function App() {
  return (
    <>
     <RouterProvider router={router}/>
     
    </>
  );
}
