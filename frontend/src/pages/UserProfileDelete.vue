<template>
	<div id="card">
    <div class="card-body">
      <h1 class="card-title">Votre compte à bien été supprimé !</h1>
      <p class="fs-5">Souhaitez-vous vous réinscrire ? <router-link :to="`/signup`"><span class="text-primary">S'inscrire</span></router-link></p>
    </div>
	</div>
</template>

<script>
export default {
  name: "UserProfileDelete",
}
</script>