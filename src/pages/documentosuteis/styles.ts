import styled from "styled-components";

export const DocsContainer = styled.div`
    height: 100%;
    min-height: ${(props) => {return props.theme.height.mainContent}};
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

export const ButtonUtilDoc = styled.div<{disabled?: boolean}>`
    border: solid 1px ${(props) => props.disabled ? props.theme.color.lighterColor : props.theme.color.darkerColor};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.disabled ? props.theme.color.lighterColor : props.theme.color.darkerColor};
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    background-color: ${(props) => props.disabled ? 'rgba(200, 200, 200, 0.9)' : props.theme.color.mediumColorTr};
    height: 3em;
    z-index: 1;
    width: 100%;

    @media (max-width: 1099px) {
        font-size: 20px;
    }

    :hover {
        transform: ${({ disabled }) => disabled ? 'scale(1)' : 'scale(1.05)'};
        cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
        background-color: ${(props) => props.disabled ? 'rgba(200, 200, 200, 0.9)' : props.theme.color.mediumColorOp};
    }

    :active {
        border-color: ${(props) => {return props.theme.color.lighterColor}};
    }
`;