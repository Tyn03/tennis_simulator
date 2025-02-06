const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to calculate the score
app.post('/calculate-score', (req, res) => {
    const { player1Name, player2Name, points } = req.body;

    const sets = [{ player1: 0, player2: 0 }, { player1: 0, player2: 0 }, { player1: 0, player2: 0 }];
    let currentGame = { player1: 0, player2: 0 };
    let currentSet = 0;
    let player1SetsWon = 0;
    let player2SetsWon = 0;
    let winner = null;

    for (const point of points) {
        if (point === player1Name) {
            currentGame.player1 += 1;
        } else {
            currentGame.player2 += 1;
        }

        // Check if the game is won
        if ((currentGame.player1 >= 4 || currentGame.player2 >= 4) && Math.abs(currentGame.player1 - currentGame.player2) >= 2) {
            if (currentGame.player1 > currentGame.player2) {
                sets[currentSet].player1 += 1;
            } else {
                sets[currentSet].player2 += 1;
            }
            currentGame = { player1: 0, player2: 0 };

            // Check if the set is won
            if ((sets[currentSet].player1 >= 6 || sets[currentSet].player2 >= 6) && Math.abs(sets[currentSet].player1 - sets[currentSet].player2) >= 2) {
                
                if (sets[currentSet].player1 > sets[currentSet].player2) {
                    player1SetsWon += 1;
                    console.log(`Set ${currentSet + 1} winner: ${player1Name}`);
                } else {
                    player2SetsWon += 1;
                    console.log(`Set ${currentSet + 1} winner: ${player2Name}`);
                }
                currentSet += 1;
                // Check if the match is won
                console.log()
                if (player1SetsWon >= 2 || player2SetsWon >= 2) {
                    winner = player1SetsWon > player2SetsWon ? player1Name : player2Name;
                    
                }
            }
        }
    }

    res.json({
        player1Name,
        player2Name,
        sets,
        currentGame,
        winner,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});