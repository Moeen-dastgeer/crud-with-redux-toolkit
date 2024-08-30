import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../features/userDetailSlice'
import { deleteUser } from '../features/userDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Custommodal } from './Custommodal'
export const Read = () => {
    const dispatch = useDispatch();
    const {users,loading,searchUser} = useSelector((state)=>state.app);
    useEffect(()=>{
        dispatch(getUsers());
    },[]);

    const [id,setId] = useState();
    const [radioData,setRadioData] = useState("");
    const [showmodal,setshowmodal] = useState(false);
    if(loading)
    {
        return <h2>Loading....</h2>;
    }

  return (
    <div>
        {showmodal && <Custommodal id={id} showmodal={showmodal} setshowmodal={setshowmodal} />}
        <h1 className='text-center my-3'>All Data</h1>
        <div className='d-flex justify-content-center'>

        <input className="form-check-input" type="radio" checked={radioData === ""} name="gender" value="" id="all" onChange={(e)=>setRadioData(e.target.value)}  />
        <label className="form-check-label" htmlFor="all">
        All
        </label>

        <input className="form-check-input" type="radio" value="male" name="gender" id="male" checked={radioData === "male"} onChange={(e)=>setRadioData(e.target.value)} />
        <label className="form-check-label" htmlFor="male">
        Male
        </label>
     
        <input className="form-check-input" type="radio" name="gender" value="female" id="female" checked={radioData === "female"} onChange={(e)=>setRadioData(e.target.value)} />
        <label className="form-check-label" htmlFor="female">
        Female
        </label>
        </div>

        <div>
            {users && 
            users.filter((ele) => {
                if(searchUser.length===0)
                {
                    return ele;
                }
                else
                {
                    return ele.name.toLowerCase().includes(searchUser.toLowerCase());
                }
            }).filter((ele)=>{
                if(radioData === 'male')
                {
                    return ele.gender === radioData;
                }
                else if(radioData === 'female')
                    {
                        return ele.gender === radioData;
                    } 
                else
                {
                    return ele;
                }
            })
            .map((ele)=>(
            <div key={ele.id} className="card w-50 mx-auto text-center">
                <div className="card-body">
                    <h5 className="card-title">{ele.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                    <p className='card-text'>
                        {ele.age}
                    </p>
                    <button className='card-link' onClick={()=>[setId(ele.id),setshowmodal(true)]}>View</button>
                    <Link to={`/edit/${ele.id}`} className='card-link'>Edit</Link>
                    <Link className='card-link' onClick={() => dispatch(deleteUser(ele.id))}>Delete</Link>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}
