<template>
    <div>
        <table id="artworks-table">
            <tr>
                <th>Titre</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Editeur</th>
                <th>Format livre</th>
                <th>Type</th>
                <th>Section</th>
                <th>Etagère</th>
                <th>Rangée</th>
            </tr>
            <tr
                    :artwork="artwork"
                    :key="artwork.id"
                    v-for="artwork in artworks"
            >
                <td>{{artwork.title}}</td>
                <td>{{artwork.name}}</td>
                <td>{{artwork.firstname}}</td>
                <td>{{artwork.editor}}</td>
                <td>{{artwork.bookFormat}}</td>
                <td>{{artwork.type}}</td>
                <td>{{artwork.section}}</td>
                <td>{{artwork.shelf}}</td>
                <td>{{artwork.row}}</td>
            </tr>

        </table>

    </div>
</template>

<script>
    export default {
        name: "Listing",
        props:['artworks'],
    }
</script>

<style scoped>
    #artworks-table {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        margin-top: 3em;
        margin-bottom: 3em;
    }

    #artworks-table td, #artworks-table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #artworks-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #artworks-table tr:hover {
        background-color: #ddd;
    }

    #artworks-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
</style>
