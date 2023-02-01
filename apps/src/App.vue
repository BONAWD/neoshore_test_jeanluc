<template>
  <div id="app" class="app">
    <RouterView></RouterView>
  </div>
</template>

<style>
.app {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}
</style>
<script>
import { RouterView } from "vue-router";

export default {
  data: () => ({
    tasks: [
      { id: 1, title: "Tache 1", message: "il y une erreur" },
      { id: 2, title: "Tache 2", message: "il y une erreur" },
    ],
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {},
  },
  components: { RouterView },
};
</script>
