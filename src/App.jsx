import { useState, useEffect } from 'react'
import CoinsList from "./components/CoinsList"
import Header from "./components/Header"
import Trending from "./components/Trending"

function App() {
  const [coins, setCoins] = useState([])
  const coinGeckoAPI = import.meta.env.VITE_COINGECKO_KEY

  useEffect(() => {
    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGeckoAPI}
    };

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
    .then(res => res.json())
    .then(data => {
            setCoins(data)
            console.log(data)            
    })
    .catch(err => console.error(err));
  }, [coinGeckoAPI]) 

  return (
    <>
      <Header />
      <Trending />
      <CoinsList 
        coins={coins}
        setCoins={setCoins}
      />
    </>
  )
}

export default App
