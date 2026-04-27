document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // メニュー
  // =========================
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menu-btn");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !menu.classList.contains("hidden") &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        menu.classList.add("hidden");
      }
    });
  }

  // =========================
  // ダークモード
  // =========================
  const toggleBtn = document.getElementById("dark-toggle");

  // 初期状態
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // =========================
  // 画像モーダル
  // =========================
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("close");

  // クリックをまとめて処理（安定）
  document.addEventListener("click", (e) => {

    // 画像クリック
    if (e.target.matches(".images img")) {
      if (modal && modalImg) {
        modal.classList.add("active");
        modalImg.src = e.target.src;

        // 背景スクロール防止
        document.body.style.overflow = "hidden";
      }
    }

    // 閉じるボタン
    if (e.target.id === "close") {
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    }

    // 背景クリックで閉じる
    if (e.target.id === "modal") {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }

  });

// =========================
// 画像スワイプ機能
// =========================
const images = document.querySelectorAll(".images img");
let currentIndex = 0;

// 画像クリック時にindex記録
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
  });
});

// タッチ開始位置
let startX = 0;

// タッチ開始
if (modal) {
  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

// タッチ終了
 modal.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (Math.abs(diff) > 50) {

    if (diff > 0) {
      currentIndex = (currentIndex + 1) % images.length;
    } else {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    if (modalImg) {
      modalImg.src = images[currentIndex].src;
    }
  }
});

}

// =========================
// キーボード操作（追加）
// =========================
document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  modalImg.src = images[currentIndex].src;
});
});


// =========================
// ページ切り替え（外でOK）
// =========================
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.add("hidden");
  });

  document.getElementById(pageId).classList.remove("hidden");

  // メニュー閉じる
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.add("hidden");
  }
}


// =========================
// 行追加（外でOK）
// =========================
function addRow() {
  const table = document.getElementById("goalTable");
  if (!table) return;

  const newRow = table.insertRow();

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);

  cell1.contentEditable = "true";
  cell2.contentEditable = "true";

  cell1.innerText = "期限";
  cell2.innerText = "目標";
}