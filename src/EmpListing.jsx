import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const EmpListing = () => {

const[empdata, setEmpData] = useState(null)

useEffect(() => {
  fetch('http://localhost:8000/employee')
  .then((res) => res.json())
  .then((res) => setEmpData(res))
  .catch((err) => console.log(err.message));
},[])

const navigate = useNavigate();

const LoadDetail = (id) => {
   navigate('/employee/details/'+id)
}

const LoadEdit = (id) => {
    navigate('/employee/edit/'+id)
}

const RemoveFunction = (id) => {
   if(window.confirm('Do you wanna remove?')){
    fetch('http://localhost:8000/employee/'+ id, {
        method:'DELETE',
     }).then(res => {
        alert('Removed Successfully.')
        window.location.reload();
     }).catch(err => {
        console.log(err.message)
     })
   }
}

  return (
    <>
    <h2>Reactjs CRUD operations</h2>
    <div className='container'>
      <div className='card' style={{marginTop: '50px'}}>
        <div className='card-title'>
            <h2>Employee Listing</h2>
        </div>
        <div className='card-body'>
            <div className='divbtn'> 
                <Link to='employee/create' className='btn btn-success'>Add New (+)</Link>
            </div>
            <table className='table table-bordered'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    { empdata &&
                        empdata.map(item => (
                            <tr key={item.id}>
                               <td>{item.id}</td>
                               <td>{item.name}</td>
                               <td>{item.email}</td>
                               <td>{item.phone}</td>
                               <td>
                                <a onClick={() => {LoadEdit(item.id)}} className='btn btn-success'>Edit</a>
                                <a onClick={() => {RemoveFunction(item.id)}}  className='btn btn-danger'>Remove</a>
                                <a onClick={() => {LoadDetail(item.id)}}  className='btn btn-success'>Details</a>
                               </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </>

  );
}

export default EmpListing
