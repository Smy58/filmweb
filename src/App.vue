<template>
  <router-view/>
</template>

<style lang="scss">
body {
  background: linear-gradient(to left top, #000000, #121212, #1e1e1e, #2a2a2a, #363636, #413d47, #4f4356, #604864, #81416a, #a43261, #c11f48, #d11f1f);
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
