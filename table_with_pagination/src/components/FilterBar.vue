<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
  Задачи компонента:
    1. Обеспечение интерфейса выбора способов сортировки списка
    2. Передавать выбранные параметры сортировки обратно

    Входные параметры:
    1. Список возможных фильтров
    2. Список активных фильтров

    Структура входных параметров:
    activeFilters,
    allFilter = [{
                  name: 'Статус',
                  id: 4,
                  type: "select",
                  field: 'status',
                  value: 1,
                  options: [
                      {
                          name: 'Не выбрано',
                          value: 1
                      },
                    ...
                  ],
              },..]

    Структура выходных параметров:
    id = ..,
    { value, field }
-->
<template>
    <div class="bg-white">
      <SelectModal :listFilter="allFilter" v-model:show="show" @add="add" />
      <!-- Filters -->
      <section aria-labelledby="filter-heading">
        <!-- Active filters -->
        <div class="bg-gray-100 flex justify-between">
          <div class="max-w-7xl py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Фильтры
              <span class="sr-only">, active</span>
            </h3>
  
            <div aria-hidden="true" class="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />
  
            <div class="mt-2 sm:mt-0 sm:ml-4">
              <div class="-m-1 flex flex-wrap items-center">
                <span
                  v-for="filter in activeFilters"
                  :key="filter.id"
                  class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                >
                  <span>
                    <!-- <ComboBox
                      v-if="filter.type == 'select'"
                      :listItem="filter.options"
                      @select="selectItem($event.value, filter.field, filter.type)"
                    /> -->
                    <InputComponent
                      v-if="filter.type == 'text' || filter.type == 'globalFilter'"
                      :filter="filter"
                      @input="changeItem($event, filter.field, filter.type)"
                    />
                    <!-- <Datepicker
                      v-if="filter.type == 'dateRange'"
                      v-model="filter.value"
                      @update:modelValue="selectDateItem($event, filter.field, filter.type)"
                      range
                      teleport-center
                    ></Datepicker> -->
                  </span>
  
                  <button
                    type="button"
                    class="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  >
                    <svg
                      @click="del(filter.id)"
                      class="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
  
            <div class="mt-2 sm:mt-0 sm:ml-4">
              <div class="-m-1 flex flex-wrap items-center">
                <span
                  @click="show = true"
                  class="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900 cursor-pointer"
                >
                  <span>Добавить </span>
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="max-w-7xl  py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
                      <h3 class="text-xs font-semibold uppercase tracking-wide text-gray-500">Добавить</h3>
                       </div> -->
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
//   import {} from "@headlessui/vue";
  import SelectModal from "@/components/SelectModal";
//   import Datepicker from "@vuepic/vue-datepicker";
  
  // import SelectComponent from "@/admin/components/SelectComponent";
  import InputComponent from "@/components/InputComponent";
  // import DateComponent from "@/admin/components/DateComponent";
//   import ComboBox from "@/admin/components/ComboBox";
//   
  export default {
    components: {
      SelectModal,
    //   Datepicker,
      // SelectComponent,
      InputComponent,
      // DateComponent,
    //   ComboBox,

    },
  
    props: {
      allFilter: { default: [] },
      activeFilters: { default: [] },
    },
  
    emits: ["delete", "add", "select-param", "change-param", "select-date-param"],
  
    setup(props, { emit }) {
      const show = ref(false);
      const del = (id) => emit("delete", id);
      const add = (id) => emit("add", id);
      const selectItem = (value, field, type) => {
        emit("select-param", { value, field, type });
      };
      const changeItem = (value, field, type) => {
        emit("change-param", { value, field, type });
      };
      const selectDateItem = (value, field, type) => {
        emit("select-date-param", { value, field, type });
      };
  
      return {
        show,
        del,
        add,
        selectItem,
        changeItem,
        selectDateItem,
      };
    },
  };
  </script>
  