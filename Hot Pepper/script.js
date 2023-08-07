const pickupLines = {
  1: [
    "Are you a Wi-Fi signal? Because I'm feeling a connection.",
    "Do you have a map? I just got lost in your eyes.",
    "Are you made of copper and tellurium? Because you're Cu-Te.",
  ],
  2: [
    "Are you a campfire? Because you're hot and I want s'more.",
    "Is your name Google? Because you have everything I've been searching for.",
    "Are you a bank loan? Because you have my interest.",
  ],
  3: [
    "Are you a volcano? Because I lava you.",
    "Do you have a name, or can I call you mine?",
    "Do you believe in love at first swipe?",
  ],
};

const spicinessSlider = document.getElementById("spiciness-slider");
const spicinessLevel = document.getElementById("spiciness-level");
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");
const pickupLineDisplay = document.getElementById("pickup-line-display");

spicinessSlider.addEventListener("input", () => {
  const spiciness = parseInt(spicinessSlider.value);
  spicinessLevel.textContent = getSpicinessText(spiciness);
});

generateButton.addEventListener("click", () => {
  const spiciness = parseInt(spicinessSlider.value);
  const randomIndex = Math.floor(Math.random() * pickupLines[spiciness].length);
  const randomPickupLine = pickupLines[spiciness][randomIndex];
  pickupLineDisplay.textContent = randomPickupLine;
  copyButton.removeAttribute("disabled");
});

copyButton.addEventListener("click", () => {
  const textToCopy = pickupLineDisplay.textContent;
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
});

function getSpicinessText(spiciness) {
  switch (spiciness) {
    case 1:
      return "Mild";
    case 2:
      return "Medium";
    case 3:
      return "Spicy";
    default:
      return "Mild";
  }
}
