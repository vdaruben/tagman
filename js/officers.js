var officers;
var isFighting = false

function spawnOfficer()
{
    var spawnBottom = getRandomInt(550, 550 + 190);
    var spawnTop = spawnBottom - 150;

    var spawnLeft = '';
    var horizontalSpawnLocation = getRandomInt(0,1);
    switch(horizontalSpawnLocation) {
        case 0:
            spawnLeft = -200;
            break;
        case 1:
            spawnLeft = canvasRect.width + 200;
            break;
    }

    officersGroup.create(spawnLeft, spawnTop, 'officer').setScale(2);

    var officers = officersGroup.getChildren();
    var lastSpawnedOfficer = officers[officers.length - 1];
    lastSpawnedOfficer.anims.play('officer-walk', true);

    switch(horizontalSpawnLocation) {
        case 0:
            lastSpawnedOfficer.setVelocityX(200);

            lastSpawnedOfficer.flipX=false;
            break;
        case 1:
            lastSpawnedOfficer.setVelocityX(-200);
            lastSpawnedOfficer.flipX=true;
            break;
    }
}

function updateOfficers()
{
    var officers = officersGroup.getChildren();

    this.removeOutOfBoundsOfficers(officers);
}

function removeOutOfBoundsOfficers(officers)
{
    if(isFighting === false) {
        for(var i=0; i<officers.length; i++) {
            if(officers[i].x <= -200 || officers[i].x >= canvasRect.width + 200) {
                officers[i].destroy();
            }
        }
    }
}