let points = [];

function generatePoints() {
    const player1Name = document.getElementById('player1Name').value;
    const player1Level = parseInt(document.getElementById('player1Level').value);
    const player2Name = document.getElementById('player2Name').value;
    const player2Level = parseInt(document.getElementById('player2Level').value);

    points = [];
    const totalPoints = 150;
    const player1WinProbability = player1Level / (player1Level + player2Level);

    for (let i = 0; i < totalPoints; i++) {
        const pointWinner = Math.random() < player1WinProbability ? player1Name : player2Name;
        points.push(pointWinner);
    }

    displayPoints();
}

function displayPoints() {
    const pointsList = document.getElementById('pointsList');
    pointsList.innerHTML = '';
    points.forEach((point, index) => {
        const li = document.createElement('li');
        li.textContent = `Point ${index + 1}: Won by ${point}`;
        pointsList.appendChild(li);
    });
}

async function sendPoints() {
    const player1Name = document.getElementById('player1Name').value;
    const player2Name = document.getElementById('player2Name').value;

    try {
        const response = await fetch('http://localhost:5000/calculate-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player1Name,
                player2Name,
                points,
            }),
        });
        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResult(result) {
    const matchResult = document.getElementById('matchResult');
    matchResult.innerHTML = `
        <h2>Match Result</h2>
        <p>${result.winner ? `Winner: ${result.winner}` : 'Match in progress, no winner yet'}</p>
        <table border="1">
            <thead>
                <tr>
                    <th></th>
                    <th>Set 1</th>
                    <th>Set 2</th>
                    <th>Set 3</th>
                    <th>Current Game</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${result.player1Name}</td>
                    <td>${result.sets[0].player1}</td>
                    <td>${result.sets[1].player1}</td>
                    <td>${result.sets[2].player1}</td>
                    <td>${result.currentGame.player1}</td>
                </tr>
                <tr>
                    <td>${result.player2Name}</td>
                    <td>${result.sets[0].player2}</td>
                    <td>${result.sets[1].player2}</td>
                    <td>${result.sets[2].player2}</td>
                    <td>${result.currentGame.player2}</td>
                </tr>
            </tbody>
        </table>
    `;
}