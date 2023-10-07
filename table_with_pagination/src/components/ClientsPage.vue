<template>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <!-- <div class="flex justify-center m-4">
              <button
                @click="addClient"
                type="button"
                class="flex-row items-center p-3 border border-transparent rounded-full shadow-sm text-4xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusSmIconSolid class="h-6 w-6" aria-hidden="true" />
              </button>
            </div> -->
            <br />
            <FilterBar
              :allFilter="allFilter"
              :activeFilters="ClientsModule.activeFilters"
              @add="addFilter"
              @delete="localDeleteFilter"
              @select-param="setParamFilter"
              @select-date-param="setParamFilter"
              @change-param="setParamFilter"
            />
            <TableComponent
              :listItem="listItem"
              :listTitle="listTitle"
              :size="5"
              @open="openModal"
              @sort="sortList"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState, mapGetters } from "vuex";
  import FilterBar from "@/components/FilterBar";
  import TableComponent from "@/components/TableComponent.vue";
  import moment from "moment";
  // import OrderFilter from "@/admin/components/OrderFilter";
  // import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/vue/solid";
  // import styles from "@tailwindcss/typography/src/styles";
//   import ClientModal from "@/admin/components/ClientModal.vue";
  import { sort } from "@/helpers.js";
  
  export default {
    components: {
      TableComponent,
      // PlusSmIconSolid,
    //   ClientModal,
      FilterBar,
    },
  
    data() {
      return {
        columnsForSort: {
          id: {
            type: "int",
          },
  
          name: {
            type: "text",
          },
          age: {
            type: "text",
          },
          last_login: {
            type: "text",
          },
        },
        sortDirect: true,
        listTitle: [
          { field: "id", title: "ID" },
          { field: "name", title: "ФИО" },
          { field: "age", title: "Возраст" },
          { field: "last_login", title: "Последнее посещение" },
        ],
      };
    },
  
    computed: {
      ...mapState(["ClientsModule"]),
      ...mapGetters("ClientsModule", ["allFilter", "filtered"]),
      listItem() {
        return this.filtered.map((item) => {
          return {
            id: item.id,
            name: item.name,
            age: item.age,
            last_login: moment(item.last_login).format("MM-DD-YYYY"),
          };
        });
      },
    },
  
    methods: {
      ...mapActions("ClientsModule", [
        "setClientDefault",
        "toggleModal",
        "getAllClients",
        "addFilter",
        "deleteFilter",
        "setFilter",
      ]),
      sortList(param) {
        const { sortDirect, listItem } = sort(
          param,
          this.sortDirect,
          this.columnsForSort,
          this.filtered
        );
        this.sortDirect = sortDirect;
        this.filtered = listItem;
      },
      addClient() {
        this.setClientDefault();
        this.toggleModal(true);
      },
      showClientModal(param) {
        this.toggleModal(param);
      },
      openModal() {
        // this.ClientsModule.client = this.ClientsModule.origin.find((item) => item.id == id);
        // this.toggleModal(true);
        alert('Вызываем окно редактирования клиента')
      },
      localDeleteFilter(id) {
        this.deleteFilter(id);
      },
      setParamFilter(param) {
        const { field, value, type } = param;
  
        this.setFilter({ field, value, type });
      },
    },
    mounted() {
      this.getAllClients();
    },
  };
  </script>
  
  <style>
  .flip-list-move {
    transition: transform 0.8s ease;
  }
  .active {
    background: blue;
  }
  </style>
  