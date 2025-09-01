import { useEffect, useState } from "react"
import './Trending.css'
import TrendingCoin from './TrendingCoin'

export default function Trending() {
    
    const [trending, setTrending] = useState([])
    
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-LARPukp3ifBUXzYzGknC8SbF'}
          };
          
          fetch('https://api.coingecko.com/api/v3/search/trending', options)
            .then(res => res.json())
            .then(data => setTrending(data.coins))
            .catch(err => console.error(err));
    }, []) 

    const displayTrendingCoins = trending.map((coin) => {
        return (
            <TrendingCoin 
                key={coin.item.id}
                name={coin.item.name}
                image={coin.item.large}
                price={coin.item.data.price}
                pctChange={coin.item.data.price_change_percentage_24h.usd}
            />
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