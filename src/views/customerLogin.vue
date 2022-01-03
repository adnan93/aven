<template>
  <div class="home">
    <div id="nav">
      <br />

      <b-row>
        <div align="center">
          <h3>کاربر گرامی خوش آمدید</h3>
        </div>
        <b-col cols="3"> </b-col>

        <b-col cols="6">
          <div dir="rtl">
            <b-card class="mt-3" border-variant="dark">
              <template #header>
                <div style="text-align: center">
                  <p style="color: black" class="mb-0">ورود به باشگاه</p>
                </div>
              </template>

              <b-form @submit="onSubmit">
                <v-text-field
                  v-model="form.Mobile"
                  placeholder="شماره موبایل"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required, phoneRules.validNum]"
                />

                <v-text-field
                  :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="form.Password"
                  :type="show4 ? 'text' : 'password'"
                  required
                  placeholder="رمز عبور"
                  @click:append="show4 = !show4"
                  outlined
                  dense
                  :rules="[phoneRules.required]"
                ></v-text-field>

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

                <a href="/ForgotPassword" style="text-decoration: none">
                  <h8> رمز عبور خود را فراموش کردید؟ </h8>
                </a>
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
      <br />
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
  </div>
</template>

<script>
// import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  computed: mapGetters(["getToken", "getMessage", "getMessageType"]),

  components: {},

  data() {
    return {
      loadingbtn: false,
      //snack
      snackColor: "",
      snackbarGreen: false,
      text: "",
      token: "",

      //date
      today: 0,

      //form
      form: {
        Mobile: "",
        Password: "",
      },
      show4: false,

      //validation

      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
      },
    };
  },

  methods: {
    ...mapActions(["CustomerLogIn"]),

    async onSubmit(event) {
      this.loadingbtn = true;
      event.preventDefault();
      await this.CustomerLogIn(this.form);

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";

        this.$router.push({ path: "/Update" });
      } else {
        this.snackColor = "red";
      }
      this.snackbarGreen = true;
      this.loadingbtn = false;
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
.home {
  background-color: #f0f0f5;
}
</style>
