<template>
  <v-app class="home" style="font-family: IRYekan">
    <b-row dir="rtl">
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="dark"
        style="background-color: #f0f0f5"
      >
        <!-- <div>
          <b-navbar variant="faded" type="light">
            <b-navbar-brand class="mr-15" href="/">
              <img
                class="mt-0 mb-0 pt-0 pb-0"
                width="55px"
                height="55px"
                src="@/assets/talagram.png"
                alt="طلاگرام"
              />
            </b-navbar-brand>
          </b-navbar>
        </div> -->
        <b-navbar-brand>
          آوین سرمایه گستر
          <b> زمرد </b>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="mr-15" id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="ml-2" href="#">
              <h6>
                <b style="color: #bea44d"> </b>
              </h6>
            </b-nav-item>

            <!-- <b-nav-item class="ml-2" href="/Announcement">
              <h6><b style="color: #bea44d"> صفحه اصلى </b></h6>
            </b-nav-item> -->

            <b-nav-item class="ml-2" @click="checkLogout()" v-show="showBtn()">
              <h6><b style="color: white">خروج </b></h6>
            </b-nav-item>

            <!-- <b-nav-item class="ml-2" href="#">
              <h6><b style="color: #bea44d"> اخبار توليد و تجارت </b></h6>
            </b-nav-item>

            <b-nav-item class="ml-2" href="#">
              <h6><b style="color: #bea44d"> اخبار اقتصادی </b></h6>
            </b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>


        
      </b-navbar>

      <!-- add new -->
      <div>
        <b-modal
          v-model="showCreateModal"
          dir="rtl"
          id="modal-center"
          title=" خروج"
          :header-text-variant="headerTextVariant"
          :header-bg-variant="headerBgVariant"
        >
          <h3>آیا از خروج مطمئن هستید ؟</h3>
          <template #modal-footer>
            <div class="w-100">
              <v-btn
                class="ml-1"
                color="#10503B"
                elevation="3"
                rounded
                larg
                outlined
                @click="closeCreateModal"
                >انصراف
              </v-btn>

              <v-btn
                class="mr-2"
                color="#10503B"
                style="color: #ffffff"
                elevation="3"
                rounded
                large
                @click="logout()"
              >
                بلی
              </v-btn>
            </div>
          </template>
        </b-modal>
      </div>

      <v-snackbar v-model="snackbarGreen" color="black" dir="rtl">
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

      <router-view class="home" />

      <b-row class="footer" align="center">
        <hr />

        <b-col>
          <div>
            <!-- <h5 class="place"><b> راه های ارتباطی </b></h5> -->
            <br />
            <div>
              <h6 style="color: white">
                شیراز، بلوار شهید رجائی (فرهنگ شهر)، کوچه 30، ساختمان زمرد
              </h6>
            </div>

            <div class="place">
              <h3>
                <a href="tel:07136317299" style="color: red"> 071-36317299 </a>
              </h3>
            </div>

            <br />
          </div>
        </b-col>
        <hr />
        <br />

        <h6>
          <v-icon style="font-size: 20px"> copyright </v-icon>

          کلیه حقوق متعلق به گروه مالی زمرد ‌می ‌باشد.
        </h6>
        <br />

        <br />
      </b-row>
    </b-row>
  </v-app>
</template>
 
 
 
 <script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      show: true,
      headerBgVariant: "#0f6b4d",

      //logout
      showCreateModal: false,

      //modal

      headerTextVariant: "light",

      //snachbar
      text: "با موفقیت خارج شدید",
      snackbarGreen: false,
    };
  },
  created() {
    // console.log("login..", this.token)

    this.showBtn();
  },
  methods: {
    checkLogout() {
      this.openCreateModal();
    },

    showBtn() {
      //  console.log("token: ", this.token);
      if (this.token == null) {
        return false;
      } else {
        return true;
      }
    },

    logout() {
      localStorage.removeItem("token");
      if (this.token) {
        localStorage.removeItem("token");
      }
      this.closeCreateModal();
      this.$router.push({ path: "/" });
      this.snackbarGreen = true;
    },

    openCreateModal() {
      this.showCreateModal = true;
    },

    closeCreateModal() {
      this.showCreateModal = false;
    },
  },
};
</script>
 
 
<style scoped lang="scss">
@font-face {
  font-family: "IRYekan";
  src: local("IRYekan"), url(./font/IRYekan.ttf) format("truetype");
}

.test {
  text-align: right !important;
  margin: 0 px;
  padding-bottom: 0% !important;
}

.hobabptn :hover {
  background-color: none !important;
}
p {
  padding: 0%;
  margin: 0%;
  margin-bottom: 0% !important;
}
.background {
  margin: 0% !important;
  padding: 0% !important;
  background-color: #f0f0f5;
  width: 7.8rem;
}

a:link {
  text-decoration: none;
  background-color: none !important;
}

a {
  color: white !important;
}

.home {
  background-color: #e8ede7;
}

.bg {
  background-color: rgb(223, 221, 221);
}

.footer {
  background-color: #10503b;
}

.navbar.navbar-dark.bg-dark {
  background-color: #10503b !important;
}
.modal-header {
  background-color: #10503b !important;
}

.footer {
  background-color: #c8cfc7;
}
</style>
