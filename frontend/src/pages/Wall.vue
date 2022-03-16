<template>
  <section>
    <div class="account_setup">
      <br />
      <h2>Bienvenue sur votre espace personnel</h2>
      <UserMenu></UserMenu>
    </div>
    <div>
      <div
        class="card text-center my-4"
        v-for="message in messages"
        :key="message.id"
      >
        <div
          class="
            bg-light
            d-flex
            align-items-center
            justify-content-between
            m-0
            p-1
          "
        >
          <img
            src="../assets/dad_avatar.png"
            alt="profile-photo"
            height="100"
            class="m-0 rounded-circle"
          />
          <span class="small text-dark m-0 p-1">
            Posté par {{ message.userName }}
            , le
            {{ dateTime(message.created) }}
            <router-link
              :to="{ name: 'ModifyMessage', params: { id: message.id } }"
              title="Modifier l'message"
              v-if="userId == message.userId || isAdmin == 1"
            >
              <span
                ><svg
                  class="text-success"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="2em"
                  height="2em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm4.17-5.24l-1.1-1.1c.71-1.33.53-3.01-.59-4.13A3.482 3.482 0 0 0 12 8.5c-.03 0-.06.01-.09.01L13 9.6l-1.06 1.06l-2.83-2.83L11.94 5L13 6.06l-.96.96c1.27.01 2.53.48 3.5 1.44c1.7 1.71 1.91 4.36.63 6.3zm-1.28 1.41L12.06 19L11 17.94l.95-.95a4.97 4.97 0 0 1-3.48-1.46a5.006 5.006 0 0 1-.64-6.29l1.1 1.1c-.71 1.33-.53 3.01.59 4.13c.7.7 1.63 1.04 2.56 1.01L11 14.4l1.06-1.06l2.83 2.83z"
                  /></svg
              ></span>
            </router-link>
          </span>
        </div>
        <div class="card-body">
          <h3 class="card-title fs-3 text-uppercase">{{ message.title }}</h3>
          <p class="card-text fs-5 fw-lighter">
            {{ message.description }}
          </p>
          <router-link
            :to="`/message/${message.id}`"
            title="Voir les commentaires"
            ><button class="btn btn-outline-primary my-2 my-sm-0">
              Voir les commentaires
            </button></router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import UserMenu from "../components/UserMenu";
import moment from 'moment'
export default {
  name: "Wall",
  components: {
    UserMenu,
  },
  data() {
    return {
      messages: [],
      userId: 0,
      isAdmin: 0,
    };
  },
  created() {
    // Récupération du userId dans le localStorage
    let userId = localStorage.getItem("userId");
    this.userId = userId;

    // Récupération du isAdmin dans le localStorage
    let isAdmin = localStorage.getItem('isAdmin');
    this.isAdmin = isAdmin;
    
    // l'appel à l'Api pour récupérer les messages
    const API_URL = "http://localhost:8080/api/messages/";

    axios
      .get(API_URL)
      .then((response) => {
        this.messages = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    dateTime(value) {
      // mettre en forme la date jj-mm-aaaa
      return moment(value).format("DD-MM-YYYY");
    },
  },
};
</script>