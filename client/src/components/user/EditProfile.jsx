import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../../style';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';


export default function EditProfile() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['jwt']);
    
    const url= import.meta.env.VITE_URL_API;
    const generateError = (err) => toast.error(err, {
        position:"bottom-right",
    })

    const [user, setUser] = useState({
        _id:'',
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
                    generateError("An error occurred in the request")
                    
                });
            }
        }
    
        verifyUser();
    }, [cookies, navigate, removeCookie])
    
    
    
    const onCancel = () =>{
        navigate('/profile')
    }
    

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleName = (e)=>{
        const { name, value } = e.target;
        
        setUser({...user, name:{...user.name, [name]:value}})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            const {data} = await axios.put(url+'user/'+user._id, {
            ...user,
            });
            console.log(data)
            if (data) {
                if (data.error) {
                    generateError("something went wrong in the data object");
                } else if (data.status === "success") {
                    toast.success(`Data updated successfully`, {
                    
                    position: "bottom-right",
                    });
                    navigate('/profile')
                }
                setLoading(false);
            }
        } catch (err) {
            generateError("The request failed");
            setLoading(false);
        }
    };
    return (
        <div className={`${styles.padding} h-screen bg-tertiary  w-screen overflow-auto`}>
            
            {user.address.length===0?
                <h1 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">Loading...</h1>
            :
            <div className='rounded-2xl p-4 bg-white w-full justify-center items-center flex flex-col'>
                <p className={`${styles.sectionHeadText} my-3`}>Edit profile</p>
                <form onSubmit={handleSubmit}>
                    
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Company</span>
                            <input
                            name="company"
                            type="text" 
                            placeholder="Insert your company" 
                            value={user.company} 
                            onChange={handleChange}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>First Name</span>
                            <input
                            name="first"
                            type="text" 
                            placeholder="Insert your first name" 
                            value={user.name.first} 
                            onChange={handleName}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Last Name</span>
                            <input
                            name="last"
                            type="text" 
                            placeholder="Insert your last name" 
                            value={user.name.last} 
                            onChange={handleName}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Email</span>
                            <input
                            name="email"
                            type="email" 
                            placeholder="Insert your Email" 
                            value={user.email} 
                            onChange={handleChange}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Picture url</span>
                            <input
                            name="picture"
                            type="text" 
                            placeholder="Insert your picture url" 
                            value={user.picture} 
                            onChange={handleChange}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Age</span>
                            <input
                            name="age"
                            type="number" 
                            placeholder="Insert your age" 
                            value={user.age} 
                            onChange={handleChange}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Eye Color</span>
                            <input
                            name="eyeColor"
                            type="text" 
                            placeholder="Insert your Eye Color" 
                            value={user.eyeColor} 
                            onChange={handleChange}
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                            <span className={styles.sectionSubText}>Phone</span>
                            <input
                            name="phone"
                            type="text" 
                            placeholder="Insert your phone" 
                            value={user.phone} 
                            onChange={handleChange}
                            
                            required
                            className='w-full bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium mx-3 '  
                            />
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-6'>
                            <span className={styles.sectionSubText}>Address</span>
                            <textarea
                            
                            name="address"
                            type="text" 
                            placeholder="Insert your address" 
                            value={user.address} 
                            onChange={handleChange}
                            required
                            className=' bg-gray-400 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none w-full border-none font-medium mx-3 '  
                            />
                    </div>
                    

                    
                    

                    
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center mb-3'>
                        <button 
                            onClick={onCancel}
                            disabled={loading}
                            className={`bg-red-500 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl`}>
                            Cancel
                        </button>
                        <button 
                            onSubmit={handleSubmit}
                            disabled={loading}
                            className={` bg-green-500 py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl`}>
                            {loading ? 'updating...':'Update'}
                        </button>
                    </div>
                </form>
                
                
                
            </div>
            }
            
            <ToastContainer/>
        </div>
    )
}
