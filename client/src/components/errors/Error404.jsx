import styles from "../../style";
import logo from "../../../../assets/logo.png";

export default function Error404() {
    return (
        <div className={`h-screen flex items-center bg-tertiary justify-center w-screen  rounded-xl`}>
            <div className='p-8 rounded-2xl bg-white w-[70%] sm:w-[60%]'>
                    <img src={logo} alt="logo" className="mx-auto w-[200px] h-[200px] object-contain" />
                    <p className={`${styles.sectionSubText}`}>Sorry | 404 </p>
                    <h3 className={styles.sectionHeadText}>Page Not Found</h3>
                    
            </div>
        </div>
    )
}
