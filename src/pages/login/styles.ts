import styled from "styled-components";

export const LoginHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0 25px 0;

    img {
        height: 60px;
        width: auto;
        padding-right: 20px;    
    }
`;

export const TitleContainer = styled.div`
    font-weight: bold;
    font-size: 24px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    border-left: solid 2px;
    padding-left: 20px;
`;

export const LoginCardContainer = styled.div`
    height: ${(props) => {return props.theme.height.loginContent}};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginCard = styled.div`
    width: 400px;
    height: 90%;
    border-radius: 10px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};

    h2 {
        font-weight: bold;
        color: ${(props) => {return props.theme.color.darkerColor}};
        text-align: center;
    }
`;

export const LoginForm = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        width: 100%;
        margin-bottom: 5px; 
    }

    input {
        width: 100%;
        margin-bottom: 20px;
        height: 35px;
        padding: 0.4em;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }

    button {
        font-weight: bold;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        border-radius: 8px;
        margin-top: 20px;
        width: 50%;
        background-color: green;
        color: ${(props) => {return props.theme.color.lighterColor}};
        text-align: center;
        height: 35px;
        font-size: 20px;

        :hover {
            cursor: pointer;
            transform: scale(1.05);
        }

        :active {
            color: white;
            background-color: ${(props) => {return props.theme.color.darkerColor}};
            border: solid ${(props) => {return props.theme.color.lighterColor}};
        }
    }
`;

export const LoginError = styled.div`
    color: red;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    height: 50px;
    width: 90%;
`;