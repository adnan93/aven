<template>
  <div>
    <b-row dir="rtl">
      <b-col cols="1"> </b-col>
      <b-col cols="10">
        <b-row>
          <div class="mt-5 mb-5" style="text-align: center">
            <b>اطلاعیه های کاربران</b>
          </div></b-row
        >

        <b-row>
          <b-col>
            <div align="right">
              <b-form-input
                type="text"
                v-model="form.Family"
                placeholder="عنوان اطلاعیه"
                required
                outlined
                dense
              />
            </div>
            <br />

            <date-picker
              class="datePicker"
              v-model="BirthDate"
              label="تاریخ انتشار"
              color="#bea44d"
              format="jYYYY-jMM-jDD"
              inputFormat="YYYY-MM-DD"
              type="date"
            ></date-picker>
            <br />

            <v-btn
              class="select2"
              color="#bea44d"
              elevation="3"
              rounded
              small
              outlined
              @click="GoToCustomer()"
            >
              <v-icon style="font-size: 20px">search</v-icon> جستجو
            </v-btn>
          </b-col>

          <b-col> </b-col>
          <b-col> </b-col>
          <b-col> </b-col>

          <b-col align="left" v-show="IsAdmin == 1">
            <v-btn
              class="btnsize"
              color="#bea44d"
              elevation="3"
              rounded
              small
              @click="openCreateModal"
              >افزودن اطلاعیه
            </v-btn>
            <v-btn
              class="btnsize"
              color="#bea44d"
              elevation="3"
              rounded
              small
              @click="customerManager"
              >مدیریت کاربران
            </v-btn>
          </b-col>
        </b-row>

        <hr />
        <div>
          <div>
            <b-modal
              v-model="showCreateModal"
              dir="rtl"
              id="modal-center"
              title=" افزودن اطلاعیه "
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
            >
              <b-container fluid>
                <b-row>
                  <b-col>
                    <v-select
                      class="select"
                      :items="Gender"
                      :item-text="'Name'"
                      :item-value="'Value'"
                      type="text"
                      label="عنوان اطلاعیه"
                      v-model="form.Gender"
                      required
                      outlined
                      dense
                    >
                    </v-select>

                    <div>
                      <v-text-field
                        id="date3"
                        label="تاریخ تولد"
                        :item-text="'Name'"
                        :item-value="'Value'"
                        v-model="BirthDate"
                        outlined
                        dense
                        required
                        :rules="[phoneRules.required]"
                        append-icon="today"
                      >
                      </v-text-field>

                      <date-picker
                        element="date3"
                        class="datePicker"
                        v-model="BirthDate"
                        label="تاریخ تولد"
                        color="#bea44d"
                        format="jYYYY-jMM-jDD"
                        inputFormat="YYYY-MM-DD"
                        type="date"
                      ></date-picker>
                    </div>

                    <br />

                    <b-form-input
                      v-model="form.Description"
                      placeholder="توضیحات"
                      required
                      outlined
                    />

                    <br />
                  </b-col>
                </b-row>
              </b-container>

              <template #modal-footer>
                <div class="w-100">
                  <v-btn
                    :loading="createLoading"
                    class="btnsize"
                    color="#bea44d"
                    elevation="5"
                    rounded
                    larg
                    @click="addNewProgram"
                    >ثبت
                  </v-btn>

                  <v-btn
                    class="select2"
                    color="#bea44d"
                    elevation="3"
                    rounded
                    larg
                    outlined
                    @click="closeCreateModal"
                    >انصراف
                  </v-btn>
                </div>
              </template>
            </b-modal>
          </div>

          <!-- Edit Modal -->
          <div>
            <b-modal
              v-model="showEditModal"
              dir="rtl"
              id="modal-center"
              title=" ویرایش اطلاعیه"
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
            >
              <b-container fluid>
                <b-row>
                  <b-col>
                    <b-form-input
                      type="text"
                      v-model="editForm.Title"
                      placeholder="نام فعالیت "
                      required
                      outlined
                    />

                    <br />

                    <b-form-input
                      v-model="editForm.PointsNeeded"
                      placeholder="تعداد اطلاعیه"
                      type="number"
                      required
                      outlined
                    />

                    <br />

                    <b-form-input
                      v-model="editForm.Description"
                      placeholder="توضیحات"
                      required
                      outlined
                    />

                    <br />
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
              title=" حذف اطلاعیه"
              :header-bg-variant="headerBgVariant"
              :header-text-variant="headerTextVariant"
            >
              <b-container fluid>
                <b-row>
                  <b-col>
                    <h4>اطلاعیه مورد نظر حذف شود؟</h4>
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
              :items="items"
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

export default {
  name: "Score",

  computed: mapGetters(["getIsAdmin", "getMessage", "getMessageType"]),

  data() {
    return {
      //validation

      phoneRules: {
        required: (value) => !!value || "این فیلد الزامی است",
        validNum: (v) => /^[\s۰-۹\s0-9]+$/.test(v) || "شماره معتبر نیست",
        select2: (v) => v.length == 11 || "شماره موبایل معتبر نیست",
      },

      //checkAdmin
      IsAdmin: "",

      //snackbar
      text: "",
      snackbarGreen: false,
      snackColor: "",

      //create
      createLoading: false,
      form: {
        PointsNeeded: "",
        Title: "",
        Description: "",
      },

      //Edit
      editLoading: false,
      editedRow: "",
      editForm: {
        Id: "",
        PointsNeeded: "",
        Title: "",
        Description: "",
      },

      //Delete
      deleteLoading: false,
      row: "",

      //modal
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      headerBgVariant: "dark",
      headerTextVariant: "light",

      //table
      fields: [
        { Title: "عنوان اطلاعیه" },
        { PointsNeeded: " زمان انتشار" },
        { Description: "توضیحات" },
        { actions: "عملیات" },
      ],

      items: [],
    };
  },

  methods: {
    ...mapActions(["CustomerLogIn"]),

    customerManager() {
      this.$router.push({ path: "/Customers" });
    },

    //create
    openCreateModal() {
      this.showCreateModal = true;
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

    //Edit

    async editRow(row) {
      this.editedRow = row;
      this.editForm.Id = row.item.Id;
      this.openEditModal();
      await this.getprogramById(this.editedRow.item.Id);

      console.log("this.getTitle", await this.getTitle);

      this.editForm.Title = await this.getTitle;
      this.editForm.PointsNeeded = await this.getPointsNeeded;
      this.editForm.Description = await this.getDescription;
    },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;
      await this.updateprogram(this.editForm);

      await this.getUserprograms();
      this.items = this.getprograms;

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

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

      await this.deleteprogram(deletedId);

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      await this.getUserprograms();
      this.items = this.getprograms;

      this.deleteLoading = false;

      this.showDeleteModal = false;
    },
  },
  async created() {
    
    this.IsAdmin = await this.getIsAdmin;
    console.log("IsssAdmin", this.IsAdmin);
  },
};
</script>

<style>
</style>