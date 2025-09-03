import { Link } from 'react-router'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons'

export function CoinItem(props) {
	const { favoriteCoins, setFavoriteCoins } = props 
	const [ isFav, setIsFav ] = useState(favoriteCoins?.includes(props.id))

	function toggleFavStar() {
		setIsFav(prev => !prev)
		setFavoriteCoins(prev => {
			const isAlreadySaved = prev.includes(props.id)

			if (isAlreadySaved) {
				return prev.filter(id => id !== props.id)
			}
			return [...prev, props.id]
		})
	}

	return (
		<div className='coin-row-flex'>
			<div className='fav-rank-cntr'>
				<FontAwesomeIcon
					icon={isFav ? faStarFilled : faStar}
					onClick={toggleFavStar}
					className={`fav-icon ${isFav ? 'favorite' : null}`}
				/>
				<p className='coin-rank'>{props.rank}</p>
			</div>
			<Link to={`/coin/${props.id}`}>
				<div className='first-details'>
					<img
						src={props.imageUrl}
						alt={props.name}
					/>
					<p className='coin-name'>{props.name}</p>
					<p className='coin-ticker'>{props.ticker?.toLocaleString() ?? 'N/A'}</p>
				</div>
			</Link>
			<div className='second-details'>
				<button>Buy</button>
				<p className='coin-price'>${props.price?.toLocaleString() ?? 'N/A'}</p>
				<p className={`coin-change-pct ${(props.pctChange ?? 0) >= 0 ? 'positive' : 'negative'}`}>
					{props.pctChange?.toFixed(2) ?? 'N/A'}%
				</p>
				<p className='coin-volume'>${props.dailyVolume?.toLocaleString() ?? 'N/A'}</p>
				<p className='coin-marketcap'>${props.marketCap?.toLocaleString() ?? 'N/A'}</p>
			</div>
		</div>
	)
}