<template>
  <div class="content">
    <div>
      <nav class="navbar bg-dark" data-bs-theme="dark" style="height: 50px">
        <div class="container-fluid">
          <b-button id="show-btn" @click="addTask" class="btn btn-info bg-dark">
            <i><font-awesome-icon icon="fa-solid fa-plus" /></i> Add New
          </b-button>
          <a class="navbar-brand text-white" href="#"
            >Not Completed: <span>{{ countTask }}</span></a
          >
        </div>
      </nav>
    </div>
    <div v-show="notification.length !== 0">
      <b-alert show dismissible>
        {{ notification }}
      </b-alert>
    </div>
    <div
      class="d-flex align-items-start flex-column spacing"
      v-for="item of tasks"
      v-bind:key="item.id"
    >
      <div class="card card-hover" style="width: 100%">
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">
            {{ item.message }}
          </p>
          <div class="btn-groupes">
            <button
              class="btn btn-success"
              @click="onEdit(item)"
              :disabled="item.status === 'Completed'"
            >
              <i><font-awesome-icon icon="fa-solid fa-edit" /></i>
              Edit
            </button>
            <button
              class="btn btn-danger"
              @click="openDialogDelete(item.id)"
              :disabled="item.status === 'Completed'"
            >
              <i><font-awesome-icon icon="fa-solid fa-trash" /></i> Delete
            </button>
            <button
              class="btn btn-info"
              :disabled="item.status === 'Completed'"
              @click="openDialogStatus(item.id)"
            >
              <i><font-awesome-icon icon="fa-solid fa-check" /></i>
              {{ item.status }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <b-modal size="lg" ref="my-modal" hide-footer title="Add new task">
        <div class="input-group input-group-lg">
          <input
            type="text"
            placeholder="Title"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            v-model="title"
          />
        </div>
        <br />
        <div class="input-group input-group-lg">
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            v-model="message"
          ></b-form-textarea>
        </div>
        <div class="d-flex flex-row spacing">
          <b-button
            class="mt-2"
            variant="outline-danger"
            block
            @click="onSave"
            >{{ this.addDialog ? "Add" : "Edit" }}</b-button
          >
          <b-button
            class="mt-2"
            variant="outline-warning"
            block
            @click="closeDialog"
            >Close</b-button
          >
        </div>
      </b-modal>
    </div>
    <div class="alert">
      <b-modal
        size="sm"
        ref="my-modal-delete"
        hide-footer
        title="Delete task ?"
      >
        <div class="d-flex flex-row spacing">
          <b-button
            class="mt-2"
            variant="outline-danger"
            block
            @click="onDelete"
            >Delete</b-button
          >
          <b-button
            class="mt-2"
            variant="outline-warning"
            block
            @click="closeModalDelete"
            >Close</b-button
          >
        </div>
      </b-modal>
    </div>
    <div class="status-dialog">
      <b-modal
        size="sm"
        ref="my-modal-status"
        hide-footer
        title="Completed task ?"
      >
        <div class="d-flex flex-row spacing">
          <b-button
            class="mt-2"
            variant="outline-danger"
            block
            @click="onStatus"
            >Confirm</b-button
          >
          <b-button
            class="mt-2"
            variant="outline-warning"
            block
            @click="closeModalStatus"
            >Close</b-button
          >
        </div>
      </b-modal>
    </div>
  </div>
</template>
<style>
.content {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}
.card-hover:hover {
  background-color: #daeef0;
  cursor: pointer;
}
.spacing {
  gap: 10px;
}
.btn-groupes {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
<script>
import { getAll, addOne, editOne, deleteOne } from "../api/api";
export default {
  name: "HomeView",
  components: {},
  data: () => ({
    title: "",
    message: "",
    notification: "",
    idUpdate: null,
    idDelete: null,
    idStatus: null,
    addDialog: false,
    editDialog: false,
    countTask: 0,
    tasks: [],
  }),

  created() {
    this.initialize();
    this.countTaskInit();
  },

  methods: {
    async initialize() {
      let reponses = await getAll("/task");
      if (reponses.status === "success") {
        this.tasks = reponses.data;
      }
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    closeModal() {
      this.$refs["my-modal"].hide();
    },
    showModalDelete() {
      this.$refs["my-modal-delete"].show();
    },
    closeModalDelete() {
      this.$refs["my-modal-delete"].hide();
    },
    showModalStatus() {
      this.$refs["my-modal-status"].show();
    },
    closeModalStatus() {
      this.$refs["my-modal-status"].hide();
    },
    async addData() {
      if (this.title.length !== 0 && this.message.length !== 0) {
        let data = {
          title: this.title,
          message: this.message,
        };
        let reponses = await addOne("/task", data);
        if (reponses.status === "success") {
          setTimeout(() => {
            this.notification = reponses.data.message;
          }, 500);
          this.notification = "";
          this.closeModal();
          this.initialize();
        }
      }
    },
    async editData() {
      if (
        this.title.length !== 0 &&
        this.message.length !== 0 &&
        this.idUpdate !== null
      ) {
        let data = {
          title: this.title,
          message: this.message,
        };
        let reponses = await editOne(`/task/${this.idUpdate}`, data);
        if (reponses.status === "success") {
          setTimeout(() => {
            this.notification = reponses.data.message;
          }, 500);
          this.notification = "";
          this.closeModal();
          this.initialize();
        }
      }
    },
    async onSave() {
      if (this.addDialog) {
        this.addData();
      }
      if (this.editDialog) {
        this.editData();
      }
    },
    closeDialog() {
      this.addDialog = false;
      this.editDialog = false;
      this.closeModal();
    },
    addTask() {
      this.addDialog = true;
      if (this.addDialog) {
        this.title = "";
        this.message = "";
        this.showModal();
      }
    },
    onEdit(item) {
      this.title = item.title;
      this.message = item.message;
      this.idUpdate = item.id;
      this.editDialog = true;
      if (this.editDialog) {
        this.showModal();
      }
    },
    openDialogDelete(id) {
      this.showModalDelete();
      this.idDelete = id;
    },
    openDialogStatus(id) {
      console.log("yes yes");
      this.showModalStatus();
      this.idStatus = id;
    },
    async onDelete() {
      if (this.idDelete !== null) {
        let reponses = await deleteOne(`/task/${this.idDelete}`);
        if (reponses.status === "success") {
          setTimeout(() => {
            this.notification = reponses.data.message;
          }, 500);
          this.closeModalDelete();
          this.initialize();
          this.notification = "";
        }
      }
    },
    async onStatus() {
      if (this.idStatus !== null) {
        let reponses = await editOne(`/task/status/${this.idStatus}`);
        if (reponses.status === "success") {
          setTimeout(() => {
            this.notification = reponses.data.message;
          }, 500);
          this.closeModalStatus();
          this.initialize();
          this.countTaskInit();
          this.notification = "";
        }
      }
    },

    async countTaskInit() {
      let reponses = await getAll("/task/count");
      if (reponses.status === "success") {
        let value = reponses.data[0].nombre;
        value = value < 10 ? "0" + value : value;
        this.countTask = value;
      }
    },
  },
};
</script>
