
//LeaderBoard Logic
document.addEventListener("DOMContentLoaded", () => {
  const leaderboardBody = document.querySelector("#leaderboardBody");
  if (leaderboardBody) {
    const users = JSON.parse(localStorage.getItem("users")) || {};

    //Filter data to show only scores and sort them
    const sorted = Object.entries(users)
      .filter(([name, data]) => data.bestTime)
      .sort((a, b) => a[1].bestTime - b[1].bestTime);

    //Enter data to the HTML row
    leaderboardBody.innerHTML = sorted
      .map(([name, data]) => `<tr><td>${name}</td><td>${data.bestTime.toFixed(1)}s</td></tr>`)
      .join("");
  }
  //If the User has no BestTime yet.
  if (sorted.length === 0) {
    leaderboardBody.innerHTML = "<tr><td colspan='2'>No scores yet!</td></tr>";
  }
});