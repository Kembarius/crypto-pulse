import { useState, useEffect } from "react"
import { CryptoFilterToggle } from './CryptoFilterToggle'
import { CryptoSearchBar } from './CryptoSearchBar'
import { CoinItem } from './CoinItem'
import LoadingSpinner from '../assets/loading-spinner.gif'
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
			elements.forEach((el) => {
				el.removeEventListener('scroll', handleScroll)
			})
		}
	}, [className, dep])
}

export default function CoinsList({ coins, setCoins }) {
	const [ favoriteCoins, setFavoriteCoins ] = useState(JSON.parse(localStorage.getItem('favorites')) || [])
	const [ isLoading, setIsLoading ] = useState(false) 

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favoriteCoins))
	}, [favoriteCoins])

	useSyncScroll("second-details", coins.length);

	const displayCoins = coins.map((coin) => {
		return (
			<CoinItem
				key={coin.id}
				id={coin.id}
				rank={coin.market_cap_rank}
				imageUrl={coin.image}
				name={coin.name}
				ticker={coin.symbol}
				price={coin.current_price}
				pctChange={coin.price_change_percentage_24h}
				dailyVolume={coin.total_volume}
				marketCap={coin.market_cap}
				favoriteCoins={favoriteCoins}
				setFavoriteCoins={setFavoriteCoins}
			/>
		)
	})

	return (
		<main>
			<CryptoFilterToggle
				coins={coins}
				setCoins={setCoins}
				favoriteCoins={favoriteCoins}
				setIsLoading={setIsLoading}
			/>
			<CryptoSearchBar
				coins={coins}
				setCoins={setCoins}
			/>
			<div className='coin-info-row-flex'>
				<div className='first-details first'>
					<p className='coin-rank'>#</p>
					<p className='coin-name'>Coin</p>
				</div>
				<div className='second-details'>
					<p className='coin-price'>Price</p>
					<p className='coin-change-pct'>24h</p>
					<p className='coin-volume first'>24h Volume</p>
					<p className='coin-marketcap'>Market Cap</p>
				</div>
			</div>
			{isLoading && <img className="loading-spinner" src={LoadingSpinner} alt='loading spinner' />}
			{!isLoading && displayCoins}
		</main>
	)
}