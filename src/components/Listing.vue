<template>
    <div class="container is-fluid">
        <vuetable ref="vuetable"
                  :api-mode="false"
                  :data="artworks"
                  :fields="fields"
        >
            <div slot="actions" slot-scope="props">
                <!--<button
                        class="ui small button"
                        @click="onActionClicked('edit-item', props.rowData)"
                >
                    <i class="edit icon"></i>
                </button>-->
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
    import _ from "lodash";

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
                art: null,
                columns: [
                    {
                        field: 'title',
                        label: 'Titre'
                    },
                    {
                        field: 'name',
                        label: 'Nom',
                    },
                    {
                        field: 'firstname',
                        label: 'Prénom',
                    },
                    {
                        field: 'editor',
                        label: 'Editeur',
                    },
                    {
                        field: 'bookFormat',
                        label: 'Format livre',
                    },
                    {
                        field: 'type',
                        label: 'Type',
                    },
                    {
                        field: 'section',
                        label: 'Section',
                    },
                    {
                        field: 'shelf',
                        label: 'Etagère',
                    },
                    {
                        field: 'row',
                        label: 'Rangée',
                    },
                ]
            }
        },
        methods: {
            edit: function (row) {
                console.log(row)
            },
            onActionClicked(action, data) {
                this.$emit('edit',data)
                console.log("slot actions: on-click", data.id);
            },
            dataManager(sortOrder, pagination) {
                if (this.data.length < 1) return;

                let local = this.data;

                // sortOrder can be empty, so we have to check for that as well
                if (sortOrder.length > 0) {
                    console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
                    local = _.orderBy(
                        local,
                        sortOrder[0].sortField,
                        sortOrder[0].direction
                    );
                }

                pagination = this.$refs.vuetable.makePagination(
                    local.length,
                    this.perPage
                );
                console.log('pagination:', pagination)
                let from = pagination.from - 1;
                let to = from + this.perPage;

                return {
                    pagination: pagination,
                    data: _.slice(local, from, to)
                };
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
.b-edit{
    margin-right: 15px;
}
</style>
