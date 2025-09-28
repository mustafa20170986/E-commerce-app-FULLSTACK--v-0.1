import {useForm} from "react-hook-form"
import {z} from"zod"
import {zodResolver} from"@hookform/resolvers/zod"
import axios from "axios"
import { useContext } from "react"
import { Store } from "./context-api"
import { useNavigate } from "react-router-dom"

const schema=z.object({
email:z.string().email({message:"invalid email"}),
password:z.string().min(5,{message:"atleast 5 char needed"})
.max(20,{message:"password must be within 20 char"})

})

function Formhd(){
    const{register,formState:{errors},handleSubmit}=useForm({resolver:zodResolver(schema)})
const{setData,setName,setYear}=useContext(Store)
const navigate=useNavigate()

    const onSubmit=async(data)=>{
        try{
        const fecth=await axios.post('http://localhost:3000/login',data)

        localStorage.setItem('accesstoken',fecth.data.accesstoken)
        localStorage.setItem('refrehstoken',fecth.data.refreshtoken)

setData(fecth.data.user)
setName(fecth.data.user.name)
setYear(fecth.data.user.year)

navigate("/home")
    }catch(error){
        console.log(error.message)
    }
}
return(
    <div className=" flex flex-col">

        <form onSubmit={handleSubmit(onSubmit)}>

            <fieldset className="bg-base-300 border-base-100 border-1 flex-col flex">

<legend>Login</legend>

<label>Email</label>

<input {...register("email")}/>
{errors.email && <p className="text-red font-semibold">{errors.email.message}</p>}

<label>Password</label>
<input {...register("password")}/>
{errors.password && <p className="text-red font-semibold">{errors.password.message}</p>}

            </fieldset>
            <input type="submit" className="btn btn-secondary btn-outline"/>
        </form>
    </div>
)
}
export default Formhd