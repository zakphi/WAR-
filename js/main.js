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
  let hand = []

  function createDeck(){
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

  function shuffleDeck(){
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

  function splitDeck(){
    playerDeck = mainDeck.splice(0, Math.floor(mainDeck.length / 2))
    computerDeck = mainDeck

    console.log(playerDeck)
    console.log(computerDeck)
  }

  splitDeck()

  function flipCards(){
    hand.push(playerDeck.shift())
    hand.push(computerDeck.shift())

    console.log('hand')
    console.log(hand.map(card => card.numVal))
    console.log(hand.map(card => card.suit))
    console.log('player deck')
    console.log(playerDeck.map(card => card.numVal))
    console.log(playerDeck.map(card => card.suit))
    console.log('computer deck')
    console.log(computerDeck.map(card => card.numVal))
    console.log(computerDeck.map(card => card.suit))
  }

  flipCards()
})