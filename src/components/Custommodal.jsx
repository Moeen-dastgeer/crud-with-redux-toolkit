import React from 'react'
import './Custommodal.css';
import { useSelector } from 'react-redux';
export const Custommodal = ({id, showmodal, setshowmodal}) => {
    const allUsers = useSelector((state)=>state.app.users);
    const singleUser = allUsers.filter((ele) => ele.id===id);
  return (
    <div className='modalbackground'>
        <div className='modalcontainer'>
          <button onClick={()=>setshowmodal(false)}>Close</button>
          <h1>Name: {singleUser[0].name}</h1>  
          <h1>Email: {singleUser[0].email}</h1>  
          <h1>Age: {singleUser[0].age}</h1>  
          <h1>Gender: {singleUser[0].gender}</h1>  
        </div>
    </div>
  )
}
