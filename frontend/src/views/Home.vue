<template>
  <v-card>
    <v-card-title>Вариантов не так много :)</v-card-title>
    <v-card-text>
      <p v-if="!isAuth"><router-link to="/login">Войти</router-link></p>
      <p v-if="!isAuth"><router-link to="/reg">Создать аккаунт</router-link></p>
      <p v-if="isAuth"><router-link to="/cabinet">В личный кабинет</router-link></p>
      <p v-if="isAuth"><a href="#" @click="SET_USER(null)">Выйти</a></p>
    </v-card-text>
  </v-card>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Home',
  components: {
  },
  methods: {
    ...mapMutations('auth', ['SET_USER'])
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  }
}
</script>
