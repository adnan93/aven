<template>
  <div class="home">
    <b-row>
      <b-col cols="3"> </b-col>


      <b-col cols="6">
        <div dir="rtl">
          <b-card
            class="mt-3"
            border-variant="dark"
          >
            <template #header>
              <div style="text-align: center">
                <p style="color: black">ورود مدیر</p>
              </div>
            </template>

            <b-form @submit="onSubmit">
              <b-form-input
                type="tel"
                v-model="form.Username"
                placeholder="نام کاربری"
                required
              />

              <br />

              <b-form-input
                v-model="form.Password"
                type="text"
                placeholder="رمز عبور"
                success-message="Nice to meet you!"
              />

              <br />

              <v-btn
                class="btnsize ml-1"
                color="#bea44d"
                elevation="5"
                rounded
                large
                type="submit"
                variant="primary"
                :loading="loadingbtn"
                >ورود
              </v-btn>
            </b-form>
          </b-card>
        </div>
      </b-col>

      <b-col cols="3"> </b-col>
    </b-row>
    <br />
    <br />
    <br />
    <br /><br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br /> <br />
    <br />


    <v-snackbar v-model="snackbarGreen" :color="snackColor" dir="rtl">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="dark"
          rounded
          v-bind="attrs"
          text
          @click="snackbarGreen = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  computed: mapGetters(["getToken", "getMessage", "getMessageType"]),

  data() {
    return {
      loadingbtn: false,
      //snackbar
      snackColor: "",
      snackbarGreen: false,
      text: "",
      token: "",

      //date
      today: 0,

      //form
      form: {
        Username: "",
        Password: "",
      },
    };
  },

  methods: {
    ...mapActions(["logIn"]),

    async onSubmit(event) {
      this.loadingbtn = true;
      event.preventDefault();
      await this.logIn(this.form);
      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
        this.$router.push({ path: "/User" });
      } else {
        this.snackColor = "red";
      }
      this.loadingbtn = false;

      this.snackbarGreen = true;
    },
  },

  async created() {
    //date
    this.today = new Date().toLocaleDateString("fa-IR");

    

  },
};
</script>

<style scope>
p {
  padding: 0%;
  margin: 0%;
  margin-bottom: 0% !important;
}
.background {
  margin: 0% !important;
  padding: 0% !important;
  background-color: #f0f0f5;
  width: 10rem;
}

.bg {
  background-color: rgb(255, 255, 255);
}

.home {
  background-color: #f0f0f5;
}
</style>
