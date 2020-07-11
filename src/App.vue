<template>
    <div id="app">

        <div>
            <div>Nombre total d'oeuvres : {{nb_total_items}}</div>
            <Listing
                    :artworks="artworks"
            />
            <ul class="pagination">
                <li class="page-item"><span class="page-link" >Previous</span></li>
                <li class="page-item"><span class="page-link" >1</span></li>
                <li class="page-item"><span class="page-link" v-on:click="getPageResult(2)">2</span></li>
                <li class="page-item"><span class="page-link">3</span></li>
                <li class="page-item"><span class="page-link">Next</span></li>
            </ul>

        </div>
    </div>
</template>

<script>
    import Listing from './components/Listing.vue'

    import axios from "axios"


    export default {

        name: 'App',
        components: {
            Listing
        },
        data() {
            return {
                artworks: null,
                nb_total_items: null
            }
        },
        methods: {
            getPageResult: function (page) {
                axios({
                    method: 'get',
                    url: `http://localhost:8000/api/libraries?page=${page}`,
                    responseType: 'application/json'
                })
                    .then(response => {
                        this.artworks = response["data"]["hydra:member"]

                    })
            }
        },
        mounted() {
            if (this.artworks === null) {
                axios({
                    method: 'get',
                    url: 'http://localhost:8000/api/libraries',
                    responseType: 'application/json',
                })
                    .then(response => {
                        this.artworks = response["data"]["hydra:member"]
                        this.nb_total_items = response["data"]["hydra:totalItems"]
                    })
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
