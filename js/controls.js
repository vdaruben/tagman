var controls;
var tagmanIsChecking = false;
var tagmanIsPainting = false;
var paintingProgress = 0;
var pieceFinished = false;

function tagmanControls()
{
    tagman.setVelocity(0);

    if (controls.space.isDown && tagmanIsChecking === true)
    {
        tagmanIsPainting = true;
        this.painting();

        return;
    }

    if(controls.space.isUp && tagmanIsPainting === true) {
        if(paintingProgress >= 30 && paintingProgress < 80) {
            this.putPiece(0, 3);
            this.updateScore(1);
        } else if (paintingProgress >= 80 && paintingProgress < 150) {
            this.putPiece(4,7);
            this.updateScore(4);
        }

        pieceFinished = true;
    }

    pieceFinished = false;
    tagmanIsPainting = false;
    paintingProgress = 0;

    // checking
    if ( tagmanIsChecking === true && controls.up.isDown)
    {
        tagman.anims.play('check', true);
        return;
    }
    else
    {
        tagmanIsChecking = false;
    }

    // set idle or walk animation
    if (allControlsUp() === true)
    {
        tagman.anims.play('idle', true);
    }
    else
    {
        tagman.anims.play('walk', true);
    }

    // walking around
    if (controls.left.isDown)  {
        if(this.isMaxLeft() === false)
        {
            tagman.setVelocityX(-200);
            tagman.flipX=true;
        }
    }
    else if (controls.right.isDown)
    {
        if(this.isMaxRight() === false)
        {
            tagman.setVelocityX(200);
            tagman.flipX=false;
        }
    }

    if (controls.up.isDown)
    {
        if (this.onTopGround() === false)
        {
            tagman.setVelocityY(-150);
        }
    }
    else if (controls.down.isDown)
    {
        if (this.onBottomGround() === false)
        {
            tagman.setVelocityY(150);
        }
    }
}

function allControlsUp()
{
    var allControlsUp = false;

    if (controls.left.isUp && controls.right.isUp && controls.up.isUp && controls.down.isUp)
    {
        return true;
    }

    return allControlsUp;
}

function isMaxLeft()
{
    var isMaxLeft = false;

    if(tagman.getBounds().x + tagman.body.halfWidth < 0)
    {
        isMaxLeft = true;
    }

    return isMaxLeft;
}

function isMaxRight()
{
    var isMaxRight = false;

    if(tagman.getBounds().x + tagman.body.halfWidth > 1200)
    {
        isMaxRight = true;
    }

    return isMaxRight;
}

function onBottomGround()
{
    var onBottomGround = true;

    if(tagman.y + tagman.body.halfHeight < groundZone.body.y + groundZone.height)
    {
        onBottomGround = false;
    }

    return onBottomGround;
}

function onTopGround()
{
    var onTopGround = false;

    if(tagman.y + tagman.body.halfHeight <= groundZone.body.y)
    {
        onTopGround = true;
        tagmanIsChecking = true;
    }

    return onTopGround;
}

function painting()
{
    if (paintingProgress < 150 && pieceFinished === false)
    {
        paintingProgress++;
        tagman.anims.play('paint', true);
    }

    if (paintingProgress === 150 )
    {
        tagman.anims.play('idle', true);
        this.putPiece(8, 11);
        pieceFinished = true;
        tagmanIsPainting = false;
        paintingProgress = 0;
        this.updateScore(10);
    }
}

function putPiece(min, max)
{
    pieces.create(tagman.x, tagman.y - 30, 'piece', this.getRandomInt(min, max)).setScale(2);
    tagman.setDepth(1);
}

function updateScore(points)
{
    score += points;
    scoreText.setText('Score: ' + score);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}