import styled from "styled-components";

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

export const UserCapsLock = styled.p<{modal?: boolean}>`
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: ${(modal) => modal? 'center' : 'right'};
    font-weight: bold;
    font-size: 12px;
    height: ${(modal) => modal? '12px' : '1px'};
    width: 100%;
    position: relative;
    top: ${(modal) => modal? '5px' : '-75px'};
`;