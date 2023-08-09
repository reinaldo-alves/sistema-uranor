import styled from "styled-components";

export const DocsContainer = styled.div`
    height: ${(props) => {return props.theme.height.mainContent}};
    min-height: 640px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CardsContainer = styled.div`
    width: 80%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 25px;

    @media (max-width: 1110px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;