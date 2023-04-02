import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Main = styled.div`
  flex: 1;
  padding: 15px;
`;

export const NavBar = styled.div`
  color: #fff !important;
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const BrandName = styled.div`
    font-size: 1.4rem;
`;

export const Menu = styled.div`
`;


export const Footer = styled.div`
  flex: initial;
  padding: 10px;
  font-size: 1.2rem;
  color: #222;
  text-align: center;
  border-top: 1px solid #eee;
`;


export const Title = styled.h4`
  display: block;
  font-size: 4.4rem;
  margin: 0px;
`;
export const SubTitle = styled.p`
  display: block;
  font-size: 1.8rem;
  color: #888;
`;
export const Content = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
