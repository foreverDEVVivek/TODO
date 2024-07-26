import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css'

const App = () => {
  
     const[allTodo,setTodo]=useState([{
      id:"",
      data:"",
      time:"",
      date:"",
      day:""
     }])
   const[text,setText]=useState("")

   const saveToLS=()=>{
      localStorage.setItem("todos",JSON.stringify(allTodo));
   }

   useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodo(todos) 
    }
   },[])

   //text handler
   const textHandler=(event)=>{
    setText(event.target.value)
   }

   //button handler
   const buttonHandler=(event)=>{
    const day = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    setText("")
    const date=new Date();
    setTodo((currObj)=>{
      return [...currObj, {...currObj,id:uuidv4(),data:text,date:`${date.getDate()}th`,time:`${date.getHours()}:${date.getMinutes()} PM`,day:`${day[date.getDay()]}`}]
    })
    saveToLS()

   }

   //key Handler
   const keyPressHandler=(event)=>{
    if(event.key==="Enter"){
    const day = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    setText("")
    const date=new Date();
    setTodo((currObj)=>{
      return [...currObj, {...currObj,id:uuidv4(),data:text,date:`${date.getDate()}th`,time:`${date.getHours()}:${date.getMinutes()} PM`,day:`${day[date.getDay()]}`}]
    })
    saveToLS()
  }

   }
   //delete handler
   const handleDelete=(event,id)=>{
    let index=allTodo.findIndex((item)=>{
      return item.id===id;
    })
     console.log(index)
     let newTodos=allTodo.filter((item)=>{
      return item.id!==id
     });
    setTodo(newTodos)
    saveToLS()
   }

   //handle edit
   
   //delete handler
   const handleEdit=(event,id)=>{
    let index=allTodo.findIndex((item)=>{
      return item.id===id;
    })

    setText(allTodo[index].data)
    handleDelete(event,id)
    saveToLS()
   }

  return (
    <>
    <div >
    <h1 style={{textAlign:"center"}}>TODO APPLICATION</h1>
    <div className='container'>
      <div>
    <TextField
          required
          id="fullWidth"
          label="Todo"
          defaultValue=""
          value={text}
          onChange={textHandler}
          onKeyDown={keyPressHandler}
          className='textField'
        />
         </div>
         <div>
    <Button className="button"variant="contained" onClick={buttonHandler}>SUBMIT</Button>
    </div>
    </div>
    <h3>
    </h3>

    <div className='card'>

      {
        allTodo.map((todo)=>{
          if(todo.date===""&&todo.time===""){
            return null;

          }
          else{
          return <Card key={todo.id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={"http://tous-logos.com/wp-content/uploads/2018/02/Couleur-logo-Balenciaga.jpg"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {todo.day}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>{todo.data}</b><br/>
                <br/>
                Date of Creation : {todo.date}<br/>
                Time of Creation : {todo.time}<br/>
                Day of Creation : {todo.day}<br/>
                {/* ID : {todo.id}<br/> */}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={(e)=>{handleDelete(e,todo.id)}}>Delete</Button>
              <Button size="small" onClick={(e)=>{handleEdit(e,todo.id)}}>Edit</Button>
            </CardActions>
          </Card>
          }
        })
      }
    </div>
    </div>
    </>
  )
}

export default App