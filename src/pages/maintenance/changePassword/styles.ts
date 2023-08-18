import styled from "styled-components";

export const MainContainer = styled.div`
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PasswordForm = styled.div`
    width: 380px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};

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

export const Modal = styled.div<{vis: boolean}>`
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    position: fixed;
    visibility: ${({vis}) => vis? 'visible' : 'hidden'};
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    width: 380px;
    max-width: 1400px;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};

    input {
        width: 100%;
        height: 35px;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }
`;

export const ModalTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 20px;
`;

export const ModalButton = styled.button<{color: string}>`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: 150px;
    background-color: ${({color}) => color? color : 'green'};
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 35px;
    font-size: 20px;
    align-self: flex-end;

    :hover {
        cursor: pointer;
        transform: scale(1.02);
    }

    :active {
        color: white;
        background-color: ${(props) => {return props.theme.color.darkerColor}};
        border: solid ${(props) => {return props.theme.color.lighterColor}};
    }
`;