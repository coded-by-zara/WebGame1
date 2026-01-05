
//An Animated background for the Game
//Creating the animation Using For loop and Array
document.addEventListener("DOMContentLoaded", () => {
    const emojis = ["🍓", "🐰", "🌸", "🦋", "🍒", "🐶", "🍎", "🐱"];
    for (let i = 0; i < 20; i++) {
        const e = document.createElement("div");
        e.classList.add("emoji");
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        e.style.left = Math.random() * 100 + "vw";
        e.style.top = Math.random() * 100 + "vh";
        e.style.animationDuration = 15 + Math.random() * 20 + "s";
        e.style.fontSize = 1.5 + Math.random() * 2.5 + "rem";
        document.body.appendChild(e);
    }
    //Leaderboard displaying from the Navigation Bar
    const leaderboardNav = document.getElementById("leaderboardNav");
    const msgOfIndex = document.getElementById("msgOfIndex");

    leaderboardNav.addEventListener("click", () => {
        const loggedInUser = localStorage.getItem("loggedInUser");

        //If User is Logged in,take to the leaderboard page
        if (loggedInUser) { window.location.href = "leaderboard.html"; }

        //Else show a message saying, User needs to Log in.
        else {
            msgOfIndex.textContent = "⚠️ You need to log in to view your scores!";
            msgOfIndex.style.color = "red";
        }
    });


    //Game Page displaying from the Navigation Button

    const gameNav = document.getElementById("gameNav");
    const msgOfIndex1 = document.getElementById("msgOfIndex");

    gameNav.addEventListener("click", () => {
        const loggedInUser = localStorage.getItem("loggedInUser");

        //If User is Logged in,take to the leaderboard page
        if (loggedInUser) { window.location.href = "game.html"; }

        //Else show a message saying, User needs to Log in.
        else {
            msgOfIndex.textContent = "⚠️ You need to log in to get acess to the Game Page! or you can try the Demo Game;)";
            msgOfIndex.style.color = "red";
        }
    });

    // 🎮 Demo Mode Access
    const demoBtn = document.getElementById("demoBtn");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            localStorage.setItem("demoMode", "true");
            window.location.href = "game.html";
        });
    }

});