import VuetableFieldHandle from 'vuetable-2/src/components/VuetableFieldHandle.vue'

export default [
    {
        name: VuetableFieldHandle
    },
    {
        name: 'title',
        title: 'Titre <i class="mdi mdi-sort"></i>',
        sortField: 'title'
    },
    {
        name: 'name',
        title: 'Nom',
        sortField: 'name'
    },
    {
        name: 'firstname',
        title: 'Prénom',
        sortField: 'firstname'
    },
    {
        name: 'editor',
        title: '&Eacute;diteur',
        sortField: 'editor'
    },
    {
        name: 'bookFormat',
        title: 'Format Livre',
        sortField: 'bookFormat'
    },
    'type',
    'section',
    {
        name: 'shelf',
        title: '&Eacute;tagère',
        sortField: 'shelf'
    },
    {
        name: 'row',
        title: 'Rangée',
        sortField: 'row'
    },
    'actions'
]
