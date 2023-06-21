<template>
    <div class="recommendations">
        <div class="recommendations__content">
            <h2 class="recommendations__title">Фильмы которые могут вас заинтересовать:</h2>
            <div class="recommendations__list">
                <MovieItem v-for="item in RECOMMENDATIONS" :item="item" :key="item.id" :onItemClick="onItemClick"/>

            </div>
        </div>
        

        <div :class="'recommendations__btn recommendations__btn_left ' + (isLeft ? '' : 'hidden')" @click="scrollLeft">
            <div class="recommendations__arr"></div>
        </div>
        <div :class="'recommendations__btn recommendations__btn_right ' + (isRight ? '' : 'hidden')" @click="scrollRight">
            <div class="recommendations__arr"></div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MovieItem from './MovieItem.vue'

export default {
    name: 'MovieRecommendations',
    components: {
        MovieItem,
    },
    props: {
        onItemClick: Function
    },
    data() {
        return {
            isLeft: false,
            isRight: true,
        }
    },
    computed:{
        ...mapGetters(['RECOMMENDATIONS']),
        movieId(){
            return this.$route.query.id
        },
        recEl() {
            return document.querySelector('.recommendations__content')
        },
        step() {
            return Math.floor(this.recEl.clientWidth / 280) * 280
        },
        
    },
    methods: {
        ...mapActions(['GET_RECOMMENDATIONS_FROM_API']),
        checkBtns() {
            setTimeout(() => {
                if (this.recEl.scrollLeft != this.recEl.scrollWidth - Math.ceil(this.recEl.getBoundingClientRect().width)) {
                    this.isRight = true
                } else {
                    this.isRight = false
                }

                if (this.recEl.scrollLeft != 0) {
                    this.isLeft = true
                } else {
                    this.isLeft = false
                }
            }, 500)
        },
        scrollLeft() {
            console.log('left')


            this.recEl.scrollBy({
                left: - this.step,
                behavior: 'smooth'
            })

            this.checkBtns()

        },
        scrollRight() {
            console.log('right')
            console.log(this.recEl)
            

            this.recEl.scrollBy({
                left: this.step,
                behavior: 'smooth'
            })

            this.checkBtns()
        }
    },
    created() {
        this.GET_RECOMMENDATIONS_FROM_API(this.movieId)
    }
}
</script>

<style lang="scss">
    .recommendations {
        width: 80%;
        margin-bottom: 50px;
        

        position: relative;

        &__content {
            overflow-x: scroll;
            width: 100%;

            &::-webkit-scrollbar {
                height: 0;
                width: 0;
            }
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