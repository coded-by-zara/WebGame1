//GAME LOGIC
//Create Emojis for Matching Games
document.addEventListener("DOMContentLoaded", () => {
  const emojis = ["🍓", "🐰", "🌸", "🦋", "🍒", "🐶", "🍎", "🐱"];
  let board = [];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let startTime, timerInterval;
  let computerTurn = false;
  let mode = "player";


  //Defining variables
  const boardElement = document.getElementById("board");
  const statusText = document.getElementById("statusText");
  const btnStart = document.getElementById("btnStart");
  const goBackBtn = document.getElementById("goBackBtn");
  const leaderboardBtn = document.getElementById("leaderboardBtn");
  const restartBtn = document.getElementById("restartBtn");

  //When User Starts Playing Game

  // Check if it's demo mode
  // DEMO MODE HANDLING
  const demoMode = localStorage.getItem("demoMode") === "true";

  if (demoMode) {
    const demoMessage = document.getElementById("demoMessage");
    if (demoMessage) {
      demoMessage.textContent = "🎮 You’re playing the DEMO version — solo mode only, leaderboard, logout, & settings are disabled!";
      demoMessage.classList.remove("hidden");
    }

    //Disable leaderboard button
    const leaderboardBtn = document.getElementById("leaderboardBtn");
    if (leaderboardBtn) {
      leaderboardBtn.disabled = true;
      leaderboardBtn.style.opacity = "0.6";
      leaderboardBtn.style.cursor = "not-allowed";
    }

    //Disable computer mode
    const computerOption = document.querySelector('input[value="computer"]');
    if (computerOption) {
      computerOption.disabled = true;
      computerOption.parentElement.style.opacity = "0.5";
    }

    //Disable logout button if it exists
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.disabled = true;
      logoutBtn.style.opacity = "0.6";
      logoutBtn.style.cursor = "not-allowed";
    }

    // 🎮 Make sure only solo mode works
    const soloOption = document.querySelector('input[value="player"]');
    if (soloOption) soloOption.checked = true;
  }


  function startGame() {
    //Buttons appear and disappear
    restartBtn.style.display = "inline-block";
    goBackBtn.style.display = "inline-block";
    btnStart.style.display = "none";
    leaderboardBtn.style.display = "none";

    //Clear Board and Double the Emojis
    boardElement.innerHTML = "";
    const doubleEmojis = [...emojis, ...emojis];

    //Place Them Randomly
    board = doubleEmojis.sort(() => 0.5 - Math.random());

    //Loop through Each Emojis and Store the value
    board.forEach((emoji) => {
      const tile = document.createElement("div");
      tile.classList.add("card-tile");
      tile.dataset.emoji = emoji;
      tile.addEventListener("click", handleFlip);
      boardElement.appendChild(tile);
    });


    //Resets the Variables
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    computerTurn = false;
    startTime = Date.now();
    //Reset Time when users restart
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    statusText.textContent = "Stay Focused 🍀";
  }

  //Keep updating and storing the time
  function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    localStorage.setItem("currentTime", currentTime);
  }

  //Card Flipping
  function handleFlip() {
    if (lockBoard) return;
    if (this.classList.contains("flipped")) return;
    this.classList.add("flipped");
    this.textContent = this.dataset.emoji;
    //Store Cards value
    if (!firstCard) {
      firstCard = this;
      return;
    }
    secondCard = this;
    checkMatch();
  }

  //Check if Cards match
  function checkMatch() {
    lockBoard = true;
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    if (isMatch) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      resetFlip();
      if (isGameWon()) endGame();
      else if (mode === "computer" && !computerTurn) setTimeout(computerPlay, 1000);
    }

    //If cards dont match, flip again
    else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
        resetFlip();
        //If computer mode is on, let computer play after delay
        if (mode === "computer" && !computerTurn) setTimeout(computerPlay, 1000);
      }, 1000);
    }
  }


  //Reset the Board
  function resetFlip() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  //If all cards are matched, it is a Win
  function isGameWon() {
    return document.querySelectorAll(".card-tile.matched").length === board.length;
  }

  //When Game Ends
  function saveToLeaderboard(username, timeTaken) {
  if (localStorage.getItem("demoMode") === "true") return; // 🚫 Don't save in demo mode

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name: username, time: timeTaken });

  // Sort by best (lowest) time
  leaderboard.sort((a, b) => a.time - b.time);

  // Keep only top 10
  leaderboard = leaderboard.slice(0, 10);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

  function endGame() {
    //Hide Buttons
    restartBtn.style.display = "none";
    //Again reset the time and store it
    clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const currentUser = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || {};
    //If existing user has new best time score
    if (currentUser && users[currentUser]) {
      const best = users[currentUser].bestTime || Infinity;
      if (totalTime < best) {
        users[currentUser].bestTime = totalTime;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
    //Show Winning message
    statusText.textContent = `🎉 You won in ${totalTime}s!`;
  }

  //COMPUTER PLAYER LOGIC
  //Flip only unflipped cards
  function computerPlay() {
    computerTurn = true;
    const unmatched = [...document.querySelectorAll(".card-tile:not(.matched):not(.flipped)")];
    if (unmatched.length < 2) {
      computerTurn = false;
      return;
    }

    //Flip cards randomly
    const [card1, card2] = getTwoRandomCards(unmatched);
    flipCard(card1);
    setTimeout(() => flipCard(card2), 700);
  }

  function getTwoRandomCards(cards) {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
  }

  function flipCard(card) {
    if (card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    card.textContent = card.dataset.emoji;

    if (!firstCard) {
      firstCard = card;
    }
    else {
      secondCard = card;
      setTimeout(() => {
        const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
        //If cards matched
        if (isMatch) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          resetFlip();
          if (isGameWon()) endGame();

          //Keep playing until cards dont match
          else setTimeout(computerPlay, 1000);
        }

        //if cards do not match, users turn to play
        else {
          setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.textContent = "";
            resetFlip();
            computerTurn = false;
            statusText.textContent = "Your turn! 🍀";
          }, 800);
        }
      }, 600);

      saveToLeaderboard(localStorage.getItem("loggedInUser"), elapsedTime);

    }
  }

  //BUTTON LISTENERS
  btnStart?.addEventListener("click", () => {
    mode = document.querySelector('input[name="mode"]:checked').value;
    startGame();
  });
  restartBtn.addEventListener("click", () => {
    startGame()
  });
  goBackBtn.addEventListener("click", () => {
    window.location.href = "game.html";
  });
});