import VueRouter from 'vue-router'

import Admin from "@/components/Admin";
import Content from "@/components/Content";
import User from "@/components/User";
import Book from "@/components/Book";
import BackStage from "@/components/BackStage";
import UserCenter from "@/components/UserCenter";

export default new VueRouter({
    routes:[
        {
          path:'/',
          component:Content,
        },
        {
            path:'/UserCenter',
            component:UserCenter
        },
        {
            path:'/BackStage',
            component:BackStage,
        },
        {
            path:'/Admin',
            component:Admin
        },
        {
            path:'/User',
            component:User
        },
        {
            path:'/Book',
            component:Book
        }
    ]
})