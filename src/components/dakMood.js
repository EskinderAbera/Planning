// Select The Elements
export default function handleDarkMood() {

  // var big_wrapper = document.querySelector(".big-wrapper");
  // let clone = big_wrapper.cloneNode(true)
  // clone.classList.remove("light")
  // clone.classList.add("dark")
  // console.log(clone)
  // var toggle_btn = document.querySelector(".toggle-btn");
var big_wrapper;
var toggle_btn;
var hamburger_menu;
// var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

let dark = false;

function toggleAnimation() {

  dark = !dark;
  let clone = big_wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove("light");
    clone.classList.add("dark");
  } else {
    clone.classList.remove("dark");
    clone.classList.add("light");
  }
  clone.classList.add("copy");
  main.appendChild(clone);

  document.body.classList.add("stop-scrolling");

  clone.addEventListener("animationend", () => {
    document.body.classList.remove("stop-scrolling");
    big_wrapper.remove();
    clone.classList.remove("copy");
    declare();
    // events();
  });
}

function events() {
  toggleAnimation()
  // toggle_btn.addEventListener("onClick", toggleAnimation);
}

events();
}
