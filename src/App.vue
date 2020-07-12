<template>
    <div id="app">

        <div class="container">
            <div class="custom-select" style="width:200px;">
                <select v-on:change="getPageResult(active_page,$event.target.value)">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option selected="selected" value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
            </div>
            <div>Nombre total d'oeuvres : {{nb_total_items}}</div>
            <Listing
                    :artworks="artworks"
            />
            <ul class="pagination">
                <li class="page-item"><span class="page-link" >Previous</span></li>
                <li class="page-item"><label> Page
                    <input id="page_number" type="number" class="page-link" v-on:keydown="keyDownControl" :value="active_page">
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
            Listing
        },
        data() {
            return {
                artworks: null,
                nb_total_items: null,
                active_page: null,
                nb_total_pages: null
            }
        },
        methods: {
            getPageResult: function (page,itemsPerPage=30) {
                axiosInstance.get(`/libraries?page=${page}&itemsPerPage=${itemsPerPage}`)
                    .then(response => {
                        this.artworks = response["data"]["hydra:member"]
                        this.nb_total_items = response["data"]["hydra:totalItems"]
                        this.nb_total_pages = response["data"]["hydra:view"]["hydra:last"]
                        this.nb_total_pages = Number(this.nb_total_pages.substr(this.nb_total_pages.indexOf("page=")+5,this.nb_total_pages.length))
                    })
                this.active_page = page
            },
            keyDownControl : function (event) {
                if (event.key === "Enter")
                {
                    //control the value of input
                    var page = event.target.value
                    if (page > this.nb_total_pages)
                    {
                        page = this.nb_total_pages

                    }
                    if(page < 1)
                    {
                        page = 1
                    }

                    this.getPageResult(page)
                }
            }
        },
        mounted() {
            if (this.artworks === null) {
                this.getPageResult(defaultPage,defaultItemsPerPage)

            }

        }
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
    ul.pagination {
        display: inline-block;
        padding: 0;
        margin: 0;
    }

    ul.pagination li {
        display: inline;
    }
    ul.pagination li input{
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
