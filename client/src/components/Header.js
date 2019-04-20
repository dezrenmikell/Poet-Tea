import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CoolNav = styled.div`
  background: cadetblue;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 4px solid black;
  height: 190px;
  margin: 0 auto;
  h1,
  h3 {
    text-align: center;

    align-items: center;
    padding: 0;
  }
`;
const StyledLink = styled(Link)`
  background: silver;
  border: 2px solid black;
  border-radius: 8px;
  width: 100px;
  text-align: center;
`;

class Header extends Component {
  render() {
    return (
      <div>
        <CoolNav>
          <StyledLink to="/health">Health Tips</StyledLink>
          
          <h1>Poet-Tea</h1>
          <img src={'https://i.imgur.com/t3aUwnR.jpg?2} alt="" />
          <h3>AMAZING TO TASTE, TOUCH, FEEL AND SEE..SOUNDS LIKE POETRY</h3>
        <StyledLink to="/jewlerys">Jewlery Page</StyledLink>
        </CoolNav>
      </div>
    );
  }
}

export default Header;
