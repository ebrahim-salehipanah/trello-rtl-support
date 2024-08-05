(function () {
  var doms =
    "h1, h2, h3, p ,a ,span.checklist-item-details-text, textarea, input[type=text], ul, li";

  setInterval(() => {
    document.querySelectorAll(doms).forEach(function (element) {
      updateStyle(element);
    });
  }, 3000);
  // const send = XMLHttpRequest.prototype.send;
  // XMLHttpRequest.prototype.send = function () {
  //   this.addEventListener("load", function () {
  //     document.querySelectorAll(doms).forEach(function (element) {
  //       updateStyle(element);
  //     });
  //   });
  //   return send.apply(this, arguments);
  // };

  document.addEventListener("DOMContentLoaded", function () {
    console.log(11111);
    document.querySelectorAll(doms).forEach(function (element) {
      updateStyle(element);
    });
  });

  document.querySelectorAll(doms).forEach(function (element) {
    updateStyle(element);
  });

  document.body.addEventListener("input", function (e) {
    updateStyle(e.target);
  });

  document.body.addEventListener("blur", function (e) {
    updateStyle(e.target);
  });

  document.body.addEventListener("focus", function (e) {
    updateStyle(e.target);
  });

  function updateStyle(target) {
    var regex = [],
      matched,
      value,
      tagName = target.tagName,
      rtl,
      ltr;

    rtl = {
      direction: "rtl",
      "text-align": "right",
    };
    ltr = {
      direction: "ltr",
      "text-align": "left",
    };

    value = target.innerText;

    if (
      target.tagName.toLowerCase() === "textarea" ||
      target.matches("input[type=text]")
    ) {
      value = target.value;
    }

    if (
      target.matches("a") ||
      tagName === "H1" ||
      tagName === "H2" ||
      tagName === "H3"
    ) {
      rtl["unicode-bidi"] = "embed";
      ltr["unicode-bidi"] = "";
    }

    if (tagName === "UL") {
      rtl["padding"] = "0 14px 0 0";
      ltr["padding"] = "0 0 0 14px";
    }

    regex.push(/[\u0600-\u06FF]/); // Persian, Arabic
    regex.push(/[\u0590-\u05FF]/); // Hebrew

    for (var i = 0; i < regex.length; i++) {
      matched = value.match(regex[i]);

      if (matched) {
        break;
      }
    }

    if (matched) {
      Object.keys(rtl).forEach(function (style) {
        target.style[style] = rtl[style];
      });
    } else {
      Object.keys(ltr).forEach(function (style) {
        target.style[style] = ltr[style];
      });
      const pr = target.style.paddingRight;
    }
  }
})();
