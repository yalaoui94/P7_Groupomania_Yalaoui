<template>
  <div class="login_signup_setup">
    <h2>Connectez-vous à votre compte personnel !</h2>
    <form v-on:submit.prevent="login">
      <div class="mb-3">
        <label for="exampleInputNom1" class="form-label">Nom</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputNom1"
          v-model="loginInput.nom"
          required
        />
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label"
          >Mot de passe</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="loginInput.password"
          required
        />
      </div>

      <button type="submit" class="btn btn-outline-primary my-2 my-sm-0">
        Envoyer
      </button>
    </form>
    <nav class="nav_login_signup">
      <p>
        Vous n'avez pas de compte ?
        <router-link to="/signup">Inscrivez vous !</router-link>
      </p>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginInput: {
        nom: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      
      const API_URL = "http://localhost:8080/api/auth/";

      axios
        .post(API_URL + "login", {
          username: this.loginInput.nom,
          password: this.loginInput.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          this.$router.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>