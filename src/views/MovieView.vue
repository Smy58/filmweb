<template>
    <div class="movie-page">
        <HeaderPage />
        <MovieInfo :item="MOVIEDATA"/>
        <MovieVideo v-if="MOVIEVIDEO.length != 0" :items="MOVIEVIDEO"/>
        <MovieCast v-if="MOVIECAST.length != 0" :items="MOVIECAST"/>

        <SwiperRecommendations :onItemClick="onItemClick" :list="RECOMMENDATIONS"/>
        <Preloader :isActive="isLoad" />
    </div>
</template>

<script>
import MovieInfo from '@/components/MovieInfo.vue'
import SwiperRecommendations from '@/components/SwiperRecommendations.vue'
import Preloader from '@/components/Preloader.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import MovieVideo from '@/components/MovieVideo.vue'
import MovieCast from '@/components/MovieCast.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'MovieView',
    components: {
        MovieInfo,
        SwiperRecommendations,
        Preloader,
        HeaderPage,
        MovieVideo,
        MovieCast
    },
    data() {
        return {
            isLoad: false
        }
    },
    computed: {
        ...mapGetters(['RECOMMENDATIONS', 'MOVIEVIDEO', 'MOVIECAST', 'MOVIEDATA']),
        movieId(){
            return this.$route.query.id
        },
    },
    methods: {
        ...mapActions(['GET_RECOMMENDATIONS_FROM_API', 'GET_MOVIE_FROM_API', 'GET_MOVIE_VIDEO_FROM_API', 'GET_MOVIE_CAST_FROM_API']),
        onLoad(val) {
            this.isLoad = val;
            console.log(val)
        },
        async onItemClick(id){
            // this.onLoad(true)
            // await Promise.all([
            //     this.GET_MOVIE_FROM_API(id),
            //     this.GET_RECOMMENDATIONS_FROM_API(id),
            // ]);

            // this.onLoad(false)

            // console.log(this.$router)

            this.$router.push({ name: 'movie', query: { id: id}});
        }
    },
    watch: {
        $route: {
            handler: async function() {

                // console.log('ROUTER')
                // console.log(this.$route.query.id)

                const id = this.$route.query.id;
                this.onLoad(true)
                await Promise.all([
                    this.GET_MOVIE_FROM_API(id),
                    this.GET_RECOMMENDATIONS_FROM_API(id),
                    this.GET_MOVIE_VIDEO_FROM_API(id),
                    this.GET_MOVIE_CAST_FROM_API(id)
                ]);
                // console.log(this.isLoad)

                console.log(this.MOVIEVIDEO);

                this.onLoad(false)
                    
            },
            deep: true
        }
    },
    async created(){
        await Promise.all([
            this.GET_MOVIE_FROM_API(this.movieId),
            this.GET_RECOMMENDATIONS_FROM_API(this.movieId),
            this.GET_MOVIE_VIDEO_FROM_API(this.movieId),
            this.GET_MOVIE_CAST_FROM_API(this.movieId)
        ]);
        
    },
}
</script>

<style lang="scss">
    .movie-page { 
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;

    }
</style>