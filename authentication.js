//if local storage is empty, create a new array
if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]))
}


function getUser(email) {
    let users = JSON.parse(localStorage.getItem("users"))
    let user = users.find(user => user.email === email)
    return user
}

function emailExists(email) {
    let users = JSON.parse(localStorage.getItem("users"))
    let user = users.find(user => user.email === email)
    return user !== undefined
}

function login(form) {
    let email = form.elements["email"].value
    let password = form.elements["password"].value

    let user = getUser(email)
    if (user && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify(user.username))
        window.location.href = "index.html"
    } else {
        alert("Invalid credentials")
    }
 }

 function register(form) {
    let username = form.elements["username"].value
    let email = form.elements["email"].value
    let password = form.elements["password"].value
    let repeatPassword = form.elements["password_repeat"].value
    
    if (emailExists(email)) {
        alert("Email already exists")
        return
    }

    if (password !== repeatPassword) {
        alert("Passwords do not match")
        return
    }

    let users = JSON.parse(localStorage.getItem("users"))
    users.push({username, email, password})

    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(username))
    window.location.href = "index.html"


}
function logout() {
    localStorage.removeItem('currentUser')
    window.location.href = "login.html"
}

 
