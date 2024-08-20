import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { NavLink } from "react-router-dom";
import styles from "./GenderNav.module.scss";
import stylesIndex from "../../pages/Index/Index.module.scss";

const GenderNav = (props: { isIndex: boolean }) => {
    return (
        <nav className={styles.genderNav}>
            <NavLink to="catalog/men" >
                <span>Men</span>
                { props.isIndex && <Icon path={mdiArrowRight} size={1} className={stylesIndex.index}/> }
            </NavLink>
            <NavLink to="catalog/women">
                <span>Women</span>
                { props.isIndex && <Icon path={mdiArrowRight} size={1} className={stylesIndex.index}/> }
            </NavLink>
        </nav>
    )
}

export default GenderNav;