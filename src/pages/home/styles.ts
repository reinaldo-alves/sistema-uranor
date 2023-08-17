import styled from "styled-components";

export const HomeContainer = styled.div`
    height: ${(props) => {return props.theme.height.homeContent}};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 675px) {
        height: calc(100vh - 155px);
    }
`;

export const CardsContainer = styled.div`
    height: 100%;
    max-height: 1200px;
    width: 100%;
    display: grid;
    gap: 20px;
    padding: 0 20px;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 970px) {
        min-width: 90vw;
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 420px) {
        min-width: 352px;
        grid-template-columns: 1fr;
    }
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
    min-width: 20vw;

    @media (max-width: 675px) {
        font-size: 20px;
    }

    @media (max-height: 650px) {
        padding: 0 10px;
    }

    :hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    :active {
        border-color: ${(props) => {return props.theme.color.lighterColor}};
    }
`;