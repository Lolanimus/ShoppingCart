import { NavLink } from "react-router-dom";
const GenderNav = () => {
    return (
        <nav>
            <NavLink to="catalog/men">
                Men
            </NavLink>
            <NavLink to="catalog/women">
                Women
            </NavLink>
        </nav>
    )
}

export default GenderNav;