<template>
    <div id="app">
        <div class="container is-fluid">
            <h1>Liste des ouvrages de la biliothèque</h1>
            <div>
                <b-select id="nb_page" v-on:change.native="getPageResult(active_page,$event.target.value)"
                          placeholder="Nombre d'items par page">
                    <option
                            v-for="option in item_per_pages"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>


                <div>Nombre total d'oeuvres : {{nb_total_items}}</div>
            </div>


            <Listing
                    :artworks="artworks"
                    v-on:edit="editBook"
            />
            <ul class="pagination">
                <li class="page-item"><span class="page-link">Previous</span></li>
                <li class="page-item"><label> Page
                    <input id="page_number" type="number" class="page-link" v-on:keydown="keyDownControl"
                           :value="active_page">
                    / {{nb_total_pages}}
                </label>
                </li>
                <li class="page-item"><span class="page-link">Next</span></li>
            </ul>

        </div>

    </div>
</template>

<script>

    import Listing from './components/Listing.vue'
    import Vue from 'vue'
    import ModalForm from "@/components/ModalForm";
    import Buefy from 'buefy'
    import 'buefy/dist/buefy.css'

    Vue.use(Buefy)
    import axios from "axios"


    let axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api',
        /* other custom settings */
    });

    let defaultPage = 1
    let defaultItemsPerPage = 30
    export default {

        name: 'App',
        components: {
            // eslint-disable-next-line vue/no-unused-components
            ModalForm,
            Listing
        },
        data() {
            return {
                artworks: null,
                nb_total_items: null,
                active_page: null,
                active_items_per_page: null,
                nb_total_pages: null,
                item_per_pages: [
                    "10", "20", "30", "50", "100", "200"
                ],
                isComponentModalActive: false,
                formProps: {
                    title: null,
                    name: null,
                    firstname: null,
                    editor: null,
                    bookFormat: null,
                    type: null,
                    section: null,
                    shelf: null,
                    row: null
                }
            }
        },
        methods: {
            getPageResult: function (page, itemsPerPage = 30) {
                axiosInstance.get(`/libraries?page=${page}&itemsPerPage=${itemsPerPage}`)
                    .then(response => {
                        this.artworks = response["data"]["hydra:member"]
                        this.nb_total_items = response["data"]["hydra:totalItems"]
                        this.nb_total_pages = response["data"]["hydra:view"]["hydra:last"]
                        this.nb_total_pages = Number(this.nb_total_pages.substr(this.nb_total_pages.indexOf("page=") + 5, this.nb_total_pages.length))
                    })
                this.active_page = page
                this.active_items_per_page = itemsPerPage
            },
            keyDownControl: function (event) {
                if (event.key === "Enter") {
                    //control the value of input
                    var page = event.target.value
                    if (page > this.nb_total_pages) {
                        page = this.nb_total_pages

                    }
                    if (page < 1) {
                        page = 1
                    }

                    this.getPageResult(page)
                }
            },
            cardModal(name = 'test', title = 'vide') {
                this.$buefy.modal.open({
                    parent: this,
                    component: ModalForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true,
                    props: {
                        "name": name,
                        "title": title,
                        "axiosInstace": this.axiosInstace
                    },


            })
            },
            editBook: function (e) {
                console.log("ok")
                this.cardModal(e.name,e.title)
            }
        },
        mounted() {
            if (this.artworks === null) {
                this.getPageResult(defaultPage, defaultItemsPerPage)

            }

        },
    }
    /*const ModalForm = {
        props: ["title","name","firstname","editor","bookFormat","type","section","shelf","row"],
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Titre">
                            <b-input
                                    type="text"
                                    :value="title"
                                    placeholder="Le titre"
                                    required>
                            </b-input>
                        </b-field>

                        <b-field label="Nom">
                            <b-input
                                    type="text"
                                    :value="name"
                                    placeholder="Nom"
                            >
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Fermer</button>
                        <button class="button is-primary">Enregistrer</button>
                    </footer>
                </div>
            </form>
        `
    }*/

</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    ul.pagination {
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    ul.pagination li {
        display: inline;
    }

    ul.pagination li input {
        display: inline;
    }

    ul.pagination li span {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
    }

    ul.pagination li span.active {
        background-color: #4CAF50;
        color: white;
    }

    ul.pagination li span:hover:not(.active) {
        background-color: #ddd;
        cursor: pointer;
    }

</style>
