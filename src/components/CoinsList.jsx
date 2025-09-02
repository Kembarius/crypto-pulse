import { useEffect } from "react"
import { CryptoFilterToggle } from './CryptoFilterToggle'
import { CryptoSearchBar } from './CryptoSearchBar'
import { Link } from 'react-router'
import Coin from './Coin'
import './CoinsList.css'

function useSyncScroll(className, dep) {
    useEffect(() => {
        const elements = document.querySelectorAll(`.${className}`)

        function handleScroll(event) {
            const { scrollLeft } = event.target
            elements.forEach((el) => {
                if (el !== event.target) {
                    el.scrollLeft = scrollLeft
                }
            })
        }

        elements.forEach((el) => {
            el.addEventListener("scroll", handleScroll);
        });

        return () => {
            elements.forEach((el) =>  {
                el.removeEventListener('scroll', handleScroll)
            })
        }
    }, [className, dep])
}

export default function CoinsList({ coins, setCoins }) {

    useSyncScroll("second-details", coins.length); 

    const displayCoins = coins.map((coin) => {
        return (
            <Link to={`/coin/${coin.id}`} key={coin.id} >
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
            </Link>

        )
    })

    return (
        <main>
            <CryptoFilterToggle 
                coins={coins}
                setCoins={setCoins}            
            />
            <CryptoSearchBar 
                coins={coins}
                setCoins={setCoins}
            />
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