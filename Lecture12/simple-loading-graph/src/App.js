import "./App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function App() {
  const [tempSeries, setTempSeries] = useState([]);
  const [moistSeries, setMoistSeries] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  // Updates the data series
  const updateData = () => {
    setDataSeries([
      {
        name: "Temperature",
        data: tempSeries,
      },
      {
        name: "Moisture",
        data: moistSeries,
      },
    ]);
  };

  // Upon loading the page, load in data from file or server
  // In this example, it just loads a static file from the "public" folder
  useEffect(() => {
    fetch("/sampleData.txt")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTempSeries(data.temperature);
        setMoistSeries(data.moisture);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // if "tempSeries" is updated, we should also update the graph data
  useEffect(() => {
    updateData();
  }, [tempSeries]);

  // ApexCharts needs some default options to know what to show
  const options = {
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      noData: {
        text: "Loading...",
      },
    },
  };

  return (
    <div className="App">
      <Chart options={options} series={dataSeries} type="area" height={350} />
    </div>
  );
}

export default App;
