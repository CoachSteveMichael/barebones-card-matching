import React from "react";
import { useEffect, useState } from "react";
import { Card } from "./Card";

//make a turn state to track whose turn it is
//limit click to 2 per turn
//make player score state
//after 2 turns, reset styles
//if 2 cards match, leave them visible, and increment player score
//

function GameContainer(props) {
  const [photos, setPhotos] = useState([]);
  const [player1Turn, setPlayer1Turn] = useState(true);
  const [choices, setChoices] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0
  });

  useEffect(() => {
    async function fetchImages() {
      let url = `https://pixabay.com/api/?key=31250336-c5c5040bcca1903c98e1ca251&q=scenery&image_type=photo`;
      await fetch(url)
        .then((res) => res.json())
        .then((data) =>
          setPhotos(() => {
            let temp = [
              ...data["hits"].slice(0, 6),
              ...data["hits"].slice(0, 6)
            ];
            return temp.map((ele, index) => {
              return {
                ...ele,
                matched: false,
                clicked: false,
                id: Math.random()
              };
            });
          })
        );
    }
    fetchImages();
  }, []);

  useEffect(() => {
    if (choices.length === 2) {
      console.log("hi");
      turnPoints();
    }
  }, [choices]);

  useEffect(() => {
    updateBoard();
    setChoices([]);
  }, [player1Turn]);

  let cardElements = photos.map((ele, index) => (
    <Card
      key={index}
      id={ele.id}
      img={ele.webformatURL}
      handleClick={handleClick}
      disabled={disabled}
      clicked={ele.clicked}
      matched={ele.matched}
    />
  ));

  function turnPoints() {
    if (choices[0]?.webformatURL === choices[1]?.webformatURL) {
      console.log("match");
      let copy = [...photos];

      let mapped = copy.map((ele) => {
        if (ele.webformatURL === choices[0].webformatURL) {
          return {
            ...ele,
            matched: true
          };
        } else {
          return {
            ...ele
          };
        }
      });

      setPhotos(mapped);
      player1Turn
        ? setScores((prev) => {
            return {
              ...prev,
              player1: (scores.player1 += 1)
            };
          })
        : setScores((prev) => {
            return {
              ...prev,
              player2: (scores.player2 += 1)
            };
          });
      setPlayer1Turn(!player1Turn);
    } else {
      setPlayer1Turn(!player1Turn);
    }
  }

  function updateBoard() {
    let mapped = photos.map((ele) => {
      if (!ele.matched) {
        return {
          ...ele,
          clicked: false
        };
      } else {
        return {
          ...ele
        };
      }
      console.log(mapped);
    });
    setPhotos(mapped);
  }

  function handleClick(id) {
    setDisabled(true);
    let copy = [...photos];
    for (let i = 0; i < photos.length; i++) {
      if (copy[i]["id"] === id) {
        copy[i]["clicked"] = true;
        setChoices([...choices, copy[i]]);
      }
    }
    setPhotos(copy);
    setTimeout(() => {
      setDisabled(false);
    }, 1);
  }

  return (
    <div>
      <div className="gameContainer">{cardElements}</div>
      <div className="scores">
        <h2>Player 1: {scores.player1 / 2}</h2>
        <h2>Player 2: {scores.player2 / 2}</h2>
      </div>
    </div>
  );
}

export { GameContainer };

//Originally i had 2 states for each choice: choice 1 and choice 2... but using the ternary below
//only choice 1 would update, and choice 2 would be left blank
// function handleClick(id) {

//   choice1.length > 0 ? setChoice2(photos[id]) : setChoice1(photos[id])
//   console.log('choice1', choice1, 'choice2', choice2)

// }
