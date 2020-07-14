<template>
    <div class="container is-fluid">
        <vuetable ref="vuetable"
                  :api-mode="false"
                  :data="artworks"
                  :fields="fields"
        >
            <div slot="actions" slot-scope="props">
                <b-button
                        class="b-edit"
                        icon-right="table-edit"
                        @click="onActionClicked('edit-item', props.rowData)"
                />
                <b-button type="is-danger"
                          icon-right="delete"
                          @click="onActionClicked('delete-item', props.rowData)"
                />
            </div>
        </vuetable>

    </div>
</template>

<script>

    import Vuetable from 'vuetable-2'
    import FieldsDef from "../FieldsDef.js";


    export default {
        name: "Listing",
        props: ['artworks'],
        components: {
            Vuetable
        },
        data() {
            return {
                fields: FieldsDef,
                perPage: 3,
                art: null
            }
        },
        methods: {
            onActionClicked(action, data) {
                if (action === "edit-item") {
                    this.$emit('edit', data)
                } else {
                    this.confirm(data)
                }
            },
            //confirm action
            confirm(data) {
                this.$buefy.dialog.confirm({
                    message: `Etes vous sûr de vouloir supprimer ${data.title} ?`,
                    onConfirm: () => {
                        this.$emit('delete', data)
                        this.$buefy.toast.open({
                            message: 'Ligne supprimée',
                            type: 'is-sucess'
                        })
                    }
                })
            },
        },
        watch: {
            artworks() {
                this.$refs.vuetable.refresh();
            }
        },
    }
</script>

<style scoped>
    .b-edit {
        margin-right: 15px;
    }

</style>
