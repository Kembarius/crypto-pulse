export default function TrendingCoin(props) {
    return (
        <div className="coin-card">
            <div className="img-container">
                <img
                    src={props.image}
                    alt={props.name}
                />    
            </div>
            <div className="details-wrap">
                <p className="coin-name min-w">{props.name}</p>
                <p className="coin-price">${props.price.toLocaleString()}</p>
                <p className={`coin-change-pct ${props.pctChange >= 0 ? 'positive' : 'negative'}`}>{props.pctChange.toFixed(2)}%</p>
            </div>
        </div>
    )
}