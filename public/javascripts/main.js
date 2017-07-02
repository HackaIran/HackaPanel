const axios = require('axios')
const App = require('./App')

window.$ = query => document.querySelector(query)
window.$$ = query => document.querySelectorAll(query)

class Auth {
    constructor () {
        this.box = $('.float-box')
        this.username = $('.float-box .username')
        this.loginBtn = $('.float-box button')
        window.onload = this.onReady.bind(this)
        this.remember()
    }
    remember () {
        if (localStorage['username'] !== undefined) {
            this.username.value = localStorage['username']
            this.login(true)
        }
    }
    store (username) {
        localStorage['username'] = username
    }
    onReady () {
        this.box.classList.add('animate')
        this.loginBtn.onclick = () => this.login(false)
        this.username.onkeydown = (e) => { if (e.which === 13) this.login(false) }
    }
    login (usingLocalStorage) {
        this.username.classList.remove('wrong')
        if (this.username.value === '') this.username.classList.add('wrong')
        else {
            axios.post('/login', {
                username: this.username.value
            })
            .then((response) => {
                if (response.data.status == 2) {
                    this.startApp(this.username.value, usingLocalStorage)
                } else {
                    this.username.classList.add('wrong')
                    alert(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    logout () {
        localStorage['username'] = ''
        window.location.reload()
    }
    startApp (username, usingLocalStorage = false) {
        this.box.classList.add('hidden')
        if (usingLocalStorage) {
            this.box.style.display = "none"
        } else {
            setTimeout(() => this.box.style.display = 'none', 1000)
            this.store(username)
        }
        window.app = this.app = new App(this, username)
    }
}
new Auth