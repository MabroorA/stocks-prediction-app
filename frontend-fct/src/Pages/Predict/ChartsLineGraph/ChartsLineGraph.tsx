// import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// // import { getAquisitionsByYear } from "./api";

// interface TickerData {
//   year: number; // Adjust this based on your interface
//   count: number; // Adjust this based on your interface
// }

// export default function ChartsLineGraph() {
//   const [chartData, setChartData] = useState<any>({});

//   const fetchChartData = async () => {
//     try {
//       const data = await getAquisitionsByYear();
//       const formattedData = data.map((entry: TickerData) => ({
//         year: entry.year,
//         count: entry.count,
//       }));
//       setChartData({
//         labels: formattedData.map((entry: TickerData) => entry.year),
//         datasets: [
//           {
//             label: "Number of Artworks",
//             data: formattedData.map((entry: TickerData) => entry.count),
//             fill: false,
//             backgroundColor: "rgba(75,192,192,0.4)",
//             borderColor: "rgba(75,192,192,1)",
//             borderWidth: 2,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching chart data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChartData();
//   }, []);

//   return (
//     <>
//       <div className="search-box">{/* Your search input and button */}</div>

//       <div className="search-result">
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: "Year",
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: "Number of Artworks",
//                 },
//               },
//             },
//           }}
//         />
//       </div>
//     </>
//   );
// }
