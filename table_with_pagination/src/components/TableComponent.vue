<!--
Структура входных параметров:
listTitle: [
        { field: "client_id", title: "ID" },
        ...
        ]
listItem: [{}, ...];        

-->
<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <template v-for="item in listTitle" :key="item.field">
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div class="flex">
              <div class="flex">{{ item.title }}</div>
              <div>
                <SwitchVerticalIcon @click="sort(item.field)" class="h-7 w-7 pl-2 cursor-pointer" aria-hidden="true" />
              </div>
            </div>
          </th>
        </template>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <TransitionGroup name="flip-list">
        <TableItem v-for="item in paginatedData" :item="item" :key="item.id" @open="open" />
      </TransitionGroup>
    </tbody>
  </table>

  <nav aria-label="Page navigation example">
  <ul class="list-style-none flex">
    <li > 
      <button @click="prevPage" :disabled="pageNumber == 0">

      <a
        class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
        href="#"
        >Назад</a
      >
    </button>
    </li>
    <li v-for="item in pageCount" @click="pageNumber=item-1" :key="item">
      <a
        class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
        href="#"
        >{{ item }}</a
      >
    </li>
    <li >
      <button @click="nextPage" :disabled="pageNumber >= pageCount - 1">
      <a
        class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
        href="#"
        >Вперед</a
      >
    </button>
    </li>
  </ul>
</nav>
  <!--  -->
</template>
<script>
import { SwitchVerticalIcon } from "@heroicons/vue/solid";
import TableItem from "@/components/TableItem.vue";

export default {
  components: {
    SwitchVerticalIcon,
    TableItem,
  },
  props: ["listItem", "listTitle", "size"],
  events: ["open", "sort"],
  data() {
    return {
      pageNumber: 0  // по умолчанию 0
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this.listItem.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.listItem.slice(start, end);
    }
  },
  setup(props, { emit }) {
    const open = (id) => emit("open", id);
    const sort = (field) => emit("sort", field);
    return {
      open,
      sort,
    };
  },
};
</script>

<style>
#app {
  width: 80%;
  margin: auto;
}

</style>
  