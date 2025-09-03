import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router'
import Header from './components/Header'
import { Home } from './pages/Home'
import { Coin } from './pages/Coin'

function App() {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const coinGeckoAPI = import.meta.env.VITE_COINGECKO_KEY

    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGeckoAPI}
    };

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
    .then(res => res.json())
    .then(data => {
      setCoins(data)         
    })
    .catch(err => console.error(err))
  }, []) 

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home
          coins={coins}
          setCoins={setCoins}
        />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
    </>
  )
}

export default App
