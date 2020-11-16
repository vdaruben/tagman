var score = 0;
var scoreText;

function updateScore(points)
{
    score += points;
    scoreText.setText('Score: ' + score);
}
