import React from "react";
import styled from "styled-components";

const ContentBox = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 15%;
  width: 70vw;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const Text = styled.h1`
  font-family: "Raleway", sans-serif;
  color: white;
  margin-top: 4rem;
  font-size: 4rem;

  letter-spacing: 1rem;
  padding: 10vw;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      filter: blur(10px);
    }
    50%,
    100% {
      opacity: 1;
      filter: blur(0px);
    }
  }
`;

const LetterBox = styled.span`
  animation: fadeIn 3s alternate infinite;
  animation-delay: ${(props) => props.delay}ms;
`;

const BokehText = (props) => {
  let text = props.bokehText;
  let letters = text.split("");
  let content = letters.map((letter) => {
    let delay = Math.floor(Math.random() * 1000 + 1);
    return <LetterBox delay={delay}>{letter}</LetterBox>;
  });
  return (
    <ContentBox>
      <Text>{content}</Text>
    </ContentBox>
  );
};
export default BokehText;
