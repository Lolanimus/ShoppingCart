import { Link, Outlet } from "react-router-dom";
import GenderNav from "../../components/GenderNav/GenderNav";
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import logo from "../../assets/Logo.svg";
import styles from "./Root.module.scss";

const Root = () => {
    return(
        <div className={styles.root}>
            <header>
                <GenderNav />
                <Link to="">
                    <img src={logo} alt="Lolan Logo" />
                </Link>
                <Link to="cart">
                    <Icon 
                        aria-label="Cart Image" 
                        path={mdiCartOutline} 
                        color={"black"}
                        size={1.5}
                    />
                </Link>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <span>Artem Melnikov 2024</span>
            </footer>
        </div>
    )
}

export default Root;