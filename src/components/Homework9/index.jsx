import React from 'react'
import { useReducer ,useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const index = () => {

    const modeToggle=()=>{
        document.body.classList.toggle("dark")
        localStorage.setItem("dark",
        document.body.className
        );
      }
    
      const point=10
      const initialState ={
      loading:false,
      data:[],
      firstStep:1,
      }
    
     const reducer= (state ,action) => {
      switch (action.type) {
        case 'get':
          return{
            ...state,
             data: action.payload 
          } 
        case 'load':
          return{
            ...state,
            loading:action.payload
          } 
         case 'paginate':
          return{
            ...state,
            firstStep:action.payload
          } 
        default:
          return state
      }
     }
    
     const [state,dispatch] = useReducer(reducer,initialState)
    
     useEffect(()=>{
     axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
      dispatch({type: 'get', payload: res.data})
      dispatch({type: 'load', payload: true})
      if(localStorage.getItem("dark")){
        document.body.classList.add("dark");
      }
     })
     },[])

     if(!state.loading){
      return <div  className=' d-flex justify-content-center mt-5' ><span className="loader"></span></div>
     }

     const lastData =  state.firstStep*point;
     const currentPage= lastData-point;
    
     const sliceData  =  state.data.slice(currentPage,lastData)
    
     const steps=[]
      for (let i=1 ; i <= Math.ceil(state.data.length/point) ;i++){
        steps.push(i)
      }
      const paginate=(num)=>{
        dispatch({type:'paginate', payload:num} )
      }
      return (
        <div className=" container app " >
          <h1 className='text-warning text-center'> Homework 9</h1>
          <label > 
            <input type="checkbox" onClick={modeToggle} />
            <span   className='switch'>
              <span className='handle'></span>
            </span>
          </label>
          <ul className='list-group shadow'  >
             {
              sliceData.map((el)=>{
             return( 
              <Link to={`/post/${el.id}`}  key={el.id} >
               <li className='list-group-item  text-white  bg-dark'>
               <span className='text-primary'>  {el.id}</span>  {el.title}
            </li>
              </Link>
              )
             })
             }
              </ul>
              <nav className='d-flex mt-5 justify-content-center '>
               <ul className='pagination pagination-sm'>
               {
                steps.map((step,i) =>{
                  return (
                    <li key={i} style={{cursor:'pointer'}} className={`page-item ${step===state.firstStep ? 'active': ''}`} onClick={()=>paginate(step)}>
                   
                    <span className='page-link'> {step}</span>
                    </li>
                  )
                })
               }
               </ul>
              </nav>
        </div>
    
      )
}

export default index


