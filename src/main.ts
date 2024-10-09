import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dino Wrangler";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
const interval: number = 1000;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
app.append(counterDiv);

const button = document.createElement("button");
button.innerHTML = "🦕";
app.append(button);

const updateCounter = () => {
    counterDiv.innerHTML = `${counter.toFixed(2)} dino's 🦕`;
};

button.addEventListener("click", () => {
    counter++;
    updateCounter();
});

let lastTime: number | null = null;
function step (timestamp: number){
    if (lastTime === null){
        lastTime = timestamp;
    }
    const elapsedTime = timestamp - lastTime;
    counter += elapsedTime / interval;
    updateCounter();
    lastTime = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);