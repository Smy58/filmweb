<template>
    <div class="container" :style="{ width: elWidth + 'px' }">
        <Swiper
            :modules="modules"
            :slides-per-view="1"
            :pagination="{ clickable: true, el: pagin, renderBullet: bullet }"
            :autoplay="{ delay: 10000 }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :navigation="{
                prevEl: prev,
                nextEl: next,
            }"
            :loop="true"

        >
            <SwiperSlide v-for="item in list" :key="item ? item.id : 0">
                <ScrollFilm :item="item" :onItemClick="onItemClick"/>
            </SwiperSlide>
        </Swiper>

        <div ref="prev" class="swiper-button-prev"></div>
        <div ref="next" class="swiper-button-next"></div>
        <div ref="pagin" class="swiper-button-pagination"></div>
    </div>
    
</template>

<script>
import { ref } from 'vue';
import ScrollFilm from '@/components/ScrollFilm.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
    name: 'SwiperMovies',
    props: {
        list: {
            default: [],
            type: Array
        },
        onItemClick: Function
    },
    components: {
        Swiper,
        SwiperSlide,
        ScrollFilm
    },
    computed: {
        elWidth() {
            // console.log(Math.ceil(document.documentElement.clientWidth * 0.8))

            return Math.ceil(document.documentElement.clientWidth * 0.8)
        }
    },
    setup() {
        const prev = ref(null);
        const next = ref(null);
        const pagin = ref(null);

        const onSwiper = (swiper) => {
            console.log('log swiper ', swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            prev,
            next,
            pagin,
            modules: [Autoplay, Navigation, Pagination]
        };

    },
    data() {
        return {
            
        }
    },
    methods: {
        bullet (index) {
            return '<span class="swiper-pagination-bullet">' + '' + '</span>';
        }
    },
    
}
</script>

<style lang="scss">
    .container {
        margin-bottom: 50px;
        position: relative;
        box-sizing: border-box;
    }

    .swiper-button-prev, .swiper-button-next {
        width: 50px;
        height: 50px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        background: url(@/assets/arr.png);
        background-repeat: no-repeat;
        background-size: contain;

        cursor: pointer;

        opacity: 1;
        transition: opacity 0.5s ease;
        
        position: absolute;
        top: 50%;

        z-index: 100;

        &::after {
            content: ''
        }
    }

    .swiper-button-prev {
        left: 0;
        transform: translate(-50%, 0) rotate(180deg);
    }

    .swiper-button-next {
        left: 100%;
        transform: translate(-50%, 0);
    }

    .swiper-button-disabled {
        opacity: 0;
    }
    
    .swiper-button-pagination {
        margin-top: 10px;
    }
    
    .swiper-pagination-bullet {
        border-radius: 0;
        width: 30px;
        height: 10px;
        text-align: center;
        opacity: 1;
        background: rgba(0,0,0,0.2);
    }
    .swiper-pagination-bullet-active {
        background: #e4418a;
    }

    
    
</style>