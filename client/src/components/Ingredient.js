import React from "react";
import styled from "styled-components";

const DeleteButton = styled.button`
  height: 20px;
  margin: 0 auto;
  marigin-top: 20px;
  width: 70px;
  border-radius: 10px;
  background: red;
  font-weight: bold;
  font-family: 'Lobster', cursive;
`;

const UpdateButton = styled.button`
  margin: 0 auto;
  marigin-top: 20px;
  border-radius: 10px;
  background: green;
  font-weight: bold;
  font-family: 'Lobster', cursive;
`;


function Ingredient(props) {
  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={e => props.handleChange(props.ingredient, e)}
        value={props.ingredient.name}
      />
      <textarea
        name="description"
        cols="30"
        rows="10"
        onChange={e => props.handleChange(props.ingredient, e)}
        value={props.ingredient.description}
      />
      <UpdateButton onClick={(e) => props.updateIngredient(props.ingredient, e)}>
      SUBMIT UPDATE
      </UpdateButton>
      <DeleteButton onClick={() => props.deleteIngredient(props.ingredient,)}>
        DELETE
      </DeleteButton>
    </div>
  );
}

export default Ingredient;
