<template>
    <div id="app">
        <div class="container is-fluid" style="justify-content: center;align-items: center">
            <h1>Liste des ouvrages de la biliothèque</h1>
            <div>
                <Search
                        v-on:search="searchArtwork"
                >
                </Search>
                <div style="width: 160px; margin-bottom: 35px;">
                    <b-field label="Par page" label-position="inside">
                        <b-select id="nb_page"
                                  v-on:change.native="getPageResult(active_page,$event.target.value,activeSearch)"
                                  placeholder="Nombre d'items par page"
                                  v-model="active_items_per_page"
                        >
                            <option
                                    v-for="option in item_per_pages"
                                    :value="option"
                                    :key="option">
                                {{ option }}
                            </option>
                        </b-select>
                    </b-field>
                </div>
            </div>

            <Pagination
                    :active-page="active_page"
                    :nb_total_pages="nb_total_pages"
                    v-on:page-change="getPageResult($event,active_items_per_page,activeSearch)"
            ></Pagination>

            <Listing
                    :artworks="artworks"
                    v-on:edit="editBook"
                    v-on:delete="deleteBook"
            />

            <Pagination
                    :active-page="active_page"
                    :nb_total_pages="nb_total_pages"
                    v-on:page-change="getPageResult($event,active_items_per_page,activeSearch)"
            ></Pagination>

        </div>

    </div>
</template>

<script>

    import Listing from './components/Listing.vue'
    import Vue from 'vue'
    import ModalForm from "@/components/ModalForm";
    import Search from "@/components/Search";
    import Pagination from "@/components/Pagination";
    import Buefy from 'buefy'
    import 'buefy/dist/buefy.css'
    import axios from "axios"
    Vue.use(Buefy)

    let axiosInstance = axios.create({
        baseURL: 'http://localhost:8000/api',
    });

    let defaultPage = 1
    let defaultItemsPerPage = 10


    export default {

        name: 'App',
        components: {
            // eslint-disable-next-line vue/no-unused-components
            ModalForm,
            Listing,
            Search,
            Pagination
        },
        data() {
            return {
                artworks: null,
                nb_total_items: null,
                active_page: null,
                active_items_per_page: defaultItemsPerPage.toString(),
                nb_total_pages: null,
                activeSearch: "",
                item_per_pages: [
                    "10", "20", "30", "50", "100", "200"
                ],

            }
        },
        methods: {
            getPageResult: function (page, itemsPerPage = 30, search = "") {
                //add & caratere at the end of search to merge with api request
                search += (search !== "") ? "&" : ""
                axiosInstance.get(
                    `/libraries?${search}page=${page}&itemsPerPage=${itemsPerPage}`,
                    {headers: {'Content-Type': 'application/ld+json'}},)
                    .then(response => {
                        this.artworks = response["data"]["hydra:member"]
                        this.nb_total_items = response["data"]["hydra:totalItems"]
                        this.nb_total_pages = response["data"]["hydra:view"]["hydra:last"]
                        this.nb_total_pages = Number(
                            this.nb_total_pages.substr(
                                this.nb_total_pages.indexOf("page=") + 5,
                                this.nb_total_pages.length)
                        )
                    })
                this.active_page = page
                this.active_items_per_page = itemsPerPage
                this.activeSearch = search
            },
            editBook(artwork) {
                //Open ModalForm component
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
                    if (response["status"] !== 204) {
                        alert("erreur API")
                    }
                }).catch(function (error) {
                    alert(error);
                });
            },
            searchArtwork: function (searchString) {
                //launch search
                this.getPageResult(1, this.active_items_per_page, searchString)
            }
        },
        mounted() {
            if (this.artworks === null) {
                this.getPageResult(defaultPage, defaultItemsPerPage)

            }
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

    .table {
        width: 100%;
        margin: 50px auto 50px auto;
    }

    h1{
        font-size: 3em;
        font-weight: 900;
    }

</style>
