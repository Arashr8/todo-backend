function isValidForm(e) {
    e.perventDefault()
    const password = document.getElementById("user-password")
    const confirmed_password = document.getElementById("user-confirmed-password")
    const error_placeholder = document.getElementById("errors")

    //Validate email address
    const email = document.getElementById("user-email")
    if (email.value == "") {
        error_placeholder.innerHTML = "Please insert your email address"
        return false
    }

    if (password.value != confirmed_password.value) {
        error_placeholder.innerHTML = "Passwords is not matched"
        return false
    }

    return true
}