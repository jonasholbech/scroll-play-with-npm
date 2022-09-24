import "./style.css";
import detectScroll from "@egstad/detect-scroll";
import { getImageSets, buildDOM } from "./modules/helpers";
let imageSets = getImageSets();
let lastScrollDirection = null;

let initialTop = 1200;
let initialLeft = 1200;
const scrollContainer = document.querySelector(".scroll-container");
buildDOM(imageSets, scrollContainer);

const instance = new detectScroll(window, {
  events: {
    scrollUp: up,
    scrollDown: down,
    scrollLeft: left,
    scrollRight: right,
  },
});
function up() {
  console.log("up");
  lastScrollDirection = "up";
}
function down() {
  console.log("down");
  lastScrollDirection = "down";
}
function left() {
  console.log("left");
  lastScrollDirection = "left";
}
function right() {
  console.log("right");
  lastScrollDirection = "right";
}

function resetWindow() {
  document.title = `${window.pageXOffset} X ${window.pageYOffset} ${lastScrollDirection}`;
  if (window.pageXOffset < 900 && lastScrollDirection === "left") {
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="2"]`),
      document.querySelector(`[data-id="0"]`)
    );
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="5"]`),
      document.querySelector(`[data-id="3"]`)
    );
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="8"]`),
      document.querySelector(`[data-id="6"]`)
    );
    window.scrollBy(1200, 0);
    resetNumbers();
  }

  if (window.pageXOffset > 2100 && lastScrollDirection === "right") {
    console.log(window.pageXOffset);
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="0"]`),
      document.querySelector(`[data-id="3"]`)
    );
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="3"]`),
      document.querySelector(`[data-id="6"]`)
    );
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="6"]`),
      document.querySelector(`[data-id="9"]`)
    );
    window.scrollBy(-1200, 0);
    resetNumbers();
  }

  if (window.pageYOffset < 900 && lastScrollDirection === "up") {
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="6"]`),
      document.querySelector(`[data-id="0"]`)
    );
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="7"]`),
      document.querySelector(`[data-id="0"]`)
    );
    scrollContainer.insertBefore(
      document.querySelector(`[data-id="8"]`),
      document.querySelector(`[data-id="0"]`)
    );
    window.scrollBy(0, 1200);
    resetNumbers();
  }
  if (window.pageYOffset > 2100 && lastScrollDirection === "down") {
    scrollContainer.appendChild(document.querySelector(`[data-id="0"]`));
    scrollContainer.appendChild(document.querySelector(`[data-id="1"]`));
    scrollContainer.appendChild(document.querySelector(`[data-id="2"]`));
    window.scrollBy(0, -1200);
    resetNumbers();
  }
}
function resetNumbers() {
  document
    .querySelectorAll(".inner-grid")
    .forEach((gr, index) => (gr.dataset.id = index));
}

window.scroll(initialLeft, initialTop);
window.addEventListener("scroll", resetWindow, false);
