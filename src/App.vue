<template>
    <div id="app">
        <div class="container is-fluid">
            <h1>Liste des ouvrages de la biliothèque</h1>
            <div>
                <b-select id="nb_page"
                          v-on:change.native="getPageResult(active_page,$event.target.value)"
                          placeholder="Nombre d'items par page"
                          v-model="SelectedPerPage"
                >
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
                    v-on:delete="deleteBook"
            />
            <b-pagination
                    :total="nb_total_pages"
                    :current.sync="active_page"
                    :size="'is-medium'"
                    :simple="false"
                    :rounded="false"
                    :per-page="active_items_per_page"
                    :icon-prev="'chevron-left'"
                    :icon-next="'chevron-right'"
                    aria-next-label="Page suivante"
                    aria-previous-label="Page précédente"
                    aria-page-label="Page"
                    aria-current-label="Current page">
            </b-pagination>
            <!--            <ul class="pagination">
                            <li class="page-item"><span class="page-link">Previous</span></li>
                            <li class="page-item"><label> Page
                                <input id="page_number" type="number" class="page-link" v-on:keydown="keyDownControl"
                                       :value="active_page">
                                / {{nb_total_pages}}
                            </label>
                            </li>
                            <li class="page-item"><span class="page-link">Next</span></li>
                        </ul>-->

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
                selectedPerPage:null
            }
        },
        methods: {
            getPageResult: function (page, itemsPerPage = 30) {
                axiosInstance.get(
                    `/libraries?page=${page}&itemsPerPage=${itemsPerPage}`,
                    {headers: {'Content-Type': 'application/ld+json'}},)
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
            editBook(artwork) {
                this.$buefy.modal.open({
                    parent: this,
                    component: ModalForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true,
                    props: {
                        "artwork": artwork,
                        "axiosInstance": axiosInstance
                    },


                })
            },
            deleteBook(artwork) {
                axiosInstance.delete(
                    `/libraries/${artwork.id}`
                ).then(response => {
                    //console.log(response)
                    if (response["status"] !== 204) {
                        alert("erreur API")
                    }
                }).catch(function (error) {
                    alert(error);
                });
            }
        },
        mounted() {
            if (this.artworks === null) {
                this.getPageResult(defaultPage, defaultItemsPerPage)

            }
            document.querySelector("#app > div > nav > ul > li > a").addEventListener("click", () => {
                console.log(this)
            })


        },
    }

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
    .table{
        width: 100%;
        margin: 50px auto 50px auto;
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
