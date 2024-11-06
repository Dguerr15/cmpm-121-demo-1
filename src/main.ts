import "./style.css";
// SETUP AND INITIALIZATION
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dino Wrangler";
document.title = gameName;

let counter: number = 0; // keeps count of dinos
const interval: number = 1000; // how often I want a dino to auto add
let growthRate: number = 1; // how much faster it adds dinos automatically

interface Item {
  name: string;
  cost: number;
  rate: number;
  bought: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "intern",
    cost: 10,
    rate: 0.1,
    bought: 0,
    description:
      "A dino enthusiast intern to round up dinos for you. Increases your dino count slowly but steadily.",
  },
  {
    name: "amateur",
    cost: 100,
    rate: 2,
    bought: 0,
    description:
      "An amateur dino wrangler. They're better at this than you'd think, adding dinos at a faster pace!",
  },
  {
    name: "professional",
    cost: 1000,
    rate: 50,
    bought: 0,
    description:
      "A certified professional dino wrangler. This expert floods your ranch with dinos in no time!",
  },
  {
    name: "super dino wizard",
    cost: 10000,
    rate: 200,
    bought: 0,
    description:
      "A mystical Super Dino Wizard! He uses ancient magic to summon dinos from the ether, making them appear out of nowhere!",
  },
  {
    name: "Owen Grady",
    cost: 100000,
    rate: 5000,
    bought: 0,
    description:
      "The legendary velociraptor trainer himself! Owen Grady can train entire packs of dinos, boosting your dino count dramatically!",
  },
];

// UI CREATION
const createDiv = (text: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.innerHTML = text;
  return div;
};

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// creating div to display counter
const counterDiv = createDiv("${counter.toFixed(2)} dino's 🦕");
app.append(counterDiv);

// creating div to display growth rate
const growthRateDiv = createDiv(`Adding ${growthRate} dino's 🦕 per second`);
app.append(growthRateDiv);

// creating div to display how many of each upgrade bought
const upgradeDiv = createDiv("");
app.append(upgradeDiv);

// creating dino clicking button
const clickButton = document.createElement("button");
clickButton.innerHTML = "🦕";
clickButton.style.display = "block";
clickButton.style.fontSize = "2em";
clickButton.style.margin = "auto";
clickButton.style.width = "20%";
clickButton.style.height = "100px";
// increase counter when button clicked
clickButton.addEventListener("click", () => {
  counter++;
  updateCounter();
});
app.append(clickButton);
// button creation
const buttons: HTMLButtonElement[] = availableItems.map(createItemButton);
buttons.forEach((button) => app.append(button));

// creating buttons function
function createItemButton(item: Item): HTMLButtonElement {
  const buyButton = document.createElement("button");
  buyButton.textContent = `Pay another ${item.name} for ${item.cost.toFixed(3)} dino's 🦕`;
  buyButton.disabled = true;
  buyButton.title = item.description;

  buyButton.addEventListener("click", () => handleBuyItem(item));

  return buyButton;
}

function handleBuyItem(item: Item) {
  if (counter >= item.cost) {
    counter -= item.cost;
    growthRate += item.rate;
    item.bought++;
    item.cost *= 1.15;
    updateCounter();
  }
}

// function to update counter
const updateCounter = () => {
  counterDiv.innerHTML = `Total dino 🦕 count: ${counter.toFixed(2)}`;
  growthRateDiv.innerHTML = `Adding ${growthRate.toFixed(1)} dino's 🦕 per second`;

  // getting the names and how many were bought from the item interface then joining into one div
  upgradeDiv.innerHTML = availableItems
    .map((item) => `${item.name}s: ${item.bought}`)
    .join(", ");

  // Update each button's label and state
  availableItems.forEach((item, index) => {
    buttons[index].innerHTML =
      `Pay another ${item.name} for ${item.cost.toFixed(3)} dino's 🦕`;
    buttons[index].disabled = counter < item.cost;
  });
};

// logic for increasing counter by decimals
let lastTime: number | null = null;
function step(timestamp: number) {
  if (lastTime === null) {
    lastTime = timestamp;
  }
  const elapsedTime = timestamp - lastTime;
  counter += (elapsedTime / interval) * growthRate;
  updateCounter();
  lastTime = timestamp;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);
