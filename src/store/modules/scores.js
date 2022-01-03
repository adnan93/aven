import axios from "axios";
const state = {
    scores: [],
    score: "",
    ActivityName: "",
    Points: "",
    Description: "",
    Message: "",
    MessageType: "",
};



const actions = {
    async getUserScores({ commit }) {
        let response = await axios.get(
            `http://localhost:8080/api/Score/GetUserScores`,
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
        // console.log('scores',response.data)
        commit('setScores', response.data)
    },


    async setNewScore({ commit }, form) {
        console.log("form is: ", form);

        let response = await axios
            .post(
                `http://localhost:8080/api/Score/Create`,
                form,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }


            );
        commit('setScores', response.data)
        commit('setMessage', response.data.Description)

        commit('setMessageType', response.data.MessageType)


    },


    async deleteScore({ commit }, id) {
        console.log("id is: ", id);

        let response = await axios
            .post(
                `http://localhost:8080/api/Score/Delete/${id}`,
                id,

                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }

            );
        // console.log("id: ",row.item.Id)
        commit('setMessage', response.data.Description)
        commit('setMessageType', response.data.MessageType)


    },


    async getScoreById({ commit }, id) {
        console.log("id is:: ", id);
        let response = await axios
            .get(
                `http://localhost:8080/api/Score/GetById/${id}`,

                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );

        commit('setActivityName', response.data.ActivityName)
        commit('setPoints', response.data.Points)
        commit('setDescription', response.data.Description)

    },



    async updateScore({ commit }, form) {

        let response = await axios
            .post(
                `http://localhost:8080/api/Score/Update`,
                form,

                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }

            );
        // console.log("id: ",row.item.Id)
        commit('setMessage', response.data.Description)
        commit('setMessageType', response.data.MessageType)



    },

};

const mutations = {
    setScores: (state, scores) => (state.scores = scores),
    setScore: (state, score) => (state.score = score),

    setActivityName: (state, ActivityName) => (state.ActivityName = ActivityName),
    setPoints: (state, Points) => (state.Points = Points),
    setDescription: (state, Description) => (state.Description = Description),

    setMessage: (state, Message) => (state.Message = Message),

    setMessageType: (state, MessageType) => (state.MessageType = MessageType),



};


const getters = {
    getScores: state => state.scores,
    getScore: state => state.score,

    getActivityName: state => state.ActivityName,
    getPoints: state => state.Points,
    getDescription: state => state.Description,

    getMessage: state => state.Message,

    getMessageType: state => state.MessageType

};


export default {
    state,
    mutations,
    actions,
    getters
}

