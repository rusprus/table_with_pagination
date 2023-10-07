/*  
param: "client_id"
sortDirect: true
columns: { client_id: { type: "int" }, sup_id: { type: "int" } ...}
listItem: [{client_id: 10, ...},..]

active: [{
              name: 'Имя клиента',
              id: 1,
              type: "select",
              field: 'client_id',
              value: null,
              options: rootGetters['ClientsModule/options'],
          }, ...]

itemArray: [] - Сортируемые сущности
*/

import moment from "moment";


const sort = function (param, sortDirect, columns, listItem) {
  sortDirect = !sortDirect;
  if (columns[param].type === "int") {
    if (sortDirect) {
      listItem.sort((a, b) => (a[param] > b[param] ? 1 : -1));
    } else {
      listItem.sort((a, b) => (a[param] < b[param] ? 1 : -1));
    }
  }
  if (columns[param].type === "text") {
    if (sortDirect) {
      listItem.sort((a, b) => a[param].localeCompare(b[param]));
    } else {
      listItem.sort((a, b) => b[param].localeCompare(a[param]));
    }
  }
  return {
    sortDirect,
    listItem,
  }
}

const applyFilters = function (active, itemArray) {

  active.forEach(function (filter) {
    const { type, field, value } = filter
    switch (type) {
      case 'select': itemArray = selectFilter(itemArray, field, value)
        break
      case 'text': itemArray = textFilter(itemArray, field, value)
        break
      case 'dateRange': itemArray = dateRangeFilter(itemArray, field, value)
        break
      case 'globalFilter': itemArray = globalFilter(itemArray, value)
        break
    }
  })

  return itemArray
};

const selectFilter = function (itemArray, field, value) {
  if (value == null) return itemArray
  return itemArray.filter(function (item) {
    if (item[field] == value) return true
    return false;
  });
};

const textFilter = function (itemArray, field, value) {
  if (value == '') return itemArray
  return itemArray.filter(function (item) {
    if (item[field]?.toLowerCase().includes(value.toLowerCase())) return true
    return false;
  });
};

const dateRangeFilter = function (itemArray, field, value) {
  if (value == null || value?.length == 0) return itemArray

  let start = moment(value[0]).format(moment.HTML5_FMT.DATE);
  let end = moment(value[1]).format(moment.HTML5_FMT.DATE);

  return itemArray.filter(function (item) {

    let dateStart = moment(item[field[1]])
    let dateEnd = moment(item[field[0]])

    if (dateStart.isBetween(start, end)) return true
    if (dateEnd.isBetween(start, end)) return true

    // if (dateStart.isAfter(start) && dateEnd.isBefore(end)) return true
    if (dateStart.isBefore(start) && dateEnd.isAfter(end)) return true

    return false;
  });
};
const globalFilter = function (itemArray) {
  return itemArray
  // let buf = ''
  // state.filtered = state.filtered.filter(function (item) {
  //   for (var key in item) {
  //     if (typeof item[key] !== String) buf = String(item[key]).toLowerCase()

  //     if (buf.includes(value)) return true;
  //   }
  //   return false;
  // });
};

const setParamFilter = function (active, field, value, type) {
  if (value == null) return active
  if (type == 'dateRange') {
    active.forEach(item => {
      if (item.field == field) {
        item.value[0] = value[0]
        item.value[1] = value[1]
      }
    })
  } else {
    active.forEach((item) => {
      if (item.field == field) item.value = value
    })
  }
  return active

};

const addFilter = function (all, active, id) {
  all.forEach((filter) => {
    if (filter.id == id) {
      if (!active.includes(filter)) active.push(filter);
    }
  })
  return active
};

const  deleteFilter = function (active, id) {
  return active.filter(filter => filter.id !== id)
};
 
export {
  sort,
  applyFilters,
  setParamFilter,
  addFilter,
  deleteFilter
}