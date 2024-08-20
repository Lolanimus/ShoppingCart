import GenderNav from "../../components/GenderNav/GenderNav";
import logo from "../../assets/Logo.svg";
import styles from "./Index.module.scss"

const Index = () => {
    return (
        <div className={styles.index}>
            <div id={styles.mainDiv}>
                <div>
                    <div>
                        <h1>Lolan</h1>
                    </div>
                    <div>
                        <h2>Description...</h2>
                    </div>
                </div>
                <div>
                    <img src={logo} alt="Lolan Logo" width="50%"/>
                </div>
            </div>
            <GenderNav isIndex={true}/>
        </div>
    )
}

export default Index;