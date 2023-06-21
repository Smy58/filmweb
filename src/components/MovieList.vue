<template>
    <div class="movie-list">
        <MovieItem v-for="item in list" :item="item" :key="item.id" :onItemClick="onItemClick"/>
    </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue'

export default {
    name: "MovieList",
    components: {
        MovieItem
    },
    data() {
        return {
            
        }
    },
    props: {
        onItemClick: Function,
        list: {
            default: [],
            type: Array
        }
    }
}
</script>

<style lang="scss">
    .movie-list {
        width: 80%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        gap: 20px;

        flex-wrap: wrap;

        margin-bottom: 60px;
    }
</style>