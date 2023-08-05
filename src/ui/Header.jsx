import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder.jsx";

const Header = () => {
    return (
        <header className={'bg-yellow-500 flex py-2 px-9 justify-between'}>
            <Link to={'/'}>Pizza Co.</Link>

            <SearchOrder />
            <p>content</p>
        </header>
    )
}

export default Header;