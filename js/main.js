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

    $('<article>', {
      'id': 'player-cont'
    }).appendTo('#game-screen')

    $('<h3>', {
      'id': 'player-score',
      'html': `Player Cards: ${playerDeck.length}`
    }).appendTo('#player-cont')

    $('<article>', {
      'id': 'player-deck'
    }).appendTo('#player-cont')

    $('<article>', {
      'id': 'hand-cont'
    }).appendTo('#game-screen')

    $('<article>', {
      'id': 'player-card',
    }).appendTo('#hand-cont')

    $('<span>', {
      'class': 'face-val'
    }).appendTo('#player-card')

    $('<span>', {
      'class': 'suit'
    }).appendTo('#player-card')

    $('<article>', {
      'id': 'computer-card',
    }).appendTo('#hand-cont')

    $('.face-val').clone().appendTo('#hand-cont #computer-card')
    $('.suit').clone().appendTo('#hand-cont #computer-card')

    $('<article>', {
      'id': 'computer-cont'
    }).appendTo('#game-screen')

    $('<h3>', {
      'id': 'computer-score',
      'html': `Computer Cards: ${computerDeck.length}`
    }).appendTo('#computer-cont')

    $('<article>', {
      'id': 'computer-deck'
    }).appendTo('#computer-cont')
  }

  function createHelpScreen(){
    $('<article>', {
      'id': 'help-screen'
    }).appendTo('#container')

    $('<p>', {
      'id': 'instructions',
      'html': 'instructions go here'
    }).appendTo('#help-screen')
  }

  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  const mainDeck = []
  let player = {deck: [], hand: []}
  let computer = {deck: [], hand: []}

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

    $('#player-card .face-val').html(hand[0].faceVal)
    $('#player-card .suit').html(hand[0].suit)

    $('#computer-card .face-val').html(hand[1].faceVal)
    $('#computer-card .suit').html(hand[1].suit)

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

    $('#player-score').html(`Player Cards: ${playerDeck.length}`)
    $('#computer-score').html(`Computer Cards: ${computerDeck.length}`)
  }

  createGame()
})