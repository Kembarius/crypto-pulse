import Trending from "../components/Trending"
import CoinsList from "../components/CoinsList"

export function Home({ coins, setCoins }) {

  const subheadingStyle = {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '1.5',
    margin: '8px 0 24px 0',
    padding: '0 8px',
    letterSpacing: '0.025em'
  }

  return (
    <>
      <p style={subheadingStyle}>
      Discover trending cryptocurrencies, track your favorites, and make informed investment decisions.
      </p>
      <Trending />
      <CoinsList 
        coins={coins}
        setCoins={setCoins}
      />
    </>
  )
}