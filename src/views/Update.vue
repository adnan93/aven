<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-card border-variant="dark" header-bg-variant="secondary">
          <template #header>
            <div style="text-align: center">
              <p style="color: white" class="mb-0">ويرايش اطلاعات مشتری</p>
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

                  <v-select
                    class="select"
                    :items="Province"
                    :item-text="'Name'"
                    :item-value="'Id'"
                    type="text"
                    v-model="form.ProvinceId"
                    label="استان"
                    required
                    outlined
                    dense
                    @change="OstanChange()"
                  >
                  </v-select>
                  <br />

                  <v-select
                    class="select"
                    :items="cities"
                    :item-text="'Name'"
                    :item-value="'Id'"
                    type="text"
                    v-model="form.CityId"
                    label="شهر"
                    required
                    outlined
                    dense
                  >
                  </v-select>

                  <br />

                  <v-text-field
                    v-model="form.Mobile"
                    label="شماره موبایل"
                    required
                    outlined
                    dense
                    :rules="[phoneRules.required, phoneRules.validNum]"
                  />

                  <v-select
                    :items="Degree"
                    label="تحصیلات"
                    :item-text="'Name'"
                    :item-value="'Value'"
                    v-model="form.Degree"
                    outlined
                    dense
                  >
                  </v-select>

                  <br />

                  <v-text-field
                    :items="JobType"
                    label="شغل"
                    :item-text="'Name'"
                    :item-value="'Value'"
                    v-model="form.JobType"
                    outlined
                    dense
                  >
                  </v-text-field>
                  <br />
                </b-col>

                <b-col>
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

                  <v-text-field
                    v-model="form.Address"
                    type="text"
                    label="آدرس"
                    outlined
                    required
                    dense
                    :rules="[phoneRules.required]"
                  />
                  <br />

                  <v-text-field
                    v-model="form.Email"
                    style="hight: 150px"
                    type="Email"
                    label="ایمیل"
                    :rules="[emailRules.required]"
                    outlined
                    required
                    dense
                  />
                  <br />

                  <v-select
                    :items="Married"
                    label="وضعیت تاهل"
                    :item-text="'Name'"
                    :item-value="'Value'"
                    v-model="form.IsMarried"
                    outlined
                    dense
                  >
                  </v-select>
                  <br />

                  <v-select
                    class="select"
                    :items="Gender"
                    :item-text="'Name'"
                    :item-value="'Value'"
                    type="text"
                    label="جنسیت"
                    v-model="form.Gender"
                    required
                    outlined
                    dense
                  >
                  </v-select>

                  <div>
                    <date-picker
                      v-model="form.BirthDate"
                      label="تاریخ تولد"
                    ></date-picker>
                  </div>
                  <br />

                  <br />

                  <v-file-input
                    label="عکس پروفایل "
                    outlined
                    :clearable="true"
                    append-icon="add_a_photo"
                    prepend-icon=""
                    @change="bgBase64"
                    accept="image/png, image/jpeg, image/bmp"
                    show-size
                    :rules="imgRules"
                  >
                  </v-file-input>

                  <br />
                </b-col>
              </b-row>

              <b-row>
                <div class="container" align="left">
                  <v-img
                    :src="`http://localhost:8080/api/Customer/GetPictureFile/${imgId}`"
                    width="25%"
                    height="100%"
                    style="border-radius: 10px; position: relative"
                  ></v-img>
                </div>
              </b-row>
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
              >ثبت
            </v-btn>
            <br />
          </b-form>
        </b-card>
      </b-col>

      <b-col cols="1"> </b-col>
    </b-row>

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

export default {
  name: "Update",
  async created() {
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

    this.form.Mobile = response.data.Mobile;

    this.form.IsMarried = response.data.IsMarried.toString();
    this.form.Gender = response.data.Gender.toString();

    this.form.BirthDate = response.data.BirthDate.toString();

    this.form.Degree = response.data.Degree;

    this.form.JobType = response.data.JobType;

    this.form.Email = response.data.Email;

    this.form.Address = response.data.Address;

    this.form.CityId = response.data.CityId;
    this.imgId = response.data.ProfilePictrue;

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

  data() {
    return {
      text: "  در حال دریافت اطلاعات ...",

      //validation
      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
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

      //form
      form: {
        Name: "",
        Family: "",
        Password: "",
        Gender: "",
        Mobile: "",
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

      Degree: [
        { Name: "دیپلم", Value: 0 },
        { Name: "کاردانی", Value: 1 },
        { Name: "لیسانس", Value: 2 },
        { Name: "فوق لیسانس", Value: 3 },
        { Name: "دکترا", Value: 4 },
      ],

      JobType: [
        { Name: "کارمند", Value: 0 },
        { Name: "شغل آزاد", Value: 1 },
      ],

      show4: false,
    };
  },

  watch: {},

  methods: {
    async getImg() {
      let res = await axios.get(
        `http://localhost:8080/api/Customer/GetPictureFile/${this.imgId}`,
        this.imgId,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("img is: ", res.data);
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
        .post(`http://localhost:8080/api/Customer/Update`, this.form, {
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
      console.log(this.imageFile);

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
</style>