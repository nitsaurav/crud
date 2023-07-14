import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const {id}=useParams()
    function onhandlesubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id,{name,email})
        .then(res => {
            // console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
 useEffect(()=>{
    axios.get('http://localhost:8081/single_students/'+id)
    .then(res => { setData(res.data); console.log(data[0]); setName(data[0].name); setEmail(data[0].email); })
    .catch(err => console.log(err));
 },[]);
 return (
    <>
    <div>
        <div>
            <h2>Edit Student Details</h2>
            <div>
                <Link to='/'>Student List</Link>
            </div>
            <div>
                <h2>Edit Student</h2>
                <form onSubmit={onhandlesubmit}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" required/>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required/>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    </div>
    </>
 )
}

export default Edit;
