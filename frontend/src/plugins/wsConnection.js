import store from '../store/index'
import wsConfig from '../../ws.config.js'

class WsConnection {
    constructor() {
        this.isReady = false
        this.connection = null
    }

    init() {
        this.connection = new WebSocket(`ws://${wsConfig.host}:${wsConfig.port}`);

        this.connection.onclose = () => {
            setTimeout(() => {
                this.init()
            }, 5000)
        }

        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => {
                reject('Превышено время ожидания')
            }, 10 * 1000)
            this.connection.onopen = () => {
                clearTimeout(timeout)
                resolve(this.connection)
            }
        })
    }

    send(packetName, data = {}) {
        const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let obj2Send = {
            name: packetName,
            hash: hash,
            data: data
        }

        if (store.getters['auth/isAuth']) {
            obj2Send.token = store.getters['auth/getToken']
        }

        this.connection.send(JSON.stringify(obj2Send));

        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => {
                reject('Превышено время ожидания')
            }, 5 * 1000) //отменить, если превышено время ожидания
            this.connection.onmessage = message => {
                message = JSON.parse(message.data)
                if (message.hash === hash) {
                    clearTimeout(timeout)
                    resolve(message.data)
                }
            }
        })
    }
}

const wsConnection = new WsConnection()

export default wsConnection