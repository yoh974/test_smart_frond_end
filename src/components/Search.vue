<template>

    <div style="width: 50%;margin: 50px auto 50px auto">
        <b-field label="Titre">
            <b-input name="title" expanded></b-input>
        </b-field>
        <b-field grouped expanded>
            <b-field label="Nom" expanded>
                <b-input name="name" placeholder="Nom"></b-input>
            </b-field>
            <b-field label="Prénom" expanded>
                <b-input name="firstname" type="text" placeholder="Prénom"></b-input>
            </b-field>
            <b-field label="Éditeur" expanded>
                <b-input name="editor" type="text" placeholder="Éditeur"></b-input>
            </b-field>
        </b-field>
        <b-field grouped expanded position="is-centered">
            <b-field label="Type">
                <b-select
                        placeholder="Chosir un type"
                        v-model="selectedTypeOption"
                        name="type"
                >
                    <option
                            v-for="option in typeArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Section">
                <b-select
                        placeholder="Choisir une section"
                        v-model="selectedSectionOption"
                        name="section"
                >
                    <option
                            v-for="option in sectionArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Étagère">
                <b-select
                        placeholder="Choisir une étagère"
                        v-model="selectedShelfOption"
                        name="shelf"
                >
                    <option
                            v-for="option in shelfArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Rangée">
                <b-select
                        placeholder="Choisir une rangée"
                        v-model="selectedRowOption"
                        name="row"
                >
                    <option
                            v-for="option in rowArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
        </b-field>


        <b-field grouped position="is-right"><!-- Label left empty for spacing -->
            <p class="control">
                <button class="button is-primary" @click="searchArtwork">
                    Rechercher <i class="fa fa-search" aria-hidden="true" style="margin-left: 10px;"></i>
                </button>
            </p>
        </b-field>
    </div>

</template>

<script>
    function encodeForUrl(s) {
        return s.replace("(","%28").replace(")","%29");
    }

    export default {
        name: "Search",
        data() {
            return {
                typeArtwork: [
                    "Livre(s)",
                    "Revue (s)",
                    "Compact-Disc",
                    "Disque(s) video",
                    "Livre lu",
                    "Livre(s)-CD",
                    "Livre",
                    "DVD",
                    "Mook (s)",
                    "Brochure(s)",
                    "Jouet(s)",
                    "Cassette(s) audio",
                    "Console et périphériques jeux vidéos",
                ],
                sectionArtwork: [
                    "Jeunesse",
                    "Adulte",
                    "Discothèque",
                    "DVD adulte",
                    "DVD jeunesse",
                    "Supports d'animation"
                ],
                shelfArtwork: [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H"
                ],
                rowArtwork: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                selectedTypeOption: null,
                selectedSectionOption: null,
                selectedShelfOption: null,
                selectedRowOption: null
            }
        },
        methods: {
            searchArtwork: function () {
                var arrSearch = {
                    "name": document.querySelector("input[name='name']").value,
                    "title": document.querySelector("input[name='title']").value,
                    "firstname": document.querySelector("input[name='firstname']").value,
                    "editor": document.querySelector("input[name='editor']").value,
                    "type": document.querySelector("select[name='type']").value,
                    "section": document.querySelector("select[name='section']").value,
                    "shelf": document.querySelector("select[name='shelf']").value,
                    "row": document.querySelector("select[name='row']").value
                }
                var searchString = ""


                for (var key in arrSearch) {
                    if (arrSearch[key] !== "") {
                        searchString += (searchString === "") ? "" : "&"
                        searchString += key + "=" + encodeForUrl(arrSearch[key])
                    }
                }
                this.$emit("search",searchString)

            }
        }
    }
</script>

<style scoped>

</style>
