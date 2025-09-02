import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

export default function Header() {
    return (
        <header>
            <Link to='/' className='header-link'>
                <FontAwesomeIcon icon={faWaveSquare} className='header-icon' />
                <h1>Crypto<span>Pulse</span></h1>
            </Link>
        </header>
    )
}