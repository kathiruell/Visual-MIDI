const setupPage = document.querySelector("#setup-page");
const setupCategories = Array.from(
  document.querySelectorAll(".setup-category")
);

setupPage.addEventListener("first-show", function () {
  setupCategories[0].classList.add("fade-in");

  setTimeout(() => {
    setupCategories[1].classList.add("fade-in");
  }, 100);

  setTimeout(() => {
    setupCategories[2].classList.add("fade-in");
  }, 100);
});
