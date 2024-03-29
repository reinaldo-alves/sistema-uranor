import styled from "styled-components";

export const NotFoundContainer = styled.div`
    height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`;

export const ErrorImage = styled.img`
    height: 175px;
    color: ${(props) => {return props.theme.color.lighterColor}};
`;

export const ErrorMessage = styled.h1`
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 25px;
    font-size: 40px;
    padding: 0 20px;
    text-align: center;
`;

export const MessageSpan = styled.span`
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 500;
    padding: 0 20px;
    text-align: center;
    width: 90%;
    max-width: 1000px;

    @media (max-width: 586px) {
        font-size: 20px;
    }
`;

export const ErrorButton = styled.button`
    font-size: 16px;
    font-weight: bold;
    padding: 8px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    border: solid 2px ${(props) => {return props.theme.color.lighterColor}};
    background-color: transparent;
    border-radius: 8px;

    :hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    :active {
        background-color: red;
    }
`;
