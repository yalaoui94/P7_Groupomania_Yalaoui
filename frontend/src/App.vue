<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/home" class="nav-link">
          <img src="./assets/logo(1).png" class="navbar-brand logo" />
        </router-link>
        <div class="d-flex"></div>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.logo {
  height: 45px;
  width: auto;
}
.navbar {
  box-shadow: 0px 10px 20px #c0c0c0;
}
</style>