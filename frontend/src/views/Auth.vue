<template>
    <v-card
            min-width="375"
    >
        <v-card-title>Вход</v-card-title>
        <v-card-text>
            <v-form v-model="valid">

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
                <v-btn class="mt-3">Войти</v-btn><router-link class="ml-3" to="/reg">Нет аккаунта?</router-link>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Auth",
        data() {
            return {
                valid: false,
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