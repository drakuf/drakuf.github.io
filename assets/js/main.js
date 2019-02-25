window.addEventListener("scroll", function (e) {
  const menuBar = document.getElementById('menu-bar');
  if (menuBar.classList.contains('menu-fixed')) {
    return false;
  }
  if (window.scrollY > 0) {
    menuBar.classList.add('menu-moved');
  } else {
    menuBar.classList.remove('menu-moved');
  }
});
let digitCond = true;
$(window).scroll(function () {
  const $owl = $("#owl");
  if (!$owl.hasClass('owl-theme')) {
    $owl.owlCarousel({
      singleItem: true,
      autoPlay: 6000
    });
  }
  const $appStats = $('app-stats');
  if (!$appStats.offset()) {
    return false;
  }
  const hT = $appStats.offset().top,
    hH = $appStats.outerHeight(),
    wH = $(window).height(),
    wS = $(this).scrollTop();
  if (wS > (hT + hH - wH) && $('.digits')[0].innerHTML === '0') {
    //home page 'states' digits counting
    const digits = document.querySelectorAll(".digits");
    digits.forEach(function (elm) {
      if (!elm.classList.contains("count-done")) {
        let incValue = parseFloat(elm.getAttribute("data-inc-value")) || 0,
          incDuration = parseInt(elm.getAttribute("data-inc-duration")) || 0,
          incDelay = parseInt(elm.getAttribute("data-inc-delay")) || 0,
          incCurrency = elm.getAttribute("data-inc-currency") || "",
          medium = incValue / (incDuration / 50),
          formula = /\B(?=(\d{3})+(?!\d))/g,
          interval = null,
          startPoint = 0;
        setTimeout(function () {
          interval = setInterval(function () {
            (startPoint += medium) < incValue ? elm.innerHTML = incCurrency + startPoint.toFixed(0).toString().replace(formula, ",") : (clearInterval(interval),
              elm.innerHTML = incCurrency + incValue.toFixed(0).toString().replace(formula, ","))
          }.bind(this), 50)
        }.bind(this), incDelay)
      }
    });
    digitCond = false;
  }
});
