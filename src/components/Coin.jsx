import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

export default function Coin(props) {

    const [isFav, setIsFav] = useState(false)

    function addToFavorites() {
        setIsFav(prev => !prev)
    }

    return (
        <div className='coin-row-flex'>
            <div className='first-details'>
                <FontAwesomeIcon icon={isFav? faStarFilled : faStar} onClick={addToFavorites} className={`fav-icon ${isFav? 'favorite' : null}`} />
                <p className='coin-rank'>{props.rank}</p>
                <img
                    src={props.imageUrl}
                    alt={props.name}
                />
                <p className='coin-name'>{props.name}</p>
                <p className='coin-ticker'>{props.ticker.toUpperCase()}</p>
            </div>
            <div className='second-details'>
                <button>Buy</button>
                <p className='coin-price'>${props.price.toLocaleString()}</p>
                <p className={`coin-change-pct ${props.pctChange >= 0 ? 'positive' : 'negative'}`}>{props.pctChange.toFixed(2)}%</p>
                <p className='coin-volume'>${props.dailyVolume.toLocaleString()}</p>
                <p className='coin-marketcap'>${props.marketCap.toLocaleString()}</p>
            </div>
        </div>
    )
}