import React, { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "./BaseUrl";
import "./DataByYear.css";

const DataByYear = () => {
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/exchanges`);
        console.log(response.data);

        // Store all data
        setAllData(response.data);

        // Extract unique years from the array of objects
        const uniqueYears = [
          ...new Set(response.data.map((item) => item.year_established)),
        ];
        console.log(uniqueYears);
        setYears(uniqueYears);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleYearClick = (year) => {
    // Update selected year
    setSelectedYear(year);
  };

  return (
    <>
      <div className="navbar">
        <ul>
          {years.map((year, index) => (
            <li key={index} onClick={() => handleYearClick(year)}>
              {year}
            </li>
          ))}
        </ul>
      </div>
      {selectedYear && (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Trade-Volume</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <div className="year-data">
              <h2>Data for {selectedYear}</h2>
              {allData
                .filter((item) => item.year_established === selectedYear)
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img height={"80px"} src={item.image} alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.trade_volume_24h_btc_normalized.toFixed(0)}</td>
                    <td>{item.country}</td>
                  </tr>
                ))}
            </div>
          </tbody>
        </table>
      )}
    </>
  );
};

export default DataByYear;
