import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// class TimerChart extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         chart: {
//           id: "basic-bar",
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
//         },
//       },
//       series: [
//         {
//           name: "series-1",
//           data: [30, 40, 45, 50, 49, 60, 70, 91],
//         },
//       ],
//     };
//   }

const TimerChart = ({ totalCalHour, timerAllValue }) => {
  // const [sd, setSd] = useState({
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: [1991, 1992],
  //     },
  //   },
  // });

  const [series, setSeries] = useState([]);

  // const [series, setSeries] = useState([totalCalHour, timerAllValue]);

  useEffect(() => {
    // setSeries([totalCalHour, timerAllValue]);
    // console.log(totalCalHour);
    const kk = [totalCalHour, timerAllValue];
    // console.log(kk);
    // let timerForLoopValues = [];
    // for (let i = 0; i <=kk.length; i++) {
    //   console.log(i);
    // }
    setSeries(kk);
  }, [totalCalHour, timerAllValue]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{
              xaxis: {
                tickPlacement: "on",
                categories: ["totalHour", "completedHour"],
              },
              colors: ["#8f140b", "#118a2f"],
            }}
            series={[
              {
                name: "time",
                data: series,
              },
            ]}
            type="bar"
            width="500"
            height="230"
          />
        </div>
      </div>
    </div>
  );
};

export default TimerChart;
