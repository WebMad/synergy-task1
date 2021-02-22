<template>
    <v-card min-width="375">
        <v-card-title>Личный кабинет</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="save">
                <p v-if="msg" :class="msgType">{{ msg }}</p>
                <v-text-field label="Фамилия" :rules="rules" counter="32" v-model="lastName"/>
                <v-text-field label="Имя" :rules="rules" counter="32" v-model="firstName"/>
                <v-text-field label="Отчество" :rules="rules" counter="32" v-model="secondName"/>
                <v-text-field label="Логин" :rules="rules" counter="32" v-model="login"/>
                <v-text-field label="Серия паспорта" :rules="serialRules" counter="4" v-model="serialPassport"/>
                <v-text-field label="Номер паспорта" :rules="numberRules" counter="6" v-model="numberPassport"/>
                <h2>Смена пароля:</h2>
                <v-text-field type="password" :rules="passwordRules" v-model="lastPassword" counter="32"
                              label="Старый пароль"></v-text-field>
                <v-text-field type="password" :rules="passwordRules" v-model="newPassword" counter="32"
                              label="Новый пароль"></v-text-field>
                <v-btn type="submit" @click="save">Изменить</v-btn>
                <router-link class="ml-3" to="/">На главную</router-link>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import wsConnection from "../plugins/wsConnection";

    export default {
        name: "User",
        data() {
            return {
                msgType: "red--text",
                msg: "",
                login: "",
                lastPassword: "",
                newPassword: "",
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
                passwordRules: [
                    v => v.length <= 32 || 'Максимальная длина строки 32 символа'
                ],
                numberRules: [
                    v => (!!v) || 'Обязательное поле',
                    v => !isNaN(v) || 'Только цифры',
                    v => v.length === 6 || '6 символов'
                ],
            }
        },
        created() {
            this.login = this.getUser.login
            this.password = this.getUser.password
            this.lastName = this.getUser.lastName
            this.firstName = this.getUser.firstName
            this.secondName = this.getUser.secondName
            this.serialPassport = this.getUser.serialPassport
            this.numberPassport = this.getUser.numberPassport
        },
        computed: {
            ...mapGetters('auth', ['getUser'])
        },
        methods: {
            ...mapMutations('auth', ['SET_USER']),
            save() {
                wsConnection.send('edit', {
                    login: this.login,
                    password: this.password,
                    lastName: this.lastName,
                    firstName: this.firstName,
                    secondName: this.secondName,
                    serialPassport: this.serialPassport,
                    numberPassport: this.numberPassport,
                    lastPassword: this.lastPassword,
                    newPassword: this.newPassword
                }).then((data) => {
                    if (data.result) {
                        this.SET_USER(data.student)
                        this.msg = 'Сохранено'
                        this.msgType = 'green--text'
                        this.lastPassword = ''
                        this.newPassword = ''
                    } else {
                        this.msg = data.msg
                        this.msgType = 'red--text'
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>