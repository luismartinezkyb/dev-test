import { useCookies } from "react-cookie";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {ToastContainer, toast} from 'react-toastify'
import styles from "../../style";
import logo from "../../../../assets/logo.png";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false)
    const generateError = (err) => toast.error(err, {
        position:"bottom-right",
    })
    const [cookies, setCookie] = useCookies(['jwt']);
    const url= import.meta.env.VITE_URL_API;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        
        // console.log(url)
        // generateError('nothing to submit')
        // toast(``, {theme:'dark', position:"bottom-right"});
        // console.log(password, email);
        
        const dataToSubmit ={
            email,
            password
        };
        console.log("datatosubmit",dataToSubmit)
        axios.post(url+'user/login', dataToSubmit, {
            headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
        
        const data = response.data;
            if(data.error){
                generateError(data.error)
                setLoading(false);
            }
            else if(data.created){
                
                toast(`Hi ${data.data.user.name.first}, You're logged in `, {theme:'dark', position:"bottom-right"});
                setEmail('');
                setPassword('');
                setLoading(false);
                setCookie('jwt', data.data.token);
            }
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            if(error.response.data.error)
                generateError(error.response.data.error)
            else
                generateError("ENTER SOME VALID PARAMETERS")
        });
        
    }

    useEffect(() => {
        
        if(cookies.jwt){
            console.log('it exists')
            navigate('/profile', {state:{status:"new"}});
        }
        
    }, [cookies])
    

    return (
        <div className={`h-screen flex items-center bg-tertiary justify-center w-screen overflow-auto`}>
            <div className=' p-8 rounded-2xl bg-white w-[70%] sm:w-[60%]'>
                    <img src={logo} alt="logo" className="mx-auto w-[200px] h-[200px] object-contain" />
                    <p className={`${styles.sectionSubText}`}>WELCOME</p>
                    <h3 className={styles.sectionHeadText}>Log In</h3>
                    <form  onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
                    <label htmlFor="email" className='flex flex-col'>
                        <span className='font-medium text-black mb-4'>Your Email:</span>
                        <input
                        name="email"
                        type="email" 
                        placeholder="Insert your email" 
                        value={email} 
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-slate-600 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium' 
                        />
                        
                    </label>
                    
                    <label htmlFor="password" className='flex flex-col'>
                        <span className='text-black font-medium mb-4 flex gap-2'>Your Password: {!visible?<FaEye size={30} onClick={()=>setVisible(!visible)}/>: <FaEyeSlash size={30} onClick={()=>setVisible(!visible)}/>}</span>
                        
                        
                        <input
                        name="password"
                        type={visible?'text':'password'} 
                        required
                        placeholder="Insert your password here" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        className='bg-slate-600 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium' 
                        />
                        
                        
                        
                    </label>
                    
                    
                    <button 
                        type='submit'
                        disabled={loading}
                        onSubmit={handleSubmit}
                        className={`bg-black py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl`}>
                        
                        {loading? 'Sending...': 'Send'}
                    </button>
                    </form>
                    
                </div>
                <ToastContainer/>
        </div>
    )
}