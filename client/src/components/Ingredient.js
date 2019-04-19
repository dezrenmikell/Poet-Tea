import React from "react";
// import styled from "styled-components";


function Ingredient(props) {
  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={e => props.handleChange(props.ingredient, e)}
        onMouseOut={e => props.updateStuff(props.ingredient, e)}
        value={props.ingredient.name}
      />
      <textarea
        name="description"
        cols="30"
        rows="10"
        onChange={e => props.handleChange(props.ingredient, e)}
        onMouseOut={e => props.updateStuff(props.ingredient, e)}
        value={props.ingredient.description}
      />
      <button onClick={() => props.deleteIngredient(props.ingredient)}>
        DELETE
      </button>
    </div>
  );
}

export default Ingredient;
