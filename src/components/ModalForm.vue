<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Editer {{art.id}}</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Titre">
                <b-input
                        type="text"
                        :value="art.title"
                        placeholder="Le titre"
                        name="title"
                        required>
                </b-input>
            </b-field>

            <b-field label="Nom">
                <b-input
                        type="text"
                        :value="art.name"
                        placeholder="Nom"
                        name="name"
                >
                </b-input>
            </b-field>
            <b-field label="Prénom">
            <b-input
                    type="text"
                    :value="art.firstname"
                    placeholder="Prénom"
                    name="firstname"
            >
            </b-input>
        </b-field>

            <b-field label="Editor">
                <b-input
                        type="text"
                        :value="art.editor"
                        placeholder="Editor"
                        name="editor"
                >
                </b-input>
            </b-field>
            <b-field label="Format Livre">
                <b-input
                        type="text"
                        :value="art.bookFormat"
                        placeholder="Format livre"
                        name="bookFormat"
                >
                </b-input>
            </b-field>
            <b-field label="Type">
                <b-select v-model="selectedTypeOption"
                          name="type"
                          placeholder="Le Type d'ouvrage">
                    <option
                            v-for="option in typeArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Section">
                <b-select v-model="selectedSectionOption"
                          name="section"
                          placeholder="La section">
                    <option
                            v-for="option in sectionArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Etagère">
                <b-select v-model="selectedShelfOption"
                          name="shelf"
                          placeholder="L'étagère">
                    <option
                            v-for="option in shelfArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Rangée">
                <b-select v-model="selectedRowOption"
                          name="row"
                          placeholder="La rangée">
                    <option
                            v-for="option in rowArtwork"
                            :value="option"
                            :key="option">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Fermer</button>
            <button class="button is-primary" @click="patchArtwork">Enregistrer</button>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "ModalForm",
        props: ["artwork", 'axiosInstance'],
        data() {
            return {
                art: this.artwork,
                typeArtwork:[
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
                sectionArtwork:[
                    "Jeunesse",
                    "Adulte",
                    "Discothèque",
                    "DVD adulte",
                    "DVD jeunesse",
                    "Supports d'animation"
                ],
                shelfArtwork:[
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H"
                ],
                rowArtwork:[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                selectedTypeOption:this.artwork.type,
                selectedSectionOption:this.artwork.section,
                selectedShelfOption:this.artwork.shelf,
                selectedRowOption:this.artwork.row

            }
        },
        methods: {
            patchArtwork() {
                this.art.name = document.querySelector("input[name='name']").value
                this.art.title = document.querySelector("input[name='title']").value
                this.art.firstname = document.querySelector("input[name='firstname']").value
                this.art.editor = document.querySelector("input[name='editor']").value
                this.art.bookFormat = document.querySelector("input[name='bookFormat']").value
                this.art.type = document.querySelector("select[name='type']").value
                this.art.section = document.querySelector("select[name='section']").value
                this.art.shelf = document.querySelector("select[name='shelf']").value
                this.art.row = document.querySelector("select[name='row']").value
                this.axiosInstance.patch(
                    `/libraries/${this.art.id}`,
                    this.art,
                    {headers: {'Content-Type': 'application/ld+json'}},
                ).then(response => {
                    if (response["status"] !== 200) {
                        alert("erreur API")
                    }
                }).catch(function (error) {
                    alert(error);
                });
                this.$parent.close()
            }
        }
    }
</script>

<style scoped>

</style>
