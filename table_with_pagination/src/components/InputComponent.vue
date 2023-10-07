<template>
    <input type="text" v-model="seachStr" :placeholder="filter.name" />
  </template>
  
  <script>
  import { ref, watch } from "vue";
  
  export default {
    props: ["filter"],
    emits: ["input"],
  
    setup(props, { emit }) {
      const seachStr = ref("");
  
      watch(seachStr, (seachStr) => {
        emit("input", seachStr);
      });
  
      return {
        seachStr,
      };
    },
  };
  </script>
  
  <style></style>
  