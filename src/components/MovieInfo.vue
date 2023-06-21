<template>
    <div class="movie-info">
        <img :src="item ? 'https://image.tmdb.org/t/p/original' + item.poster_path : ''" alt="Poster" class="movie-info__img">
    
        <div class="movie-info__content">
            <h2 class="movie-info__title">{{ item.title ? item.title : item.name }}</h2>
            <p class="movie-info__sub">{{ releaseDate.split('-')[0] }}<span v-for="gen in genres" class="movie-info__genre" :key="gen.id">, {{ gen.name }}</span></p>
            <p v-if="item.runtime" class="movie-info__runtime">{{ item ? Math.floor(item.runtime / 60) : ''}}ч {{ item ? item.runtime % 60 : '' }}мин</p>
            <p class="movie-info__describtion">{{ item ? item.overview : ''}}</p>
            <p class="movie-info__countries">
                <span class="movie-info__countrie" >{{ item && item.production_countries ? item.production_countries.map((el)=>{return el.name}).join(', ') : ''}} </span>
            </p>
        </div>
        <div class="movie-info__rate">{{ item && item.vote_average ? item.vote_average.toFixed(1) : ''}}</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'MovieInfo',
    data() {
        return {
            
        }
    },
    props: {
        item: {
            default: {},
            type: Object
        }
    },
    methods: {

},
    computed: {
        movieId(){
            return this.$route.query.id
        },
        genres() {
            if(this.item) {
                return this.item.genres
            }

            return []
        },
        releaseDate() {
            console.log(this.item.first_air_date)
            if (this.item.first_air_date) {
                console.log('tv')
                return this.item.first_air_date
            } else if (this.item.release_date) {
                return this.item.release_date
            }
            return ''
        }
    },
}
</script>

<style lang="scss">
    .movie-info {
        margin-bottom: 100px;

        width: 85%;

        display: flex;
        flex-direction: row;

        &__img {
            width: 300px;
        }


        &__content {
            margin-left: 40px;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 50%;
        }

        &__title {
            text-align: left;
            margin: 0;

            font-size: 40px;

            margin-bottom: 5px;

        }

        &__sub {
            text-align: left;
            margin: 0;

            margin-bottom: 5px;


        }

        &__genre {
            font-size: 14px;
        }

        &__runtime {
            text-align: left;
            margin: 0;

            margin-bottom: 10px;
        }

        &__describtion {
            text-align: left;
            margin: 0;

            font-size: 16px;


        }

        &__rate {
            width: 50px;
            height: 50px;
            border: 5px solid #fff;
            border-radius: 10px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 20px;
            font-weight: bold;
        }
    }
</style>