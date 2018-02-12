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

    $(document).on('click', '#start', createGameScreen)
    $(document).one('click', '#help', createHelpScreen)
  }

  function createStartScreen(){
    $('<article>', {
      'id': 'start-screen'
    }).appendTo('#container')

    $('<button>', {
      'id': 'start',
      'html': 'go to war'
    }).appendTo('#start-screen')

    $('<button>', {
      'id': 'help',
      'html': 'receive instructions'
    }).appendTo('#start-screen')
  }

  function createGameScreen(){
    $('#start-screen').remove()
    $('#help-screen').remove()

    $('<article>', {
      'id': 'game-screen'
    }).appendTo('#container')

    createDeck()

    $('<button>', {
      'id': 'flip-cards',
      'html': 'flip'
    }).appendTo('#game-screen')

    $(document).on('click', '#flip-cards', flipCards)
  }

  function createHelpScreen(){
    $('<article>', {
      'id': 'help-screen'
    }).appendTo('#container')
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

    shuffleDeck()
  }

  function shuffleDeck(){
    for(let i = 0; i < 500; i++){
      let loc1 = Math.floor(Math.random() * mainDeck.length)
      let loc2 = Math.floor(Math.random() * mainDeck.length)
      let tmpLoc = mainDeck[loc1]

      mainDeck[loc1] = mainDeck[loc2]
      mainDeck[loc2] = tmpLoc
    }

    splitDeck()
  }

  function splitDeck(){
    playerDeck = mainDeck.splice(0, Math.floor(mainDeck.length / 2))
    computerDeck = mainDeck
  }

  function flipCards(){
    hand.push(playerDeck.shift())
    hand.push(computerDeck.shift())

    compare()
  }

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

    compare()
  }

  function moveToWinner(winner){
    winner === 'player' ? playerDeck = playerDeck.concat(hand) : computerDeck = computerDeck.concat(hand)
    hand = []
  }

  createGame()
})