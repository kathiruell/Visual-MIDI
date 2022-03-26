document.querySelectorAll(".setup-category").forEach(function (button) {
  // Show the corresponding popup for each category button.
  button.addEventListener("click", function () {
    const category = button.dataset.category;
    const popup = document.querySelector(
      `.setup-popup[data-category=${category}]`
    );
    popup.hidden = false;
  });
});

document.querySelectorAll(".setup-popup").forEach(function (popup) {
  popup.querySelectorAll("button").forEach(function (button) {
    // Set the selected value and close the popup.
    button.addEventListener("click", function () {
      const category = popup.dataset.category;
      const categoryButton = document.querySelector(
        `.setup-category[data-category=${category}]`
      );
      categoryButton.innerHTML = button.dataset.value;
      popup.hidden = true;
    });
  });
});

$("[data-pref-set]").click(function () {
  preferences.set($(this).attr("data-parameter"), $(this).attr("data-value"));
});
