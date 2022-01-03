import Vue from "vue";
import Vuex from "vuex"
//import auth from "./auth"
import scores from "./modules/scores"
import program from "./modules/program"
import customerLogin from "./modules/customerLogin"   
import userlogin from "./modules/userlogin"




Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },

    mutations: {

    },

    actions: {


    },

    modules: {
        
        scores,
        program,
        customerLogin,
        userlogin

    }

})