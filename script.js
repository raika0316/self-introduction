document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menu-btn");

  // メニュー開閉
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  // 外クリックで閉じる
  document.addEventListener("click", (e) => {
    if (
      !menu.classList.contains("hidden") &&
      !menu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      menu.classList.add("hidden");
    }
  });
});

// ページ切り替え
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.add("hidden");
  });

  document.getElementById(pageId).classList.remove("hidden");

  // メニュー閉じる
  document.getElementById("menu").classList.add("hidden");
}

// 行追加
function addRow() {
  const table = document.getElementById("goalTable");
  const newRow = table.insertRow();

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);

  cell1.contentEditable = "true";
  cell2.contentEditable = "true";

  cell1.innerText = "期限";
  cell2.innerText = "目標";
}