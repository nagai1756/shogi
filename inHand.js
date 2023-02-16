function putInHand(n) {
    turn ? downInHand.push(n) : upInHand.push(n);
    const inHandBoard = document.getElementById(`${turn ? "down" : "up"}InHandBoard`);
    const tr = document.getElementById(`${turn ? "down" : "up"}InBoardTr`);
    const td = document.createElement("td");
    const piece = document.createElement("div");
    tr.appendChild(td);
    td.appendChild(piece);
    td.className = `${turn ? "downInHand" : "upInHand"}`;
    piece.animate(
        { opacity: [0.2, 1] },
        { duration: 300, fill: "forwards" }
    )
    td.onclick = inHandClicked;
    switch (n) {
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
    }
    piece.className = `piece down normal`;
    inHandBoard.appendChild(tr);
}
function inHandClicked() {
    if (!finished) {
        console.log("inHand clicked!");
        const name = this.className;
        if (!selected) {
            if (turn && name == "downInHand" || !turn && name == "upInHand") {
                const inHandBoard = document.getElementById(`${turn ? "down" : "up"}InHandBoard`);
                const y = this.parentNode.rowIndex;
                const x = this.cellIndex;
                const clickPiece = inHandBoard.rows[y].cells[x].firstChild;
                if (!inHandSelected) {
                    inHandSelected = true;
                    clickPiece.classList.add("selected");
                    console.log(`${inHandSelectedPieceName} selected!`);
                    inHandSelectedPieceName = clickPiece.innerHTML;
                    inHandSelectedX = x;
                    inHandSelectedY = y;
                    let n;
                    switch (inHandSelectedPieceName) {
                        case "飛": n = ROOK; break;
                        case "角": n = BISHOP; break;
                        case "金": n = G_GENERAL; break;
                        case "銀": n = S_GENERAL; break;
                        case "桂": n = KNIGHT; break;
                        case "香": n = LANCE; break;
                        case "歩": n = PAWN; break;
                    }
                    inHandPutMark(n);
                }
                else {
                    if (clickPiece.className.split(" ")[3] == "selected") {
                        inHandSelectedX = inHandSelectedY = -1;
                        inHandSelected = false;
                        clickPiece.classList.remove("selected");
                        removeMark();
                        console.log(`${inHandSelectedPieceName} unselected!`);
                    }
                }
            }
        }
    }
}
function inHandPutMark(n) {
    for (let y = 0; y < cells; y++) {
        for (let x = 0; x < cells; x++) {
            if (board.rows[y].cells[x].firstChild.className == "none none none") {
                if (n == PAWN) {
                    if (turn && y != 0 || !turn && y != cells - 1) {
                        let pawnCanPut = true;
                        for (let i = 0; i < cells; i++) {
                            if (i == y) continue;
                            if (board.rows[i].cells[x].firstChild.className == `piece ${turn ? "down" : "up"} normal`) {
                                if (board.rows[i].cells[x].firstChild.innerHTML == "歩") {
                                    pawnCanPut = false; break;
                                }
                            }
                        }
                        if (pawnCanPut) board.rows[y].cells[x].classList.add("canput");
                    }
                }
                else if (n == KNIGHT) {
                    if (turn && y == 0 || turn && y == 1) continue;
                    else if (!turn && y == cells - 2 || !turn && y == cells - 1) continue;
                    board.rows[y].cells[x].classList.add("canput");
                }
                else if (n == LANCE) {
                    if (turn && y == 0 || !turn && y == cells - 1) continue;
                    board.rows[y].cells[x].classList.add("canput");
                }
                else board.rows[y].cells[x].classList.add("canput");
            }
        }
    }
}