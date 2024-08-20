import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { NavLink } from "react-router-dom";
import styles from "./GenderNav.module.scss";
import stylesIndex from "../../pages/Index/Index.module.scss";

const GenderNav = (props: { isIndex: boolean }) => {
    const result = props.isIndex ? (
        <nav className={styles.genderNav}>
            <NavLink to="catalog/men" className={"link"}>
                <span>Men</span>
                <Icon path={mdiArrowRight} size={1.5} className={stylesIndex.index}/>
            </NavLink>
            <NavLink to="catalog/women" className="link">
                <span>Women</span>
                <Icon path={mdiArrowRight} size={1.5} className={stylesIndex.index}/>
            </NavLink>
        </nav>
    ) : (
        <nav className={styles.genderNav}>
            <NavLink to="catalog/men">
                <span>Men</span>
            </NavLink>
            <NavLink to="catalog/women">
                <span>Women</span>
            </NavLink>
        </nav>
    )
    return result;
}

export default GenderNav;