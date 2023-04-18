import React, { useState } from "react";
import { useLocation } from "wouter";
import Chart from "react-apexcharts";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [data, setData] = useState({
    // Charts documentation: https://www.npmjs.com/package/react-apexcharts
    options: {
      chart: {
        id: "fruit-production",
      },
      xaxis: {
        categories: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
      },
    },
    series: [
      {
        name: "Pinapple trees",
        data: [5, 12, 15, 18, 14, 16, 25, 28, 31],
      },
      {
        name: "Banana trees",
        data: [20, 40, 35, 50, 47, 60, 70, 91, 105],
      },
    ],
  });

  return (
    <article id="article">
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={450}
      />
      <p>
        The current page is: {location}
        <br />
        <button onClick={() => setLocation("/productedit")}>
          Click to add a product
        </button>
      </p>
      <footer>
        <small>(CC) Høyskolen Kristiania 2023</small>
      </footer>
    </article>
  );
}
