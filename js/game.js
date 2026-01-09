const storyText = document.getElementById("storyText");
const choicesDiv = document.getElementById("choices");
const sanityText = document.getElementById("sanity");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const titleCard = document.getElementById("titleCard");
const episodeTitle = document.getElementById("episodeTitle");

const endingsList = document.getElementById("endingsList");

let sanity = 100;
let endingsUnlocked = new Set();
let endingDescriptions = {}; // Store ending text

const episodeTitles = {
  start: "EPISODE 1 — THE CORRIDOR",
  chapter2: "EPISODE 2 — THE ROOMS",
  chapter3: "EPISODE 3 — THE PRESENCE",
  chapter4: "EPISODE 4 — THE TRUTH"
};

// SANITY UI
function updateSanityUI() {
  game.classList.remove("sanity-high","sanity-mid","sanity-low","sanity-critical");
  if (sanity > 70) game.classList.add("sanity-high");
  else if (sanity > 40) game.classList.add("sanity-mid");
  else if (sanity > 15) game.classList.add("sanity-low");
  else game.classList.add("sanity-critical");
}

// START EPISODE
function startEpisode(node) {
  sanity = 100;
  sanityText.textContent = sanity;
  updateSanityUI();

  menu.style.display = "none";
  game.style.display = "none";

  episodeTitle.textContent = episodeTitles[node];
  titleCard.style.display = "flex";

  setTimeout(() => {
    titleCard.style.display = "none";
    game.style.display = "block";
    showStory(node);
  }, 3000);
}

// SHOW STORY NODE
function showStory(node) {
  const data = story[node];
  storyText.textContent = data.text;
  choicesDiv.innerHTML = "";

  if (!data.choices || data.choices.length === 0) {
    unlockEnding(node);
    return;
  }

  data.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      sanity += choice.sanity;
      sanityText.textContent = sanity;
      updateSanityUI();

      if (sanity <= 0) unlockEnding("gameOver");
      else showStory(choice.next);
    };
    choicesDiv.appendChild(btn);
  });
}

// UNLOCK ENDING
function unlockEnding(node) {
  let endingTitle;
  let endingDesc;

  if (node === "gameOver") {
    endingTitle = "THE LOOP";
    endingDesc = "Your mind fractures. The corridor no longer needs you.";
  } else if (node === "escapeEnding") {
    endingTitle = "ESCAPE";
    endingDesc = "You manage to escape. The corridor fades behind you.";
  } else if (node === "possessedEnding") {
    endingTitle = "POSSESSED";
    endingDesc = "The corridor claims you. You are now part of its shadows.";
  } else {
    endingTitle = node.replace(/chapter/i, "ENDING ").toUpperCase();
    endingDesc = story[node].text;
  }

  endingsUnlocked.add(endingTitle);
  endingDescriptions[endingTitle] = endingDesc;
  updateEndingsStats();

  game.style.display = "none";
  menu.style.display = "block";
}

// UPDATE ENDINGS STATS (INLINE BULLETS)
function updateEndingsStats() {
  endingsList.innerHTML = "";

  endingsUnlocked.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e}: ${endingDescriptions[e]}`; // Inline description
    endingsList.appendChild(li);
  });
}