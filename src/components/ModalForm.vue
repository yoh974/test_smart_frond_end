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
                        ref="title"
                        required>
                </b-input>
            </b-field>

            <b-field label="Nom">
                <b-input
                        type="text"
                        :value="art.name"
                        placeholder="Nom"
                        ref="name"
                >
                </b-input>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Fermer</button>
            <button class="button is-primary" :click="patchArtwork()">Enregistrer</button>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "ModalForm",
        props: ["artwork",'axiosInstance'],
        data() {
            return {
                art: this.artworks
            }
        },
        methods: {
            patchArtwork() {
                this.art.title = this.$refs.title.value
                this.art.name = this.$refs.name.value
            }
        }
    }
</script>

<style scoped>

</style>
