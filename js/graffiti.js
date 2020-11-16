var paintingProgressBar;
var pieces;

var tagmanIsChecking = false;
var tagmanIsPainting = false;
var paintingProgress = 0;
var pieceFinished = false;

function painting()
{
    if (paintingProgress < 150 && pieceFinished === false)
    {
        paintingProgress++;
        tagman.anims.play('tagman-paint', true);
    }

    if (paintingProgress === 150 )
    {
        tagman.anims.play('tagman-idle', true);
        this.putPiece(8, 11);
        pieceFinished = true;
        tagmanIsPainting = false;
        paintingProgress = 0;
        this.updateScore(10);
    }
}

function updatePaintingProgressionBar(addGraphics)
{
    if(typeof paintingProgressBar != "undefined") {
        paintingProgressBar.destroy();
    }

    if(tagmanIsPainting === true && pieceFinished === false) {
        paintingProgressBar = addGraphics;
        let right = tagman.x - 76;
        let top = tagman.y - 175;

        // base of healthbar
        paintingProgressBar.fillStyle(0x000000);
        paintingProgressBar.fillRect(right, top, 160, 30);
        paintingProgressBar.fillStyle(0x7E7E7E);
        paintingProgressBar.fillRect(right + 5, top + 5, 150, 20);

        // fill of healthbar
        paintingProgressBar.fillStyle(0xFF0000);
        if(paintingProgress >= 30) {
            paintingProgressBar.fillStyle(0xFF9E00);
        }
        if(paintingProgress >= 80) {
            paintingProgressBar.fillStyle(0xffff33);
        }

        paintingProgressBar.fillRect(right + 5, top + 5, paintingProgress, 20);
    }
}

function putPiece(min, max)
{
    pieces.create(tagman.x, tagman.y - 30, 'piece', this.getRandomInt(min, max)).setScale(2);
    tagman.setDepth(1);
}
