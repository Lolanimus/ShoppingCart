import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { NavLink } from "react-router-dom";
import styles from "./GenderNav.module.scss";
import stylesIndex from "../../pages/Index/Index.module.scss";
import { useMediaQuery } from "react-responsive";

function openNav() {
    const el = document.getElementById(styles.sidenav);
    el!.style.width = '100%';
}

function closeNav() {
    const el = document.getElementById(styles.sidenav);
    el!.style.width = '0';
}

const GenderNav = (props: { isIndex: boolean }) => {
    const isPhone = useMediaQuery({maxWidth: 800});

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
        isPhone ? (
            <>
                <div className={styles.menuDiv} onClick={() => openNav()}>
                    <Icon path={mdiMenu} size={1}/>
                </div>
                <div id={styles.sidenav}>
                    <button onClick={() => closeNav()} className={styles.closebtn}>
                        <Icon path={mdiClose} size={1} />
                    </button>
                    <nav>
                        <NavLink to="catalog/men" onClick={() => closeNav()}>
                            <span>Men</span>
                        </NavLink>
                        <NavLink to="catalog/women" onClick={() => closeNav()}>
                            <span>Women</span>
                        </NavLink>
                    </nav>
                </div>
            </>
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
    )
    return result;
}

export default GenderNav;