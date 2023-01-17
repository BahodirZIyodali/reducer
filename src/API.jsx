import axios  from "axios";

const  API = {
   getID: async  (ids) => await axios.get(`https://jsonplaceholder.typicode.com/posts/${ids}`)
}
export  default API