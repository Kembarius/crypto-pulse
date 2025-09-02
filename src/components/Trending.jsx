import { useEffect, useState } from "react"
import { Link } from 'react-router'
import TrendingCoin from './TrendingCoin'
import './Trending.css'

export default function Trending() {
    
    const [trending, setTrending] = useState([])
    const coinGeckoAPI = import.meta.env.VITE_COINGECKO_KEY
    
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGeckoAPI}
          };
          
          fetch('https://api.coingecko.com/api/v3/search/trending', options)
            .then(res => res.json())
            .then(data => setTrending(data.coins))
            .catch(err => console.error(err));
    }, [coinGeckoAPI]) 

    const displayTrendingCoins = trending.map((coin) => {
        return (
            <Link to={`/coin/${coin.item.id}`} key={coin.item.id}>
                <TrendingCoin 
                    key={coin.item.id}
                    name={coin.item.name}
                    image={coin.item.large}
                    price={coin.item.data.price}
                    pctChange={coin.item.data.price_change_percentage_24h.usd}
                />
            </Link>

        )
    })
    
    return (
        <div className="trending-container">
            <h2>🔥Trending</h2>
            <div className="trending-flex-wrap">
                {displayTrendingCoins}
            </div>
        </div>
    )
}