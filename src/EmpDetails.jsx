import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const EmpDetails = () => {

    const { empid } = useParams();

    const [empdata, setEmpData] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((res) => setEmpData(res))
            .catch((err) => console.log(err.message));
    }, [])

    return (
        <div>
            <div className="card" style={{'textAlign': 'left', marginTop: '50px'}}>
                <div className="card-title">
                    <h1 style={{textAlign: 'center'}}>Employee Detail</h1>
                </div>
                <div className="card-body">

                {empdata &&
                    <div>
                        <h5>The Employee name is : <b>{empdata.name}</b> ({empdata.id})</h5>
                        <h3>Contact Details</h3>
                        <h5>Email is: {empdata.email}</h5>
                        <h5>Phone is: {empdata.phone}</h5>
                        <Link className='btn btn-danger' to='/'>Back to Listing</Link>
                    </div>
                }
                </div>

            </div>
        </div>
    )
}

export default EmpDetails
