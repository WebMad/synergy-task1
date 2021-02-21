<template>
  <v-app>
    <router-view v-if="isReady" class="mx-auto mt-16"></router-view>
    <p v-else>Загрузка...</p>
  </v-app>
</template>

<script>

import wsConnection from "./plugins/wsConnection";

export default {
  name: 'App',

  components: {
  },

  methods: {
    async startConnection() {
      await wsConnection.init()
      return wsConnection
    }
  },

  created() {
    this.startConnection().then(() => {
      this.isReady = true
      wsConnection.send('sdsds').then((response) => {
        console.log(response.name)
      })
    })
  },

  data: () => ({
    isReady: false
  }),
};
</script>
