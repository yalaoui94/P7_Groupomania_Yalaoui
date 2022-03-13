<template>
  <div class="login_signup_setup text-center">
    <br />
    <h2>Rédiger un nouvel article</h2>
    <form v-on:submit.prevent="add" class="form">
      <div class="form__cartouche">
        <label class="form-label" for="titre">Titre de l'article:</label>
        <div class="mb-3">
          <input
            type="text"
            id="titre"
            name="titre"
            class="form__input"
            required
            v-model="article.titre"
          />
        </div>
      </div>
      <div class="form__cartouche">
        <label class="form-label" for="description">Votre texte:</label>
        <div class="mb-3">
          <input
            type="text"
            id="description"
            name="description"
            class="form__input"
            required
            v-model="article.description"
          />
        </div>
      </div>
      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  name: "Modif",
  data() {
    return {
      article: {
        user_id: 0,
        titre: "",
        description: "",
      },
      articleId: 0,
    };
  },
  methods: {
    add() {
      // Récupération User ID pour l'article
      let token = localStorage.getItem("token");
      if (token) {
        let decode = jwt_decode(token);
        console.log(decode.id);
        this.article.user_id = decode.id;
      }

      // On créé l'objet qui sera envoyé à la base de données
      let data = {
        title: this.article.titre,
        description: this.article.description,
        user_id: this.article.user_id,
      };

      if (this.articleId != 0) {
        // Modification de l'article dans l'API
        data.id = this.articleId;
        const API_URL = "http://localhost:8080/api/articles/" + data.id;

        axios
          .put(API_URL, data)
          .then((response) => {
            console.log(response);
            this.$router.push("/profile");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // Création du nouvel article dans l'API
        const API_URL = "http://localhost:8080/api/articles/";

        axios
          .post(API_URL, data)
          .then((response) => {
            console.log(response);
            this.$router.push("/profile");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    // Récupération de l'ID de l'article à modifier
    if (this.$route.params.id) {
      const API_URL = "http://localhost:8080/api/articles/";

      axios
        .get(API_URL + this.$route.params.id)
        .then((response) => {
          // Mise en place des datas dans le formulaire
          this.article.titre = response.data.title;
          this.article.description = response.data.description;
          this.article.user_id = response.data.userId;
          this.articleId = response.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>