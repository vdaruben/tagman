var groundZone;

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
