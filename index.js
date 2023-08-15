const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);

            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext('2d');

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            function createConfettiPiece() {
                const colors = ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#009688'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                return {
                    x: randomInRange(0, canvas.width),
                    y: randomInRange(-canvas.height * 0.5, -50),
                    r: randomInRange(5, 15),
                    d: randomInRange(1, 5),
                    color: color,
                };
            }

            const confettiPieces = [];

            function drawConfettiPiece(confetti) {
                ctx.beginPath();
                ctx.arc(confetti.x, confetti.y, confetti.r, 0, 2 * Math.PI);
                ctx.fillStyle = confetti.color;
                ctx.fill();
            }

            function animateConfetti() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < confettiPieces.length; i++) {
                    const confetti = confettiPieces[i];

                    confetti.y += confetti.d;

                    if (confetti.y > canvas.height) {
                        confettiPieces.splice(i, 1);
                        i--;
                    }

                    drawConfettiPiece(confetti);
                }

                requestAnimationFrame(animateConfetti);
            }

            function startConfetti() {
                for (let i = 0; i < 100; i++) {
                    confettiPieces.push(createConfettiPiece());
                }

                animateConfetti();
            }

            // Acione o efeito de confetes após determinado jogador vencer uma partida
            startConfetti();
                        init();
                        return;
                    }
                }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!");
        init();
        return;
    }
}