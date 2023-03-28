import styled from "styled-components";

export const GlobalContainer = styled.div`
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SectionTitle = styled.h1`
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 25px;
`;

export const CardsCantoContainer = styled.div<{colums: string}>`
    width: 80%;
    height: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(${({ colums }) => colums? colums : '3'}, 1fr);
    margin-bottom: 25px;
`;













export const CardMenu = styled.div`
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: 50% 50%;
    background-size: cover;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    font-size: 25px;
    text-align: center;

    :hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    :active {
        border-color: ${(props) => {return props.theme.color.lighterColor}};
    }
`;