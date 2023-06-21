<template>
    <div class="home">
        <HeaderPage />
        <SwiperMovies :list="topFive" :onItemClick="onItemClick"/>
        <MovieList :onItemClick="onItemClick" :list="MOVIELIST"/>
        <Preloader :isActive="isLoad" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MovieList from '@/components/MovieList.vue'
import Preloader from '@/components/Preloader.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import ScrollFilms from '@/components/ScrollFilms.vue'
import SwiperMovies from '@/components/SwiperMovies.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'HomeView',
    components: {
        HelloWorld,
        MovieList,
        Preloader,
        HeaderPage,
        ScrollFilms,
        SwiperMovies
    },
    data() {
        return {
            isLoad: false
        }
    },
    methods: {
        ...mapActions([
            'GET_MOVIE_FROM_API', 
            'GET_RECOMMENDATIONS_FROM_API', 
            'GET_POPULAR_MOVIE_LIST_FROM_API', 
            'GET_MOVIE_VIDEO_FROM_API',
            'GET_MOVIE_CAST_FROM_API']),
        onLoad(val) {
            this.isLoad = val;
            console.log(val)
        },
        async onItemClick(id){

            this.onLoad(true)
            await Promise.all([
                this.GET_MOVIE_FROM_API(id),
                this.GET_RECOMMENDATIONS_FROM_API(id),
                this.GET_MOVIE_VIDEO_FROM_API(id),
                this.GET_MOVIE_CAST_FROM_API(id)
            ]);
            // console.log(this.isLoad)

            this.onLoad(false)
            
            this.$router.push({ name: 'movie', query: { id: id}});
        }
    },
    watch: {
        // $route: {
        //     handler: async function() {
                    
        //     },
        //     deep: true
        // }
    },
    computed: {
        ...mapGetters(['MOVIELIST']),
        topFive() {
            const arr = [];
            for (let i = 0; i < 5; i += 1) {
                arr.push(this.MOVIELIST[i])
            }

            // console.log(arr)

            return arr;
        }
    },
    async created() {
        await this.GET_POPULAR_MOVIE_LIST_FROM_API()
    }
}
</script>

<style lang="scss">
  .home {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
