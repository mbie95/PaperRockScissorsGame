//statystyki
const gameSummary = {
    numberOfGames: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

//informacje o wybranych rekach
const game = {
    playerChoice: "",
    aiChoice: ""
}

//pobieramy obrazki, wszystkie z klasy select
//const hands = document.querySelectorAll(".select img"); //nodelist
const hands = [...document.querySelectorAll(".select img")]; //tablica

//efekty po nacisnieciu na obrazek
function handSelection() {
    //pobieramy z html'a informacje o wybranym elemencie, z data-option
    game.playerChoice = this.dataset.option;
    //usuwa efekt wybrania z elementow
    hands.forEach(hand => hand.style.boxShadow = "");
    //rysuje obramowke na grafice, nie zmienia jej rozmiaru
    this.style.boxShadow = "0 0 0 3px green"; //przesuniecie na osi x, na osi y, rozmycie, ramka
}

//funkcja losujaca wybor komputera
function computerChoice() {
    return hands[Math.floor(Math.random()*3)].dataset.option;
}

//funkcja rozstrzygajaca wynik gry
function checkResult(playerChoice, aiChoice) {
    if (playerChoice === aiChoice) {
        return "remis";
    }
    else if ((playerChoice === "papier" && aiChoice === "kamien") || 
             (playerChoice === "kamien" && aiChoice === "nozyce") ||
             (playerChoice === "nozyce" && aiChoice === "papier")) {
                 return "wygrales!";
            }
    else {
        return "przegrales :(";
    }
}

//funkcja aktualizujaca statystyki i wyswietlajaca je
function updateResults(playerChoice, aiChoice, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = playerChoice;
    document.querySelector('[data-summary="ai-choice"]').textContent = aiChoice;
    document.querySelector('[data-summary="who-win"]').textContent = result;
    document.querySelector('p.numbers span').textContent = ++gameSummary.numberOfGames;
    if (result === "wygrales!")
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    else if (result === "przegrales :(")
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    else
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
}

//funkcja zawierajaca operacje wykonywane po kliknieciu "Let's play!"
function startGame() {
    //jezeli reka nie zostala wybrana to poinformuj i nie wykonuj dalej
    if (!game.playerChoice)
        return alert("Wybierz dlon!");
    //przypisujemy wybor komputera do odpowiedniej danej obiektu
    game.aiChoice = computerChoice();
    //przypisujemy wynik gry
    const gameResult = checkResult(game.playerChoice, game.aiChoice);
    updateResults(game.playerChoice, game.aiChoice, gameResult);
    endGame();
}

//resetowanie wyboru gracza
function endGame() {
    document.querySelector(`[data-option="${game.playerChoice}"]`).style.boxShadow = "";
    game.playerChoice = "";
}

//dodajemy nasluchiwanie zdarzenia klikniecia myszki na wszystkie obrazki
hands.forEach(hand => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);