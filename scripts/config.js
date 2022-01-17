function editButtonClicked(event) {
    chosenPlayer = event.target.dataset.playerid;
    playerOverlay.style.display = 'block';
    backdropElement.style.display = 'block';
}

function overlayClose() {
    playerOverlay.style.display = 'none';
    backdropElement.style.display = 'none';
    errorName.textContent = '';
    formElement.firstElementChild.lastElementChild.value = '';
}

function formSubmited(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputedName = formData.get('playername').trim();

    if (!inputedName) {
        errorName.textContent = 'Name cannot be empty';
        errorName.style.color = 'red';
        return;
    }

    const playerData = document.getElementById('player' + chosenPlayer);
    playerData.children[1].textContent = inputedName;

    players[chosenPlayer - 1].name = inputedName;

    overlayClose();

}