import React from "react";
import { useState } from "react";

function Card(props) {
  const { disabled, clicked, matched, id } = props;

  console.log(clicked, matched);
  const styles = {
    front: {
      display: matched ? "block" : clicked ? "block" : "none"
    },
    back: {
      display: matched ? "none" : clicked ? "none" : "block"
    }
  };

  function handleClick(id) {
    if (!disabled) {
      props.handleClick(id);
    }
  }
  return (
    <div onClick={handleClick} className="card">
      <img src={props.img} id={props.id} alt={props.img} style={styles.front} />
      <img
        src="img/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
        style={styles.back}
        onClick={() => handleClick(id)}
      />
    </div>
  );
}

export { Card };
