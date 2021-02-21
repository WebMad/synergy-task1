<template>
    <v-card
            min-width="375"
    >
        <v-card-title>Регистрация</v-card-title>
        <v-card-text>
            <v-form lazy-validation>

                <v-text-field
                        :rules="rules"
                        v-model="login"
                        :counter="32"
                        label="Логин"
                />
                <v-text-field
                        :rules="rules"
                        :counter="32"
                        v-model="lastName"
                        label="Фамилия"
                />
                <v-text-field
                        :rules="rules"
                        :counter="32"
                        v-model="firstName"
                        label="Имя"
                />
                <v-text-field
                        :rules="rules"
                        :counter="32"
                        v-model="secondName"
                        label="Отчество"
                />
                Паспортные данные:
                <v-row>
                    <v-col>
                        <v-text-field
                                label="Серия"
                                v-model="serialPassport"
                                :counter="4"
                                :rules="serialRules"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                                label="Номер"
                                v-model="numberPassport"
                                :counter="6"
                                :rules="numberRules"
                        />
                    </v-col>
                </v-row>
                <v-btn class="mt-3">Создать</v-btn>
                <router-link class="ml-3" to="/login">Уже есть аккаунт?</router-link>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Reg",
        data() {
            return {
                login: "",
                password: "",
                lastName: "",
                firstName: "",
                secondName: "",
                rules: [
                    v => !!v || 'Поле обязательно для заполнения',
                    v => v.length <= 32 || 'Максимальная длина строки 32 символа'
                ],
                serialPassport: "",
                serialRules: [
                    v => !!v || 'Обязательное поле',
                    v => !isNaN(v) || 'Только цифры',
                    v => v.length === 4 || '4 символа'
                ],
                numberPassport: "",
                numberRules: [
                    v => (!!v) || 'Обязательное поле',
                    v => !isNaN(v) || 'Только цифры',
                    v => v.length === 6 || '6 символов'
                ],
            }
        }
    }
</script>

<style scoped>

</style>