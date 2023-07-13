import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Home() {
    const [data,setData]=useState([])
 useEffect(()=>{
    axios.get('http://localhost:8081/')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
 },[])
 return (
    <>
    <div>
        <div>
            <h2>Student List</h2>
            <div>
                <Link to='/create'>Create +</Link>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    {data.map((student,index) => {
                        return
                    <tr key={index}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
    </>
 )
}

export default Home;
