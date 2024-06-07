import React, { useEffect, useState } from "react";
import { Baseurl } from "./BaseUrl";
import Loader from "./Loader";
import axios from "axios";
import Header from "./Header";
import "./Coins.css";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const[search,setSearch]=useState('')
  const currencySymbol = currency === "pkr" ? "Rs" : "$";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Baseurl}/coins/markets?vs_currency=${currency}`
        );
        setLoading(false);
        setCoins(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currency]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="search-bar">
    <input
        type="text"
        style={{
            height: '2rem',
            width: '20rem',
            position: 'absolute',
            top: '2%',
            left: '35%',
            paddingLeft: '10px',
            paddingRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
        }}
        placeholder="Search Coins..."
        onChange={(e) => setSearch(e.target.value)}
    />
</div>

          <div className="btns">
            <button onClick={() => setCurrency("pkr")}>PKR</button>
            <button onClick={() => setCurrency("usd")}>USD</button>
          </div>
          <table className="coin-table">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Name</th>
                <th>Current Price in {currency}</th>
                <th>Market Cap Rank</th>
                <th>Price Change (24h)</th>
              </tr>
            </thead>
            <tbody>
              {coins.filter((data)=>(
              data == '' ? data : data.name.toLowerCase().includes(search.toLowerCase())
              )).map((item) => (
                <CoinCard
                  key={item.id}
                  item={item}
                  currencySymbol={currencySymbol}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const CoinCard = ({ item, currencySymbol }) => {
  const profit = item.price_change_percentage_24h > 0;
  return (
    <tr>
      <td>
      <Link style={{ textDecoration: "none" }}
          to={`/coins/${item.id}`}>
        <img className="coin-image" src={item.image} alt={item.name} />
        </Link>
      </td>
      <td>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to={`/coins/${item.id}`}
        >
          {item.name}
        </Link>
      </td>
      <td>
        {currencySymbol} {item.current_price}
      </td>
      <td>{item.market_cap_rank}</td>
      <td style={profit ? { color: "green" } : { color: "red" }}>
        {profit
          ? "+" + item.price_change_percentage_24h
          : item.price_change_percentage_24h}
      </td>
    </tr>
  );
};

export default Coins;
