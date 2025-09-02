import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import DOMPurify from 'dompurify'
import './Coin.css'

export function Coin() {
  const coinId = useParams()
  const [ title, setTitle ] = useState('')
  const [ coin, setCoin ] = useState({})

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-LARPukp3ifBUXzYzGknC8SbF' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId.coinId}`, options)
      .then(res => res.json())
      .then(data => {
        setTitle(data.name)
        setCoin(data)
      })
      .catch(err => console.error(err));
  }, [coinId])

  const { market_data } = coin || {};
  const priceChanges = {
  "1h": market_data?.price_change_percentage_1h_in_currency?.usd,
  "24h": market_data?.price_change_percentage_24h_in_currency?.usd,
  "7d": market_data?.price_change_percentage_7d_in_currency?.usd,
  "14d": market_data?.price_change_percentage_14d_in_currency?.usd,
  "30d": market_data?.price_change_percentage_30d_in_currency?.usd,
  "1y": market_data?.price_change_percentage_1y_in_currency?.usd,
  };

  function renderChange(value) {
  if (value === undefined) return null;
  const formatted = value.toFixed(1);
  const className = formatted >= 0 ? "positive" : "negative";
  return <p className={className}>{formatted}%</p>;
  }

  return (
    <>
      <title>{title}</title>
      <div>
        <div className='coin-container'>
          {/* <div className='content'>
            <h1>{coin.name}</h1>
          </div> */}
          <div className='content'>
            <div className='rank'>
              <span className='rank-btn'>Rank # {coin.market_cap_rank}</span>
            </div>
            <div className='info'>
              <div className='coin-heading'>
                {coin.image ? <img src={coin.image.small} alt='' /> : null}
                <div className="info-stacked">
                  <p className='coin-name'>{coin.name}</p>
                  {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
                </div>
                

              </div>
              <div className='coin-price'>
                {coin.market_data?.current_price ? <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
              </div>
            </div>
          </div>

          <div className='content'>
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{renderChange(priceChanges?.['1h'])}</td>
                  <td>{renderChange(priceChanges?.['24h'])}</td>
                  <td>{renderChange(priceChanges?.['7d'])}</td>
                  <td>{renderChange(priceChanges?.['14d'])}</td>
                  <td>{renderChange(priceChanges?.['30d'])}</td>
                  <td>{renderChange(priceChanges?.['1y'])}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='content'>
            <div className='stats'>
              <div className='left'>
                <div className='row'>
                  <h4>24 Hour Low</h4>
                  {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                </div>
                <div className='row'>
                  <h4>24 Hour High</h4>
                  {coin.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}                            </div>

              </div>
              <div className='right'>
                <div className='row'>
                  <h4>Market Cap</h4>
                  {coin.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                </div>
                <div className='row'>
                  <h4>Circulating Supply</h4>
                  {coin.market_data ? <p>${coin.market_data.circulating_supply.toLocaleString()}</p> : null}
                </div>

              </div>
            </div>
          </div>

          <div className='content'>
            <div className='about'>
              <h3>About</h3>
              <p dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
              }}>

              </p>

            </div>
          </div>

        </div>
      </div>
    </>

  )
}