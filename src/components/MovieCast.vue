<template>
    <div class="movie-cast">
        <Swiper :style="{ width: '100%', height: '100%' }"
            :modules="modules"
            :slides-per-view="5"
            :space-between="30"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :navigation="{
                prevEl: prev,
                nextEl: next,
            }">
            <SwiperSlide v-for="item in items" :key="item.key">
                <div class="movie-cast__card">
                    <img v-if="item.profile_path" :src="imageLink + item.profile_path " alt="" class="movie-cast__img">
                    <div v-if="!item.profile_path" class="movie-cast__img"></div>
                    <p class="movie-cast__name">{{ item.name }}</p>
                </div>
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
    name: 'MovieCast',
    components: {
        Swiper, 
        SwiperSlide
    },
    props: {
        items: {
            default: [{}],
            type: Array
        },
    },
    computed: {
        ...mapGetters(['MOVIECAST']),
        movieId(){
            return this.$route.query.id
        },
    },
    data() {
        return {
            imageLink: 'https://image.tmdb.org/t/p/original'
        }
    },
    methods: {
        ...mapActions(['GET_MOVIE_CAST_FROM_API']),

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

<style lang="scss" >
    .movie-cast {
        width: 80%;
        position: relative;

        &__card {
            width: 150px;
            height: fit-content;
        }

        &__img {
            width: 150px;
            height: 225px;

            background: url(@/assets/default-ava.jpeg);
            background-repeat: no-repeat;
            background-size: auto 225px;
            background-position: center;
        }

        &__name {
            width: 150px;
        }

        
    }

    .movie-cast .swiper-button-prev, .movie-cast .swiper-button-next {
        top: 40%;
    }
</style>

