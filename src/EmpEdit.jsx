import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EmpEdit = () => {

    const { empid } = useParams();

    // const [empdata, setEmpData] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((res) => { setId(res.id);
                setName(res.name);
                setEmail(res.email);
                setPhone(res.phone);
                setActive(res.isactive);
            }) 
            .catch((err) => console.log(err.message));
    }, [])

const[id, setId] = useState('');
const[name, setName] = useState('');
const[email, setEmail] = useState('');
const[phone, setPhone] = useState('');
const[active, setActive] = useState(true);

const[nameValidation, setNameValidation] = useState(false);
const[mailValidation, setMailValidation] = useState(false);
const[phoneValidation, setPhoneValidation] = useState(false);


const navigate = useNavigate();

const handleSubmit = (e) => {
 e.preventDefault();
 const empdata = {id,name,email,phone,active}
 fetch('http://localhost:8000/employee/'+ empid, {
    method:'PUT',
    headers: {'content-type' : 'application/json'},
    body:  JSON.stringify(empdata)
 }).then(res => {
    alert('Saved Successfully.')
    navigate('/')
 }).catch(err => {
    console.log(err.message)
 })
}



  return (
    <div className='row'>
    <div className='offset-lg-3 col-lg-6'>
      <form className="conatiner" onSubmit={handleSubmit}>
          <div className="card" style={{'textAlign':'left', marginTop: '50px'}}>
              <div className="card-title">
                  <h3>Edit Details</h3>
              </div>
              <div className="card-body">
                  <div className="row">
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label>ID</label>
                              <input value={id} disabled='disabled' className='form-control' />
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label>Name</label>
                              <input required value={name} onMouseDown={e => setNameValidation(true)} onChange={e => setName(e.target.value)} className='form-control' />
                              {name.length == 0 && nameValidation && <span className='text-danger'>Enter your name</span>}
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label>Email</label>
                              <input value={email} onMouseDown={e => setMailValidation(true)} onChange={e => setEmail(e.target.value)} className='form-control' />
                              {email.length == 0 && mailValidation && <span className='text-danger'>Enter your email</span>}
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <label>Phone</label>
                              <input value={phone} onMouseDown={e => setPhoneValidation(true)} onChange={e => setPhone(e.target.value)} className='form-control' />
                              {phone.length == 0 && phoneValidation && <span className='text-danger'>Enter your phone number</span>}
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-check">
                              <input checked={active} onChange={e=>setActive(e.target.checked)} type='checkbox' className='form-check-input' />
                              <label className='form-check-label'>Is Active</label>   
                          </div>
                      </div>
                      <div className="col-lg-12">
                          <div className="form-group">
                              <button className='btn btn-success' type='submit'>Save</button>
                              <Link to='/' className='btn btn-danger'>Back</Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </form>
    </div>
  </div>
  )
}

export default EmpEdit
