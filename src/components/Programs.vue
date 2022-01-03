<template>
  <div>
    <b-row > 
     <b-col  :key="program.id" v-for="program in programs"> 
       <Program :program="program" /> </b-col>

    </b-row>
  </div>
</template>

<script>
import Program from "./Program.vue";

export default {
  name: "Programs",
  props: {
    programs: Array,
  },
  components: {
    Program,
  },
};
</script>

<style>
</style>