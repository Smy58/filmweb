<template>
    <HeaderPage />
    <SwiperMovies :list="topFive" :onItemClick="onItemClick"/>
    <MovieList :onItemClick="onItemClick" :list="TVLIST"/>
    <Preloader :isActive="isLoad" />
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import Preloader from '@/components/Preloader.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import SwiperMovies from '@/components/SwiperMovies.vue'


import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'TvView',
    components: {
        HeaderPage,
        MovieList,
        Preloader,
        SwiperMovies
    },
    data() {
        return {
            isLoad: false
        }
    },
    computed: {
        ...mapGetters(['TVLIST']),
        topFive() {
            const arr = [];
            for (let i = 0; i < 5; i += 1) {
                arr.push(this.TVLIST[i])
            }

            console.log(arr)

            return arr;
        }
    },
    methods: {
        ...mapActions(['GET_POPULAR_TV_LIST_FROM_API', 'GET_TV_FROM_API', 'GET_TV_RECOMMENDATIONS_FROM_API', 'GET_TV_VIDEO_FROM_API', 'GET_TV_CAST_FROM_API']),
        onLoad(val) {
            this.isLoad = val;
            console.log(val)
        },
        async onItemClick(id){

            this.onLoad(true)
            await Promise.all([
                this.GET_TV_FROM_API(id),
                this.GET_TV_RECOMMENDATIONS_FROM_API(id),
                this.GET_TV_VIDEO_FROM_API(id),
                this.GET_TV_CAST_FROM_API(id)
            ]);
            console.log(this.isLoad)

            this.onLoad(false)
            
            this.$router.push({ name: 'tv', query: { id: id}});
        }
    },
    async created() {
        await this.GET_POPULAR_TV_LIST_FROM_API()
    }
}
</script>

<style lang="scss" scoped>

</style>