import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Dino Wrangler";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

const counterDiv = document.createElement("div");
counterDiv.innerHTML = `${counter} dino's 🦕`;
app.append(counterDiv);

const button = document.createElement("button");
button.innerHTML = "🦕";
app.append(button);

button.addEventListener("click", () => {
    counter++;
    counterDiv.innerHTML = `${counter} dino's 🦕`;
  });
