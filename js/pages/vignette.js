$(function () {
  $("[data-vignette-selector]").click(function () {
    let val = $(this).attr("data-vignette-selector");

    $("[data-vignette-selector]").removeClass("selected");
    $(this).addClass("selected");

    $("[data-vignette]").removeClass("selected");
    $('[data-vignette="' + val + '"]').addClass("selected");
  });

  // preselect vignette I
  $("[data-vignette-selector]").first().click();
});
