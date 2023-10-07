// import { ClientsAPI } from '@/api/ClientsAPI'
import { applyFilters, setParamFilter, addFilter as localAddFilter, deleteFilter as localDeleteFilter } from "@/helpers";

export const ClientsModule = {
    namespaced: true,
    state: () => ({

        client: {},
        origin: [
        ],
        clientModal: false,
        status: {
            1: 'Не выбрано',
            2: 'Планируется',
            3: 'Активен',
            4: 'Завершен',
            5: 'Не подошел',
        },
        activeFilters: [],


    }),

    getters: {
        filtered(state) {
            return applyFilters(state.activeFilters, state.origin)
        },

        options(state) {

            const options = []

            state.origin.forEach((item) => {
                options.push({
                    name: item.name,
                    value: item.id
                })
            })

            return options;
        },

        allFilter() {
            // state, getters, rootState, rootGetters
            return [
                {
                    name: 'ФИО',
                    id: 2,
                    type: "text",
                    field: 'name',
                    value: '',
                }, {
                    name: 'Возраст',
                    id: 3,
                    type: "text",
                    field: 'age',
                    value: '',
                },
                {
                    name: 'Последний вход',
                    id: 4,
                    type: "text",
                    field: 'last_login',
                    value: '',
                },
            ]

        }
    },
    actions: {

        // addClient({ commit }, client) {
            // if (client.id == null) {
            //     ClientsAPI.addClient(client).then((res) => {
            //         commit('addClient', res)
            //     })
            // }
        // },

        getAllClients({ commit }) {
            // ClientsAPI.getAllClients().then((res) => {

           const data = [
                {
                    id: 1,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 2,
                    name: "vagner",
                    age: '26',
                    last_login: '2023-01-13T10:00',
                },
                {
                    id: 3,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 4,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-06T10:00',
                },
                {
                    id: 5,
                    name: "vagner",
                    age: '35',
                    last_login: '2024-01-03T10:00',
                },
                {
                    id: 6,
                    name: "Malvina",
                    age: '34',
                    last_login: '2023-01-22T10:00',
                },
                {
                    id: 7,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 8,
                    name: "vagner",
                    age: '35',
                    last_login: '2025-07-03T10:00',
                },
                {
                    id: 9,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-08-03T10:00',
                },
                {
                    id: 10,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-04-03T10:00',
                },
                {
                    id: 11,
                    name: "vagner",
                    age: '35',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 12,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 13,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 14,
                    name: "vagner",
                    age: '35',
                    last_login: '2023-30-03T10:00',
                },
                {
                    id: 15,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 16,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 17,
                    name: "vagner",
                    age: '35',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 18,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 19,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 20,
                    name: "vagner",
                    age: '35',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 21,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 22,
                    name: "Ferrary",
                    age: '24',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 23,
                    name: "vagner",
                    age: '35',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 24,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                },
                {
                    id: 25,
                    name: "Malvina",
                    age: '50',
                    last_login: '2023-01-03T10:00',
                }
            ]

            commit('setAllClients', data)
            // })
        },

        // updateClient({ commit, state }, client) {
            // let result = state.origin.includes((item) => item.id == client.id)
            // if (result !== undefined) {

            //     ClientsAPI.updateClient(client).then(() => {
            //         console.log('clientUpdated!!!')
            //         commit('updateClient', client)
            //     })
            // }
        // },

        // deleteClient({ commit, state }, id) {
            // if (id !== null) {
            //     let client = state.client = state.origin.find((item) => item.id == id)
            //     ClientsAPI.deleteClient(client.id).then(() => {
            //         commit('deleteClient', client.id)
            //     })
            // }

        // },

        // setClientDefault({ commit }) {
            // commit('setClientDefault')
        // },


        toggleModal({ state }, param) {
            if (param == true) state.clientModal = true;
            if (param == false) state.clientModal = false;
        },

        addFilter({ state, getters }, id) {
            state.activeFilters = localAddFilter(getters.allFilter, state.activeFilters, id)
        },
        deleteFilter({ state }, id) {
            state.activeFilters = localDeleteFilter(state.activeFilters, id)
        },
        setFilter({ state }, { field, value, type }) {
            state.activeFilters = setParamFilter(state.activeFilters, field, value, type)
        },

    },
    mutations: {

        addClient(state, client) {
            state.origin.push(client)
        },

        deleteClient(state, id) {
            let indexClient = null
            state.origin.forEach((elem, index) => {
                if (elem.id == id) indexClient = index
            });
            state.origin.splice(indexClient, 1)
        },

        updateClient(state, client) {
            let indexClient = null
            state.origin.forEach((elem, index) => {
                if (elem.id == client.id) indexClient = index
            });
            state.origin.splice(indexClient, 1, client)
        },

        setAllClients(state, clients) {

            state.origin = clients
            // state.filtered = clients
        },
        setClientDefault(state) {
            state.client = {
                id: null,
                manager_id: null,
                name: '',
                tlg: '',
                note: ''
            }
        },


    }

}