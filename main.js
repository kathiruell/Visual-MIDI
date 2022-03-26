const pageObserver = new IntersectionObserver(pageObserverCallback, {
  threshold: [0.2, 0.8],
});

function pageObserverCallback(entries) {
  for (const entry of entries) {
    const pageElement = entry.target;
    const isVisible = entry.intersectionRatio >= 0.8;
    const isHidden = entry.intersectionRatio <= 0.2;

    if (isVisible) {
      pageElement.classList.add("show");
      pageElement.dispatchEvent(new Event("show"));
      if (!pageElement.dataset.firstShow) {
        pageElement.dataset.firstShow = true;
        pageElement.dispatchEvent(new Event("first-show"));
      }
    } else if (isHidden) {
      pageElement.classList.remove("show");
      pageElement.dispatchEvent(new Event("hide"));
    }
  }
}

document.querySelectorAll(".page").forEach((el) => pageObserver.observe(el));
