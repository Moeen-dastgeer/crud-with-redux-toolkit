import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../features/userDetailSlice';

export const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userdata,setUserdata] = useState();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.app.users);
    useEffect(() => {
        if(id)
        {
            const singleUser = users.filter((ele) => ele.id === id);
            setUserdata(singleUser[0]);
        }
    },[]);

    const newData = (e)=>{
        setUserdata({...userdata, [e.target.name] : e.target.value});
    }

    const handleUpdate = (e)=>{
        e.preventDefault();
        dispatch(updateUser(userdata));
        navigate("/read");
    }

    // console.log(userdata[0].name);
  return (
    <form className='w-50 mx-auto my-5' onSubmit={handleUpdate}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" name="name" className="form-control" id="name" value={userdata && userdata.name} onChange={newData} />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control" id="email" value={userdata && userdata.email} onChange={newData} />
  </div>
  <div className="mb-3">
    <label htmlFor="age" className="form-label">Age</label>
    <input type="text" name="age" className="form-control" id="age" value={userdata && userdata.age} onChange={newData} />
  </div>
  <div>
  <div className="form-check">
    <input className="form-check-input" type="radio" value="male" name="gender" id="male" checked={userdata && userdata.gender=='male'} onChange={newData} />
    <label className="form-check-label" htmlFor="male">
      Male
    </label>
  </div>
  <div className="form-check">
    <input className="form-check-input" type="radio" name="gender" value="female" id="female" checked={userdata && userdata.gender=='female'} onChange={newData} />
    <label className="form-check-label" htmlFor="female">
      Female
    </label>
  </div>
</div>

  <button type="submit" className="btn btn-primary">Update</button>
</form>
  )
}
