$(() => {
  console.log('connected')

  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  const MAIN_DECK = []
  const PLAYER_DECK = []
  const COMPUTER_DECK = []

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
        MAIN_DECK.push(card)
      })
    })
    console.log(MAIN_DECK)
  }

  createDeck()
})