class WsConnection {
    constructor() {
        this.isReady = false
        this.connection = null
    }

    init() {
        this.connection = new WebSocket('ws://127.0.0.1:8090');

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
        this.connection.send(JSON.stringify({
            name: packetName,
            hash: hash,
            data: data
        }));

        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => {
                reject('Превышено время ожидания')
            }, 5 * 1000) //отменить, если превышено время ожидания
            this.connection.onmessage = message => {
                message = JSON.parse(message.data)
                if (message.hash === hash) {
                    clearTimeout(timeout)
                    resolve(message)
                }
            }
        })
    }
}

const wsConnection = new WsConnection()

export default wsConnection