import styled from "styled-components";
import SystemBack from './assets/fundo-sistema.jpg'

export const Background = styled.div`
    min-height: 100vh;
    background-image: url(${SystemBack});
    background-position: 50% 50%;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Footer = styled.p`
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    font-size: 14px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 2em 0 1em 0;
    padding: 0 20px;
    background: transparent;
`;
