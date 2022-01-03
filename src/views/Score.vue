<template>
  <div>
    <b-card-group>
      <b-card>
        <template #header>
          <div style="text-align: center">
            <b class="mb-0">امتیازات کاربران</b>
          </div>
        </template>

        <b-row dir="rtl">
          <b-col cols="12">
            <div>
              <b-row dir="rtl">
                <b-col class="mb-5">
                  <v-btn
                    class="btnsize"
                    color="#bea44d"
                    elevation="3"
                    rounded
                    large
                    @click="openCreateModal"
                    >افزودن امتیاز
                  </v-btn>

                  <div>
                    <b-modal
                      v-model="showCreateModal"
                      dir="rtl"
                      id="modal-center"
                      title=" افزودن امتیاز"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <b-form-input
                              type="text"
                              v-model="form.ActivityName"
                              placeholder="نام فعالیت "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="form.Points"
                              type="number"
                              placeholder="تعداد امتیاز"
                              required
                              outlined
                            />

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
                            @click="addNewScore"
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
                      title=" ویرایش امتیاز"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <b-form-input
                              type="text"
                              v-model="editForm.ActivityName"
                              placeholder="نام فعالیت "
                              required
                              outlined
                            />

                            <br />

                            <b-form-input
                              v-model="editForm.Points"
                              placeholder="تعداد امتیاز"
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
                      title=" حذف امتیاز"
                      :header-bg-variant="headerBgVariant"
                      :header-text-variant="headerTextVariant"
                    >
                      <b-container fluid>
                        <b-row>
                          <b-col>
                            <h4>امتیاز مورد نظر حذف شود؟</h4>
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
                </b-col>
                <b-col> </b-col>
              </b-row>

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
      </b-card>
    </b-card-group>
    

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Score",

  computed: mapGetters([
    "getScores",
    "getActivityName",
    "getPoints",
    "getDescription",
    "getMessage",
    "getMessageType",
  ]),

  data() {
    return {
      //snackbar
      text: "",
      snackbarGreen: false,
      snackColor: "",

      //create
      createLoading: false,
      form: {
        Points: "",
        ActivityName: "",
        Description: "",
      },

      //Edit
      editLoading: false,
      editedRow: "",
      editForm: {
        Id: "",
        Points: "",
        ActivityName: "",
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
        { ActivityName: "نام فعالیت" },
        { Points: "تعداد امتیاز" },
        { Description: "توضیحات" },
        { actions: "عملیات" },
      ],

      items: [],
    };
  },

  methods: {
    ...mapActions([
      "getUserScores",
      "setNewScore",
      "deleteScore",
      "getScoreById",
      "updateScore",
    ]),

    //create
    openCreateModal() {
      this.showCreateModal = true;
      // console.log("getToken", this.getToken);
      // console.log("getMessage", this.getMessage);
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },

    async addNewScore() {
      this.createLoading = true;
      await this.setNewScore(this.form);
      await this.getUserScores();
      this.items = this.getScores;

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
      await this.getScoreById(this.editedRow.item.Id);

      console.log("this.getActivityName", await this.getActivityName);

      this.editForm.ActivityName = await this.getActivityName;
      this.editForm.Points = await this.getPoints;
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
      await this.updateScore(this.editForm);

      await this.getUserScores();
      this.items = this.getScores;

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

      await this.deleteScore(deletedId);

      this.text = await this.getMessage;

      if ((await this.getMessageType) == 1) {
        this.snackColor = "green";
      } else {
        this.snackColor = "red";
      }

      this.snackbarGreen = true;

      await this.getUserScores();
      this.items = this.getScores;

      this.deleteLoading = false;

      this.showDeleteModal = false;
    },
  },
  async created() {
    await this.getUserScores();
    this.items = this.getScores;
  },
};
</script>

<style>
</style>