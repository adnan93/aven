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
          <b-container style="padding-left: 5%" fluid>
            <b-row>
              <b-col cols="12" md="4" class="d-flex mb-3">
                <div dir="rtl" class="container">
                  <v-select
                    class="select"
                    :items="AnnouncesSearch"
                    :item-text="'Name'"
                    :item-value="'Value'"
                    type="text"
                    placeholder=" نوع اطلاعیه"
                    v-model="searchForm.Type"
                    required
                    outlined
                    dense
                  >
                  </v-select>

                  <date-picker
                    class="datePicker"
                    v-model="searchForm.Starting"
                    label="تاریخ شروع"
                    color="#bea44d"
                    format="jYYYY-jMM-jDD"
                    inputFormat="YYYY-MM-DD"
                    type="date"
                  ></date-picker>

                  <br />

                  <date-picker
                    class="datePicker"
                    v-model="searchForm.Ending"
                    label="تاریخ پایان"
                    color="#bea44d"
                    format="jYYYY-jMM-jDD"
                    inputFormat="YYYY-MM-DD"
                    type="date"
                  ></date-picker>
                  <br />

                  <v-btn
                    elevation="3"
                    dark
                    rounded
                    color="#bea44d"
                    @click="doSearch"
                    style="margin-right: 0.3125em"
                    :loading="searchbtn"
                  >
                    <v-icon> search </v-icon>
                  </v-btn>

                  <v-btn
                    elevation="3"
                    dark
                    rounded
                    color="#bea44d"
                    @click="showAll"
                    :disabled="!showSearch"
                  >
                    مشاهده همه
                  </v-btn>
                </div>
              </b-col>

           

            </b-row>
          </b-container>

          <br />

          <b-col> </b-col>
          <b-col> </b-col>
          <b-col> </b-col>
        </b-row>

        <hr />
        <div>
          <!-- افزودن اطلاعیه -->
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
                    <v-text-field
                      placeholder="نام اطلاعیه"
                      :item-text="'Name'"
                      :item-value="'Value'"
                      v-model="createForm.Title"
                      outlined
                      dense
                      required
                      :rules="[phoneRules.required]"
                    >
                    </v-text-field>
                    <v-select
                      class="select"
                      :items="Announces"
                      :item-text="'Name'"
                      :item-value="'Value'"
                      type="text"
                      placeholder=" نوع اطلاعیه"
                      v-model="createForm.Type"
                      required
                      outlined
                      dense
                    >
                    </v-select>

                    <v-file-input
                      placeholder="  فایل اطلاعیه رو آپلود کنید "
                      @change="bgBase64"
                      outlined
                      :clearable="true"
                      append-icon="mdi-paperclip"
                      prepend-icon=""
                      accept="application/pdf"
                      show-size
                    >
                    </v-file-input>

                  
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
                    <v-text-field
                      placeholder="نام اطلاعیه"
                      :item-text="'Name'"
                      :item-value="'Value'"
                      v-model="editForm.Title"
                      outlined
                      dense
                      required
                      :rules="[phoneRules.required]"
                    >
                    </v-text-field>
                    <v-select
                      class="select"
                      :items="Announces"
                      :item-text="'Name'"
                      :item-value="'Value'"
                      type="text"
                      placeholder=" نوع اطلاعیه"
                      v-model="editForm.Type"
                      required
                      outlined
                      dense
                    >
                    </v-select>

                    <v-file-input
                      placeholder="  فایل اطلاعیه رو آپلود کنید "
                      @change="bgBase64"
                      outlined
                      :clearable="true"
                      append-icon="mdi-paperclip"
                      prepend-icon=""
                      accept="application/pdf"
                      show-size
                    >
                    </v-file-input>

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
              :items="AllAnnounces"
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

                <v-icon
                  @click="downloadRow(row)"
                  style="font-size: 20px; color: green"
                  >download</v-icon
                >
              </template>

              <template #cell(Persian)="row">
                {{
                  new Date(row.item.CreationDate).toLocaleDateString("fa-IR")
                }}
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
      //search
      searchForm: {
        Type: "",
        Starting: "",
        Ending: "",
      },
      showSearch: false,
      searchbtn: false,

      //AllAnnounces
      AllAnnounces: [],
      AnnouncesList: [],

      //createForm
      createForm: {
        Title: "",
        Type: "",
        PdfFile: "",
        Base64File: "",
      },
      bg64: "",

      Announces: [
        { Name: "صورت مالی", Value: 0 },
        { Name: "گزارش ماهانه پرنفوی", Value: 1 },
        { Name: "تصمیمات و دعوت به مجامع", Value: 2 },
        { Name: "افشای اطلاعات با اهمیت", Value: 3 },
        { Name: "آگهی های ثبتی", Value: 4 },
      ],

      AnnouncesSearch: [
        { Name: "صورت مالی", Value: "0" },
        { Name: "گزارش ماهانه پرنفوی", Value: "1" },
        { Name: "تصمیمات و دعوت به مجامع", Value: "2" },
        { Name: "افشای اطلاعات با اهمیت", Value: "3" },
        { Name: "آگهی های ثبتی", Value: 4 },
      ],

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
        Title: "",
        Type: "",
        PdfFile: "",
        Base64File: "",
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
        { Type: "نوع اطلاعیه" },
        { Persian: "تاریخ انتشار" },
      ],

      items: [],
    };
  },

  methods: {
    ...mapActions(["CustomerLogIn"]),

    async downloadRow(row) {
      console.log(row.item.PdfFile);

      let response = await axios.get(
        `http://localhost:8080/api/Announce/GetPdfFile/${row.item.PdfFile}`,
        row.item.PdfFile,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);
    },

    async showAll() {
      this.showSearch = false;

      let rest = await axios.get(`http://localhost:8080/api/Announce/GetAll`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      this.AllAnnounces = rest.data;
      for (let item of this.AllAnnounces) {
        if (item.Type == 0) {
          item.Type = "صورت مالی";
        } else if (item.Type == 1) {
          item.Type = "گزارش ماهانه پرنفوی";
        } else if (item.Type == 2) {
          item.Type = "تصمیمات و دعوت به مجامع";
        } else if (item.Type == 3) {
          item.Type = "افشای اطلاعات با اهمیت";
        } else if (item.Type == 4) {
          item.Type = "آگهی های ثبتی";
        }
      }
    },

    async doSearch() {
      this.showSearch = true;
      this.searchbtn = true;

      console.log("search:", this.searchForm);
      this.showSearchScore = true;
      let res = await axios.post(
        `http://localhost:8080/api/Announce/GetByDateAndType/`,
        this.searchForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      for (let item of res.data) {
        if (item.Type == 0) {
          item.Type = "صورت مالی";
        } else if (item.Type == 1) {
          item.Type = "گزارش ماهانه پرنفوی";
        } else if (item.Type == 2) {
          item.Type = "تصمیمات و دعوت به مجامع";
        } else if (item.Type == 3) {
          item.Type = "افشای اطلاعات با اهمیت";
        } else if (item.Type == 4) {
          item.Type = "آگهی های ثبتی";
        }
      }
      this.AllAnnounces = res.data;
      this.searchbtn = false;
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

    async bgSend() {
      this.createForm.Base64File = this.bg64;
      this.editForm.Base64File = this.bg64;
    },

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

      let response = await axios.post(
        `http://localhost:8080/api/Announce/Create`,
        this.createForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      let rest = await axios.get(`http://localhost:8080/api/Announce/GetAll`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      for (let item of rest.data) {
        if (item.Type == 0) {
          item.Type = "صورت مالی";
        } else if (item.Type == 1) {
          item.Type = "گزارش ماهانه پرنفوی";
        } else if (item.Type == 2) {
          item.Type = "تصمیمات و دعوت به مجامع";
        } else if (item.Type == 3) {
          item.Type = "افشای اطلاعات با اهمیت";
        } else if (item.Type == 4) {
          item.Type = "آگهی های ثبتی";
        }
      }

      this.AllAnnounces = rest.data;

      this.text = response.data.Description;

      this.createForm.Title = "";
      this.createForm.Type = "";

      this.createForm.PdfFile = "";

      this.createForm.Base64File = "";

      this.snackColor = "green";

      this.snackbarGreen = true;

      this.createLoading = false;

      this.showCreateModal = false;
    },

    //Edit

    async editRow(row) {
      this.editedRow = row;
      this.editForm.Id = row.item.Id;
      this.openEditModal();

      this.editForm.Title = row.item.Title;
      this.editForm.Type = row.item.Type;
      this.editForm.PdfFile = row.item.PdfFile;

      console.log("row", row);

      if (row.item.Type == "صورت مالی") {
        this.editForm.Type = 0;
      } else if (row.item.Type == "گزارش ماهانه پرنفوی") {
        this.editForm.Type = 1;
      } else if (row.item.Type == "تصمیمات و دعوت به مجامع") {
        this.editForm.Type = 2;
      } else if (row.item.Type == "افشای اطلاعات با اهمیت") {
        this.editForm.Type = 3;
      } else if (row.item.Type == "آگهی های ثبتی") {
        this.editForm.Type = 4;
      }
    },

    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    async updateScorebtn() {
      this.editLoading = true;

      await axios.post(
        `http://localhost:8080/api/Announce/Update`,
        this.editForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
           


      let rest = await axios.get(`http://localhost:8080/api/Announce/GetAll`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      this.AllAnnounces = rest.data;
      for (let item of this.AllAnnounces) {
        if (item.Type == 0) {
          item.Type = "صورت مالی";
        } else if (item.Type == 1) {
          item.Type = "گزارش ماهانه پرنفوی";
        } else if (item.Type == 2) {
          item.Type = "تصمیمات و دعوت به مجامع";
        } else if (item.Type == 3) {
          item.Type = "افشای اطلاعات با اهمیت";
        } else if (item.Type == 4) {
          item.Type = "آگهی های ثبتی";
        }
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

      let response = await axios.post(
        `http://localhost:8080/api/Announce/Delete/${deletedId}`,
        this.createForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      this.text = response.data.Description;

      if (response.data.MessageType == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      let rest = await axios.get(`http://localhost:8080/api/Announce/GetAll`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      this.AllAnnounces = rest.data;
      for (let item of this.AllAnnounces) {
        if (item.Type == 0) {
          item.Type = "صورت مالی";
        } else if (item.Type == 1) {
          item.Type = "گزارش ماهانه پرنفوی";
        } else if (item.Type == 2) {
          item.Type = "تصمیمات و دعوت به مجامع";
        } else if (item.Type == 3) {
          item.Type = "افشای اطلاعات با اهمیت";
        } else if (item.Type == 4) {
          item.Type = "آگهی های ثبتی";
        }
      }

      this.deleteLoading = false;

      this.showDeleteModal = false;
    },
  },
  async created() {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    this.IsAdmin = await this.getIsAdmin;
    console.log("IsssAdmin", this.IsAdmin);

    let rest = await axios.get(`http://localhost:8080/api/Announce/GetAll`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    this.AllAnnounces = rest.data;
    for (let item of this.AllAnnounces) {
      if (item.Type == 0) {
        item.Type = "صورت مالی";
      } else if (item.Type == 1) {
        item.Type = "گزارش ماهانه پرنفوی";
      } else if (item.Type == 2) {
        item.Type = "تصمیمات و دعوت به مجامع";
      } else if (item.Type == 3) {
        item.Type = "افشای اطلاعات با اهمیت";
      } else if (item.Type == 4) {
        item.Type = "آگهی های ثبتی";
      }
    }

    console.log("AllAnnounces: ", this.AllAnnounces);
  },
};
</script>

<style>
</style>