import React, { useEffect, useState } from "react";
import { Baseurl } from "./BaseUrl";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CoinsDetail.css";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from "./CoinChart";
const CoinsDetail = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [currency, setCurrency] = useState("usd");
  const { id } = useParams();
  const profit = coin.market_data?.price_change_percentage_24h > 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/coins/${id}`);
        setLoading(false);
        setCoin(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const currencySymbol = currency === "usd" ? "$" : "Rs";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="coin-detail">
          <div className="coin-info">
            <div className="btn">
              <button onClick={() => setCurrency("pkr")}>PKR</button>
              <button onClick={() => setCurrency("usd")}>USD</button>
            </div>
            <div className="time">{coin.last_updated}</div>
            <div className="coin-image">
              <img height={"150px"} src={coin.image.large} alt={coin.name} />
            </div>
            <div className="coin-name">{coin.name}</div>
            <div className="coin-price">
              {currencySymbol} {coin.market_data.current_price[currency]}
            </div>
            <div className="coin-profit">
              Today{"  "}
              {profit ? (
                <BiSolidUpArrow color="green" />
              ) : (
                <BiSolidDownArrow color="red" />
              )}
              {coin.market_data.price_change_percentage_24h} %
            </div>
            <div className="market-rank">
              <IoPulseOutline color="orange" /> #{coin.market_cap_rank}
            </div>
            <div className="coin-desc">
              <p>{coin.description["en"].split(".")[5]}</p>
            </div>
          </div>
          <CoinChart currency={currency} />
        </div>
      )}
    </>
  );
};

export default CoinsDetail;
