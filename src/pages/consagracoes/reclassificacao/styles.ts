import styled from "styled-components";

export const MainContainer = styled.div`
    height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CardsContainer = styled.div`
    width: 80%;
    max-width: 1450px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    margin-bottom: 25px;
`;

export const ButtonReclassDoc = styled.div`
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    height: 3em;
    z-index: 1;
    width: 100%;

    @media (max-width: 1099px) {
        font-size: 20px;
    }

    :hover {
        transform: scale(1.05);
        cursor: pointer;
        background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    }

    :active {
        border-color: ${(props) => {return props.theme.color.lighterColor}};
    }
`;