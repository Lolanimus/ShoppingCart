import { NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const GenderNav = () => {
    return (
        <BrowserRouter>
            <nav>
                <NavLink to="catalog/men">
                    Men
                </NavLink>
                <NavLink to="catalog/women">
                    Women
                </NavLink>
            </nav>
        </BrowserRouter>
    )
}

export default GenderNav;