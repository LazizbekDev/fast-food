import {getMenu} from "../../services/apiRestouran.js";
import {useLoaderData} from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu() {
    const menu = useLoaderData();
    console.log(menu);

    return menu.map(pizza => (<MenuItem key={pizza.id} pizza={pizza} /> ));
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    const menu = await getMenu();
    return menu;
}

export default Menu;
  