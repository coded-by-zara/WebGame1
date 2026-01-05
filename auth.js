//Better Memory, JavaScript file//
//Defining variables
document.addEventListener("DOMContentLoaded", () => {
    const regSection = document.getElementById("regSection");
    const loginSection = document.getElementById("loginSection");
    const regBtn = document.getElementById("regBtn");
    const taketoLogin = document.getElementById("taketoLogin");
    const loginBtn = document.getElementById("loginBtn");
    const backToRegister = document.getElementById("backToRegister");
    const msgOfReg = document.getElementById("msgOfReg");
    const msgOfLogin = document.getElementById("msgOfLogin");


    //Registration Section//
    if (regBtn) {
        regBtn.addEventListener("click", () => {
            const user = document.querySelector("#userName").value.trim();
            const pass = document.querySelector("#userPass").value.trim();
            const email = document.querySelector("#userEmail").value.trim();
            const number = document.querySelector("#userNumber").value.trim();

            //Regex validation
            const userRegex = /^[A-Za-z0-9_]{6,12}$/;
            const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const numberRegex = /^\+?\d{10,15}$/;
            //Username Validation
            if (!userRegex.test(user)) {
                msgOfReg.textContent = " Username must be 6-12 letters/number only";
                msgOfReg.style.color = "red";
                return;
            }
            //Password Validation
            if (!passRegex.test(pass)) {
                msgOfReg.textContent = "Password must have atleast 8 characters & 1 number.";
                msgOfReg.style.color = "red";
                return;
            }
            //Email Validation
            if (!emailRegex.test(email)) {
                msgOfReg.textContent = " Enter a valid email address.";
                msgOfReg.style.color = "red";
                return;
            }
            //Number Validation                       
            if (!numberRegex.test(number)) {
                msgOfReg.textContent = " Enter a valid Phone Number.";
                msgOfReg.style.color = "red";
                return;
            }
            // Check if user already exists
            let users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[user]) {
                msgOfReg.textContent = "User already exists!";
                msgOfReg.style.color = "pink";
                return;
            }
            //Store data of the User in Local Storage
            users[user] = {
                password: pass,
                bestTime: null,
                email: email,
                number: number,
            };
            localStorage.setItem("users", JSON.stringify(users));

            //After storing, notify user's successfull registration
            msgOfReg.textContent = "✅ Registration Is Successfull";
            msgOfReg.style.color = "green";
            
            //Remove Demo Settings
            setTimeout(() => {
            localStorage.removeItem("demoMode");
            window.location.href = "game.html";
            }, 1000);

            //Redirection-Take to Game page
            setTimeout(() => { window.location.href = "game.html"; }, 1000);
        }
        );
    }


    //Switch between Registration and Login Page
    //Take to login page by hiding Registration page

    if (taketoLogin) {
        taketoLogin.addEventListener("click", () => {
            regSection.classList.add("hidden");
            loginSection.classList.remove("hidden");
        });
    }


    //Take back to Registration page by hiding Login page
    if (backToRegister) {
        backToRegister.addEventListener("click", () => {
            loginSection.classList.add("hidden");
            regSection.classList.remove("hidden");
        });
    }


    //Login Section
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.querySelector("#username").value.trim();
            const password = document.querySelector("#password").value.trim();
            const msgOfLogin = document.querySelector("#msgOfLogin");
            const users = JSON.parse(localStorage.getItem("users")) || {};

            //Does this username already exist?
            if (!users[username]) {
                msgOfLogin.textContent = "User does not exist!"
                msgOfLogin.style.color = "red";
                return;
            }
            //Check if password matches
            if (users[username].password !== password) {
                msgOfLogin.textContent = "Wrong Password!"
                msgOfLogin.style.color = "red";
                return;
            }
            //login successfull
            msgOfLogin.textContent = "Login successful!";
            msgOfLogin.style.color = "green";

            //Remove demo setting
            setTimeout(() => {
            localStorage.removeItem("demoMode");
            window.location.href = "game.html";
            }, 1000);
            localStorage.setItem("currentUser", username);



            //Redirection-Take to Game page
            setTimeout(() => { window.location.href = "game.html"; }, 1000);
        });
    }
});





