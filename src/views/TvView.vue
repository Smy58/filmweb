<template>
    <div class="tv-page">
        <HeaderPage />
        <MovieInfo :item="TVDATA"/>
        <MovieVideo v-if="TVVIDEO.length != 0" :items="TVVIDEO"/>
        <MovieCast v-if="TVCAST.length != 0" :items="TVCAST"/>

        <SwiperRecommendations :onItemClick="onItemClick" :list="TVRECOMMENDATIONS"/>
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
    name: 'TvView',
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
        ...mapGetters(['TVDATA', 'TVVIDEO', 'TVCAST', 'TVRECOMMENDATIONS']),
        movieId(){
            return this.$route.query.id
        },
    },
    methods: {
        ...mapActions(['GET_TV_FROM_API', 'GET_TV_VIDEO_FROM_API', 'GET_TV_CAST_FROM_API', 'GET_TV_RECOMMENDATIONS_FROM_API']),
        onLoad(val) {
            this.isLoad = val;
            console.log(val)
        },
        async onItemClick(id){

            this.$router.push({ name: 'tv', query: { id: id}});
        }
    },
    watch: {
        $route: {
            handler: async function() {

                const id = this.$route.query.id;
                this.onLoad(true)
                await Promise.all([
                    this.GET_TV_FROM_API(id),
                    this.GET_TV_RECOMMENDATIONS_FROM_API(id),
                    this.GET_TV_VIDEO_FROM_API(id),
                    this.GET_TV_CAST_FROM_API(id)
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
            this.GET_TV_FROM_API(this.movieId),
            this.GET_TV_RECOMMENDATIONS_FROM_API(this.movieId),
            this.GET_TV_VIDEO_FROM_API(this.movieId),
            this.GET_TV_CAST_FROM_API(this.movieId)
        ]);
        
    },
}
</script>

<style lang="scss" scoped>
    .tv-page { 
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;

    }
</style>