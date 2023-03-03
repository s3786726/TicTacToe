const buildSquares = () => {
    const sq = [];
    for(let i = 0; i < 9; i++)  {
        sq.push(document.getElementById(`${i + 1}`))
    }

    return sq;
}
const squares = buildSquares();

let firstPlayer = document.getElementById("firstPlayer")
let secondPlayer = document.getElementById("secondPlayer")
let modal = document.getElementById("modal")
let displayWinner = document.getElementById("displayWinner")
let modalTwo = document.getElementById("modalTwo")

const Gameboard = (function() {
    let gameboard = Array(9).fill(null)

    let restartGameboard = () => {
        modalTwo.style.display = "none"
        Gameboard.gameboard = Array(9).fill(null);
       // RunGame.removeEvent()
        // RunGame.createDoms()
        RunGame.restartPlayerTurn()
        let restartSquare = (square) => {
            square.innerHTML = null
        }
        squares.forEach(square => restartSquare(square))
        //RunGame.createDoms()
    }
    return {
        restartGameboard,
        gameboard
    }
})()

const Players = (name, marker) => {
    return {name, marker}
}

const RunGame = (() => {
   let playerOne = {}
   let playerTwo = {} 
   let xIsNext = true          

    let playerTurn = () => {
        if (xIsNext)  {
            xIsNext = false
            return true 
        } else {
            xIsNext = true
            return false 
        }
    }

    let restartPlayerTurn = () => {
        return xIsNext = true 
    }

    let createPlayers = () => {
        playerOne = Players(firstPlayer.value, "X")
        playerTwo = Players(secondPlayer.value, "O")
    }

    let dom = (square, number) => {
        if (Gameboard.gameboard[number] === null) {
            if (playerTurn()) {
                //square.innerHTML = playerOne.marker
                Gameboard.gameboard[number] =  playerOne.marker

                square.innerHTML = Gameboard.gameboard[number]
                if (checkForDraw() && checkForWinner() !== true){
                    console.log("Draw")
                } else if (checkForWinner()) {
                    displayWinner.innerHTML = playerOne.name + "wins"
                    modalTwo.style.display = "block"
                } 
                //console.log(checkForDraw())
                
                // if (Gameboard.gameboard.includes("") == false) {
                //     location.reload()
                // }
    
            } else {
                //square.textContent = playerTwo.marker
                Gameboard.gameboard[number] =  playerTwo.marker
                    
                square.innerHTML = Gameboard.gameboard[number]
                if (checkForDraw() === true && checkForWinner() !== true) {
                    console.log("game is a draw")
                }
                else if (checkForWinner() === true) {
                    displayWinner.innerHTML = playerTwo.name + "wins"
                    modalTwo.style.display = "block"
                } 
                
            }
        } else {
            return null
        }
    }

    let createDoms = () => {

        squares.forEach((square, i) => square.addEventListener("click", () => dom(square, i)));
         }  

    let checkForWinner = () => {
        const winners = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        for (let i=0; i<=winners.length; i++){
            let [a,b,c] = winners[i]
                 if (Gameboard.gameboard[a] && Gameboard.gameboard[a] === Gameboard.gameboard[b] && Gameboard.gameboard[a] === Gameboard.gameboard[c]) {
                     return true
                 }
             }
             return false
         }
    
    let checkForDraw = () => {
        for (let i=0; i < 9; i++){
            if (Gameboard.gameboard[i] === null) {
                console.log(Gameboard.gameboard)
                return false
            }
        }
        console.log(true)
        return true
    }
    


    return {
        playerTurn,
        dom,
        checkForWinner,
        createDoms,
        createPlayers,
        restartPlayerTurn,
        checkForDraw,
        xIsNext
    }
    })()

    let startGame = () => {
        modal.style.display = "none"
        RunGame.createPlayers()
        RunGame.createDoms()
    }
