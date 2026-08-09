/* 东京立川华人教会 · 交互脚本 */
(function () {
  "use strict";

  /* ---------- 导航滚动阴影 ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- Hero 轮换词 ---------- */
  var words = ["家", "光", "爱", "盼望", "同行"];
  var rotateEl = document.querySelector(".word-rotate");
  if (rotateEl) {
    var i = 0;
    setInterval(function () {
      i = (i + 1) % words.length;
      rotateEl.style.opacity = 0;
      setTimeout(function () {
        rotateEl.textContent = words[i];
        rotateEl.style.opacity = 1;
      }, 220);
    }, 2600);
  }

  /* ---------- 滚动入场动画 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 联系表单（演示） ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.querySelector("#form-msg");
      if (msg) {
        msg.style.display = "block";
        msg.textContent = "✅ 收到你的留言啦！我们会尽快联系你。（演示站点，未真正发送）";
      }
      form.reset();
    });
  }
})();
