var controls;

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
        tagman.anims.play('tagman-check', true);
        return;
    }
    else
    {
        tagmanIsChecking = false;
    }

    // set idle or walk animation
    if (allControlsUp() === true)
    {
        tagman.anims.play('tagman-idle', true);
    }
    else
    {
        tagman.anims.play('tagman-walk', true);
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
