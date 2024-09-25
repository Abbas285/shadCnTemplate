import axios from "axios";

const api=axios.create({
    headers: { 
       'Content-Type': 'application/json'
      },
    maxBodyLength: Infinity,
    baseURL: 'https://shad-cn-template.vercel.app/api/'
 });

  
export{
    api
}