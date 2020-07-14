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
                        name="edit-title"
                        required>
                </b-input>
            </b-field>

            <b-field label="Nom">
                <b-input
                        type="text"
                        :value="art.name"
                        placeholder="Nom"
                        name="edit-name"
                >
                </b-input>
            </b-field>
            <b-field label="Prénom">
                <b-input
                        type="text"
                        :value="art.firstname"
                        placeholder="Prénom"
                        name="edit-firstname"
                >
                </b-input>
            </b-field>

            <b-field label="Editor">
                <b-input
                        type="text"
                        :value="art.editor"
                        placeholder="Editor"
                        name="edit-editor"
                >
                </b-input>
            </b-field>
            <b-field label="Format Livre">
                <b-input
                        type="text"
                        :value="art.bookFormat"
                        placeholder="Format livre"
                        name="edit-bookFormat"
                >
                </b-input>
            </b-field>
            <b-field label="Type">
                <b-select v-model="selectedTypeOption"
                          name="edit-type"
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
                          name="edit-section"
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
                          name="edit-shelf"
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
                          name="edit-row"
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
                selectedTypeOption: this.artwork.type,
                selectedSectionOption: this.artwork.section,
                selectedShelfOption: this.artwork.shelf,
                selectedRowOption: this.artwork.row

            }
        },
        methods: {
            patchArtwork() {
                //get all values from the form
                this.art.name = document.querySelector("input[name='edit-name']").value
                this.art.title = document.querySelector("input[name='edit-title']").value
                this.art.firstname = document.querySelector("input[name='edit-firstname']").value
                this.art.editor = document.querySelector("input[name='edit-editor']").value
                this.art.bookFormat = document.querySelector("input[name='edit-bookFormat']").value
                this.art.type = document.querySelector("select[name='edit-type']").value
                this.art.section = document.querySelector("select[name='edit-section']").value
                this.art.shelf = document.querySelector("select[name='edit-shelf']").value
                this.art.row = document.querySelector("select[name='edit-row']").value
                //Call path method
                this.axiosInstance.patch(
                    `/libraries/${this.art.id}`,
                    this.art,
                    {headers: {'Content-Type': 'application/ld+json'}},
                ).then(response => {
                    if (response["status"] !== 200) {
                        alert("erreur API")
                    } else {
                        this.$buefy.toast.open({
                            message: 'Changement pris en compte',
                            type: 'is-success'
                        })
                    }
                }).catch(function (error) {
                    alert(error);
                });
                //close modal windows
                this.$parent.close()
            }
        }
    }
</script>

<style scoped>

</style>
