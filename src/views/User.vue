<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="2"> </b-col>
      <b-col cols="8">
        <b-card class="mt-5" border-variant="dark" header-bg-variant="dark">
          <template #header>
            <div style="text-align: center">
              <p style="color: white" class="mb-0">اطلاعات پایه</p>
            </div>
          </template>

          <b-form @submit="onSubmit">
            <b-row>
              <b-row>
                <b-col>
                  <v-text-field
                    type="text"
                    v-model="form.Name"
                    label="نام"
                    required
                    outlined
                    dense
                    :rules="[phoneRules.required]"
                  />

                  <br />

                  <v-text-field
                    type="text"
                    v-model="form.Family"
                    label="نام خانوادگی"
                    required
                    outlined
                    dense
                    :rules="[phoneRules.required]"
                  />

                  <br />

                  <v-text-field
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="form.Password"
                    :type="show4 ? 'text' : 'password'"
                    required
                    label="رمز عبور"
                    @click:append="show4 = !show4"
                    outlined
                    dense
                    :rules="[phoneRules.required]"
                  ></v-text-field>

                  <br />
                </b-col>
                <b-col>
                  <v-text-field
                    type="text"
                    v-model="checkMelliCode"
                    label="کد ملی"
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

                  <br />

                  <v-select
                    class="select"
                    :items="kargozarList"
                    :item-text="'Name'"
                    :item-value="'Id'"
                    type="text"
                    v-model="form.Kargozar"
                    label="کارگزار ناظر"
                    required
                    outlined
                    :rules="[phoneRules.required]"
                    dense
                  >
                  </v-select>

                  <br />
                </b-col>
                <br />
              </b-row>

              <!-- <b-row>
                <div class="container" align="left">
                  <v-img
                    :src="`http://localhost:8080/api/Customer/GetPictureFile/${imgId}`"
                    width="25%"
                    height="100%"
                    style="border-radius: 10px; position: relative"
                  ></v-img>
                </div>
              </b-row> -->
            </b-row>

            <v-btn
              class="btnsize ml-1"
              color="#90c445"
              elevation="5"
              rounded
              x-large
              @click="updateCust()"
              type="submit"
              variant="primary"
              :loading="loadingbtn"
              :disabled="
                form.Kargozar && MelliCodeStatus && form.Name && form.Password
                  ? false
                  : true
              "
              >ثبت
            </v-btn>

            <v-btn
              class="btnsize ml-1"
              color="#90c445"
              elevation="5"
              large
              @click="GoToCompleteProfile()"
              variant="primary"
       
              :disabled="
                form.Kargozar && MelliCodeStatus && form.Name && form.Password
                  ? false
                  : true
              "
            >
              اطلاعات تکمیلی
            </v-btn>

            <br />
          </b-form>

          <br />
          <h5>* برای دریافت 5 امتیاز اطلاعات خود را تکمیل کنید</h5>
        </b-card>
      </b-col>

      <b-col cols="2"> </b-col>
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
    <br />
    <br />
    <br />
    <br />
    <br />

    <v-snackbar v-model="snackbarGreen" color="green" dir="rtl">
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
import axios from "axios";
// import config from "@/config";
// import Vue from "vue";

