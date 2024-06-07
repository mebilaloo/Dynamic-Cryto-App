import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Baseurl } from "./BaseUrl";
import Loader from "./Loader";
import "./CoinData.css";

const CoinData = () => {
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);
  const { year } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/exchanges`);
        setNewData(
          response.data.filter(
            (item) => item.year_established === parseInt(year)
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [year]);

  const totalScore = newData.reduce(
    (sum, person) => sum + person.trust_score,
    0
  );

  return (
    <div className="coin-data-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="coin-data-heading">Exchanges Data from {year}</h1>
          <table className="coin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Trade-Volume</th>
                <th>Country</th>
                <th>Trust Score</th>
              </tr>
            </thead>
            <tbody>
              {newData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="coin-image"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.trade_volume_24h_btc_normalized.toFixed(0)}</td>
                  <td>{item.country}</td>
                  <td>{item.trust_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-score"> Total Trust Score : {totalScore}</div>
        </>
      )}
    </div>
  );
};

export default CoinData;
