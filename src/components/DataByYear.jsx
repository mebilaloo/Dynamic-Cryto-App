import React, { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "./BaseUrl";
import "./DataByYear.css";
import { useNavigate } from "react-router-dom";

const DataByYear = () => {
  const [years, setYears] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/exchanges`);
        const uniqueYears = [...new Set(response.data.map((item) => item.year_established))];
        setYears(uniqueYears);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleYearClick = (year) => {
    navigate(`/exchangesdata/${year}`);
  };

  return (
    <>
      <div className="navbar">
        <ul className="year-list">
          {years.map((year, index) => (
            <li key={index} onClick={() => handleYearClick(year)} className="year-item">
              {year}
            </li>
          ))}
        </ul>
      </div>
      <div className="header">
        <h1>Visit Exchanges by the Year of Their Launch</h1>
      </div>
    </>
  );
};

export default DataByYear;
