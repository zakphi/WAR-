$(() => {
  console.log('connected')

  function createGame(){
    $('<section>', {
      'id': 'container'
    }).appendTo('body')

    $('<header>').appendTo('#container')

    $('<h1>', {
      'text': 'WAR!'
    }).appendTo('header')

    createStartScreen()
  }

  function createStartScreen(){
    $('<article>', {
      'id': 'start-screen'
    }).appendTo('#container')

    $('<button>', {
      'id': 'start',
      'html': 'start'
    }).appendTo('#start-screen')

    $('<button>', {
      'id': 'help',
      'html': 'help'
    }).appendTo('#start-screen')
  }

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

    shuffleDeck()
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

    splitDeck()
  }

  function splitDeck(){
    playerDeck = mainDeck.splice(0, Math.floor(mainDeck.length / 2))
    computerDeck = mainDeck

    console.log('player deck before flip')
    console.log(playerDeck.map(card => card.numVal))
    console.log(playerDeck.map(card => card.suit))
    console.log('computer deck before flip')
    console.log(computerDeck.map(card => card.numVal))
    console.log(computerDeck.map(card => card.suit))
  }

  function flipCards(){
    hand.push(playerDeck.shift())
    hand.push(computerDeck.shift())

    console.log('hand')
    console.log(hand.map(card => card.numVal))
    console.log(hand.map(card => card.suit))
    console.log('player deck after flip')
    console.log(playerDeck.map(card => card.numVal))
    console.log(playerDeck.map(card => card.suit))
    console.log('computer deck after flip')
    console.log(computerDeck.map(card => card.numVal))
    console.log(computerDeck.map(card => card.suit))

    compare()
  }

  flipCards()

  function compare(){
    /*
    hand[hand.length - 2] = player
    hand[hand.length - 1] = computer
    */
    if(hand[hand.length - 2].numVal > hand[hand.length - 1].numVal){
      moveToWinner('player')
    } else if(hand[hand.length - 1].numVal > hand[hand.length - 2].numVal){
      moveToWinner('computer')
    } else {
      tie()
    }
  }

  function tie(){
    for(let i = 0; i < 4; i++){
      hand.push(playerDeck.shift())
      hand.push(computerDeck.shift())
    }
    console.log('hand end of war')
    console.log(hand.map(card => card.numVal))
    console.log(hand.map(card => card.suit))
    console.log('player deck end of war')
    console.log(playerDeck.map(card => card.numVal))
    console.log(playerDeck.map(card => card.suit))
    console.log('computer deck end of war')
    console.log(computerDeck.map(card => card.numVal))
    console.log(computerDeck.map(card => card.suit))
    compare()
  }

  function moveToWinner(winner){
    winner === 'player' ? winner = playerDeck : winner = computerDeck

    hand.forEach(handCard => winner.push(handCard))
    console.log('player deck end of round')
    console.log(playerDeck.map(card => card.numVal))
    console.log(playerDeck.map(card => card.suit))
    console.log('computer deck end of round')
    console.log(computerDeck.map(card => card.numVal))
    console.log(computerDeck.map(card => card.suit))
  }

  createGame()
})