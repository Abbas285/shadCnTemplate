import axios from "axios";

const api=axios.create({
    headers: { 
       'Content-Type': 'application/json'
      },
    maxBodyLength: Infinity,
    baseURL: 'http://localhost:3000/api/'
 });

  
export{
    api
}