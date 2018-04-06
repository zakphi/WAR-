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

    $('<div>').attr('id', 'players').appendTo('#game-screen')

    $('<div>').attr('id', 'human').appendTo('#players')

    $('<div>', {
      'class': 'deck',
      'text': `Player Cards: ${human.deck.length}`
    }).appendTo('#human')

    $('<div>').attr('class', 'hand').appendTo('#human')

    $('<div>').attr('id', 'computer').appendTo('#players')

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

  class Card {
    constructor(suit, faceVal, numVal){
      this.suit = suit
      this.faceVal = faceVal
      this.numVal = numVal
    }
  }

  class Player {
    constructor(){
      this.deck = []
      this.hand = []
      this.wonRound = false
      this.wonGame = false
    }

    reset(){
      this.deck = []
      this.hand = []
      this.wonRound = false
      this.wonGame = false
    }
  }

  let human = new Player
  let computer = new Player
  let mainDeck = []
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
    let deckSize = mainDeck.length
    let shuffledDeck = []
    let randIndex

    for(let i = 0; i < deckSize; i++){
      randIndex = Math.floor(Math.random() * mainDeck.length)
      shuffledDeck.push(mainDeck.splice(randIndex, 1)[0])
    }

    mainDeck = shuffledDeck

    splitDeck()
  }

  function splitDeck(){
    human.deck = mainDeck.splice(0, Math.floor(mainDeck.length / 2))
    computer.deck = mainDeck
  }

  function renderCards(handLength, startIndex = 0){
    while(startIndex < handLength){
      if(human.hand[startIndex]){
        $('<div>').attr('class', `card${startIndex + 1}`).appendTo('#human .hand')
        $('<span>', {
          'class': 'face-val',
          'text': human.hand[startIndex].faceVal
        }).appendTo(`#human .hand .card${startIndex + 1}`)
        $('<span>', {
          'class': 'suit',
          'text': human.hand[startIndex].suit
        }).appendTo(`#human .hand .card${startIndex + 1}`)
        $(`#human .hand .card${startIndex + 1}`).addClass(human.hand[startIndex].suit)
      }

      if(computer.hand[startIndex]){
        $('<div>').attr('class', `card${startIndex + 1}`).appendTo('#computer .hand')
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
   if(human.deck.length && computer.deck.length){
     human.hand.push(human.deck.shift())
     computer.hand.push(computer.deck.shift())

     $('.hand').children().length && $('[class^=card]').remove()

     handLength = (human.hand.length > computer.hand.length) ? human.hand.length : computer.hand.length
     renderCards(handLength)

     compareHands()
   }
  }

  function compareHands(){
    let humanCardToCompare = human.hand[human.hand.length - 1].numVal
    let computerCardToCompare = computer.hand[computer.hand.length - 1].numVal

    if(humanCardToCompare > computerCardToCompare){
      human.wonRound = true
      moveToWinnerDeck()
    } else if(computerCardToCompare > humanCardToCompare){
      computer.wonRound = true
      moveToWinnerDeck()
    } else if(computerCardToCompare === humanCardToCompare) {
      $('#flip-cards-btn').remove()
      $(document).off('click', '#flip-cards-btn', flipCards)

      let warBtn = $('<button>', {
        'id': 'war-btn',
        'text': 'war'
      })

      $('#war-btn').length === 0 && warBtn.appendTo('#game-screen').insertBefore('#players')

      $(document).on('click', '#war-btn', war)
    }

    checkForWinner()
  }

  function war(){
    $('#war-btn').remove()
    $(document).off('click', '#war-btn', war)

    let flipBtn = $('<button>', {
      'id': 'flip-cards-btn',
      'text': 'flip'
    })

    $('#flip-cards-btn').length === 0 && flipBtn.appendTo('#game-screen').insertBefore('#players')

    $(document).on('click', '#flip-cards-btn', flipCards)

    let startIndex = (human.hand.length > computer.hand.length) ? human.hand.length : computer.hand.length

    for(let i = 0; i < 4; i++){
      human.deck.length && human.hand.push(human.deck.shift())
      computer.deck.length && computer.hand.push(computer.deck.shift())
    }

    handLength = (human.hand.length > computer.hand.length) ? human.hand.length : computer.hand.length

    renderCards(handLength, startIndex)

    compareHands()
  }

  function moveToWinnerDeck(){
    human.wonRound ? human.deck = human.deck.concat(human.hand, computer.hand) : null
    computer.wonRound ? computer.deck = computer.deck.concat(computer.hand, human.hand) : null

    human.hand = []
    computer.hand = []

    human.wonRound = false
    computer.wonRound = false

    $('#human .deck').text(`Player Cards: ${human.deck.length}`)
    $('#computer .deck').text(`Computer Cards: ${computer.deck.length}`)
  }

  function checkForWinner(){
    if(human.deck.length === 52){
      human.wonGame = true
      createEndGameScreen()
    } else if(computer.deck.length === 52){
      computer.wonGame = true
      createEndGameScreen()
    }
  }

  function createEndGameScreen(){
    $('#flip-cards-btn').remove()

    $('<div>').attr('id', 'end-game-screen').insertBefore('#game-screen')

    endGameMessage = human.wonGame ? 'You Won!' : 'You Lost!'

    $('h2').length === 0 && $('<h2>').text(`${endGameMessage}`).appendTo('#end-game-screen')

    let replayBtn = $('<button>', {
      'id': 'replay-btn',
      'text': 'replay'
    })

    $('#replay-btn').length === 0 && replayBtn.appendTo('#end-game-screen')

    $(document).one('click', '#replay-btn', replayGame)
  }

  function replayGame(){
    $('#end-game-screen').remove()
    $('#game-screen').remove()

    mainDeck = []
    human.reset()
    computer.reset()

    createGameScreen()
  }

  createGame()
})