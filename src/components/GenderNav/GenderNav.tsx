import { NavLink } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const GenderNav = () => {
    return (
        <BrowserRouter>
            <nav>
                <NavLink to="catalog/men" data-testid="navLinkMen">
                    Men
                </NavLink>
                <NavLink to="catalog/women" data-testid="navLinkWomen">
                    Women
                </NavLink>
            </nav>
        </BrowserRouter>
    )
}

export default GenderNav;