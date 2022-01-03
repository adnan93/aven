<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-row>
          <div class="mt-5 mb-5" style="text-align: center">
            <b>مدیریت کاربران</b>
          </div>
        </b-row>

        <b-row>
          <b-col align="right" class="mb-5">
            <v-btn
              class="btnsize"
              color="#bea44d"
              elevation="3"
              rounded
              large
              @click="openCreateModal"
              >افزودن کاربر
            </v-btn>
          </b-col>
        </b-row>

        <div>
          <!-- Edit Modal -->
          <div>
            <b-modal
              v-model="showEditModal"
              dir="rtl"
              id="modal-center"
              title="ویرایش اطلاعات کاربر"
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
            >
              <b-container fluid>
                <b-row>
                  <b-col>
                    <v-text-field
                      v-model="editForm.Name"
                      type="text"
                      placeholder="نام "
                      required
                      outlined
                      dense
                      :rules="[phoneRules.required]"
                    />

                    <v-text-field
                      v-model="editForm.Family"
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
                      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                      v-model="editForm.Password"
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
              </b-container>

              <template #modal-footer>
                <div class="w-100">
                  <v-btn
                    :loading="editLoading"
                    class="btnsize"
                    color="#bea44d"
                    elevation="5"
                    rounded
                    larg
                    @click="updateScorebtn"
                    >ویرایش
                  </v-btn>

                  <v-btn
                    class="select2"
                    color="#bea44d"
                    elevation="3"
                    rounded
                    larg
                    outlined
                    @click="closeEditModal"
                    >انصراف
                  </v-btn>
                </div>
              </template>
            </b-modal>
          </div>

          <!-- Delete Modal -->
          <div>
            <b-modal
              v-model="showDeleteModal"
              dir="rtl"
              id="modal-center"
              title=" حذف کاربر"
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
            >
              <b-container fluid>
                <b-row>
                  <b-col>
                    <h4>کاربر مورد نظر حذف شود؟</h4>
                  </b-col>
                </b-row>
              </b-container>

              <template #modal-footer>
                <div class="w-100">
                  <v-btn
                    :loading="deleteLoading"
                    class="btnsize"
                    color="#bea44d"
                    elevation="5"
                    rounded
                    larg
                    @click="deleteScorebtn"
                    >بلی
                  </v-btn>

                  <v-btn
                    class="select2"
                    color="#bea44d"
                    elevation="3"
                    rounded
                    larg
                    outlined
                    @click="closeDeletModal"
                    >انصراف
                  </v-btn>
                </div>
              </template>
            </b-modal>
          </div>

          <div>
            <b-table
              :items="AllCustomsers"
              :fields="fields"
              striped
              responsive="sm"
              hover
            >
              <template #cell(actions)="row">
                <v-icon
                  @click="editRow(row)"
                  style="font-size: 20px; color: blue"
                  >edit</v-icon
                >

                <v-icon
                  @click="deletRow(row)"
                  style="font-size: 20px; color: red"
                  >delete_outline</v-icon
                >
              </template>
            </b-table>
          </div>
        </div>
      </b-col>

      <b-col cols="1"> </b-col>
    </b-row>

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
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Score",

  computed: mapGetters(["getIsAdmin", "getMessage", "getMessageType"]),

  data() {
    return {
      //customers table
      AllCustomsers: [], //checkAdmin
      show4: "",

      IsAdmin: "",
      checkMelliCode: "",
      checkPhone: "",

      //validation
      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
      },

      melliRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "کد ملی معتبر نیست",
        select2: (v) => v.length == 10 || "کد ملی معتبر نیست",
        select3: (v) => v == this.notVaildCode || "   کد ملی معتبر نمیباشد",
      },

      //snackbar
      text: "",
      snackbarGreen: false,
      snackColor: "",

      //create
      createLoading: false,
      form: {
        Username: "",
        Password: "",
        Name: "",
        Family: "",
        Mobile: "",
        NationalCode: "",
      },

      //Edit
      editLoading: false,
      editedRow: "",
      editForm: {
        Id: "",
        Password: "",
        Name: "",
        Family: "",
        Mobile: "",
        NationalCode: "",
      },

      //Delete
      deleteLoading: false,
      row: "",

      //modal
      showEditModal: false,
      showDeleteModal: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",

      //table
      fields: [
        { Username: "نام کاربری" },
        { Password: "رمز عبور" },
        { Name: "نام" },
        { Family: "نام خانوادگی" },

        { Mobile: " شماره موبایل " },

        { NationalCode: "کد ملی" },

        { actions: "عملیات" },
      ],

      items: [],
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

      this.editForm.Mobile = phone;
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

        this.editForm.NationalCode = meli_code;
      }
    },
  },

  methods: {
    ...mapActions(["CustomerLogIn"]),

    customerManager() {
      this.$router.push({ path: "/Announcement" });
    },

    //create
    openCreateModal() {
      this.$router.push({ path: "/CreateCustomer" });

      // console.log("getToken", this.getToken);
      // console.log("getMessage", this.getMessage);
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },

    async addNewProgram() {
      this.createLoading = true;
      await this.setNewprogram(this.form);

      await this.getUserprograms();
      this.items = this.getprograms;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      this.createLoading = false;

      this.showCreateModal = false;
    },

    async onSubmit(event) {
      event.preventDefault();
      this.signUpLoading = true;

      await axios
        .post(`http://localhost:8080/api/User/CreateNewUser`, this.form)
        .then((response) => {
          this.text = response.data.Description;

          if (response.data.MessageType == 1) {
            this.snackColor = "green";
            // this.$router.push({ path: "/customerLogin" });
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

    //Edit

    async editRow(row) {
      this.editedRow = row;
      this.openEditModal();

      console.log("row::: ", row);
      this.editForm.Id = row.item.Id;

      this.editForm.Password = row.item.Password;
      this.editForm.Name = row.item.Name;

      this.editForm.Family = row.item.Family;

      this.checkMelliCode = row.item.NationalCode;

      this.checkPhone = row.item.Mobile;
    },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;

      await axios
        .post(`http://localhost:8080/api/User/Update`, this.editForm, {
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

      await axios
        .get(`http://localhost:8080/api/User/GetAllUsers`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllCustomsers = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      this.editLoading = false;

      this.showEditModal = false;
    },

    //delete
    deletRow(row) {
      this.row = row;
      this.openDeleteModal();
    },

    openDeleteModal() {
      this.showDeleteModal = true;
    },

    closeDeletModal() {
      this.showDeleteModal = false;
    },

    async deleteScorebtn() {
      this.deleteLoading = true;

      let deletedId = this.row.item.Id;
      console.log("ID :", deletedId);

      await axios
        .post(`http://localhost:8080/api/User/Delete/${deletedId}`, deletedId, {
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

      await axios
        .get(`http://localhost:8080/api/User/GetAllUsers`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })

        .then((response) => {
          this.AllCustomsers = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });

      this.deleteLoading = false;

      this.showDeleteModal = false;
    },
  },
  async created() {
    this.IsAdmin = await this.getIsAdmin;
    console.log("IsssAdmin", this.IsAdmin);

    await axios
      .get(`http://localhost:8080/api/User/GetAllUsers`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })

      .then((response) => {
        this.AllCustomsers = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style>
</style>