import axios from "axios";
const state = {
    programs: [],
    program: "",
    Title: "",
    PointsNeeded: "",
    Description: "",
    Message: "",
    MessageType: "",
};



const actions = {
    async getUserprograms({ commit }) {
        let response = await axios.get(
            `http://localhost:8080/api/Program/GetUserPrograms`,
            {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
        // console.log('programs',response.data)
        commit('setprograms', response.data)
    },


    async setNewprogram({ commit }, form) {
        console.log("form is: ", form);

        let response = await axios
            .post(
                `http://localhost:8080/api/Program/Create`,
                form,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }


            );
        commit('setprograms', response.data)
        commit('setMessage', response.data.Description)

        commit('setMessageType', response.data.MessageType)


    },


    async deleteprogram({ commit }, id) {
         console.log("id is: ", id);

        let response = await axios
            .post(
                `http://localhost:8080/api/Program/Delete/${id}`,
                id,

                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }

            );
        console.log("response ", response)
        commit('setMessage', response.data.Description)
        commit('setMessageType', response.data.MessageType)

    },


    async getprogramById({ commit }, id) {
        console.log("id is:: ", id);
        let response = await axios
            .get(
                `http://localhost:8080/api/Program/GetById/${id}`,

                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );

        commit('setTitle', response.data.Title)
        commit('setPointsNeeded', response.data.PointsNeeded)
        commit('setDescription', response.data.Description)

    },



    async updateprogram({ commit }, form) {

        let response = await axios
            .post(
                `http://localhost:8080/api/Program/Update`,
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
    setprograms: (state, programs) => (state.programs = programs),
    setprogram: (state, program) => (state.program = program),

    setTitle: (state, Title) => (state.Title = Title),
    setPointsNeeded: (state, PointsNeeded) => (state.PointsNeeded = PointsNeeded),
    setDescription: (state, Description) => (state.Description = Description),

    setMessage: (state, Message) => (state.Message = Message),

    setMessageType: (state, MessageType) => (state.MessageType = MessageType),
};


const getters = {
    getprograms: state => state.programs,
    getprogram: state => state.program,

    getTitle: state => state.Title,
    getPointsNeeded: state => state.PointsNeeded,
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

