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
                  <p style="color: white" class="mb-0">ورود</p>
                </div>
              </template>

              <b-form @submit="onSubmit">
                <v-text-field
                  v-model="form.Username"
                  placeholder="نام کاربری"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required]"
                  color="#10503B"
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
                  color="#10503B"
                ></v-text-field>

                <br />
                <div class="container">
                  <v-btn
                    class="btnsize ml-1"
                    elevation="5"
                    rounded
                    large
                    type="submit"
                    variant="primary"
                    :loading="loadingbtn"
                    style="color: white"
                    color="#10503B"
                    >ورود
                  </v-btn>
                  <!-- 
                  <a href="/ForgotPassword" style="text-decoration: none">
                    رمز عبور خود را فراموش کردید؟
                  </a> -->
                </div>
              </b-form>
            </b-card>
          </div>
        </b-col>

        <b-col cols="3"> </b-col>
      </b-row>
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
  computed: mapGetters([
    "getToken",
    "getMessage",
    "getMessageType",
    "getIsAdmin",
  ]),

  components: {},

  data() {
    return {
      IsAdmin: "",
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
        Username: "",
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
      this.IsAdmin = await this.getIsAdmin;

      if ((await this.getMessageType) == 1 && this.IsAdmin == 1) {
        this.snackColor = "green";

        //  console.log("IsssAdmin", this.getIsAdmin);

        this.$router.push({ path: "/Announcement" });
      } else if ((await this.getMessageType) == 1 && this.IsAdmin == 0) {
        this.$router.push({ path: "/AnnouCustomer" });
      }
      this.snackbarGreen = true;
      this.loadingbtn = false;
    },
  },

  async created() {
    //date
    this.today = new Date().toLocaleDateString("fa-IR");

    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
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

.card-header {
  background-color: #10503B;
}
</style>
