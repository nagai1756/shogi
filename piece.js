const direction = [
    [-1, 0], // 左
    [-1, 1], // 左下
    [0, 1], // 下
    [1, 1], // 右下
    [1, 0], // 右
    [1, -1], // 右上
    [0, -1], // 上
    [-1, -1], // 左上
];
//王
function king_1(selectedX, selectedY, state) {
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i < direction.length; i++) {
        const dx = selectedX + direction[i][0];
        const dy = selectedY + direction[i][1];
        if (dx >= 0 &&
            dy >= 0 &&
            dx <= cells - 1 &&
            dy <= cells - 1)
            if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`)
                canputBoard[dy][dx] = 1;
    }
    return canputBoard;
}

//飛車
function rook(selectedX, selectedY, state) {
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i < direction.length; i += 2) {
        let dx = selectedX;
        let dy = selectedY;
        while (true) {
            dx += direction[i][0];
            dy += direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (board.rows[dy].cells[dx].firstChild.className == "none none none") canputBoard[dy][dx] = 1;
                else if (board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                    break;
                }
                else break;
            }
            else break;
        }
    }
    if (state == "advanced") {
        for (let i = 1; i < direction.length; i += 2) {
            let dx = selectedX;
            let dy = selectedY;
            dx += direction[i][0];
            dy += direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (dx >= 0 &&
                    dy >= 0 &&
                    dx <= cells - 1 &&
                    dy <= cells - 1)
                    if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                        board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`)
                        canputBoard[dy][dx] = 1;
            }
        }
    }
    return canputBoard
}

//角行
function bishop(selectedX, selectedY, state) {
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 1; i < direction.length; i += 2) {
        let dx = selectedX;
        let dy = selectedY;
        while (true) {
            dx += direction[i][0];
            dy += direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (board.rows[dy].cells[dx].firstChild.className == "none none none") canputBoard[dy][dx] = 1;
                else if (board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                    break;
                }
                else break;
            }
            else break;
        }
    }
    if (state == "advanced") {
        for (let i = 0; i < direction.length; i += 2) {
            let dx = selectedX;
            let dy = selectedY;
            dx += direction[i][0];
            dy += direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (dx >= 0 &&
                    dy >= 0 &&
                    dx <= cells - 1 &&
                    dy <= cells - 1)
                    if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                        board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`)
                        canputBoard[dy][dx] = 1;
            }
        }
    }
    return canputBoard
}

//金将
function g_general(selectedX, selectedY, state) {
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (turn) {
        for (let i = 0; i < direction.length; i++) {
            if (i == 1 || i == 3) continue;
            const dx = selectedX + direction[i][0];
            const dy = selectedY + direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                    board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                }
            }
        }
    }
    else {
        for (let i = 0; i < direction.length; i++) {
            if (i == 5 || i == 7) continue;
            const dx = selectedX + direction[i][0];
            const dy = selectedY + direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                    board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                }
            }
        }
    }
    return canputBoard
}

//銀将
function s_general(selectedX, selectedY, state) {
    if (state == "advanced") return g_general(selectedX, selectedY, state);
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (turn) {
        for (let i = 0; i < direction.length; i++) {
            if (i == 0 || i == 2 || i == 4) continue;
            const dx = selectedX + direction[i][0];
            const dy = selectedY + direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1)
                if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                    board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`)
                    canputBoard[dy][dx] = 1;
        }
    }
    else {
        for (let i = 0; i < direction.length; i++) {
            if (i == 0 || i == 6 || i == 4) continue;
            const dx = selectedX + direction[i][0];
            const dy = selectedY + direction[i][1];
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1)
                if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                    board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`)
                    canputBoard[dy][dx] = 1;
        }
    }
    return canputBoard
}

//桂馬
function knight(selectedX, selectedY, state) {
    if (state == "advanced") return g_general(selectedX, selectedY, state);
    let dx, dy;
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    if (turn) {
        for (let i = 0; i < 2; i++) {
            if (i == 0) dx = selectedX + 1;
            else dx = selectedX - 1;
            dy = selectedY - 2;
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1)
                if (board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == "none" ||
                    board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                }
        }
    } else {
        for (let i = 0; i < 2; i++) {
            if (i == 0) dx = selectedX - 1;
            else dx = selectedX + 1;
            dy = selectedY + 2;
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1)
                if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
                    board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`)
                    canputBoard[dy][dx] = 1;
        }
    }
    return canputBoard
}

//香車
function lance(selectedX, selectedY, state) {
    if (state == "advanced") return g_general(selectedX, selectedY, state);
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let dx = selectedX, dy = selectedY;
    if (turn) {
        while (true) {
            dy -= 1;
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (board.rows[dy].cells[dx].firstChild.className == "none none none") canputBoard[dy][dx] = 1;
                else if (board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                    break;
                }
                else break;
            }
            else break;
        }
    }
    else {
        while (true) {
            dy += 1;
            if (dx >= 0 &&
                dy >= 0 &&
                dx <= cells - 1 &&
                dy <= cells - 1) {
                if (board.rows[dy].cells[dx].firstChild.className == "none none none") canputBoard[dy][dx] = 1;
                else if (board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
                    canputBoard[dy][dx] = 1;
                    break;
                }
                else break;
            }
            else break;
        }
    }
    return canputBoard;
}

//歩兵
function pawn(selectedX, selectedY, state) {
    if (state == "advanced") return g_general(selectedX, selectedY, state);
    let canputBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let dx = selectedX, dy = selectedY;
    if (turn) {
        dy -= 1;
    }
    else {
        dy += 1;
    }
    if (board.rows[dy].cells[dx].firstChild.className == "none none none" ||
        board.rows[dy].cells[dx].firstChild.className.split(" ")[1] == `${turn ? "up" : "down"}`) {
        canputBoard[dy][dx] = 1;
    }
    return canputBoard
}

//玉
function king_2(selectedX, selectedY) {
    return king_1(selectedX, selectedY);
}
