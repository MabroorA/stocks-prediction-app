// import React from 'react'
// import ResponseData from './ResponseData-interface';
// import { CartesianGrid, Label, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
// import { LineChart } from 'recharts/types/chart/LineChart';
// interface Props {
//     data: ResponseData | null; // Define a prop to hold the fetched data
//   }
// export default  function SMA_LineChart() {
//   return (
//     <>
//     <LineChart
//             width={400}
//             height={280}
//             data={ResponseValue.data.}
//             margin={{ top: 10, right: 5, left: 50, bottom: 50 }}
//           >
//             <CartesianGrid strokeDasharray="5 5" />
//             <XAxis dataKey="datetime">
//               <Label value="Date" offset={-5} position="insideBottom" />
//             </XAxis>
//             <YAxis dataKey="avgprice">
//               <Label value="Avg Price" offset={-35} position="insideLeft" />
//             </YAxis>

//             <Tooltip />
//             <Legend verticalAlign="top" height={30} />
//             <Line
//               type="monotone"
//               dataKey="avgprice"
//               name="IBM Average Price "
//               stroke="#8884d8"
//             />
//           </LineChart>
//     </>
//   );
// };
