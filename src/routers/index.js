import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import homeRouter from './home'






Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base:'tiantian',
  routes:[
    movieRouter,
    cinemaRouter,
    mineRouter,
    homeRouter,
   
    
    
    {
      path:'/*',
      redirect: '/movie'
    }

  ]
})

export default router
