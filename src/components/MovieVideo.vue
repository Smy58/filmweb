<template>
    <div class="movie-video">
        <Swiper :style="{ width: '100%', height: '100%' }"
            :modules="modules"
            :slides-per-view="1"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :navigation="{
                prevEl: prev,
                nextEl: next,
            }">
            <SwiperSlide v-for="item in items" :key="item.key">
                <iframe width="100%" height="100%" 
                    :src="`https://www.youtube.com/embed/${item.key}`" 
                    :title="item.name" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </SwiperSlide>
        </Swiper >

        <div ref="prev" class="swiper-button-prev"></div>
        <div ref="next" class="swiper-button-next"></div>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';

export default {
    name: 'MovieVideo',
    components: {
        Swiper, 
        SwiperSlide
    },
    props: {
        items: {
            default: [{}],
            type: Array
        }
    },
    computed: {
        ...mapGetters(['MOVIEVIDEO']),
        firstItem() {
            return this.items[0] ? this.items[0] : {}
        },
        movieId(){
            return this.$route.query.id
        },
    },
    data() {
        return {
            youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
    },
    methods: {
        ...mapActions(['GET_MOVIE_VIDEO_FROM_API']),

    },
    setup() {
        const prev = ref(null);
        const next = ref(null);

        const onSwiper = (swiper) => {
            console.log('log swiper', swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            prev,
            next,
            modules: [Navigation]
        };

    }
}
</script>

<style lang="scss" scoped>
    .movie-video {
        width: 600px;
        height: 380px;

        // border: 1px solid black;
        margin-bottom: 50px;
        position: relative;

    }
</style>