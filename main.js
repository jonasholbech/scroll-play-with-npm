import "./style.css";
import is from "is_js";

import { getImageSets, buildDOM } from "./modules/helpers";
let imageSets = getImageSets();
let initialTop = 3600;
let initialLeft = 3600;
const scrollContainer = document.querySelector(
  ".scroll-container-observer .middle"
);
if (is.mobile()) {
  scrollContainer.getElementsByClassName.scrollSnapType = "both";
}
buildDOM(imageSets, scrollContainer);
window.scroll(initialLeft, initialTop);
let options = {
  //root: scrollContainer,
  rootMargin: "1800px",
};
function debug() {
  const d = document.createElement("div");
  d.classList.add("debug");
  window.addEventListener("scroll", (e) => {
    const debugString = `${Math.round(window.scrollX)} x ${Math.round(
      window.scrollY
    )} ${is.firefox() ? "Firefox" : "Other"} ${
      is.mobile() ? "Mobile" : "Desktop"
    }`;
    d.textContent = debugString;
    document.title = debugString;
    console.log(debugString);
  });
  document.body.prepend(d);
}
debug();
let observer = new IntersectionObserver(callback, options);
function setupObservers() {
  observer.observe(document.querySelector(".left"));
  /* observer.observe(document.querySelector(".up"));
  observer.observe(document.querySelector(".down"));
  observer.observe(document.querySelector(".right")); */
}
setupObservers();
function removeObservers() {
  observer.unobserve(document.querySelector(".left"));
  observer.unobserve(document.querySelector(".up"));
  observer.unobserve(document.querySelector(".down"));
  observer.unobserve(document.querySelector(".right"));
}
window.removeObservers = removeObservers;
function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry, entry.target.dataset.direction);
      removeObservers();
      moveGrid(entry.target.dataset.direction);
      setTimeout(setupObservers, 100);
    }
  });
}

function scroll(x, y) {
  window.scrollBy(x, y);
}

function moveGrid(dir) {
  switch (dir) {
    case "left":
      scrollContainer.insertBefore(
        document.querySelector(`[data-id="4"]`),
        document.querySelector(`[data-id="0"]`)
      );
      scrollContainer.insertBefore(
        document.querySelector(`[data-id="9"]`),
        document.querySelector(`[data-id="5"]`)
      );
      scrollContainer.insertBefore(
        document.querySelector(`[data-id="14"]`),
        document.querySelector(`[data-id="10"]`)
      );
      scrollContainer.insertBefore(
        document.querySelector(`[data-id="19"]`),
        document.querySelector(`[data-id="15"]`)
      );
      scrollContainer.insertBefore(
        document.querySelector(`[data-id="24"]`),
        document.querySelector(`[data-id="20"]`)
      );
      scroll(1800, 0);

      //window.scrollTo(3600, 0);
      resetNumbers();
      break;
    case "right":
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

      scroll(-1800, 0);
      resetNumbers();
      break;
    case "up":
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
      //TODO: mobile safari, edge
      if (is.chrome() || is.safari()) {
        window.scrollBy(0, 1800);
      }
      resetNumbers();
      break;
    case "down":
      scrollContainer.appendChild(document.querySelector(`[data-id="0"]`));
      scrollContainer.appendChild(document.querySelector(`[data-id="1"]`));
      scrollContainer.appendChild(document.querySelector(`[data-id="2"]`));
      if (is.chrome() || is.safari()) {
        window.scrollBy(0, -1800);
      }
      resetNumbers();
      break;
  }
}
function resetNumbers() {
  document
    .querySelectorAll(".inner-grid")
    .forEach((gr, index) => (gr.dataset.id = index));
}
