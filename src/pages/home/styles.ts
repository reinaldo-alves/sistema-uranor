import styled from "styled-components";

export const HomeContainer = styled.div`
    height: ${(props) => {return props.theme.height.homeContent}};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardsContainer = styled.div`
    height: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
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