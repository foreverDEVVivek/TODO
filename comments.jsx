import React, { useState } from 'react'
import {nanoid} from 'nanoid'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

const comments = () => {
    const [isDisabled, setDisabled]=useState(false)
    let[formData,setFormdata]=useState({
        username:"",
        email:"",
        rating:"",
        comment:"",
    })

    let [allData,setAlldata]=useState([])

    const handleForm=(event)=>{
        let targetField=event.target.name
        let targetValue=event.target.value
    // console.log(event.target.name, event.target.value)
    setFormdata((currData)=>{
        return {...currData,[targetField]:targetValue}
    })
    }
    const formSubmit=(event)=>{ 
        setAlldata((allData)=>{
            return [...allData,{...formData,id:nanoid()}]
        })
       event.preventDefault();
       setFormdata({
        username:"",
        email:"",
        rating:"",
        comment:"",
    })
    }
    const disabledBtn=(e)=>{
        console.log(e)
     setDisabled(!isDisabled)
    }

  return (
    <>
    <Container maxWidth="sm">
        <form onSubmit={formSubmit}>
            <h1>: Feedback form :</h1>
            <label id='username'>Enter Your Name :</label>
            <TextField id="standard-basic username" label="Standard" variant="standard" type='text' name="username" htmlFor="username" onChange={handleForm} value={formData.username} placeholder='Enter your Name : ' />
            
            <br/>
            <label>Enter your Email Address</label>
            <input type='email' name="email" placeholder='abcd@gmail.com' value={formData.email} onChange={handleForm}/>
            <br/>
            <label>Rating :</label>
            <input type='number' name="rating" min={1} max={5} value={formData.rating} onChange={handleForm}/>
            <br/>
            <label>Comment: </label>
            <textarea placeholder='comment .....' name="comment" onChange={handleForm} value={formData.comment}></textarea>
            <button>Submit</button>
            <Button id="dis" variant="contained" onClick={disabledBtn} disabled={isDisabled}>Outlined</Button>
        </form>

        {
            allData.map((data)=>{
                
                return <div>
                  <p key={data.id}>{data.username}</p>
                  <p>{data.email}</p>
                  <p>{data.rating}</p>
                  <p>{data.comment}</p>
                  <p>{data.id}</p>
                
              </div>
            })
        }

</Container>
    
    </>
  )
}

export default comments