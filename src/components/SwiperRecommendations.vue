<template>
    <div class="recommendations">
        <h2 class="recommendations__title">Фильмы которые могут вас заинтересовать:</h2>
        <div class="recommendations__content">
            <Swiper
                :modules="modules"
                :slides-per-view="3"
                :space-between="30"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
                :navigation="{
                    prevEl: prev,
                    nextEl: next,
                }"

            >
                <SwiperSlide v-for="item in list" :key="item ? item.id : 0">
                    <MovieItem :item="item" :onItemClick="onItemClick"/>
                </SwiperSlide>
            </Swiper>

            <div ref="prev" class="swiper-button-prev"></div>
            <div ref="next" class="swiper-button-next"></div>
        </div>
        

        

        
        

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MovieItem from './MovieItem.vue'
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';

export default {
    name: 'SwiperRecommendations',
    components: {
        MovieItem,
        Swiper, 
        SwiperSlide
    },
    props: {
        onItemClick: Function,
        list: {
            default: [],
            type: Array
        }
    },
    data() {
        return {

        }
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

    },
    computed:{
        ...mapGetters(['RECOMMENDATIONS']),
        movieId(){
            return this.$route.query.id
        },
        
    },
    
}
</script>

<style lang="scss">
    .recommendations {
        width: 80%;
        margin-bottom: 100px;
        

        position: relative;

        &__content {
            position: relative;
            width: 100%;

            
        }

        &__title {
            width: 60%;
            text-align: left;
            margin: 0;
            margin-bottom: 20px;

            font-size: 36px;
            line-height: 38px;

        }
        

        &__list {
            width: fit-content;
            overflow-y: hidden;

            display: flex;
            flex-direction: row;
            overflow-x: hidden;

            gap: 30px;
        }

        &__btn {
            width: 50px;
            height: 50px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;
            background: #000;

            cursor: pointer;

            opacity: 1;
            transition: opacity 0.5s ease;
            
            position: absolute;
            top: 55%;

            &_left {
                
                left: 0;
                transform: translate(-50%, -50%);
            }

            &_right {
                
                left: 100%;
                transform: translate(-50%, -50%);
            }
        }

        &__arr {
            width: 18px;
            height: 19px;

            background: url(@/assets/arr.png);
            background-size: contain;
            background-repeat: no-repeat;
        }

        &__btn_left &__arr {
            transform: rotate(180deg);
        }

    }

    .hidden {
        opacity: 0;
    }

</style>