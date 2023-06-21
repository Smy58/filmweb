<template>
    <div class="scroll-films" :style="{ width: elWidth + 'px' }">
        <div :class="'scroll-films__btn scroll-films__btn_left ' " @click="scrollLeft">
            <div class="scroll-films__arr"></div>
        </div>
        <div :class="'scroll-films__btn scroll-films__btn_right ' " @click="scrollRight">
            <div class="scroll-films__arr"></div>
        </div>
        <div class="scroll-films__content">
            <div class="scroll-films__list">
                <ScrollFilm v-for="item in list" :item="item" :key="item ? item.id : 0" />
            </div>
        </div>
    </div>
</template>

<script>
import ScrollFilm from './ScrollFilm.vue'

export default {
    name: 'ScrollFilms',
    components: {
        ScrollFilm
    },
    data() {
        return {
            isLeft: false,
            isRight: true,
        }
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    computed: {
        recEl() {
            return document.querySelector('.scroll-films__content')
        },
        step() {
            return this.recEl.getBoundingClientRect().width
        },
        elWidth() {
            return Math.ceil(document.documentElement.clientWidth * 0.8)
        }
    },
    methods: {
        checkBtns() {
            
            setTimeout(() => {
                // console.log(this.recEl.scrollLeft);
                // console.log(this.recEl.scrollWidth);
                // console.log(Math.ceil(this.recEl.getBoundingClientRect().width));
                // console.log(this.recEl.scrollWidth - Math.ceil(this.recEl.getBoundingClientRect().width));
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
            }, 750)
        },
        scrollLeft() {
            // console.log('left')
            // console.log(this.step)

            if (!this.isLeft) {
                this.recEl.scrollBy({
                    left: (this.step * 4),
                    behavior: 'smooth'
                })
            } else {
                this.recEl.scrollBy({
                    left: - this.step,
                    behavior: 'smooth'
                })
            }

            this.checkBtns()

        },
        scrollRight() {
            // console.log('right')
            // // console.log(this.recEl)
            // console.log(this.step)
            
            if(this.recEl.scrollLeft % this.step == 0){
                if (!this.isRight) {
                    this.recEl.scrollBy({
                        left: - (this.step * 5),
                        behavior: 'smooth'
                    })
                } else {
                    this.recEl.scrollBy({
                        left: this.step,
                        behavior: 'smooth'
                    })
                }
                this.checkBtns()
            }
            
        },
    },
    mounted() {
        setInterval(() => {
            this.scrollRight();
        }, 10000)
    }
    
}
</script>

<style lang="scss">
    .scroll-films {
        
        margin-bottom: 35px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;


        &__content {
            width: 100%;
            min-height: 100px;
            background: #000;

            height: 40vw;

            overflow-x: scroll;

            &::-webkit-scrollbar {
                height: 0;
                width: 0;
            }
        }

        &__list {
            width: fit-content;
            overflow-y: hidden;
            display: flex;
            flex-direction: row;
            overflow-x: hidden;
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
            top: 50%;

            z-index: 100;

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