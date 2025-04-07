import GenderNav from "../../components/GenderNav/GenderNav";
import styles from "./Index.module.scss"
import { useMediaQuery } from "react-responsive";

const logo = "https://storage.googleapis.com/shopping-cart-bucket/logo/Logo.svg";

const Index = () => {
    const isPhone = useMediaQuery({maxWidth: 800});
    return (
        isPhone ? ( 
            <div className={styles.index}>
                <div id={styles.mainDiv}>
                    <div>
                        <img src={logo} alt="Lolan Logo"/>
                    </div>
                    <div>
                        <h2>We Sell Clothes</h2>
                    </div>
                </div>
                <GenderNav isIndex={true}/>
            </div> 
        ) : (
            <div className={styles.index}>
                <div id={styles.mainDiv}>
                    <div>
                        <div>
                            <h1>Lolan</h1>
                        </div>
                        <div>
                            <h2>We Sell Clothes</h2>
                        </div>
                    </div>
                    <div>
                        <img src={logo} alt="Lolan Logo" width="50%"/>
                    </div>
                </div>
                <GenderNav isIndex={true}/>
            </div> 
        )
    )
}

export default Index;