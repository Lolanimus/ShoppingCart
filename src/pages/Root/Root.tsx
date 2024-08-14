import { Link, Outlet } from "react-router-dom";
import GenderNav from "../../components/GenderNav/GenderNav";
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';
import logo from "../../assets/Logo.svg";

const Root = () => {
    return(
        <>
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
                Artem Melnikov 2024
            </footer>
        </>
    )
}

export default Root;