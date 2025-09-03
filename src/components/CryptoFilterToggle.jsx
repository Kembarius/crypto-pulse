import { useState } from 'react'

export function CryptoFilterToggle({ setCoins, favoriteCoins, setIsLoading }) {
  const [activeFilter, setActiveFilter] = useState('crypto')

  async function handleFilterChange(filter) {
    setActiveFilter(filter)
    if (filter === 'saved') {
      try {
        setCoins([])
        if (favoriteCoins.length > 0) {
          setIsLoading(true)

          const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_KEY}
          }

          const favoritesRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favoriteCoins.join(',')}`, options)

          const favoritesData = await favoritesRes.json()
          
          setIsLoading(false)
          setCoins(favoritesData)
        }
      } catch (err) {
        console.err(err)
      }
    } else { 
      const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_KEY}
      }

      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
      .then(res => res.json())
      .then(data => {
        setCoins(data)         
      })
      .catch(err => console.error(err))
    }
  }

  const containerStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '0 12px'
  }

  const toggleContainerStyle = {
    display: 'flex',
    backgroundColor: 'rgba(46, 46, 46, 0.78)',
    borderRadius: '12px',
    border: '2px solid #2b2b2bff',
    overflow: 'hidden',
    position: 'relative'
  }

  const buttonStyle = {
    flex: 1,
    padding: '2px 20px',
    backgroundColor: 'transparent',
    color: '#9ca3af',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2
  }

  const activeButtonStyle = {
    ...buttonStyle,
    color: '#1f2937',
    backgroundColor: '#22d3ee',
    borderRadius: '4px',
    margin: '2px',
    boxShadow: '0 1px 2px rgba(34, 211, 238, 0.3)'
  }

  return (
    <div style={containerStyle}>
      <div style={toggleContainerStyle}>
        <button
          style={activeFilter === 'crypto' ? activeButtonStyle : buttonStyle}
          onClick={() => handleFilterChange('crypto')}
          onMouseEnter={(e) => {
            if (activeFilter !== 'crypto') {
              e.currentTarget.style.color = '#d1d5db'
              e.currentTarget.style.backgroundColor = 'rgba(61, 61, 61, 1)'
            }
          }}
          onMouseLeave={(e) => {
            if (activeFilter !== 'crypto') {
              e.currentTarget.style.color = '#9ca3af'
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          Crypto
        </button>
        
        <button
          style={activeFilter === 'saved' ? activeButtonStyle : buttonStyle}
          onClick={() => handleFilterChange('saved')}
          onMouseEnter={(e) => {
            if (activeFilter !== 'saved') {
              e.currentTarget.style.color = '#d1d5db'
              e.currentTarget.style.backgroundColor = 'rgba(61, 61, 61, 1)'
            }
          }}
          onMouseLeave={(e) => {
            if (activeFilter !== 'saved') {
              e.currentTarget.style.color = '#9ca3af'
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          Saved
        </button>
      </div>
    </div>
  )
}
