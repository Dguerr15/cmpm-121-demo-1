import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dino Wrangler";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

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

// creating dino clicking button
const button = document.createElement("button");
button.innerHTML = "🦕";
app.append(button);

// creating the 10 cost upgrade button
const buy10Button = document.createElement("button");
buy10Button.innerHTML = "Purchase Upgrade for 10 dino's 🦕";
buy10Button.disabled = true;
app.append(buy10Button);

// creating the 100 cost upgrade button
const buy100Button = document.createElement("button");
buy100Button.innerHTML = "Purchase Upgrade for 100 dino's 🦕";
buy100Button.disabled = true;
app.append(buy100Button);

// creating the 1000 cost upgrade button
const buy1000Button = document.createElement("button");
buy1000Button.innerHTML = "Purchase Upgrade for 1000 dino's 🦕";
buy1000Button.disabled = true;
app.append(buy1000Button);

// function to update counter
const updateCounter = () => {
  counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
  growthRateDiv.innerHTML = `Adding ${growthRate.toFixed(1)} dino's 🦕 per second`;
  buy10Button.disabled = counter < 10;
  buy100Button.disabled = counter < 100;
  buy1000Button.disabled = counter < 1000;
};

// increase counter when button clicked
button.addEventListener("click", () => {
  counter++;
  updateCounter();
});

// puchase 10 cost upgrade when button clicked
buy10Button.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
    updateCounter();
  }
});

// puchase 100 cost upgrade when button clicked
buy100Button.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2;
    updateCounter();
  }
});

// puchase 1000 cost upgrade when button clicked
buy1000Button.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    updateCounter();
  }
});

// logic for increasing counter by decimals
let lastTime: number | null = null;
function step(timestamp: number) {
  if (lastTime === null) {
    lastTime = timestamp;
  }
  const elapsedTime = timestamp - lastTime;
  counter += (elapsedTime / interval) * (growthRate);
  updateCounter();
  lastTime = timestamp;
  requestAnimationFrame(step);
}

requestAnimationFrame(step);
