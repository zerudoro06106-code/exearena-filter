(function () {
    "use strict";

    function initSkillCardFilter() {
        var table = document.querySelector("table.sort.filter");

        if (!table) {
            return;
        }

        if (document.getElementById("exe-skill-filter")) {
            return;
        }

        var filters = [
            {
                name: "属性",
                column: 1,
                values: ["火", "水", "木", "無"]
            },
            {
                name: "コスト",
                column: 2,
                values: ["1", "2", "3", "4", "5"]
            },
            {
                name: "レアリティ",
                column: 3,
                values: ["COMMON", "RARE", "EPIC", "PLATINUM", "LEGEND"]
            },
            {
                name: "効果タイプ",
                column: 4,
                values: ["攻撃", "設置", "回復"]
            },
            {
                name: "入手方法",
                column: 6,
                values: ["パック", "報酬", "配布"]
            },
            {
                name: "備考",
                column: 7,
                values: ["火傷", "凍結", "凍結特効", "麻痺", "ヒビ", "透明", "対透明性能"]
            }
        ];

        var filterBox = document.createElement("div");
        filterBox.id = "exe-skill-filter";

        filterBox.style.margin = "15px 0";
        filterBox.style.padding = "15px";
        filterBox.style.border = "1px solid #ccc";
        filterBox.style.borderRadius = "8px";
        filterBox.style.backgroundColor = "#f8f8f8";

        var title = document.createElement("div");
        title.textContent = "スキルカード検索";
        title.style.fontWeight = "bold";
        title.style.fontSize = "18px";
        title.style.marginBottom = "12px";

        filterBox.appendChild(title);

        var selects = [];

        filters.forEach(function (filter) {
            var wrapper = document.createElement("span");

            wrapper.style.display = "inline-block";
            wrapper.style.marginRight = "10px";
            wrapper.style.marginBottom = "10px";

            var label = document.createElement("label");

            label.textContent = filter.name + "：";
            label.style.fontWeight = "bold";

            var select = document.createElement("select");

            select.style.padding = "5px";
            select.style.marginLeft = "3px";

            var allOption = document.createElement("option");
            allOption.value = "";
            allOption.textContent = "すべて";

            select.appendChild(allOption);

            filter.values.forEach(function (value) {
                var option = document.createElement("option");

                option.value = value;
                option.textContent = value;

                select.appendChild(option);
            });

            wrapper.appendChild(label);
            wrapper.appendChild(select);

            filterBox.appendChild(wrapper);

            selects.push({
                select: select,
                column: filter.column
            });

            select.addEventListener("change", applyFilter);
        });

        var resetButton = document.createElement("button");

        resetButton.type = "button";
        resetButton.textContent = "リセット";

        resetButton.style.padding = "5px 12px";
        resetButton.style.cursor = "pointer";
        resetButton.style.marginBottom = "10px";

        resetButton.addEventListener("click", function () {
            selects.forEach(function (item) {
                item.select.value = "";
            });

            applyFilter();
        });

        filterBox.appendChild(resetButton);

        table.parentNode.insertBefore(filterBox, table);

        function applyFilter() {
            var rows = table.querySelectorAll("tr");

            rows.forEach(function (row, index) {
                if (index === 0) {
                    row.style.display = "";
                    return;
                }

                var cells = row.querySelectorAll("td");

                if (!cells.length) {
                    row.style.display = "";
                    return;
                }

                var show = true;

                selects.forEach(function (item) {
                    var selectedValue = item.select.value;

                    if (!selectedValue) {
                        return;
                    }

                    var cell = cells[item.column];

                    if (!cell) {
                        show = false;
                        return;
                    }

                    var text = cell.textContent
                        .replace(/\s+/g, "")
                        .trim();

                    if (text.indexOf(selectedValue) === -1) {
                        show = false;
                    }
                });

                row.style.display = show ? "" : "none";
            });
        }

        applyFilter();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSkillCardFilter);
    } else {
        initSkillCardFilter();
    }

})();
