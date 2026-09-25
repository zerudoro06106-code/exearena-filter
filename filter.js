(function () {
    "use strict";

    function startFilter() {
        var table = document.querySelector("table.sort.filter");

        if (!table) {
            return;
        }

        if (document.getElementById("exe-skill-filter")) {
            return;
        }

        var box = document.createElement("div");
        box.id = "exe-skill-filter";

        box.innerHTML =
            '<strong>スキルカード検索</strong><br><br>' +

            '属性：' +
            '<select data-column="1">' +
            '<option value="">すべて</option>' +
            '<option value="火">火</option>' +
            '<option value="水">水</option>' +
            '<option value="木">木</option>' +
            '<option value="無">無</option>' +
            '</select> ' +

            'コスト：' +
            '<select data-column="2">' +
            '<option value="">すべて</option>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
            '</select> ' +

            'レアリティ：' +
            '<select data-column="3">' +
            '<option value="">すべて</option>' +
            '<option value="COMMON">COMMON</option>' +
            '<option value="RARE">RARE</option>' +
            '<option value="EPIC">EPIC</option>' +
            '<option value="PLATINUM">PLATINUM</option>' +
            '<option value="LEGEND">LEGEND</option>' +
            '</select> ' +

            '効果タイプ：' +
            '<select data-column="4">' +
            '<option value="">すべて</option>' +
            '<option value="攻撃">攻撃</option>' +
            '<option value="設置">設置</option>' +
            '<option value="回復">回復</option>' +
            '</select> ' +

            '入手方法：' +
            '<select data-column="6">' +
            '<option value="">すべて</option>' +
            '<option value="パック">パック</option>' +
            '<option value="報酬">報酬</option>' +
            '<option value="配布">配布</option>' +
            '</select> ' +

            '備考：' +
            '<select data-column="7">' +
            '<option value="">すべて</option>' +
            '<option value="火傷">火傷</option>' +
            '<option value="凍結">凍結</option>' +
            '<option value="凍結特効">凍結特効</option>' +
            '<option value="麻痺">麻痺</option>' +
            '<option value="ヒビ">ヒビ</option>' +
            '<option value="透明">透明</option>' +
            '<option value="対透明性能">対透明性能</option>' +
            '</select> ' +

            '<button type="button" id="exe-filter-reset">リセット</button>';

        table.parentNode.insertBefore(box, table);

        var selects = box.querySelectorAll("select");

        function filterTable() {
            var rows = table.querySelectorAll("tr");

            for (var i = 1; i < rows.length; i++) {
                var cells = rows[i].querySelectorAll("td");
                var show = true;

                for (var j = 0; j < selects.length; j++) {
                    var value = selects[j].value;

                    if (!value) {
                        continue;
                    }

                    var column = Number(selects[j].getAttribute("data-column"));
                    var cell = cells[column];

                    if (!cell || cell.textContent.indexOf(value) === -1) {
                        show = false;
                        break;
                    }
                }

                rows[i].style.display = show ? "" : "none";
            }
        }

        for (var i = 0; i < selects.length; i++) {
            selects[i].addEventListener("change", filterTable);
        }

        document.getElementById("exe-filter-reset").addEventListener("click", function () {
            for (var i = 0; i < selects.length; i++) {
                selects[i].value = "";
            }

            filterTable();
        });
    }

    /*
     * ================================
     * カード情報連動テスト
     * ================================
     */

    function testCardSync() {

        /*
         * 「1st PRE-SALE EXCLUSIVE」のページだけで実行
         */
        if (location.pathname.indexOf("1st") === -1) {
            return;
        }

        var table = document.querySelector("table.sort.filter");

        if (!table) {
            return;
        }

        var rows = table.querySelectorAll("tr");

        for (var i = 1; i < rows.length; i++) {

            var cells = rows[i].querySelectorAll("td");

            if (!cells[0]) {
                continue;
            }

            /*
             * 「戦乙女アリアの加護」の行を探す
             */
            if (cells[0].textContent.indexOf("戦乙女アリアの加護") === -1) {
                continue;
            }

            /*
             * テストとしてコスト欄の後ろに表示
             */
            var test = document.createElement("span");

            test.textContent = " ← 連動テスト";

            test.style.fontWeight = "bold";

            cells[2].appendChild(test);
        }
    }

    if (document.readyState === "loading") {

        document.addEventListener("DOMContentLoaded", function () {
            startFilter();
            testCardSync();
        });

    } else {

        startFilter();
        testCardSync();

    }

})();
