<template>
  <div class="login_signup_setup text-center">
    <br />
    <h2>Rédiger un nouvel message</h2>
    <form v-on:submit.prevent="add" class="form">
      <div class="form__cartouche">
        <label class="form-label" for="titre">Titre de l'message:</label>
        <div class="mb-3">
          <input
            type="text"
            id="titre"
            name="titre"
            class="form__input"
            required
            v-model="message.titre"
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
            v-model="message.description"
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
      message: {
        user_id: 0,
        titre: "",
        description: "",
      },
      messageId: 0,
    };
  },
  methods: {
    add() {
      // Récupération User ID pour l'message
      let token = localStorage.getItem("token");
      if (token) {
        let decode = jwt_decode(token);
        console.log(decode.id);
        this.message.user_id = decode.id;
      }

      // On créé l'objet qui sera envoyé à la base de données
      let data = {
        title: this.message.titre,
        description: this.message.description,
        user_id: this.message.user_id,
      };

      if (this.messageId != 0) {
        // Modification de l'message dans l'API
        data.id = this.messageId;
        const API_URL = "http://localhost:8080/api/messages/" + data.id;

        axios
          .put(API_URL, data)
          .then((response) => {
            console.log(response);
            this.$router.push("/wall");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // Création du nouvel message dans l'API
        const API_URL = "http://localhost:8080/api/messages/";

        axios
          .post(API_URL, data)
          .then((response) => {
            console.log(response);
            this.$router.push("/wall");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    // Récupération de l'ID de l'message à modifier
    if (this.$route.params.id) {
      const API_URL = "http://localhost:8080/api/messages/";

      axios
        .get(API_URL + this.$route.params.id)
        .then((response) => {
          // Mise en place des datas dans le formulaire
          this.message.titre = response.data.title;
          this.message.description = response.data.description;
          this.message.user_id = response.data.userId;
          this.messageId = response.data.id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>