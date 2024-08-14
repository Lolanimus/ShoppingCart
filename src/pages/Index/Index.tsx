import GenderNav from "../../components/GenderNav/GenderNav";
import logo from "../../assets/Logo.svg";

const Index = () => {
    return (
        <>
            <div>
                <div>
                    <div>
                        <h1>Lolan</h1>
                    </div>
                    <div>
                        <h2>Description...</h2>
                    </div>
                </div>
                <div>
                    <img src={logo} alt="Lolan Logo" />
                </div>
            </div>
            <GenderNav />
        </>
    )
}

export default Index;