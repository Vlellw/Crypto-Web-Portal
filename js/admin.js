const a1 = Math.floor(100 + Math.random() * 900).toString();
function check_admin_password() {
    let pass = document.getElementById("admin_pass").value;
    if (pass === a1) {
        window.location.href = "index.html?admin=true";
    } else {document.getElementById("admin_msg").innerHTML = "Incorrect password! (Hint: " + a1 + ")"}
}

let a = document.getElementById("admin_login_btn");
if (a) {a.addEventListener("click", check_admin_password)}