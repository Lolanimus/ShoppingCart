import { Outlet } from "react-router-dom";

const Root = () => {
    return(
        <>
            <header>
                {/* <GenderNav />
                <Logo />
                <Cart /> */}
            </header>
            <body>
                <Outlet />
            </body>
            <footer>
                2024
            </footer>
        </>
    )
}

export default Root;