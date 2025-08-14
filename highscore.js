document.addEventListener("DOMContentLoaded", function() {
    function printHighscores() {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        highscores.sort(function(a, b) {
            return b.score - a.score;
        });
        highscores.forEach(function(score) {
            let liTag = document.createElement("li");
            liTag.textContent = score.name + " - " + score.score;
            let olEl = document.getElementById("highscores");
            olEl.appendChild(liTag);
        });
        downloadHighscores(highscores);
    }

    function clearHighscores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
    }

    function downloadHighscores(highscores) {
        let worksheet = XLSX.utils.json_to_sheet(highscores);
        let workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "High Scores");
        XLSX.writeFile(workbook, "highscores.xlsx");
    }

    let clearBtn = document.getElementById("clear");
    if (clearBtn) {
        clearBtn.onclick = clearHighscores;
    }

    printHighscores();
});
