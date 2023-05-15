import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../../style';
import Cookie from 'universal-cookie';

import axios from 'axios';
import {useCookies} from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
export default function Dashboard() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['jwt']);
    const [showModal, setShowModal] = useState(false);
    const url= import.meta.env.VITE_URL_API;
    const generateError = (err) => toast.error(err, {
        position:"bottom-right",
    })
    const cooki = new Cookie();
    



    const [user, setUser] = useState({
        address:'',
        age:'',
        balance:'',
        company:'',
        email:'',
        eyeColor:'',
        guid:'',
        isActive:'',
        name:{
            first:'',
            last:''
        },
        password:'',
        phone:'',
        picture:'',
    });

    useEffect(() => {
        const verifyUser = async()=>{
            if(!cookies.jwt){
                navigate('/login');
            }else{
                
                const token = cookies.jwt;
                axios.post(url+'user/check',null, { headers: {"Authorization" : `Bearer ${token}`}})
                .then(response => {
                    const {data}=response;
                    
                    if(!data.status){
                        generateError("the user does not have access to this");
                    }else{
                        
                        setUser({...data.user});
                    }
                })
                .catch(error => {
                    console.log("ERROR",error)
                    removeCookie('jwt');
                    cooki.remove('jwt');
                    generateError("An error occurred in the request")
                    
                });
            }
        }
    
        verifyUser();
    }, [cookies, navigate, removeCookie])
    
    
    const logOut = () =>{
		removeCookie('jwt');
        cooki.remove('jwt');
		navigate('/');
	}
    const onBalance = () =>{
        
        setShowModal(true);
    }
    

    const onEdit = () =>{
        console.log('To edit')
        navigate('/edit');
    }


    return (
        
        <div className={`${styles.padding} h-screen flex items-center bg-tertiary justify-center w-screen `}>
            
            {user.address.length===0?
                <h1 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">Loading...</h1>
            :
            <div className='p-8 my-2 rounded-2xl bg-white w-[80%] sm:w-[80%] flex flex-col justify-items-center items-center justify-center '>
                <img src={user.picture} alt="logo" className="mx-auto w-[150px] h-[150px] object-contain rounded-full" />
                <p className={`${styles.sectionSubText}`}>{user.email}</p>
                <h3 className='font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>{user.name.first} {user.name.last}</h3>
                
                <p className={`${styles.heroSubText}`}>INFORMATION</p>

                <div className='mx-auto flex flex-col justify-center items-center'>
                    <span className={styles.sectionSubText}>Company</span>
                    <span className='font-medium italic text-black'>{user.company}</span>
                </div>
                <div className='mx-auto flex flex-col justify-center items-center'>
                    <span className={styles.sectionSubText}>Age</span>
                    <span className='font-medium italic text-black'>{user.age}</span>
                </div>
                <div className='mx-auto flex flex-col justify-center justify-items-center items-center'>
                    <span className={styles.sectionSubText}>Address</span>
                    <span className='font-medium italic text-black'>{user.address}</span>
                </div>
                <div className='mx-auto flex flex-col justify-center justify-items-center items-center'>
                    <span className={styles.sectionSubText}>Phone</span>
                    <span className='font-medium italic text-black'>{user.phone}</span>
                </div>
                <div className='mx-auto flex flex-col justify-center justify-items-center items-center mb-5'>
                    <span className={styles.sectionSubText}>Eye color</span>
                    <span className='font-medium italic text-black'>{user.eyeColor}</span>
                </div>

                
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                    <button 
                        onClick={onBalance}
                        className={`bg-green-500 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl`}>
                        Balance
                    </button>
                    <button 
                        onClick={onEdit}
                        className={`bg-blue-500 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl`}>
                        Edit Profile
                    </button>
                </div>
                <div className='mx-auto flex flex-col justify-center justify-items-center items-center mb-5'>
                    <button 
                        
                        onClick={logOut}
                        className={`bg-red-700 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl`}>
                        Log Out
                    </button>
                </div>
                
            </div>
            }
            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Balance
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>
                        
                        <div className="relative p-6 flex-auto justify-items-center">
                        <p className={`${styles.sectionSubText}`}>The total balance of your account is:</p>
                        <h3 className='font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]'>{user.balance}</h3>
                        
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Ok
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <ToastContainer/>
        </div>
    )
}