export default {
  name: "Update",
  async created() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    this.snackbarGreen = true;

    this.loadingbtn = true;

    let rest = await axios.get(`http://localhost:8080/api/Province/GetAll`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    this.Province = rest.data;

    console.log("Province: ", rest.data);

    //  console.log('Province', this.Province);

    //    let rest1 = await axios.get(`http://localhost:8080/api/City/GetAll`, {
    //   headers: {
    //     token: localStorage.getItem("token"),
    //   },
    // });

    // this.cities = rest1.data;

    //  console.log('cities', this.cities);

    let response = await axios.get(
      `http://localhost:8080/api/Customer/GetMyUser`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (response) {
      this.snackbarGreen = true;
    }

    console.log("Customer: ", response.data);
    this.form.Name = response.data.Name;
    this.form.Family = response.data.Family;

    this.form.Password = response.data.Password;

    this.form.IsMarried = response.data.IsMarried.toString();
    this.form.Gender = response.data.Gender.toString();

    this.form.BirthDate = response.data.BirthDate.toString();

    this.form.Degree = response.data.Degree;

    this.form.JobType = response.data.JobType;

    this.form.Email = response.data.Email;

    this.form.Address = response.data.Address;

    this.form.CityId = response.data.CityId;
    this.imgId = response.data.ProfilePictrue;
    this.form.NationalCode = response.data.NationalCode;
    this.checkMelliCode = response.data.NationalCode;
    this.form.Kargozar = response.data.Kargozar;

    let res = await axios.get(
      `http://localhost:8080/api/City/GetByProvinceId/${response.data.ProvinceId}`,
      response.data.ProvinceId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    this.getImg();
    this.cities = res.data;

    this.form.ProvinceId = response.data.ProvinceId;

    this.form.ProfilePictrue = response.data.ProfilePictrue;
    this.loadingbtn = false;
  },

  mounted() {
    // window.location.reload(true);
  },
  computed() {},

  data() {
    return {
      text: "  در حال دریافت اطلاعات ...",
      meli_code: "",
      MelliCodeStatus: false,
      checkMelliCode: "",

      //validation
      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "کد ملی معتبر نیست",
        select2: (v) => v.length == 10 || "کد ملی معتبر نیست",
      },

      melliRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "کد ملی معتبر نیست",
        select2: (v) => v.length == 10 || "کد ملی معتبر نیست",
        select3: (v) => v == this.notVaildCode || "   کد ملی معتبر نمیباشد",
      },

      emailRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validEmail: (v) =>
          /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v) || " معتبر نیست",
      },

      loadingbtn: false,
      date: "",
      //img
      title: "Image Upload",
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: {},

      bg64: "",
      imgId: "",

      imgRules: [
        (v) => v.size < 500000 || "حجم عكس بايد كمتر از KB 500 می باشد",
      ],

      Province: [],
      cities: [],
      files: [],
      oncePrice: "",

      //form
      form: {
        Name: "",
        Family: "",
        Password: "",
        Gender: "",
        IsActive: "",
        IsMarried: "",
        BirthDate: "",
        Degree: "",
        JobType: "",
        Email: "",
        Address: "",
        CityId: "",
        ProfilePictrue: "",
        ProvinceId: "",
        Base64File: "",
        NationalCode: "",
        Kargozar: "",
      },

      mar: null,

      Gender: [
        { Name: "مرد", Value: "true" },
        { Name: "زن", Value: "false" },
      ],

      Married: [
        { Name: "متاهل", Value: "true" },
        { Name: "مجرد", Value: "false" },
      ],

      kargozarList: [
        { Name: "اقتصاد بیدار", Value: 1 },
        { Name: "سهم آشنا", Value: 0 },
        { Name: "سایر", Value: 2 },
      ],

      JobType: [
        { Name: "کارمند", Value: 0 },
        { Name: "شغل آزاد", Value: 1 },
      ],

      show4: false,
    };
  },

  watch: {
 checkMelliCode: function (meli_code) {
      if (
        !/^\d{10}$/.test(meli_code) ||
        meli_code == "0000000000" ||
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
    }
  },

  methods: {
    // checkMelliCode(meli_code) {
    //   if (meli_code.length == 10) {
    //     {
    //       return true;
    //     }
    //   } else {
    //     return false;
    //   }
    // },

    GoToCompleteProfile() {
      this.$router.push({ path: "/Completed" });
    },

    async getImg() {
      await axios.get(
        `http://localhost:8080/api/Customer/GetPictureFile/${this.imgId}`,
        this.imgId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    },
    async bgSend() {
      this.form.Base64File = this.bg64;
    },

    bgBase64(e) {
      new Promise((res) => {
        const fileReader = new FileReader();
        fileReader.onload = function (FileLoadEvent) {
          const image64 = FileLoadEvent.target?.result;
          res(image64);
        };
        fileReader.readAsDataURL(e);
      }).then((img) => {
        this.bg64 = img;
        this.bgSend();
      });

      // this.images.push(e.name);
    },

    async OstanChange() {
      let res = await axios.get(
        `http://localhost:8080/api/City/GetByProvinceId/${this.form.ProvinceId}`,
        this.form.ProvinceId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      this.cities = res.data;
      console.log("cities", this.cities);
    },

    // pickFile() {
    //   this.$refs.image.click();
    // },

    // onFilePicked(e) {
    //   const files = e.target.files;
    //   if (files[0] !== undefined) {
    //     this.imageName = files[0].name;
    //     if (this.imageName.lastIndexOf(".") <= 0) {
    //       return;
    //     }
    //     const fr = new FileReader();
    //     fr.readAsDataURL(files[0]);
    //     fr.addEventListener("load", () => {
    //       this.imageUrl = fr.result;
    //       this.imageFile = files[0]; // this is an image file that can be sent to server...
    //       this.sendImg();
    //     });
    //   } else {
    //     this.imageName = "";
    //     this.imageFile = "";
    //     this.imageUrl = "";
    //   }
    // },

    async onSubmit(event) {
      event.preventDefault();

      console.log("form: ", this.form);

      this.loadingbtn = true;
      await axios
        .post(`http://localhost:8080/api/Customer/UpdateRequired`, this.form, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("updated customer: ", response);

         this.$router.push({ path: "/customerProfile" });
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.loadingbtn = false;
    },

    //   async submitUpdateUserImage() {

    //   let vm = this._updateUserImageVue;
    //   var formData = new FormData();
    //   var fileUpload = vm.$refs.fileUpload;

    //   if (fileUpload && fileUpload["files"].length > 0) {
    //     formData.append(fileUpload["name"], fileUpload["files"][0]);
    //   }
    //   else
    //   {
    //     await this.notify({vm , data : {Message : "فایل باید وارد شود." , MessageType : MessageType.Error ,Obj : null }})
    //     return ;
    //   }
    //   return axios({
    //     method: "post",
    //     url: `${baseUrl}/UpdateUserImage`,
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data" }
    //   })

    // },

    async sendImg() {
      await axios.post(`http://localhost:8080/api/Customer/UpdateUserImage`, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        data: this.imageFile,
      });

      // post({
      //   method: "post",
      //   url: `http://localhost:8080/api/Customer/UpdateUserImage`,
      //   data: this.imageFile,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      // .then((response) => {
      //   console.log(response);

      // })
      // .catch((e) => {
      //   this.errors.push(e);
      // });
    },
  },
};
</script>

<style>
.datePicker {
  background-color: red;
}

.ui-datepicker {
  background: #333;
  border: 1px solid #555;
  color: #eee;
}
</style>