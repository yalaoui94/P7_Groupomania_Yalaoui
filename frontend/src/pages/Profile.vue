<template>
  <section>
    <div class="account_setup">
      <br />
      <h2>Bienvenue sur votre espace personnel</h2>
      <UserMenu></UserMenu>
    </div>

    <div
      class="card text-center my-4"
      v-for="article in articles"
      :key="article.id"
    >
      <h3 class="card-header text-uppercase">{{ article.title }}</h3>
      <div class="card-body">
        <p class="card-text fs-5 fw-lighter">
          {{ article.description }}
        </p>
        <router-link
          :to="{ name: 'ModifyArticle', params: { id: article.id } }"
          title="Modifier l'article"
          ><button class="btn btn-outline-primary my-2 my-sm-0">
            Modifier l'article
          </button></router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import UserMenu from "../components/UserMenu";
export default {
  name: "Profile",
  components: {
    UserMenu,
  },
  data() {
    return {
      articles: [],
      userId:0,
    };

  },
  mounted() {
    // Récupération des articles dans la base de données
    const API_URL = "http://localhost:8080/api/articles/";
    
    axios
      .get(API_URL)
      .then((response) => {
        this.articles = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>