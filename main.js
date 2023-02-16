"use strict";
const KING_1 = 1, ROOK = 2, BISHOP = 3,
    G_GENERAL = 4, S_GENERAL = 5, KNIGHT = 6,
    LANCE = 7, PAWN = 8, KING_2 = 9;
// 王将、飛車、角行、
// 金将、銀将、桂馬、
// 香車、歩兵、玉
let data = [
    [LANCE, KNIGHT, S_GENERAL, G_GENERAL, KING_2, G_GENERAL, S_GENERAL, KNIGHT, LANCE],
    [0, ROOK, 0, 0, 0, 0, 0, BISHOP, 0],
    [PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN],
    [0, BISHOP, 0, 0, 0, 0, 0, ROOK, 0],
    [LANCE, KNIGHT, S_GENERAL, G_GENERAL, KING_1, G_GENERAL, S_GENERAL, KNIGHT, LANCE]
];
let upInHand = [], downInHand = [];
let selected = false;
let selectedPieceName = "";
let selectedX = -1, selectedY = -1;
let inHandSelected = false;
let inHandSelectedPieceName = "";
let inHandSelectedX = -1, inHandSelectedY = -1;
let finished = false;
let turn = false;
const board = document.getElementById("board");
const h2 = document.querySelector("h2");
let cells = 9; // マスの数
window.onbeforeunload = function (e) {
    if (!finished) return '';
};
//初期化
window.onload = function () {
    for (let i = 0; i < cells; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < cells; j++) {
            const td = document.createElement("td");
            const piece = document.createElement("div");
            piece.animate(
                { opacity: [0.2, 1] },
                { duration: 300, fill: "forwards" }
            )
            tr.appendChild(td);
            td.appendChild(piece);
            piece.id = cells * i + j;
            td.onclick = clicked;
            switch (data[i][j]) {
                case KING_1:
                    piece.innerHTML = "王"; break;
                case ROOK:
                    piece.innerHTML = "飛"; break;
                case BISHOP:
                    piece.innerHTML = "角"; break;
                case G_GENERAL:
                    piece.innerHTML = "金"; break;
                case S_GENERAL:
                    piece.innerHTML = "銀"; break;
                case KNIGHT:
                    piece.innerHTML = "桂"; break;
                case LANCE:
                    piece.innerHTML = "香"; break;
                case PAWN:
                    piece.innerHTML = "歩"; break;
                case KING_2:
                    piece.innerHTML = "玉";
            }
            if (data[i][j]) {
                piece.classList.add("piece");
                if (i < 3) piece.classList.add("up");
                else piece.classList.add("down");
                piece.classList.add("normal");
            }
            else piece.className = "none none none";
        }
        board.appendChild(tr);
    }
    showTurn();
}
// マスがクリックされた時の処理
function clicked() {
    if (!finished) {
        console.log("clicked!");
        const y = this.parentNode.rowIndex;
        const x = this.cellIndex;
        const clickCell = board.rows[y].cells[x];
        const clickPiece = clickCell.firstChild;
        let n;
        if (!selected && !inHandSelected) {
            if (clickPiece.className.split(" ")[0] == "piece" &&
                clickPiece.className.split(" ")[1] == (turn ? "down" : "up")) {
                selected = true;
                clickPiece.classList.add("selected");
                selectedPieceName = clickPiece.innerHTML;
                console.log(`${selectedPieceName} selected!!`);
                selectedX = x;
                selectedY = y;
                switch (selectedPieceName) {
                    case "王": n = KING_1; break;
                    case "飛": n = ROOK; break;
                    case "角": n = BISHOP; break;
                    case "金": n = G_GENERAL; break;
                    case "銀": n = S_GENERAL; break;
                    case "桂": n = KNIGHT; break;
                    case "香": n = LANCE; break;
                    case "歩": n = PAWN; break;
                    case "玉": n = KING_2;
                }
                putMark(selectedX, selectedY, n)
            }
        }
        else {
            if (clickPiece.className.split(" ")[3] == "selected") {
                selectedX = selectedY = -1;
                selected = false;
                n = 0;
                clickPiece.classList.remove("selected");
                removeMark();
                console.log(`${selectedPieceName} unselected!!`);
                selectedPieceName = "";
            }
            else if (clickCell.className == "canput") {
                removeMark();
                switch (selectedPieceName) {
                    case "王": n = KING_1; break;
                    case "飛": n = ROOK; break;
                    case "角": n = BISHOP; break;
                    case "金": n = G_GENERAL; break;
                    case "銀": n = S_GENERAL; break;
                    case "桂": n = KNIGHT; break;
                    case "香": n = LANCE; break;
                    case "歩": n = PAWN; break;
                    case "玉": n = KING_2;
                }
                if (inHandSelected) {
                    const inHandBoard = document.getElementById(`${turn ? "down" : "up"}InHandBoard`);
                    clickPiece.innerHTML = inHandSelectedPieceName;
                    clickPiece.className = `piece ${turn ? "down" : "up"} normal`;
                    clickPiece.animate(
                        { opacity: [0.2, 1] },
                        { duration: 300, fill: "forwards" }
                    );
                    switch (inHandSelectedPieceName) {
                        case "飛": n = ROOK; break;
                        case "角": n = BISHOP; break;
                        case "金": n = G_GENERAL; break;
                        case "銀": n = S_GENERAL; break;
                        case "桂": n = KNIGHT; break;
                        case "香": n = LANCE; break;
                        case "歩": n = PAWN; break;
                    }
                    let clickedCell = inHandBoard.rows[inHandSelectedY].cells[inHandSelectedX];
                    clickedCell.parentNode.removeChild(clickedCell);
                    inHandSelected = false;
                }
                else {
                    data[selectedY][selectedX] = 0;
                    selected = false;
                    clickPiece.innerHTML = selectedPieceName;
                    clickPiece.className = `piece ${turn ? "down" : "up"}`;
                    clickPiece.animate(
                        { opacity: [0.2, 1] },
                        { duration: 300, fill: "forwards" }
                    );
                    if (board.rows[selectedY].cells[selectedX].firstChild.className.split(" ")[2] == "normal") {
                        if (turn && selectedY > 2 && y <= 2) clickPiece.classList.add("advanced");
                        else if (!turn && selectedY < 6 && y >= 6) clickPiece.classList.add("advanced");
                        else clickPiece.classList.add("normal");
                    }
                    else clickPiece.classList.add("advanced");
                    board.rows[selectedY].cells[selectedX].firstChild.className = "none none none";
                    board.rows[selectedY].cells[selectedX].firstChild.innerHTML = "";
                    selectedX = selectedY = -1;
                    let n;
                    if (data[y][x]) {
                        if ((!turn && data[y][x] == KING_1) || (turn && data[y][x] == KING_2)) finished = true;
                        else {
                            putInHand(data[y][x]);
                            console.log(downInHand, upInHand);
                        }
                    }
                }
                data[y][x] = n;
                selectedPieceName = "";
                inHandSelectedPieceName == "";
                showTurn();
            }
        }
    }
}

