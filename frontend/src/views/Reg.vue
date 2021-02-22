<template>
    <v-card
            min-width="375"
    >
        <v-card-title>Регистрация</v-card-title>
        <v-card-text v-if="!registered">
            <v-form @submit.prevent="reg" v-model="valid" ref="regForm">
                <p v-if="msg" class="red--text">{{ msg }}</p>
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
                <v-btn @click="reg" type="submit" :disabled="sending" ref="regBtn" class="mt-3">Создать</v-btn>
                <router-link class="ml-3" to="/login">Уже есть аккаунт?</router-link>
            </v-form>
        </v-card-text>
        <v-card-text v-else>
            <b>Поздравляем, Вы зарегистрированы!</b>
            <p>Ваш пароль: <b>{{ password }}</b></p>
            <router-link to="/cabinet">В личный кабинет</router-link>
        </v-card-text>
    </v-card>
</template>

<script>
    import wsConnection from "../plugins/wsConnection";
    import {mapMutations} from "vuex";

    export default {
        name: "Reg",
        methods: {
            ...mapMutations('auth', ['SET_USER']),
            reg() {
                this.sending = true
                this.$refs['regForm'].validate()
                if (this.valid) {
                    wsConnection.send('reg',{
                        firstName: this.firstName,
                        lastName: this.lastName,
                        secondName: this.secondName,
                        login: this.login,
                        serialPassport: this.serialPassport,
                        numberPassport: this.numberPassport
                    }).then((dataReg) => {
                        this.sending = false
                        if (dataReg.result) {
                            wsConnection.send('login', {
                                login: this.login,
                                password: dataReg.password
                            }).then((data) => {
                                this.registered = true
                                this.password = dataReg.password
                                this.SET_USER(data.student)
                            })
                        } else {
                            this.msg = dataReg.msg
                        }
                    });
                } else {
                    this.sending = false
                }
            }
        },
        data() {
            return {
                valid: false,
                sending: false,
                registered: false,
                msg: "",
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