import styled from "styled-components";

export const ButtonContainer = styled.div`
    width: 80%;
    max-width: 1450px;
    display: grid;
    align-items: center;
    justify-items: center;
    justify-content: center;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 300px));
    margin-bottom: 25px; 
`;

export const ButtonOptions = styled.div`
    border: solid 1px ${(props) => props.theme.color.darkerColor};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.color.darkerColor};
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    background-color: ${(props) => props.theme.color.mediumColorTr};
    aspect-ratio: 1 / 1;
    z-index: 1;
    width: 100%;
    max-width: 300px;
    max-height: 300px;

    img {
        height: 220px;
    }

    :hover {
        transform: scale(1.05);
        cursor: pointer;
        background-color: ${(props) => props.theme.color.mediumColorOp};
    }

    :active {
        border-color: ${(props) => {return props.theme.color.lighterColor}};
    }
`;