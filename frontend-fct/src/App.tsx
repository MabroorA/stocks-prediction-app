
import "./App.css";
import FinancialSummary from "./Pages/FinancialSummary/FinancialSummary";
import HomePage from "./Pages/Home/HomePage";
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
        path:'/financial-summary',
        element:<FinancialSummary/>
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

    ]
);

export default function App() {
  return (
     <RouterProvider router={router}/> 
  );
}
