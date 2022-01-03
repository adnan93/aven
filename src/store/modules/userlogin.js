import axios from "axios";
const state = {
    token: null,
    message: null,
    MessageType: null
};



const actions = {
    async logIn({ commit }, form) {
        localStorage.removeItem("token") ;

        let response = await axios.post(`http://localhost:8080/api/User/Login`, form);
        commit('setToken', response.data.Token)
        commit('setMessage', response.data.Message)
        commit('setMessageType', response.data.MessageType)

        localStorage.setItem('token', response.data.Token)
        // console.log(response.data.Token)
    }

};

const mutations = {
    setToken: (state, token) => (state.token = token),
    setMessage: (state, message) => (state.message = message),
    setMessageType: (state, MessageType) => (state.MessageType = MessageType)

};


const getters = {
    getToken: state => state.token,
    getMessage: state => state.message,
    getMessageType: state => state.MessageType,


};


export default {
    state,
    mutations,
    actions,
    getters
}

