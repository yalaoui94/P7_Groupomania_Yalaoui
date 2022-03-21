<template>
  <ul class="nav justify-content-end">
    <li class="nav-item">
      <router-link
        class="nav-link"
        to="/profile"
        title="Se déconnecter"
        ><button class="btn btn-pink my-2 my-sm-0">
          Profile
        </button></router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/message/add">
        <button class="btn btn-pink my-2 my-sm-0">
          Créer un message
        </button></router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        to="/"
        title="Se déconnecter"
        @click="logout"
        ><button class="btn btn-pink my-2 my-sm-0">
          Se déconnecter
        </button></router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "UserMenu",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>