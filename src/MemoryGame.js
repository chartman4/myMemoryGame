import React, { Component } from "react";
import shuffle from "shuffle-array";
import Navbar from "./Navbar";
import TryCounter from "./TryCounter";
import Card from "./Card";

// A card can be in 1 of 3 CardStates
// HIDING - the card is not being shown
// SHOWING - the card is being shown but does not have a match yet
// MATCHING - the card is being shown and has a match.
//            the card should never move from MATCHING to another state during
//            game play.
const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

export default class MemoryGame extends Component {
  constructor(props) {
    super(props);

    // The cards that we will use for our state.

    let cards = [
      {
        id: 0,
        cardState: CardState.HIDING,
        backgroundColor: "red",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOlycdEZu0zPgjPFLogtpB86SRngpidn2u49odjOfzqeu2khF"
      },
      {
        id: 1,
        cardState: CardState.HIDING,
        backgroundColor: "red",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOlycdEZu0zPgjPFLogtpB86SRngpidn2u49odjOfzqeu2khF"
      },
      {
        id: 2,
        cardState: CardState.HIDING,
        backgroundColor: "navy",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLncf-vE7LLzSqWz3Oudy--LT56DRuj0BBzsa-nO6xgGolR3E75g"
      },
      {
        id: 3,
        cardState: CardState.HIDING,
        backgroundColor: "navy",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLncf-vE7LLzSqWz3Oudy--LT56DRuj0BBzsa-nO6xgGolR3E75g"
      },
      {
        id: 4,
        cardState: CardState.HIDING,
        backgroundColor: "green",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXKP2HC8gZuybUIYBF9CbuORSVX4cUix_ab3iBpEN0iAoMG2-"
      },
      {
        id: 5,
        cardState: CardState.HIDING,
        backgroundColor: "green",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXKP2HC8gZuybUIYBF9CbuORSVX4cUix_ab3iBpEN0iAoMG2-"
      },
      {
        id: 6,
        cardState: CardState.HIDING,
        backgroundColor: "yellow",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQakg0Zsdq-VyIvWHmE-jOvwKmIZ_wxdfQ4_9uICjjAx14gQEQvow"
      },
      {
        id: 7,
        cardState: CardState.HIDING,
        backgroundColor: "yellow",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQakg0Zsdq-VyIvWHmE-jOvwKmIZ_wxdfQ4_9uICjjAx14gQEQvow"
      },
      {
        id: 8,
        cardState: CardState.HIDING,
        backgroundColor: "black",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-Zt0iqOEYcz8PW9rLrKF6MNiRLBe-ihzip8vPRnxHs3Ma3lAcw"
      },
      {
        id: 9,
        cardState: CardState.HIDING,
        backgroundColor: "black",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-Zt0iqOEYcz8PW9rLrKF6MNiRLBe-ihzip8vPRnxHs3Ma3lAcw"
      },
      {
        id: 10,
        cardState: CardState.HIDING,
        backgroundColor: "purple",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5_CFKMO3l6VYdiGvD0hU_Tb31_oq2YTp2Dsm6DCHAvpcJlGz"
      },
      {
        id: 11,
        cardState: CardState.HIDING,
        backgroundColor: "purple",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5_CFKMO3l6VYdiGvD0hU_Tb31_oq2YTp2Dsm6DCHAvpcJlGz"
      },
      {
        id: 12,
        cardState: CardState.HIDING,
        backgroundColor: "pink",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGM6EpS6LUK5Pl4IlPx-cdZ2f8-7NQA4-w_CM6B7P6N35qBa2zMQ"
      },
      {
        id: 13,
        cardState: CardState.HIDING,
        backgroundColor: "pink",
        imageAdr:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGM6EpS6LUK5Pl4IlPx-cdZ2f8-7NQA4-w_CM6B7P6N35qBa2zMQ"
      }
      //   { id: 14, cardState: CardState.HIDING, backgroundColor: "lightskyblue" },
      //   { id: 15, cardState: CardState.HIDING, backgroundColor: "lightskyblue" }
    ];
    cards = shuffle(cards);
    this.state = { cards, noClick: false, tryCounter: 0 };

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }));
    cards = shuffle(cards);
    this.setState({ cards, tryCounter: 0 });
  }

  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(c => {
        if (idsToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          };
        }
        return c;
      });
    };

    const foundCard = this.state.cards.find(c => c.id === id);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter(c => c.cardState === CardState.SHOWING);

    const ids = showingCards.map(c => c.id);
    if (showingCards.length === 2) {
      this.setState((prevState, props) => ({
        tryCounter: prevState.tryCounter + 1
      }));
    }

    if (
      showingCards.length === 2 &&
      showingCards[0].backgroundColor === showingCards[1].backgroundColor
    ) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);

      noClick = true;

      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          // set the state of the cards to HIDING after 1.3 seconds
          this.setState({ cards: hidingCards, noClick: false });
        }, 1300);
      });
      return;
    }

    this.setState({ cards, noClick });
  }

  render() {
    const cards = this.state.cards.map(card => (
      <Card
        key={card.id}
        showing={card.cardState !== CardState.HIDING}
        backgroundColor={card.backgroundColor}
        imgAdr={card.imageAdr}
        onClick={() => this.handleClick(card.id)}
      />
    ));

    return (
      <div>
        <Navbar onNewGame={this.handleNewGame} />
        {cards}
        <TryCounter tryCounter={this.state.tryCounter} />
      </div>
    );
  }
}
