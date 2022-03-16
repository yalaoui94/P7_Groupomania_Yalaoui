<template>
  <div class="container">
    <header class="jumbotron mt-5">
      <h3 class="text-center">
        <strong>{{
          "Bienvenue dans votre profile " + user.username + " !"
        }}</strong>
        <router-link
        to="/userdeleted"
        @click="deleteSelf">
        <svg
            class="text-danger"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="2em"
            height="2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M678.3 655.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 518 759.6 444.7 759.6 362c0-137-110.8-248-247.5-248S264.7 225 264.7 362c0 82.7 40.4 156 102.6 201.1c-.4.2-.8.3-1.2.5c-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 901.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8c2-77.2 32.9-149.5 87.6-204.3C357 641.2 432.2 610 512.2 610c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 534c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 362c0-45.9 17.9-89.1 50.3-121.6S466.3 190 512.2 190s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 362c0 45.9-17.9 89.1-50.3 121.6C601.1 516.1 558 534 512.2 534zM880 772H640c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
            /></svg
        ></router-link>
      </h3>
    </header>
    <p class="text-center">
      <strong
        >Votre numéro d'identification dans la base de donnée
        groupomania:</strong
      >
      <br />
      {{ "Vous êtes le numéro " + ' "' + user.id + '" ' }}
    </p>
    <p class="text-center">
      <strong>Your email :</strong>
      <br />
      {{ user.email }}
    </p>

    <div v-if="user.isAdmin == 1" class="container mt-5">
      <p>Les personnes composant la database sont: </p>
      <div v-for="user in users" :key="user.id">
        <span class="fs-6">{{ user.username }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      user: [],
      users: [],
    };
  },
  created() {
    // recupération du userId dans le localStorage
    let userId = localStorage.getItem("userId");
    this.userId = userId;

    // Récupération des utilisateurs dans la base de donnée. 
    const API_URL = "http://localhost:8080/api/auth/";

    axios
      .get(API_URL + this.userId)
      .then((response) => {
        this.user = response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_URL)
      .then((response) => {
        this.users = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // permet à l'utilisateur de se supprimer lui-même
    deleteSelf(){
      //appel a l'api pour avoir la route delete
      const API_URL = "http://localhost:8080/api/auth/";
      axios
        .delete(API_URL + this.user.id)
        .then((response) => {
          console.log(response)
          // nettoie le localStorage pour empêcher les personnes de revenir sur le wall
          localStorage.clear();
          // envoie l'utilisateur vers une page pour lui permettre de se réinscrire
          this.$router.push('/userdeleted')
          
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
  }
};
</script>