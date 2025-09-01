import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

export default function Header() {
    return (
        <header>
            <FontAwesomeIcon icon={faWaveSquare} className='header-icon' />
            <h1>Crypto<span>Pulse</span></h1>
        </header>
    )
}