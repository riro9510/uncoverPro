// Lista de palabras dispersas
const scatteredWordsList = [
  "Proactivity", "Discipline", "Leadership", "Creativity", "Integrity",
  "Proactividad", "Disciplina", "Liderazgo", "Integridad",
  "Créativité", "Leadership", "Disziplin", "Kreativität",
  "Responsabilità", "Colaboração", "责任", "リーダーシップ",
  "उत्तरदायित्व", "اخلاق", "قيادة", "ответственность"
];


const centralPhrasesList = [
  "Discover your potential",
  "Take your skills to the next level",
  "Uncover your professional side",
  "UncoverPro"
];

const scatteredContainer = document.getElementById("scattered-words");
const centralPhrasesContainer = document.getElementById("central-phrases");
const mainContent = document.querySelector(".hidden");
const splashScreen = document.getElementById("splash-screen");


function createScatteredWords() {
  const centerXMin = 30; 
  const centerXMax = 70; 
  const centerYMin = 40; 
  const centerYMax = 60;

  scatteredWordsList.forEach(word => {
    const span = document.createElement("span");
    span.textContent = word;

    let top, left;
    do {
      top = Math.random() * 90; 
      left = Math.random() * 90; 
    } while (left >= centerXMin && left <= centerXMax && top >= centerYMin && top <= centerYMax);

    span.style.top = `${top}%`;
    span.style.left = `${left}%`;
    span.style.fontSize = `${1 + Math.random() * 1.5}rem`;

    scatteredContainer.appendChild(span);
  });
}


function showCentralPhrases(index = 0) {
  if (index >= centralPhrasesList.length) {
    splashScreen.style.display = "none";
    mainContent.classList.remove("hidden");
    return;
  }

  centralPhrasesContainer.textContent = centralPhrasesList[index];
  const isLastPhrase = index === centralPhrasesList.length - 1;
  const animationName = isLastPhrase ? "contractFadeOut" : "fadeInOut";

  centralPhrasesContainer.style.animation = "none";
  void centralPhrasesContainer.offsetWidth;
  centralPhrasesContainer.style.animation = `${animationName} 3s ease-in-out forwards`;

  setTimeout(() => {
    showCentralPhrases(index + 1);
  }, 2500);
}
splashScreen.addEventListener("click", (e) => {
  const skipButtonWidth = 60; 
  const skipButtonHeight = 30;
  const rect = splashScreen.getBoundingClientRect();
  
  if (
    e.clientX > rect.right - skipButtonWidth - 20 &&
    e.clientY > rect.top - skipButtonHeight - 20
  ) {
    splashScreen.style.display = "none";
    mainContent.classList.remove("hidden");
  }
});



window.addEventListener("DOMContentLoaded", () => {
  createScatteredWords();
  showCentralPhrases();
});
