<template>
  <div class="login_signup_setup">
    <h2>Connectez-vous à votre compte personnel !</h2>
    <form v-on:submit.prevent="signup">
      <div class="mb-3">
        <label for="exampleInputNom1" class="form-label">Nom</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputNom1"
          v-model="signupInput.username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="signupInput.email"
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
          v-model="signupInput.password"
          required
        />
      </div>

      <button type="submit" class=" btn btn-pink my-2 my-sm-0">
        Envoyer
      </button>
    </form>

    <nav class="nav_login_signup">
      <p>
        Vous avez déjà un compte ?
        <router-link to="/">Connectez vous !</router-link>
      </p>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      signupInput: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      // Envoie des identifiants à l'API
      const API_URL = "http://localhost:8080/api/auth/signup";

      axios
        // il ya URL + le body de la requete ici les informations entrées dans les différents input
        .post(API_URL, this.signupInput)

        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.btn-pink {
/* background: var(--bs-pink); */
color: var(--bs-pink) !important;
border-color: var(--bs-pink) !important;

}

.btn-pink:hover{
  color: white !important;
  background-color:  var(--bs-pink) !important;
  border-color: var(--bs-pink) !important;

};

</style>