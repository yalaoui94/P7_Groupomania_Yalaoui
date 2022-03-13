// création de vue router 
import { createRouter, createWebHashHistory } from 'vue-router' 

// importationde authGuard 'le gardien' il permet de proteger les routes avec le token 
import { authGuard } from '../services/auth.service'
import Login from '../pages/Login.vue' 
import Signup from '../pages/Signup.vue'
import Profile from '../pages/Profile.vue'
import ModifArticle from '../pages/ModifArticle.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard 
    // avant de rentrer sur le path il faudra le token 
  },
  {
    path: '/article/add',
    name : 'AddArticle',
    component: ModifArticle,
    beforeEnter: authGuard 
  },
  {
    path: '/modify_article/:id',
    name: 'ModifyArticle',
    component: ModifArticle,
    beforeEnter: authGuard
  },
  { path: '/:pathMatch(.*)*', redirect: '/profile' } 
  // redirige les utilisateurs vers la page profile 
  //si il ya une tentative de connexion a une route inexitante 

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

