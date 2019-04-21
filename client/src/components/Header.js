import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CoolNav = styled.div`
  background: orange;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 4px solid black;
  height: 200px;
  margin: 0 auto;
  img{
    width: 150px;
    height: 115px;
  },
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
const StyledLink2 = styled(Link)`
  display: block;
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
          <StyledLink2 to="/health">Health Tips</StyledLink2>
          <StyledLink2 to="/jewlerys">Jewlery Page</StyledLink2>
          <img src={'https://i.imgur.com/9QlQwWB.jpg?1'} alt="" />
          <h3>AMAZING TO TASTE, TOUCH, FEEL AND SEE..SOUNDS LIKE POETRY</h3>
      
        </CoolNav>
      </div>
    );
  }
}

export default Header;
