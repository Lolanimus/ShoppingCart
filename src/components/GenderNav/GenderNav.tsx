import { NavLink } from "react-router-dom";
import styles from "./GenderNav.module.scss";

const GenderNav = () => {
    return (
        <nav className={styles.genderNav}>
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