import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CoolNav = styled.div`
  background: orange;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 4px solid black;
  height: 160px;
  margin: 0 auto;
  img{
    width: 160px;
    height: 75px;
  },
  h1,
  h3 {
    text-align: center;

    align-items: center;
    padding: 0;
  }
  .health {
    position: absolute;
    top: 20px;
    left: 3px;
  }
  .jewlery {
    position: absolute;
    top: 20px;
    right: 3px;
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
  display: inline-block;
  background: silver;
  border: 2px solid black;
  border-radius: 8px;
  width: 90px;
  text-align: center;
  align-items: row;

`;

class Header extends Component {
  render() {
    return (
      <div>
        <CoolNav>
          <StyledLink2 className="health" to="/health">Health Tips</StyledLink2>
          <StyledLink2 className="jewlery" to="/jewlerys">Jewlery Page</StyledLink2>
          <img src={'https://i.imgur.com/9QlQwWB.jpg?1'} alt="" />
          <h3>AMAZING TO TASTE, TOUCH, FEEL AND SEE..SOUNDS LIKE POETRY</h3>
      
        </CoolNav>
      </div>
    );
  }
}

export default Header;
