import {Outlet, useNavigation} from "react-router-dom";
import CartOverview from "../features/cart/CardOverview";
import Header from "./Header";
import Loader from "./Loader.jsx";

const Layout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading'
    return (
        <div className={'layout'}>
            {isLoading && <Loader />}
            <Header />

            <main>
                <Outlet />
            </main>

            <CartOverview />
        </div>
    )
}

export default Layout