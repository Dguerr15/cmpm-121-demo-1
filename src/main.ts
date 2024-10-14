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
let bought10: number = 0;
let bought100: number = 0;
let bought1000: number = 0;
let costFirst: number = 10;
let costSecond: number = 100;
let costThird: number = 1000;

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
upgradeDiv.innerHTML = `interns: ${bought10}, amateurs: ${bought100}, professionals: ${bought1000}`;
app.append(upgradeDiv);

// creating dino clicking button
const button = document.createElement("button");
button.innerHTML = "🦕";
app.append(button);

// creating the 10 cost upgrade button
const buy10Button = document.createElement("button");
buy10Button.innerHTML = `Pay another Intern for ${costFirst.toFixed(3)} dino's 🦕`;
buy10Button.disabled = true;
app.append(buy10Button);

// creating the 100 cost upgrade button
const buy100Button = document.createElement("button");
buy100Button.innerHTML = `Pay another amateur for ${costSecond.toFixed(3)} dino's 🦕`;
buy100Button.disabled = true;
app.append(buy100Button);

// creating the 1000 cost upgrade button
const buy1000Button = document.createElement("button");
buy1000Button.innerHTML = `Pay another professional for ${costThird.toFixed(3)} dino's 🦕`;
buy1000Button.disabled = true;
app.append(buy1000Button);

// function to update counter
const updateCounter = () => {
  counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
  growthRateDiv.innerHTML = `Adding ${growthRate.toFixed(1)} dino's 🦕 per second`;
  upgradeDiv.innerHTML = `interns: ${bought10}, amateurs: ${bought100}, professionals: ${bought1000}`;
  buy10Button.innerHTML = `Pay another Intern for ${costFirst.toFixed(3)} dino's 🦕`;
  buy100Button.innerHTML = `Pay another amateur for ${costSecond.toFixed(3)} dino's 🦕`;
  buy1000Button.innerHTML = `Pay another professional for ${costThird.toFixed(3)} dino's 🦕`;
  buy10Button.disabled = counter < costFirst;
  buy100Button.disabled = counter < costSecond;
  buy1000Button.disabled = counter < costThird;
};

// increase counter when button clicked
button.addEventListener("click", () => {
  counter++;
  updateCounter();
});

// puchase 10 cost upgrade when button clicked
buy10Button.addEventListener("click", () => {
  if (counter >= costFirst) {
    counter -= costFirst;
    growthRate += 0.1;
    bought10++;
    costFirst *= 1.15;
    updateCounter();
  }
});

// puchase 100 cost upgrade when button clicked
buy100Button.addEventListener("click", () => {
  if (counter >= costSecond) {
    counter -= costSecond;
    growthRate += 2;
    bought100++;
    costSecond *= 1.15;
    updateCounter();
  }
});

// puchase 1000 cost upgrade when button clicked
buy1000Button.addEventListener("click", () => {
  if (counter >= costThird) {
    counter -= costThird;
    growthRate += 50;
    bought1000++;
    costThird *= 1.15;
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
  counter += (elapsedTime / interval) * growthRate;
  updateCounter();
  lastTime = timestamp;
  requestAnimationFrame(step);
}

requestAnimationFrame(step);
