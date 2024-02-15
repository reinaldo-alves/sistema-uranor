import styled from "styled-components";

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
    max-height: 90vh;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    overflow-y: auto;
`;

export const ModalTitle = styled.h1`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 20px;
    text-align: center;
`;

export const ModalSubTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: center;
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

    :disabled {
        border-color: gray;
        background-color: gray;

        :hover {
            cursor: not-allowed;
            transform: scale(1);
        }

        :active {
            border-color: gray;
            background-color: gray;
        }
    }
`;

export const ModalInputContainer = styled.div`
    width: 100%;
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
        height: 35px;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }

    select {
        width: 100%;
        height: 35px;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }

    textarea {
        width: 100%;
        height: 100px;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
        resize: none;
    }

`;