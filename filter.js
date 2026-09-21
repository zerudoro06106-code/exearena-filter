(function () {
  "use strict";

  function startFilter() {
    var table = document.getElementById("content_block_19");

    if (!table) {
      return false;
    }

    // すでに作成済みなら何もしない
    if (document.getElementById("exe-arena-filter")) {
      return true;
    }

    var rows = table.querySelectorAll("tbody tr");

    // フィルター用コンテナ
    var box = document.createElement("div");
    box.id = "exe-arena-filter";

    box.innerHTML =
      '<div class="exe-filter-title">スキルカード検索</div>' +
      '<div class="exe-filter-row">' +
        '<label>属性<select id="exe-filter-attr"><option value="">すべて</option></select></label>' +
        '<label>コスト<select id="exe-filter-cost"><option value="">すべて</option></select></label>' +
        '<label>レアリティ<select id="exe-filter-rarity"><option value="">すべて</option></select></label>' +
        '<label>効果タイプ<select id="exe-filter-effect"><option value="">すべて</option></select></label>' +
        '<label>入手方法<select id="exe-filter-get"><option value="">すべて</option></select></label>' +
        '<label>備考<select id="exe-filter-note"><option value="">すべて</option></select></label>' +
        '<button type="button" id="exe-filter-reset">リセット</button>' +
      '</div>';

    // テーブルの直前に追加
    table.parentNode.insertBefore(box, table);

    // 各列から選択肢を自動取得
    var settings = [
      { id: "exe-filter-attr", col: 1 },
      { id: "exe-filter-cost", col: 2 },
      { id: "exe-filter-rarity", col: 3 },
      { id: "exe-filter-effect", col: 4 },
      { id: "exe-filter-get", col: 6 },
      { id: "exe-filter-note", col: 7 }
    ];

    settings.forEach(function (setting) {
      var select = document.getElementById(setting.id);
      var values = [];

      rows.forEach(function (row) {
        var cell = row.cells[setting.col];

        if (!cell) {
          return;
        }

        var value = cell.textContent.trim();

        if (value && values.indexOf(value) === -1) {
          values.push(value);
        }
      });

      values.sort(function (a, b) {
        return a.localeCompare(b, "ja");
      });

      values.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
    });

    // フィルター処理
    function filterRows() {
      var attr = document.getElementById("exe-filter-attr").value;
      var cost = document.getElementById("exe-filter-cost").value;
      var rarity = document.getElementById("exe-filter-rarity").value;
      var effect = document.getElementById("exe-filter-effect").value;
      var get = document.getElementById("exe-filter-get").value;
      var note = document.getElementById("exe-filter-note").value;

      rows.forEach(function (row) {
        var cells = row.cells;

        if (!cells || cells.length < 8) {
          return;
        }

        var match =
          (!attr || cells[1].textContent.trim() === attr) &&
          (!cost || cells[2].textContent.trim() === cost) &&
          (!rarity || cells[3].textContent.trim() === rarity) &&
          (!effect || cells[4].textContent.trim() === effect) &&
          (!get || cells[6].textContent.trim() === get) &&
          (!note || cells[7].textContent.trim() === note);

        row.style.display = match ? "" : "none";
      });
    }

    settings.forEach(function (setting) {
      document
        .getElementById(setting.id)
        .addEventListener("change", filterRows);
    });

    // リセット
    document
      .getElementById("exe-filter-reset")
      .addEventListener("click", function () {
        settings.forEach(function (setting) {
          document.getElementById(setting.id).value = "";
        });

        filterRows();
      });

    // CSS
    var style = document.createElement("style");

    style.textContent =
      "#exe-arena-filter{" +
        "margin:15px 0;" +
        "padding:15px;" +
        "border:1px solid #ccc;" +
        "background:#f7f7f7;" +
      "}" +

      "#exe-arena-filter .exe-filter-title{" +
        "font-weight:bold;" +
        "font-size:16px;" +
        "margin-bottom:10px;" +
      "}" +

      "#exe-arena-filter .exe-filter-row{" +
        "display:flex;" +
        "flex-wrap:wrap;" +
        "gap:8px;" +
        "align-items:end;" +
      "}" +

      "#exe-arena-filter label{" +
        "display:flex;" +
        "flex-direction:column;" +
        "font-size:13px;" +
        "font-weight:bold;" +
      "}" +

      "#exe-arena-filter select{" +
        "min-width:110px;" +
        "padding:5px;" +
        "margin-top:3px;" +
      "}" +

      "#exe-filter-reset{" +
        "padding:6px 12px;" +
        "cursor:pointer;" +
      "}";

    document.head.appendChild(style);

    return true;
  }

  // ページ読み込み後に実行
  if (startFilter()) {
    return;
  }

  // 表が後から生成される場合に備えて少し待つ
  var count = 0;

  var timer = setInterval(function () {
    count++;

    if (startFilter() || count >= 50) {
      clearInterval(timer);
    }
  }, 200);
})();
