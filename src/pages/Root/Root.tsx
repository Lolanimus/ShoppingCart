import { Link, Outlet } from "react-router-dom";
import GenderNav from "../../components/GenderNav/GenderNav";
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';

const Root = () => {
    return(
        <>
            <header>
                <GenderNav />
                <div>
                    <img src="../../assets/Logo.svg" alt="Lolan Logo" />
                </div>
                <Link to="cart">
                    <Icon aria-label="Cart Image" path={mdiCartOutline} />
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