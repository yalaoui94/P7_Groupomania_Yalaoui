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

      <button type="submit" class="btn btn-pink my-2 my-sm-0">
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
       // Envoie des identifiants à l'API
      const API_URL = "http://localhost:8080/api/auth/";

      axios
      // il ya URL + le body de la requete ici les informations entrées dans les différents input
        .post(API_URL + "login", {
          username: this.loginInput.nom,
          password: this.loginInput.password,
        })
        .then((response) => {
          console.log(response.data);
          //set des informations user dans le localStorage
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push("/wall");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>