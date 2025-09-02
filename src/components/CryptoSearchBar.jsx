import { useState } from 'react';
import { Search } from 'lucide-react';

export function CryptoSearchBar({ setCoins }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    width: '100%',
    padding: '12px 16px'
  };

  const searchContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isFocused ? 'rgba(46, 46, 46, 0.78)' : 'rgba(46, 46, 46, 0.91)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    border: isFocused ? '2px solid #22d3ee' : '2px solid transparent',
    boxShadow: isFocused ? '0 0 0 1px rgba(46, 46, 46, 0.91)' : 'none'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '16px',
    width: '20px',
    height: '20px',
    color: (isFocused || searchTerm) ? '#22d3ee' : '#9ca3af',
    transition: 'color 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#ffffff',
    paddingLeft: '48px',
    paddingRight: searchTerm ? '48px' : '16px',
    paddingTop: '16px',
    paddingBottom: '16px',
    fontSize: '16px',
    border: 'none',
    outline: 'none'
  };

  const searchButtonStyle = {
    position: 'absolute',
    right: '12px',
    backgroundColor: '#22d3ee',
    color: '#1f2937',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: searchTerm ? 'block' : 'none',
    boxShadow: '0 2px 4px rgba(34, 211, 238, 0.2)'
  };

  async function handleSearch() {
    try {
      const coinGeckoAPI = import.meta.env.VITE_COINGECKO_KEY

      const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGeckoAPI}
      };

      const searchRes = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(searchTerm)}`, options)

      const searchData  = await searchRes.json()
      const coinsArr10 = searchData.coins.slice(0,10) 
      
      if (coinsArr10.length === 0) {
        setCoins([])
        return
      }

      const ids = coinsArr10.map(coin => coin.id).join(',')
      
      const marketRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`, options)
      const marketData = await marketRes.json()

      setCoins(marketData)
    } catch (error) {
      console.error('Error fetching coins:', error)
    }
  }

  return (
    <div style={containerStyle}>
      <div 
        style={searchContainerStyle}
        onMouseEnter={(e) => {
          if (!isFocused) {
            e.currentTarget.style.backgroundColor = 'rgba(46, 46, 46, 0.85)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isFocused) {
            e.currentTarget.style.backgroundColor = 'rgba(46, 46, 46, 0.91)';
          }
        }}
      >
        <Search style={searchIconStyle} />
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            ...inputStyle,
            '::placeholder': { color: '#9ca3af' }
          }}
        />
        {searchTerm && (
          <button
            onClick={handleSearch}
            style={searchButtonStyle}
          >
            Search
          </button>
        )}
      </div>

      <style>{`
        .crypto-search-input::placeholder {
          color: #9ca3af;
        }
        
        .crypto-search-input:focus::placeholder {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};