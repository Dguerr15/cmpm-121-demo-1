import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dino Wrangler";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;                // keeps count of dinos
const interval: number = 1000;          // how often I want a dino to auto add
let growthRate: number = 0;             // how much faster it adds dinos automatically

// creating div to display counter
const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
app.append(counterDiv);

// creating dino clicking button
const button = document.createElement("button");
button.innerHTML = "🦕";
app.append(button);

// creating the upgrade button
const buyButton = document.createElement("button");
buyButton.innerHTML = "Purchase Upgrade for 10 dino's 🦕";
buyButton.disabled = true;
app.append(buyButton);

// function to update counter
const updateCounter = () => {
    counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
    buyButton.disabled = counter < 10;
};

// increase counter when button clicked
button.addEventListener("click", () => {
    counter++;
    updateCounter();
});

// puchase upgrade when button clicked
buyButton.addEventListener("click", () =>{
    if (counter >= 10){
        counter -= 10;
        growthRate += .2;
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
    counter += (elapsedTime / interval) * (growthRate + 1);
    updateCounter();
    lastTime = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);
