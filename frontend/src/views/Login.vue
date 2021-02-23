<template>
    <v-card
            min-width="375"
    >
        <v-card-title>Вход</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="loginSend" ref="loginForm" v-model="valid">
                <p v-if="msg" class="red--text">{{ msg }}</p>
                <v-text-field
                        v-model="login"
                        label="Логин"
                        :counter="32"
                        :rules="loginRules"
                />
                <v-text-field
                        v-model="password"
                        label="Пароль"
                        :counter="32"
                        :rules="loginRules"
                        type="password"
                />
                <v-btn type="submit" class="mt-3">Войти</v-btn><router-link class="ml-3" to="/reg">Нет аккаунта?</router-link>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapMutations} from "vuex";
    import wsConnection from "../plugins/wsConnection";

    export default {
        name: "Login",
        methods: {
            ...mapMutations('auth', ['SET_USER']),
            loginSend() {
                this.$refs['loginForm'].validate()
                if (this.valid) {
                    wsConnection.send('login', {
                        login: this.login,
                        password: this.password,
                    }).then((data) => {
                        if (data.result === true) {
                            this.SET_USER(data.student)
                            this.$router.push('/cabinet')
                        } else {
                            this.msg = "Неверный логин или пароль"
                        }
                    })
                }
            }
        },
        data() {
            return {
                valid: false,
                msg: "",
                login: "",
                loginRules: [
                    v => !!v || 'Поле обязательно для заполнения',
                    v => v.length <= 32 || 'Максимальная длина строки 32 символа'
                ],
                password: "",
            }
        }
    }
</script>

<style scoped>

</style>