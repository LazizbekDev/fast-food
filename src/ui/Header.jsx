import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/username.jsx";

const Header = () => {
    return (
        <header className={'bg-yellow-500 flex py-2 px-9 uppercase justify-between border-b border-stone-200'}>
            <Link to={'/'} className={'tracking-widest'}>Pizza Co.</Link>

            <SearchOrder />

            <Username />
        </header>
    )
}

export default Header;