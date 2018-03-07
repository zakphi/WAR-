$(() => {
  console.log('connected')

  function createGame(){
    $('<div>').attr('id', 'container').appendTo('body')

    $('<header>').appendTo('#container')

    $('<h1>').text('WAR!').appendTo('header')

    createStartScreen()

    $(document).on('click', '#start-btn', createGameScreen)
    $(document).one('click', '#help-btn', createHelpScreen)
  }

  function createStartScreen(){
    $('<div>').attr('id', 'start-screen').appendTo('#container')

    $('<button>', {
      'id': 'start-btn',
      'text': 'go to war'
    }).appendTo('#start-screen')

    $('<button>', {
      'id': 'help-btn',
      'text': 'receive instructions'
    }).appendTo('#start-screen')
  }

  function createGameScreen(){
    $('#start-screen').remove()
    $('#help-screen').remove()

    $('<div>').attr('id', 'game-screen').appendTo('#container')

    createDeck()

    $('<button>', {
      'id': 'flip-cards-btn',
      'text': 'flip'
    }).appendTo('#game-screen')

    $(document).on('click', '#flip-cards-btn', flipCards)

    $('<div>').attr('id', 'player').appendTo('#game-screen')

    $('<div>', {
      'class': 'deck',
      'text': `Player Cards: ${player.deck.length}`
    }).appendTo('#player')

    $('<div>').attr('class', 'hand').appendTo('#player')

    $('<div>').attr('id', 'computer').appendTo('#game-screen')

    $('<div>', {
      'class': 'deck',
      'text': `Computer Cards: ${computer.deck.length}`
    }).appendTo('#computer')

    $('<div>').attr('class', 'hand').appendTo('#computer')
  }

  function createHelpScreen(){
    $('<div>').attr('id', 'help-screen').appendTo('#container')

    $('<p>').text('instructions go here').appendTo('#help-screen')
  }

  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  const mainDeck = []

  let player = {
    deck: [],
    hand: [],
    wonRound: false,
    wonGame: false,
  }

  let computer = {
    deck: [],
    hand: [],
    wonRound: false
  }

  let handLength = 0

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
    player.deck = mainDeck.splice(0, Math.floor(mainDeck.length / 2))
    computer.deck = mainDeck
  }

  function renderCards(handLength, startIndex = 0){
    while(startIndex < handLength){
      $('<div>').attr('class', `card${startIndex + 1}`).appendTo('#player .hand, #computer .hand')

      if(player.hand[startIndex]){
        $('<span>', {
          'class': 'face-val',
          'text': player.hand[startIndex].faceVal
        }).appendTo(`#player .hand .card${startIndex + 1}`)
        $('<span>', {
          'class': 'suit',
          'text': player.hand[startIndex].suit
        }).appendTo(`#player .hand .card${startIndex + 1}`)
        $(`#player .hand .card${startIndex + 1}`).addClass(player.hand[startIndex].suit)
      }

      if(computer.hand[startIndex]){
        $('<span>', {
          'class': 'face-val',
          'text': computer.hand[startIndex].faceVal
        }).appendTo(`#computer .hand .card${startIndex + 1}`)
        $('<span>', {
          'class': 'suit',
          'text': computer.hand[startIndex].suit
        }).appendTo(`#computer .hand .card${startIndex + 1}`)
        $(`#computer .hand .card${startIndex + 1}`).addClass(computer.hand[startIndex].suit)
      }

      startIndex++
    }
  }

  function flipCards(){
    player.hand.push(player.deck.shift())
    computer.hand.push(computer.deck.shift())

    $('.hand').children().length && $('[class^=card]').remove()

    handLength = (player.hand.length > computer.hand.length) ? player.hand.length : computer.hand.length
    renderCards(handLength)

    compareCards()
  }

  function compareCards(){
    let playerCardToCompare = player.hand[player.hand.length - 1].numVal
    let computerCardToCompare = computer.hand[computer.hand.length - 1].numVal

    if(playerCardToCompare > computerCardToCompare){
      player.wonRound = true
      moveToWinnerDeck()
    } else if(computerCardToCompare > playerCardToCompare){
      computer.wonRound = true
      moveToWinnerDeck()
    } else {
      war()
    }
  }

  function war(){
    let startIndex = (player.hand.length > computer.hand.length) ? player.hand.length : computer.hand.length

    for(let i = 0; i < 4; i++){
      player.deck.length && player.hand.push(player.deck.shift())
      computer.deck.length && computer.hand.push(computer.deck.shift())
    }

    handLength = (player.hand.length > computer.hand.length) ? player.hand.length : computer.hand.length

    renderCards(handLength, startIndex)

    compareCards()
  }

  function moveToWinnerDeck(){
    player.wonRound ? player.deck = player.deck.concat(player.hand, computer.hand) : null
    computer.wonRound ? computer.deck = computer.deck.concat(computer.hand, player.hand) : null

    player.hand = []
    computer.hand = []

    player.wonRound = false
    computer.wonRound = false

    $('#player .deck').text(`Player Cards: ${player.deck.length}`)
    $('#computer .deck').text(`Computer Cards: ${computer.deck.length}`)
  }

  createGame()
})