import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder.jsx";

const Header = () => {
    return (
        <header>
            <Link to={'/'}>Pizza Co.</Link>

            <SearchOrder />
            <p>content</p>
        </header>
    )
}

export default Header;