<template>
    <div class="scroll-film" :style="{ backgroundImage: `url(${item.backdrop_path != undefined ? 'https://image.tmdb.org/t/p/original' + item.backdrop_path : '#fff'})`, width: elWidth + 'px' }" @click="openMovie">
        <div class="scroll-film__dark"></div>
        <h3 class="scroll-film__title">{{ item.title ? item.title : item.name }}</h3>
        <p class="scroll-film__sub">{{ releaseDate.split('-')[0] }} </p>
        <p class="scroll-film__text">{{ item.overview }}</p>

        <div class="scroll-film__rate">{{ item.vote_average }}</div>
    </div>
</template>

<script>
export default {
    name: 'ScrollFilm',
    props: {
        item: {
            default: {},
            type: Object
        },
        onItemClick: Function
    },
    computed: {
        releaseDate() {
            if (this.item.first_air_date) {
                return this.item.first_air_date
            } else if (this.item.release_date) {
                return this.item.release_date
            }
            return ''
        },
        elWidth() {
            // console.log('scrollFilm');
            // console.log(document.documentElement.clientWidth);
            // console.log(Math.ceil(document.documentElement.clientWidth * 0.8))
            return Math.ceil(document.documentElement.clientWidth * 0.8)
        }
    },
    methods: {
        async openMovie() {
            console.log(this.item.id)
            await this.onItemClick(this.item.id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .scroll-film{
        height: 40vw;
        background-size: 130%;
        background-repeat: no-repeat;
        background-position: center; 

        box-sizing: border-box;
        position: relative;

        padding: 40px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: end;

        cursor: pointer;

        &__dark {
            width: 100%;
            height: 100%;

            background-image: linear-gradient(to bottom, #ffffff00, #0000003b, #0000007e, #000000bb, #000000ea);

            position: absolute;
            top: 0;
            left: 0;

            z-index: 1;
        }

        &__title {
            margin: 0;
            text-align: left;
            z-index: 2;

            font-size: 34px;
            line-height: 36px;
            margin-bottom: 10px;

            width: 80%;
        }

        &__sub {
            margin: 0;
            text-align: left;
            z-index: 2;

            font-size: 24px;
            line-height: 26px;

            margin-bottom: 15px;

            width: 80%;


        }

        &__text {
            margin: 0;
            text-align: left;
            z-index: 2;

            width: 80%;


        }

        &__rate {
            margin: 0;
            z-index: 2;

            width: 50px;
            height: 50px;
            border: 5px solid #fff;
            border-radius: 10px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 20px;
            font-weight: bold;

            position: absolute;
            top: 30px;
            right: 30px;

        }
    }
</style>