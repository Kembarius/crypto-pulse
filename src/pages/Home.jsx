import Trending from "../components/Trending"
import CoinsList from "../components/CoinsList"

export function Home({ coins, setCoins }) {
  return (
    <>
      <Trending />
      <CoinsList 
        coins={coins}
        setCoins={setCoins}
      />
    </>
  )
}