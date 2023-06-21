<template>
    <header class="header">
        <div class="header__nav">
            <router-link to="/" class="header__link">Главная</router-link>
            <router-link to="/tv-list" class="header__link">ТВ-шоу</router-link>
            <router-link to="/" class="header__link">Ссылка</router-link>
            <router-link to="/" class="header__link">Ссылка</router-link>
        </div>
        <div class="header__langs">
            <a href="" class="header__lang">RU</a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderPage',
    data() {
        return {

        }
    }    
}
</script>

<style lang="scss">
    .header {
        width: 100%;
        height: 100px;

        background: #00000046;

        display: flex;
        flex-direction: row;
        align-items: center;

        justify-content: space-between;

        padding-left: 100px;
        padding-right: 100px;

        box-sizing: border-box;

        margin-bottom: 35px;

        &__nav {
            display: flex;
            flex-direction: row;

            align-items: center;
            gap: 30px;
        }

        &__link {
            font-size: 18px;
            line-height: 20px;
            color: #fff;

            text-decoration: none;
            font-weight: bold;
        }

        &__lang {
            display: flex;
            flex-direction: row;

            align-items: center;
            gap: 20px;

        }

        &__lang {
            font-size: 15px;
            line-height: 20px;

            color: #fff;
            text-decoration: none;
        }
    }
</style>