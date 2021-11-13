import axios from 'axios';


//criando base url
//const url = 'http://192.168.64.2/jungle/api/app';
const url = 'https://amazonjunglepalace.com.br/api/app';
const api =  axios.create({
	baseURL: url
});


export default api;