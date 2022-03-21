<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/home" class="nav-link">
          <img src="./assets/logo(1).png" class="navbar-brand logo"  alt="Logo de groupomania"/>
        </router-link>
        <div class="d-flex"></div>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>



<style>
.logo {
  height: 45px;
  width: auto;
}
.navbar {
  box-shadow: 0px 10px 20px #c0c0c0;
}



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