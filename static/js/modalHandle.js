function toggleModal(modalID) {
    document.getElementById(modalID).classList.toggle('hidden');
    document.getElementById(modalID + "-overlay").classList.toggle('hidden');
    document.querySelector(`#${modalID}-body #username-input`).focus();
    document.querySelector('#login-form #error-message').classList.add('hidden');
}

const loginOnclick = () => {
    const loginLink = document.getElementById('login-link')
    loginLink.addEventListener('click', () => toggleModal('login-modal'))
}

const logoutOnclick = () => {
    const logoutLink = document.getElementById('logout-link')
    logoutLink.addEventListener('click', () => {
        console.log('logout')
        localStorage.removeItem('token')
        authHandler()
    })
}

//run first
function authHandler() {
    const token = localStorage.getItem('token');
    const authSection = document.getElementById('auth-section');
    if(token){
        console.log("logged");
        authSection.innerHTML= `
        <a href="#" id="logout-link" class="text-white font-semibold">LOGOUT</a>
        `
        logoutOnclick();
    }else{
        console.log("not logged");
        authSection.innerHTML= `
        <a href="#" id="signup-link" class="text-white font-semibold mr-5">SIGN UP</a>
        <a id="login-link" href="#" class="text-white font-semibold">LOGIN</a>`
        loginOnclick();
    }
}

authHandler()

const loginModalCancel = document.getElementById('login-modal-cancel')
loginModalCancel.addEventListener('click', () => toggleModal('login-modal'))

const loginForm = document.getElementById('login-form')
loginForm.onsubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    const username = document.querySelector('#login-form #username-input').value
    const password = document.querySelector('#login-form #password-input').value
    const url = '/dj-rest-auth/login/'
    const data = {username, password}
    
    const auth = async () => {
        try {
            const response = await axios.post(url, data)
            if(response.status === 200){
                localStorage.setItem('token', response.data.key)
                document.getElementById('login-form').reset()
                toggleModal('login-modal')
                authHandler()
            }
        } catch (error) {
            console.log(error.response.data)
            const errorMessage = document.querySelector('#login-form #error-message')
            errorMessage.innerHTML = 'Username and password are incorrect'
            errorMessage.classList.remove('hidden')
        }

    }
    auth()
    
}


