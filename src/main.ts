import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dino Wrangler";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

interface Item {
  name: string;
  cost: number;
  rate: number;
  bought: number;
}

const availableItems: Item[] = [
  { name: "intern", cost: 10, rate: 0.1, bought: 0 },
  { name: "amateur", cost: 100, rate: 2, bought: 0 },
  { name: "profesional", cost: 1000, rate: 50, bought: 0 },
  { name: "super dino wizard", cost: 10000, rate: 200, bought:0},
  { name: "Owen Grady", cost: 100000, rate: 5000, bought:0}
];

let counter: number = 0; // keeps count of dinos
const interval: number = 1000; // how often I want a dino to auto add
let growthRate: number = 1; // how much faster it adds dinos automatically

// creating div to display counter
const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
app.append(counterDiv);

// creating div to display growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.innerHTML = `Adding ${growthRate} dino's 🦕 per second`;
app.append(growthRateDiv);

// creating div to display how many of each upgrade bought
const upgradeDiv = document.createElement("div");
app.append(upgradeDiv);

// creating dino clicking button
const button = document.createElement("button");
button.innerHTML = "🦕";
app.append(button);

// creating buttons with the item interface by mapping each available item
const buttons: HTMLButtonElement[] = availableItems.map((item) => {
  const buyButton = document.createElement("button");
  buyButton.innerHTML = `Pay another ${item.name} for ${item.cost.toFixed(3)} dino's 🦕`;
  buyButton.disabled = true;
  buyButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.bought++;
      item.cost *= 1.15;
      updateCounter();
    }
  });
  app.append(buyButton);
  return buyButton;
});

// function to update counter
const updateCounter = () => {
  counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
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

// increase counter when button clicked
button.addEventListener("click", () => {
  counter++;
  updateCounter();
});

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
