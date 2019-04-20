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
          img src={'https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/35405325_908242812695738_7036877832265400320_n.jpg?_nc_cat=110&_nc_ht=scontent-atl3-1.xx&oh=bd4acef7862e5bae9c121f2ca5ddcb9b&oe=5D3BE633'} alt="" />
          <h3>AMAZING TO TASTE, TOUCH, FEEL AND SEE..SOUNDS LIKE POETRY</h3>
        <StyledLink to="/jewlerys">Jewlery Page</StyledLink>
        </CoolNav>
      </div>
    );
  }
}

export default Header;
