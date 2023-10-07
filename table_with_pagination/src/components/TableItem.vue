<template>
    <tr @click="openModal(item.id)" class="cursor-pointer">
      <!-- <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> -->
      <template v-for="property in item" :key="property">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ property }}
        </td>
      </template>
  
      <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> -->
      <!-- <span  class="text-indigo-600 hover:text-indigo-900 cursor-pointer">Изменить</span> -->
      <!-- </td> -->
    </tr>
  </template>
  
  <script>
  export default {
    props: ["item"],
    emits: ["open"],
    setup(props, { emit }) {
      const openModal = (id) => emit("open", id);
      return {
        openModal,
      };
    },
  };
  </script>
  