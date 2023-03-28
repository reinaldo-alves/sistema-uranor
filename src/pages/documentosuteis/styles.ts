import styled from "styled-components";

export const DocsContainer = styled.div`
    height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SectionTitle = styled.h1`
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 25px;
`;

export const CardsContainer = styled.div`
    width: 80%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 25px;
`;