<template>
    <div class="movie-item" @click="openMovie">
        <img :src="item.poster_path ? 'https://image.tmdb.org/t/p/original' + item.poster_path : ''" :alt="item.title" class="movie-item__img">
    
        <div class="movie-item__content">
            <h3 class="movie-item__title">{{ item.title ? item.title : item.name }}</h3>
            <p class="movie-item__subtitle">{{ releaseDate.split('-')[0] }}, Рейтинг: {{ item.vote_average }}</p>
            <p class="movie-item__info">{{ item.overview }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "MovieItem",
    props: {
        item: {
            type: Object,
            default: {}
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
        }
    },
    methods: {
        async openMovie() {
            console.log('movie id ', this.item.id)

            await this.onItemClick(this.item.id);
			window.scrollTo(pageYOffset, 0)
        }
    }
}
</script>

<style lang="scss">
    .movie-item {
        width: 250px;
        height: 375px;
        background: #fff;
        position: relative;
        cursor: pointer;

        &__img {
            width: 100%;
        }

        &__content {
            height: 0;
            width: 100%;
            position: absolute;
            bottom: 0;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            
            padding: 0 10px;

            box-sizing: border-box;

            background: #00000080;

            transition: height 0.5s ease, padding 0.5s ease;

            overflow: scroll;

            &::-webkit-scrollbar {
                width: 0;
            }
        }

        &:hover &__content {
            height: 50%;
            padding-top: 15px;

        }

        &__title {
            margin: 0;
            text-align: left;

            font-size: 18px;
            line-height: 20px;
            margin-bottom: 5px;
        }

        &__subtitle {
            margin: 0;
            margin-bottom: 5px;
            font-size: 14px;
            line-height: 16px;

            text-align: left;
        }

        &__info {
            margin: 0;

            text-align: left;
            font-size: 12px;
            line-height: 14px;

            margin-bottom: 15px;
        }
    }
</style>