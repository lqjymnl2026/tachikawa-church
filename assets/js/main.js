/* 立川华人教会 · 会陪你走的教会网站 */
(function () {
  "use strict";

  /* ---------- 导航 ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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

  /* ---------- 01 互动首页：状态选择 ---------- */
  var moodData = {
    tired: {
      line: "那就先停一下。",
      sub: "不需要马上解决所有问题。给自己一点安静的时间。",
      action: "安静一分钟",
      target: "#quiet"
    },
    lost: {
      line: "迷茫的时候，不用一个人想。",
      sub: "和一群愿意倾听的人聊聊，也许答案就会清晰一些。",
      action: "找人聊聊",
      target: "#find"
    },
    friends: {
      line: "欢迎来认识我们。",
      sub: "我们每周都有查经班，一起吃饭、聊天、读圣经。来坐坐吧。",
      action: "看看查经班",
      target: "#find"
    },
    jesus: {
      line: "欢迎你来探索。",
      sub: "不用急，可以从一个问题开始，慢慢认识耶稣。",
      action: "开始探索",
      target: "#explore"
    },
    bible: {
      line: "真好，欢迎一起读。",
      sub: "我们每周一起读圣经、分享生活，也欢迎你一个人安静地读。",
      action: "查经班",
      target: "#find"
    },
    pray: {
      line: "谢谢你的信任。",
      sub: "告诉我们你的需要，我们会为你祷告。也可以匿名。",
      action: "去祷告墙",
      target: "#prayer"
    }
  };

  var moodChips = document.querySelectorAll(".mood-chip");
  var moodPanel = document.getElementById("mood-panel");
  moodChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      moodChips.forEach(function (c) { c.classList.remove("selected"); });
      chip.classList.add("selected");
      var d = moodData[chip.getAttribute("data-mood")];
      if (!d || !moodPanel) return;
      var box = document.createElement("div");
      box.className = "mood-response";
      var html = '<p class="r-line">' + d.line + "</p>" +
                 '<p class="r-sub">' + d.sub + "</p>" +
                 '<div class="r-actions"><a class="btn btn-accent" href="' + d.target + '">' + d.action + "</a></div>";
      box.innerHTML = html;
      moodPanel.innerHTML = "";
      moodPanel.appendChild(box);
    });
  });

  /* ---------- 02 查经问答 ---------- */
  var answers = { 1: null, 2: null, 3: null };
  document.querySelectorAll(".quiz-opts").forEach(function (group) {
    group.addEventListener("click", function (e) {
      var btn = e.target.closest(".opt");
      if (!btn) return;
      group.querySelectorAll(".opt").forEach(function (o) { o.classList.remove("selected"); });
      btn.classList.add("selected");
      answers[group.getAttribute("data-q")] = btn.getAttribute("data-val");
      // 三个问题都选好后显示结果
      if (answers[1] && answers[2] && answers[3]) {
        document.getElementById("quiz-result").classList.add("show");
      }
    });
  });

  /* ---------- 05 安静时光 ---------- */
  var quietStart = document.getElementById("quiet-start");
  var quietReset = document.getElementById("quiet-reset");
  var quietStage = document.getElementById("quiet-stage");
  var quietSteps = document.querySelectorAll(".quiet-step");
  var quietVerse = document.getElementById("quiet-verse");
  var quietTimer = null;

  function clearQuiet() {
    quietSteps.forEach(function (s) { s.classList.remove("show"); });
    quietVerse.classList.remove("show");
    if (quietTimer) clearTimeout(quietTimer);
  }

  function startQuiet() {
    clearQuiet();
    if (quietStart) quietStart.style.display = "none";
    if (quietReset) quietReset.style.display = "inline-flex";
    var delay = 0;
    var STEP = 5200;
    quietSteps.forEach(function (step, i) {
      quietTimer = setTimeout(function () {
        step.classList.add("show");
        if (i === quietSteps.length - 1) {
          quietTimer = setTimeout(function () {
            quietVerse.classList.add("show");
          }, STEP);
        }
      }, delay);
      delay += STEP;
    });
  }

  if (quietStart) quietStart.addEventListener("click", startQuiet);
  if (quietReset) quietReset.addEventListener("click", function () {
    clearQuiet();
    if (quietStart) quietStart.style.display = "inline-flex";
    if (quietReset) quietReset.style.display = "none";
  });

  /* ---------- 08 祷告墙 ---------- */
  var prayerBtn = document.getElementById("prayer-submit");
  var prayerInput = document.getElementById("prayer-input");
  var prayerDone = document.getElementById("prayer-done");
  if (prayerBtn && prayerInput && prayerDone) {
    prayerBtn.addEventListener("click", function () {
      if (!prayerInput.value.trim()) {
        prayerInput.focus();
        return;
      }
      prayerDone.style.display = "block";
      prayerInput.value = "";
      prayerInput.blur();
    });
  }

  /* ---------- 滚动入场 ---------- */
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
})();
