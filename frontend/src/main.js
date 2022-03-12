import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const app = createApp(App)

// Interception request pour ajout token dans headers
axios.interceptors.request.use(req => {

// vérification si l'item token existe dans notre local storage  
  const token = localStorage.getItem('token')  
  // si le token est présent  
  if(token){
    // Alors l'ajouter dans les headers "en tetes"
    req.headers["Authorization"] = 'Bearer '+token
  }
// si tout ok il nous retourne la requete 
  return req

})

// Interception response et check si error 403
axios.interceptors.response.use(res => {
  return res

}, 
async (err) => {
  // si le message d'erreur est un code 403 (non authoriser à rentrer)
  if(err.message == 'Request failed with status code 403'){
    // supprime le token du localstorage et renvoi a login 
    localStorage.removeItem('token')
    router.push('/')
  }
})

app.use(router).mount("#app")

