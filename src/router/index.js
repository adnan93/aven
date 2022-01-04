import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customerLogin',
    name: 'customerLogin',
    component: () => import('../views/customerLogin.vue')
  },
  
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },

  {
    path: '/Update',
    name: 'Update',
    component: () => import('../views/Update.vue')
  },
  

  {
    path: '/Score',
    name: 'Score',
    component: () => import('../views/Score.vue')
  },


  {
    path: '/Announcement',
    name: 'Announcement',
    component: () => import('../views/Announcement.vue')
  },

  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/customerProfile',
    name: 'customerProfile',
    component: () => import('../views/customerProfile.vue')
  }, 

  {
    path: '/Customer',
    name: 'Customer',
    component: () => import('../views/Customer.vue')
  }, 
  

  {
    path: '/User',
    name: 'User',
    component: () => import('../views/User.vue')
  }, 

  {
    path: '/Customers',
    name: 'Customers',
    component: () => import('../views/Customers.vue')
  }, 

  {
    path: '/CreateCustomer',
    name: 'CreateCustomer',
    component: () => import('../views/CreateCustomer.vue')
  }, 

  {
    path: '/AnnouCustomer',
    name: 'AnnouCustomer',
    component: () => import('../views/AnnouCustomer.vue')
  },

  

  

  



  




  
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
