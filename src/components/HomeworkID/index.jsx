import React ,{useEffect,useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import API from '../.././API'
const index = () => {
  const [data,setData] =useState([])
  const  {ids} = useParams();
  useEffect(()=>{
    API.getID(ids).then((res)=>{
      setData(res.data)
      console.log(data)
    })
   }, [ids]);
    const navigate =useNavigate();
    return (
   <div>
     <button className="btn btn-success" onClick={()=>{navigate(-1)}}>go back</button>
     <h1 className='text-info'><span>{data?.id} </span>  {data?.title}</h1>
     <h3 className='text-info'>{data?.body}</h3>
   </div>
  )
}

export default index