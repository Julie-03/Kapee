import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

const RegistarationForm = () => {
  interface FormData {
    username: string;
    email: string;
    password: string;
  }
  const { register, handleSubmit} = useForm<FormData>();
  const onRegister=async(data:FormData)=>{
    try{
      const{username,email,password}=data;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      const res=await axios.post(`http://localhost:5000/api_v1/user/userRegistration`,formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(res);

    }catch(error){
      console.log("registration failed",error);
      

    }

  }

  
  return (
  < div className="flex flex-col items-center" >
    <form className="flex flex-col gap-3 mt-20 w-[20rem] h-[15rem] pl-20 "
    onSubmit={handleSubmit(onRegister)}
    >

    <input type="text" placeholder="Username" className="w-[15rem] p-1 border border-stone-500 rounded-sm" 
    {...register("username",{required:true,maxLength:20,minLength:3})}
    />
   
    <input type="email" placeholder="email" className="w-[15rem] p-1 border border-stone-500 rounded-sm"
    {...register("email",{required:true})}
    />
    <input type="password" placeholder="password" className="w-[15rem] p-1 border border-stone-500 rounded-sm" 
    {...register("password",{required:true,minLength:6})}
    />
    <button type="submit" className="p-1 w-16 bg-blue-500 rounded-sm text-white">Register</button>        
    <span>If you have an Account  <span><Link to="/login">Login</Link></span> </span>
    </form>
    
    </div>    
          )
        }

        export default RegistarationForm;