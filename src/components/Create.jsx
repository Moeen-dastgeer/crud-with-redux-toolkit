import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';
export const Create = () => {
    const [user,setUser] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(user));
        navigate("/read");
    }
  return (
<form className='w-50 mx-auto my-5' onSubmit={handleSubmit}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" name="name" className="form-control" id="name" onChange={getData}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="email" onChange={getData}/>
  </div>
  <div className="mb-3">
    <label htmlFor="age" className="form-label">Age</label>
    <input type="number" name="age" className="form-control" id="age" onChange={getData}/>
  </div>
  <div>
  <div className="form-check">
    <input className="form-check-input" type="radio" value="male" name="gender" id="male" onChange={getData} />
    <label className="form-check-label" htmlFor="male">
      Male
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="gender" value="female" id="female" onChange={getData}/>
    <label className="form-check-label" htmlFor="female">
      Female
    </label>
  </div>
</div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

  )
}
