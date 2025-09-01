import './CoinsList.css'
import Coin from './Coin'
import { useState, useEffect } from "react"


export default function CoinsList() {

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
        })
        .catch(err => console.error(err));
    }, [])  

    const displayCoins = coins.map((coin) => {
        return (
            <Coin 
                key={coin.id} 
                rank={coin.market_cap_rank}
                imageUrl={coin.image}
                name={coin.name}
                ticker={coin.symbol}
                price={coin.current_price}
                pctChange={coin.price_change_percentage_24h}
                dailyVolume={coin.total_volume}
                marketCap={coin.market_cap}
            />
        )
    })

    return (
        <main>
            <div className='coin-info-row-flex'>
                <div className='first-details'>
                    <p className='coin-rank'>#</p>
                    <p className='coin-name'>Coin</p>
                </div>
                <div className='second-details'>
                    <p className='coin-price'>Price</p>
                    <p className='coin-change-pct'>24h</p>
                    <p className='coin-volume'>24h Volume</p>
                    <p className='coin-marketcap'>Market Cap</p>
                </div>
            </div>
            {displayCoins}
        </main>
    )
}