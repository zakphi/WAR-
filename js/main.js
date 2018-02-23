$(() => {
  console.log('connected')

  function createGame(){
    $('<div>', {
      'id': 'container'
    }).appendTo('body')

    $('<header>').appendTo('#container')

    $('<h1>', {
      'text': 'WAR!'
    }).appendTo('header')

    createStartScreen()

    $(document).on('click', '#start-btn', createGameScreen)
    $(document).one('click', '#help-btn', createHelpScreen)
  }

  function createStartScreen(){
    $('<div>', {
      'id': 'start-screen'
    }).appendTo('#container')

    $('<button>', {
      'id': 'start-btn',
      'html': 'go to war'
    }).appendTo('#start-screen')

    $('<button>', {
      'id': 'help-btn',
      'html': 'receive instructions'
    }).appendTo('#start-screen')
  }

  function createGameScreen(){
    $('#start-screen').remove()
    $('#help-screen').remove()

    $('<div>', {
      'id': 'game-screen'
    }).appendTo('#container')

    createDeck()

    $('<button>', {
      'id': 'flip-cards-btn',
      'html': 'flip'
    }).appendTo('#game-screen')

    $(document).on('click', '#flip-cards-btn', flipCards)

    $('<div>', {
      'id': 'player'
    }).appendTo('#game-screen')

    $('<h3>', {
      'class': 'score',
      'html': `Player Cards: ${player.deck.length}`
    }).appendTo('#player')

    $('<div>', {
      'class': 'deck'
    }).appendTo('#player')

    $('<div>', {
      'class': 'hand'
    }).appendTo('#player')

    $('<div>', {
      'id': 'computer'
    }).appendTo('#game-screen')

    $('<h3>', {
      'class': 'score',
      'html': `Computer Cards: ${computer.deck.length}`
    }).appendTo('#computer')

    $('<div>', {
      'class': 'deck'
    }).appendTo('#computer')

    $('<div>', {
      'class': 'hand',
    }).appendTo('#computer')
  }

  function createHelpScreen(){
    $('<div>', {
      'id': 'help-screen'
    }).appendTo('#container')

    $('<p>', {
      'html': 'instructions go here'
    }).appendTo('#help-screen')
  }

  let Card = function(suit, faceVal, numVal){
    this.suit = suit
    this.faceVal = faceVal
    this.numVal = numVal
  }

  const mainDeck = []
  let player = {deck: [], hand: [], winner: false}
  let computer = {deck: [], hand: [], winner: false}
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

  function renderCards(handLength){
    let i = $('.hand').children().length ? 1 : 0
    while(i < handLength){
      $('<div>', {
        'class': `card${i + 1}`
      }).appendTo('#player .hand, #computer .hand')

      $('<span>', {'class': 'face-val', 'html': player.hand[i].faceVal}).appendTo(`#player .hand .card${i + 1}`)
      $('<span>', {'class': 'suit', 'html': player.hand[i].suit}).appendTo(`#player .hand .card${i + 1}`)
      $(`#player .hand .card${i + 1}`).addClass(player.hand[i].suit)

      $('<span>', {'class': 'face-val', 'html': computer.hand[i].faceVal}).appendTo(`#computer .hand .card${i + 1}`)
      $('<span>', {'class': 'suit', 'html': computer.hand[i].suit}).appendTo(`#computer .hand .card${i + 1}`)
      $(`#computer .hand .card${i + 1}`).addClass(computer.hand[i].suit)

      i++
    }
  }

  function flipCards(){
    player.hand.push(player.deck.shift())
    computer.hand.push(computer.deck.shift())

    $('.hand').children().length ? $('[class^=card]').remove() : null

    handLength = (player.hand.length > computer.hand.length) ? player.hand.length : computer.hand.length
    renderCards(handLength)

    compare()
  }

  function compare(){
    if(player.hand[player.hand.length - 1].numVal > computer.hand[computer.hand.length - 1].numVal){
      player.winner = true
      moveToWinner()
    } else if(computer.hand[computer.hand.length - 1].numVal > player.hand[player.hand.length - 1].numVal){
      computer.winner = true
      moveToWinner()
    } else {
      tie()
    }
  }

  function tie(){
    for(let i = 0; i < 4; i++){
      player.hand.push(player.deck.shift())
      computer.hand.push(computer.deck.shift())
    }

    handLength = (player.hand.length > computer.hand.length) ? player.hand.length : computer.hand.length
    renderCards(handLength)

    compare()
  }

  function moveToWinner(winner){
    player.winner ? player.deck = player.deck.concat(player.hand, computer.hand) : null
    computer.winner ? computer.deck = computer.deck.concat(computer.hand, player.hand) : null

    player.hand = []
    computer.hand = []

    player.winner = false
    computer.winner = false

    $('#player .score').html(`Player Cards: ${player.deck.length}`)
    $('#computer .score').html(`Computer Cards: ${computer.deck.length}`)
  }

  createGame()
})