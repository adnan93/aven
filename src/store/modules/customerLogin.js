import axios from "axios";
const state = {
    token: null,
    message: null,
    MessageType: null,
    IsAdmin: null,

};


const actions = {
    async CustomerLogIn({ commit }, form) {

        localStorage.removeItem("token");
        const response = await axios.post(`http://95.217.131.10:9090/api/User/Login`, form);
        localStorage.setItem('token', response.data.Token)

        commit('setToken', response.data.Token)
        commit('setMessage', response.data.Message)
        commit('setMessageType', response.data.MessageType)
        commit('setIsAdmin', response.data.IsAdmin)
        // console.log("IsAdmin", response.data.IsAdmin);

    }

};

const mutations = {
    setToken: (state, token) => (state.token = token),
    setMessage: (state, message) => (state.message = message),
    setMessageType: (state, MessageType) => (state.MessageType = MessageType),
    setIsAdmin: (state, IsAdmin) => (state.IsAdmin = IsAdmin),

};


const getters = {
    getToken: state => state.token,
    getMessage: state => state.message,
    getMessageType: state => state.MessageType,
    getIsAdmin: state => state.IsAdmin,

};


export default {
    state,
    mutations,
    actions,
    getters
}

