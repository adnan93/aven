<template >
  <div>
    <b-card class="home" >
      <template class="cardHeader" #header>
        <div style="text-align: center">
          <b>
            <b class="mb-0"> امروز </b>
            {{ today }}
          </b>
        </div>
      </template>
       <b-row>
        <b-col cols="3"> </b-col>

        <b-col cols="6">
          <div dir="rtl">
            <b-card class="mt-3" border-variant="dark" header-bg-variant="secondary">
              <template style="background-color: red" #header>
                <div style="text-align: center">
                  <p style="color: white">ثبت نام در باشگاه</p>
                </div>
              </template>

              <b-form @submit="onSubmit">
                                <br />

                <v-text-field
                  v-model="form.Name"
                  type="text"
                  placeholder="نام "
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required]"
                />

                <v-text-field
                  v-model="form.Family"
                  type="text"
                  placeholder="نام خانوادگی"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required]"
                />

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
                  placeholder="رمز عبور "
                  @click:append="show4 = !show4"
                  outlined
                  dense
                  :rules="[phoneRules.required]"
                />

                <v-text-field
                  v-model="form.VerificationCode"
                  placeholder="کد تایید"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required]"
                />

                <br />

                <v-btn
                  :loading="signUpLoading"
                  class="btnsize ml-1"
                  color="#bea44d"
                  elevation="5"
                  rounded
                  large
                  type="submit"
                  variant="primary"
                  >ثبت
                </v-btn>

                <v-btn
                  :loading="getCodeLoading"
                  class="select2"
                  color="#bea44d"
                  elevation="3"
                  rounded
                  large
                  outlined
                  @click="show = true"
                >
                  دریافت کد
                </v-btn>

                <br />
              </b-form>

              <b-modal
                dir="rtl"
                v-model="show"
                title="دریافت کد تایید"
                :header-bg-variant="headerBgVariant"
                :header-text-variant="headerTextVariant"
                :body-bg-variant="bodyBgVariant"
                :body-text-variant="bodyTextVariant"
                :footer-bg-variant="bodyBgVariant"
                :footer-text-variant="footerTextVariant"
              >
                <b-form-input
                  v-model="PhoneNumber"
                  placeholder=" شماره موبایل خود را وارد کنید"
                  required
                ></b-form-input>

                <template #modal-footer>
                  <div class="w-100">
                    <v-btn
                      :loading="getCodeLoading"
                      class="btnsize ml-1"
                      color="#bea44d"
                      elevation="5"
                      rounded
                      large
                      type="submit"
                      variant="primary"
                      @click="getCode()"
                    >
                      درخواست کد تایید
                    </v-btn>

                  </div>
                </template>
              </b-modal>

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
            </b-card>
          </div>
        </b-col>

        <b-col cols="3"> </b-col>
      </b-row>     
    </b-card>

    
   
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

// import { createChart } from "lightweight-charts";
//  import { LightweightCharts } from "lightweight-charts";

export default {
  name: "App",
  data() {
    return {
      show4: false,

      //loading
      getCodeLoading: false,
      signUpLoading: false,

      //snackbar
      snackbarGreen: false,
      snackColor: "",

      MessageType: "",

      text: "",

      // modal
      show: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",
      PhoneNumber: "",

      url1: `${config.paseUrl}` + "api/v1/CurrentPrice/GetTalagram",
      // url2: `${config.paseUrl}` +"api/v1/ArchivedPrice/GetSekeByTimeFrame/?timeframe=5",

      //date
      today: 0,

      //form
      form: {
        Mobile: "",
        VerificationCode: "",
        Password: "",
        Name: "",
        Family: "",
      },

      //validation
      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
      },
    };
  },
  components: {},
  mounted() {},
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    async onSubmit(event) {
      event.preventDefault();
      this.signUpLoading = true;

      await axios
        .post(`http://localhost:8080/api/Customer/Register`, this.form)
        .then((response) => {
          this.text = response.data.Description;

          if (response.data.MessageType == 1) {
            this.snackColor = "green";
            this.$router.push({ path: "/customerLogin" });
          } else {
            this.snackColor = "red";
          }

          this.signUpLoading = false;
          this.snackbarGreen = true;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    async getCode() {
      this.show = false;
      this.getCodeLoading = true;

      await axios

        .post(
          `http://localhost:8080/api/Customer/SendVerificationCode?PhoneNumber=${this.PhoneNumber}`
        )

        .then((response) => {
          console.log(response);

          this.text = response.data.Description;

          if (response.data.MessageType == 1) {
            this.snackColor = "black";
          } else {
            this.snackColor = "black";
          }

          this.snackbarGreen = true;
          this.getCodeLoading = false;
        })
        .catch((e) => {
          this.errors.push(e);
        });
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
