import { createApp } from 'vue' // importation de vue
import axios from 'axios' //importation de axios 
import App from './App.vue'// importation de app.vue
import router from './router' //importation de router
import 'bootstrap'; //importation de bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'; // importation de bootstrap 5 version minifier


const app = createApp(App) // je crée mon application 

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

