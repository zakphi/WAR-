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
      'id': 'player'
    }).appendTo('#game-screen')

    $('<h3>', {
      'class': 'score',
      'html': `Player Cards: ${player.deck.length}`
    }).appendTo('#player')

    $('<article>', {
      'class': 'deck'
    }).appendTo('#player')

    $('<article>', {
      'class': 'hand'
    }).appendTo('#player')

    $('<article>', {
      'id': 'computer'
    }).appendTo('#game-screen')

    $('<h3>', {
      'class': 'score',
      'html': `Computer Cards: ${computer.deck.length}`
    }).appendTo('#computer')

    $('<article>', {
      'class': 'deck'
    }).appendTo('#computer')

    $('<article>', {
      'class': 'hand',
    }).appendTo('#computer')
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
  let deckLength = 0

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

  function flipCards(){
    player.hand.push(player.deck.shift())
    computer.hand.push(computer.deck.shift())

    $('<article>', {
      'class': 'card'
    }).appendTo('#player .hand, #computer .hand')

    $('<span>', {
      'class': 'face-val'
    }).appendTo('#player .hand .card, #computer .hand .card')

    $('<span>', {
      'class': 'suit'
    }).appendTo('#player .hand .card, #computer .hand .card')

    $('#player .hand .card .face-val').html(player.hand[0].faceVal)
    $('#player .hand .card .suit').html(player.hand[0].suit)

    $('#computer .hand .card .face-val').html(computer.hand[0].faceVal)
    $('#computer .hand .card .suit').html(computer.hand[0].suit)

    compare()
  }

  function compare(){
    if(player.hand[player.hand.length - 1].numVal > computer.hand[computer.hand.length - 1].numVal){
      moveToWinner('player')
    } else if(computer.hand[computer.hand.length - 1].numVal > player.hand[player.hand.length - 1].numVal){
      moveToWinner('computer')
    } else {
      tie()
    }
  }

  function tie(){
    for(let i = 0; i < 4; i++){
      player.hand.push(player.deck.shift())
      computer.hand.push(computer.deck.shift())
    }

    deckLength = (player.hand.length > computer.hand.length) ? player.hand.length : computer.hand.length
    for(let i = 1; i < deckLength; i++){
      $('<article>', {
        'class': `card${i}`
      }).appendTo('#player .hand, #computer .hand')

      $('<span>', {'class': 'face-val', 'html': player.hand[i].faceVal}).appendTo(`#player .hand .card${i}`)
      $('<span>', {'class': 'suit', 'html': player.hand[i].suit}).appendTo(`#player .hand .card${i}`)

      $('<span>', {'class': 'face-val', 'html': computer.hand[i].faceVal}).appendTo(`#computer .hand .card${i}`)
      $('<span>', {'class': 'suit', 'html': computer.hand[i].suit}).appendTo(`#computer .hand .card${i}`)
    }

    compare()
  }

  function moveToWinner(winner){
    if(winner === 'player'){
      player.deck = player.deck.concat(player.hand, computer.hand)
    } else {
      computer.deck = computer.deck.concat(computer.hand, player.hand)
    }

    player.hand = []
    computer.hand = []

    $('#player .score').html(`Player Cards: ${player.deck.length}`)
    $('#computer .score').html(`Computer Cards: ${computer.deck.length}`)
  }

  createGame()
})