import "./App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import mqtt from "mqtt/dist/mqtt";

// Note that React needs Websockets, so your
// MQTT Broker must support that
const mqtt_server = "ws://https://test.mosquitto.org:8080";
const mqtt_username = "";
const mqtt_password = "";

let subscribed = false;
const mqtt_options = {
  username: mqtt_username,
  password: mqtt_password,
};

function App() {
  let tempSeriesArray = [];
  let moistSeriesArray = [];
  const [tempSeries, setTempSeries] = useState([0]);
  const [moistSeries, setMoistSeries] = useState([0]);
  const [dataSeries, setDataSeries] = useState([]);
  const [maxMeasurements, setMaxMeasurements] = useState(50);

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

  useEffect(() => {
    console.log("Connect!");
    const client = mqtt.connect(mqtt_server, mqtt_options);
    client.on("connect", () => {
      // This will be executed twice in debug mode unless we do this trick
      if (!subscribed) {
        subscribed = true;
        console.log("Connected");
        client.subscribe("defaultTopic/");
        client.on("message", (topic, payload, packet) => {
          handleMessage(topic, payload);
        });
      }
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

  const handleMessage = (topic, message) => {
    //console.log("message to " + topic + ": " + message);
    let jsonData = JSON.parse(message);
    tempSeriesArray.push(jsonData.temp);
    if (tempSeriesArray.length > maxMeasurements) {
      tempSeriesArray.splice(0, 1);
    }
    moistSeriesArray.push(jsonData.moist);
    if (moistSeriesArray.length > maxMeasurements) {
      moistSeriesArray.splice(0, 1);
    }

    setTempSeries([...tempSeriesArray]);
    setMoistSeries(moistSeriesArray);
  };

  return (
    <div className="App">
      <Chart options={options} series={dataSeries} type="area" height={350} />
    </div>
  );
}

export default App;
