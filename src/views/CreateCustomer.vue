<template>
  <!-- create Customer -->
  <div>
    <b-row>
      <b-col cols="2"> </b-col>
      <b-col cols="8">
        <div class="mt-5" dir="rtl" align="center">
          <h3>افزودن کاربر</h3>
        </div>

        <b-container fluid>
          <b-form @submit="onSubmit">
            <br />
            <b-row>
              <b-col>
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
                  v-model="checkPhone"
                  placeholder="شماره موبایل"
                  required
                  outlined
                  dense
                  :rules="[
                    phoneRules.required,
                    phoneRules.validNum,
                    phoneRules.select2,
                  ]"
                />
              </b-col>

              <b-col>
                <v-text-field
                  type="text"
                  v-model="checkMelliCode"
                  placeholder="کد ملی ده رقمی"
                  required
                  outlined
                  dense
                  :rules="[
                    melliRules.required,
                    melliRules.validNum,
                    melliRules.select2,
                    melliRules.select3,
                  ]"
                />
                <v-text-field
                  v-model="form.Username"
                  type="text"
                  placeholder="نام کاربری"
                  required
                  outlined
                  dense
                  :rules="[phoneRules.required]"
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
              </b-col>
            </b-row>

            <v-btn
              class="btnsize ml-1"
              color="#bea44d"
              elevation="5"
              rounded
              x-large
              @click="updateCust()"
              type="submit"
              variant="primary"
              :loading="loadingbtn"
              :disabled="
                form.Username && MelliCodeStatus && form.Name && form.Password 
                && MobileStatus
                  ? false
                  : true
              "
              >ثبت
            </v-btn>
          </b-form>
        </b-container>
      </b-col>

      <b-col cols="2"> </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show4: "",
      //validation
      checkMelliCode: "",
      checkPhone: "",
            MobileStatus: false,


      melliRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "کد ملی معتبر نیست",
        select2: (v) => v.length == 10 || "کد ملی معتبر نیست",
        select3: (v) => v == this.notVaildCode || "   کد ملی معتبر نمیباشد",
      },

      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
        select2: (v) => v.length == 11 || "شماره موبایل معتبر نیست",
      },
      form: {
        Username: "",
        Password: "",
        Name: "",
        Family: "",
        Mobile: "",
        NationalCode: "",
      },
    };
  },

  watch: {
    checkPhone: function (phone) {
      this.phone = phone;
      if (phone.length == 11 && phone[0] == 0) {
        this.MobileStatus = true;
      } else {
        this.MobileStatus = false;
      }
      this.form.Mobile = phone;
    },

    checkMelliCode: function (meli_code) {
      if (
        !/^\d{10}$/.test(meli_code) ||
        // meli_code == "0000000000" ||
        meli_code == "1111111111" ||
        meli_code == "2222222222" ||
        meli_code == "3333333333" ||
        meli_code == "4444444444" ||
        meli_code == "5555555555" ||
        meli_code == "6666666666" ||
        meli_code == "7777777777" ||
        meli_code == "8888888888" ||
        meli_code == "9999999999"
      ) {
        console.log("meli_code", meli_code);

        this.MelliCodeStatus = false;
        return this.MobileStatus;
      } else {
        var check = parseInt(meli_code[9]);
        var sum = 0;
        var i;
        for (i = 0; i < 9; ++i) {
          sum += parseInt(meli_code[i]) * (10 - i);
        }
        sum %= 11;

        if ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)) {
          this.MelliCodeStatus = true;
          this.notVaildCode = meli_code;
        }

        this.form.NationalCode = meli_code;
      }
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.signUpLoading = true;

      await axios
        .post(`http://localhost:8080/api/User/CreateNewUser`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.text = response.data.Description;

          if (response.data.MessageType == 1) {
            this.snackColor = "green";
            this.$router.push({ path: "/Customers" });
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
  },
};
</script>

<style>
</style>