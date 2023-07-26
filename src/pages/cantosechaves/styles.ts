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
    text-align: center;
`;

export const CardsCantoContainer = styled.div<{colums: string}>`
    width: 80%;
    height: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(${({ colums }) => colums? colums : '3'}, 1fr);
    margin-bottom: 25px;
`;