import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Create() {
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [doc,setDoc]=useState('');
    const navigate=useNavigate();
    function onhandlesubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create',{name,email,doc})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
 return (
    <>
    <div>
        <div>
            <h2>Create Student</h2>
            <div>
                <Link to='/'>Student List</Link>
            </div>
            <div>
                <h2>Add Student</h2>
                <form onSubmit={onhandlesubmit} encType="mulipart/form-data">
                    <label>Name</label>
                    <input type="text" onChange={e => setName(e.target.value)} placeholder="Enter Name" required=''/>
                    <label>Email</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required=''/>
                    <label>Docs</label>
                    <input type="file" onChange={e => setDoc(e.target.value)} required=''/>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>
    </>
 )
}

export default Create;