function putMark(selectedX, selectedY, n) {
    let canputPlace;
    let state = board.rows[selectedY].cells[selectedX].firstChild.className.split(" ")[2]
    console.log(n, state);
    switch (n) {
        case KING_1:
            canputPlace = king_1(selectedX, selectedY, state); break;
        case ROOK:
            canputPlace = rook(selectedX, selectedY, state); break;
        case BISHOP:
            canputPlace = bishop(selectedX, selectedY, state); break;
        case G_GENERAL:
            canputPlace = g_general(selectedX, selectedY, state); break;
        case S_GENERAL:
            canputPlace = s_general(selectedX, selectedY, state); break;
        case KNIGHT:
            canputPlace = knight(selectedX, selectedY, state); break;
        case LANCE:
            canputPlace = lance(selectedX, selectedY, state); break;
        case PAWN:
            canputPlace = pawn(selectedX, selectedY, state); break;
        case KING_2:
            canputPlace = king_2(selectedX, selectedY, state);
    }
    for (let dy = 0; dy < cells; dy++) {
        for (let dx = 0; dx < cells; dx++) {
            if (canputPlace[dy][dx]) {
                console.log(`canputPlace x, y, = ${dx} ${dy}`);
                board.rows[dy].cells[dx].classList.add("canput");
            }
        }
    }
}

function removeMark() {
    for (let dy = 0; dy < cells; dy++) {
        for (let dx = 0; dx < cells; dx++) {
            if (board.rows[dy].cells[dx].className == "canput")
                board.rows[dy].cells[dx].classList.remove("canput");
        }
    }
}

function showTurn() {
    if (finished) {
        h2.textContent = turn ? "下の勝ち!!" : "上の勝ち!!";
        console.log(h2.textContent);
        restartBtn();
        showAnime();
    }
    else {
        turn = !turn; //相手のターンにする
        h2.textContent = turn ? "下の番です" : "上の番です";
        showAnime();
        console.log(data);
        console.log(upInHand, downInHand);
        console.log(turn ? "下の番" : "上の番");
    }
}
// ゲーム終了画面
function restartBtn() {
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.classList.remove("hide");
    restartBtn.animate(
        { opacity: [1, 0.7, 1] },
        { delay: 1000, duration: 3000, iterations: "Infinity" }
    );
    restartBtn.addEventListener("click", () => {
        document.location.reload();
    });
}

function showAnime() {
    h2.animate({ opacity: [0, 1] }, { duration: 500, iterations: 2 });
}
