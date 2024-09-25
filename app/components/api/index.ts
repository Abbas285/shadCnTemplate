import axios from "axios";

const api=axios.create({
    headers: { 
       'Content-Type': 'application/json'
      },
    maxBodyLength: Infinity,
    baseURL: process.env.HOST_ADDRESS
 });

  
export{
    api
}