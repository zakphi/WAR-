$(() => {
  console.log('connected')

  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  const mainDeck = []
  let playerDeck = []
  let computerDeck = []

  createDeck = () => {
    /*
      u2660 = spade
      u2665 = heart
      u2666 = diamond
      u2663 = club
    */
    let suits = ['\u2660','\u2665','\u2666','\u2663']
    let faceValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    suits.forEach((suit) => {
      faceValues.forEach((faceVal, numVal) => {
        let card = new Card(suit, faceVal, numVal + 2)
        mainDeck.push(card)
      })
    })
    console.log(mainDeck)
  }

  createDeck()

  shuffleDeck = () => {
    for(let i = 0; i < 500; i++){
      let loc1 = Math.floor(Math.random() * mainDeck.length)
      let loc2 = Math.floor(Math.random() * mainDeck.length)
      let tmpLoc = mainDeck[loc1]

      mainDeck[loc1] = mainDeck[loc2]
      mainDeck[loc2] = tmpLoc
    }

    console.log(mainDeck)
  }

  shuffleDeck()

  splitDeck = () => {
    playerDeck = mainDeck.splice(0, Math.floor(mainDeck.length / 2))
    computerDeck = mainDeck

    console.log(playerDeck)
    console.log(computerDeck)
  }

  splitDeck()
})