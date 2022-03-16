// création de vue router 
import { createRouter, createWebHashHistory } from 'vue-router' 

// importationde authGuard 'le gardien' il permet de proteger les routes avec le token 
import { authGuard } from '../services/auth.service'
import Login from '../pages/Login.vue' 
import Signup from '../pages/Signup.vue'
import Wall from '../pages/Wall.vue'
import Profile from '../pages/Profile.vue'
import ModifMessage from '../pages/ModifMessage.vue'
import UserProfileDelete from '../pages/UserProfileDelete.vue'
import Message from '../pages/Message.vue'

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
    path: '/userdeleted',
    name: 'UserProfileDelete',
    component: UserProfileDelete
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall,
    beforeEnter: authGuard 
    // avant de rentrer sur le path il faudra le token 
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard 
    // avant de rentrer sur le path il faudra le token 
  },
  {
    path: '/message/add',
    name : 'AddMessage',
    component: ModifMessage,
    beforeEnter: authGuard 
  },
  {
    path: '/modify_message/:id',
    name: 'ModifyMessage',
    component: ModifMessage,
    beforeEnter: authGuard
  },
  {
    path: '/message/:id',
    name: 'Message',
    component: Message,
    beforeEnter: authGuard
  },
  { path: '/:pathMatch(.*)*', redirect: '/wall' } 
  // redirige les utilisateurs vers la page Wall 
  //si il ya une tentative de connexion a une route inexitante 

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

