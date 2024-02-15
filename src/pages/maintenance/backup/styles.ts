import styled from "styled-components";

export const MainContainer = styled.div`
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PageButton = styled.div<{height: string}>`
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
    height: ${({ height }) => height? height : 'auto'};
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

export const CardsContainer = styled.div`
    width: 80%;
    max-width: 1450px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    margin-bottom: 25px;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        margin-bottom: 5px; 
    }

    input {
        width: 150px;
        font-size: 18px;
        font-weight: bold;
        display: block;
    }
`;

export const ObsContainer = styled.div`
    max-width: 750px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    h2, p {
        color: ${(props) => {return props.theme.color.lighterColor}};
        text-align: center;
        font-weight: bold;
    }

    p {
        font-size: 18px;
    }
`;