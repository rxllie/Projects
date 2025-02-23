async function generatePickupLine(spiciness) {
  const prompts = {
    1: "Generate a mild and funny pickup line.",
    2: "Generate a medium spicy pickup line with a flirty tone.",
    3: "Generate a bold and spicy pickup line with confidence.",
  };
  
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      prompt: prompts[spiciness],
      max_tokens: 50,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

const spicinessSlider = document.getElementById("spiciness-slider");
const spicinessLevel = document.getElementById("spiciness-level");
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");
const pickupLineDisplay = document.getElementById("pickup-line-display");

spicinessSlider.addEventListener("input", () => {
  const spiciness = parseInt(spicinessSlider.value);
  spicinessLevel.textContent = getSpicinessText(spiciness);
});

generateButton.addEventListener("click", async () => {
  const spiciness = parseInt(spicinessSlider.value);
  pickupLineDisplay.textContent = "Generating...";
  const pickupLine = await generatePickupLine(spiciness);
  pickupLineDisplay.textContent = pickupLine;
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
