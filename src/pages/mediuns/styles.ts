import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
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