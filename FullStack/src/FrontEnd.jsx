import { useState,useEffect } from "react"
import axios from "axios"
import "./FrontEnd.css"

function FrontEnd(){
    const [form,setForm]=useState({name:"",email:"",age:""})
    const [users,setUsers]=useState([])
    const [editId,setEditId]=useState(null)

    useEffect(()=>{
        axios.get("http://localhost:3000/users")
        .then((res)=>{
            setUsers(res.data)
        })
    })

    //1st users -> 10 datas 
    //2nd -> 10 + 10 datas

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(editId){
            await axios.put(`http://localhost:3000/users/${editId}`,form)
            setEditId(null)
        }else{
            const res=await axios.post("http://localhost:3000/users",form)
            
        }
        
        setUsers((prev)=>[...prev,form])
        setForm({name:"",email:"",age:""})
    }

    const handleDelete=async(id)=>{
        await axios.delete(`http://localhost:3000/users/${id}`)
    }

    const handleEdit=(user)=>{
        setForm({name:user.name,email:user.email,age:user.age})
        setEditId(user._id)
    }

    return(
        <>
        <div className="main-card">
            <form onSubmit={handleSubmit} className="main-form">
                <input type="text" placeholder="Name" value={form.name} name="name" onChange={handleChange} />
                <br/>
                <input type="email" placeholder="Email" value={form.email} name="email" onChange={handleChange} />
                <br/>
                <input type="number" placeholder="Age" value={form.age} name="age" onChange={handleChange}/>
                <br/>
                <button type="submit">{editId?"Edit":"Add"}</button>
            </form>
            <ul>
                {users.map((u)=>(
                <li key={u._id}>{u.name} {u.email} {u.age}
                <button onClick={()=>handleEdit(u)}>Edit</button>
                <button onClick={()=>handleDelete(u._id)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
        </>
    )
}

export default FrontEnd