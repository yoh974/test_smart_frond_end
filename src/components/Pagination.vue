<template>
    <div>
        <nav class="pagination is-medium">
            <a role="button" href="#" aria-label="Page 0." class="pagination-link pagination-previous"
               disabled="disabled">
                <span class="icon" aria-hidden="true"><i class="mdi mdi-chevron-left mdi-24px"></i></span>
            </a>
            <a role="button" href="#" aria-label="Page 2." class="pagination-link pagination-next">
                <span class="icon" aria-hidden="true"><i class="mdi mdi-chevron-right mdi-24px"></i></span>
            </a>
            <ul class="pagination-list">
                <li>
                    <a role="button" aria-label="Current page, Page 1." aria-current="true"
                       :class="(activePage === 1) ? 'pagination-link  is-current' : 'pagination-link '"
                       @click="$emit('page-change',1)"
                    >1</a>
                </li>
                <li v-if="firstElipse">
                    <span class="pagination-ellipsis">…</span>
                </li>
                <li v-for="page in pageNumbers" :key="page">
                    <a role="button" :aria-label="'Page '+ page"
                       :class="(activePage === page) ? 'pagination-link  is-current' : 'pagination-link '"
                       @click="$emit('page-change',page)"
                    >{{page}}</a>
                </li>
                <li v-if="lastElipse">
                    <span class="pagination-ellipsis">…</span>
                </li>
                <li v-if="nb_total_pages > 2">
                    <a role="button"
                       :aria-label="'Page' + nb_total_pages"
                       :class="(activePage === nb_total_pages) ? 'pagination-link  is-current' : 'pagination-link '"
                       @click="$emit('page-change',nb_total_pages)"
                    >{{nb_total_pages}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: ["activePage", "nb_total_pages"],
        data() {
            return {
                pageNumbers: [],
                lastElipse: null,
                firstElipse: null
            }

        },
        methods: {
            updatePages: function () {
                if (this.nb_total_pages < 10) {

                    for (let i = 2; i < this.nb_total_pages; i++) {
                        this.pageNumbers.push(i)
                    }
                } else {
                    this.pageNumbers = []
                    if (this.activePage === 1) {
                        this.pageNumbers.push(2)
                        this.lastElipse = true
                        this.firstElipse = false
                    } else {
                        if (this.activePage < 5) {
                            switch (this.activePage) {
                                case 2 :
                                    this.pageNumbers.push(2, 3)
                                    break
                                case 3 :
                                    this.pageNumbers.push(2, 3, 4)
                                    break
                                case 4 :
                                    this.pageNumbers.push(2, 3, 4, 5)
                                    break
                            }
                            this.firstElipse = false
                        } else {
                            if (this.activePage > this.nb_total_pages - 5) {
                                this.lastElipse = false
                                this.firstElipse = true
                                switch (this.activePage) {
                                    case this.nb_total_pages :
                                        this.pageNumbers.push(this.nb_total_pages - 1)
                                        break
                                    case this.nb_total_pages - 1 :
                                        this.pageNumbers.push(this.nb_total_pages - 2, this.nb_total_pages - 1)
                                        break
                                    case this.nb_total_pages - 2 :
                                        this.pageNumbers.push(
                                            this.nb_total_pages - 3,
                                            this.nb_total_pages - 2,
                                            this.nb_total_pages - 1
                                        )
                                        break
                                    case this.nb_total_pages - 3 :
                                        this.pageNumbers.push(
                                            this.nb_total_pages - 4,
                                            this.nb_total_pages - 3,
                                            this.nb_total_pages - 2,
                                            this.nb_total_pages - 1
                                        )
                                        break
                                    case this.nb_total_pages - 4 :
                                        this.pageNumbers.push(
                                            this.nb_total_pages - 5,
                                            this.nb_total_pages - 4,
                                            this.nb_total_pages - 3,
                                            this.nb_total_pages - 2,
                                            this.nb_total_pages - 1
                                        )
                                        break
                                }
                            }else{
                                this.pageNumbers.push(this.activePage - 1, this.activePage, this.activePage + 1)
                                this.firstElipse = true
                                this.lastElipse = true
                            }

                        }
                    }
                }
            }

        },
        watch: {
            nb_total_pages() {
                this.updatePages()
            },
            activePage() {
                this.updatePages()
            }
        },
    }
</script>

<style scoped>

</style>
