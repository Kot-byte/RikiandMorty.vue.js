<template>
  <div id="app">
    <CharacterList />
  </div>
</template>

<script>
import CharacterList from "./components/CharacterList.vue";

export default {
  name: "App",
  components: {
    CharacterList,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1e1e1e;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
