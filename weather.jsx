import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

//api : http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//api key : eca740ce4c94e19029613551ad3d3ffb

const weather = () => { 
  const [data,setData]=useState("")
  const[apiDatas,setApidata]=useState({
    
      name:"",
      lat:"",
      lon:"",
      state:""
    
  })
  const[weather,setWeather]=useState(1)
  const[message,setMessage]=useState(<Alert style={{display:"none"}}></Alert>)

  const apiId="eca740ce4c94e19029613551ad3d3ffb"

  const fetchDetails=async()=>{
    
    const url=`http://api.openweathermap.org/geo/1.0/direct?q=${data}&appid=${apiId}`
    const options={
      method:"GET"
    }

    const apiData=await fetch(url,options);
    const jsonData=await apiData.json();
    setApidata((currObj)=>{
      return {...currObj,name:jsonData[0].name,lat:jsonData[0].lat,lon:jsonData[0].lon,state:jsonData[0].state}
    })

    setWeather(jsonData.length)
  }


  // const fetchCityDetails=async()=>{
  //   const url=`https://indian-cities-api-nocbegfhqg.now.sh/${data}`
  //   const option={
  //     method:"GET"
  //   }
  //   await fetch(url,option).then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.log(error));
  //   // const jsonData=await apiData.json();
  //   // console.log(jsonData)
  // }

  const trackData=(e)=>{
    setData(e.target.value)
  }
  const getData=()=>{
    fetchDetails()
    // fetchCityDetails()
    setData("")
    // console.log(weather)
    if(weather!=0){
      setMessage(<Alert severity="success">Success.</Alert>)
      return
    }
    else{
      setMessage(<Alert severity="error">This is an error Alert.</Alert>)
    }
    
  }
  return (
    <div className='container'>
        <h1 style={{textAlign:"center"}}><u>Weather App</u></h1> 
        <TextField id="outlined-basic" label="City" value={data} onChange={trackData} variant="outlined" />
        <Button variant="contained" onClick={getData}>Contained</Button>
        {message}
        {/* {<div>
          <p>{apiDatas.name}</p>
          <p>{apiDatas.lat}</p>
          <p>{apiDatas.lon}</p>
          <p>{apiDatas.state}</p>

          </div>} */}
          
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"https://www.lifewire.com/thmb/khpiw5lZDkk7ZxYXVqpfTLkRPyc%3D/6000x4000/filters:no_upscale():max_bytes(150000):strip_icc()/summerbeach-5b4650c946e0fb005bfb3207.jpg"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {apiDatas.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {apiDatas.lat}<br/>
         {apiDatas.lon}<br/>
         
         {apiDatas.state}
        </Typography>
      </CardContent>
    </Card>
        <p></p>
    </div>
  )
}

export default weather