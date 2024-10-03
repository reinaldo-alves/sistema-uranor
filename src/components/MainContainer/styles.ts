import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MainTitle = styled.h1`
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 32px;
    text-align: center;

    @media (max-width: 720px) {
        margin-top: 0;
    }
`;

export const SubTitle = styled.h2`
    padding-top: 10px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 32px;
    text-align: center;
    margin-top: -30px;
`;