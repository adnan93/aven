import { axios } from "axios"

export const api = {
    logInGetToken(form) {
        await axios
            .post(`http://localhost:8080/api/Customer/Login`, form)
            .then((response) => {
                console.log("res", response);
                this.token = response.data.Token;
                this.text = response.data.Message;
                this.snackbarGreen = true;
                if (response.data.MessageType == 1) {
                    this.$router.push({ path: "/Update" });
                }
            })
            .catch((e) => {
                this.errors.push(e);
            });

    }
}




