import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SearchCard = styled.div`
    width: 90%;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: grid;
    grid-template-columns: 1fr 250px 90px;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
`;

export const InputContainer = styled.div`
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
        padding: 0.4em;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }
`;

export const SearchButton = styled.button`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    margin-top: 20px;
    width: 100%;
    background-color: green;
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 35px;
    font-size: 20px;
    align-self: flex-end;

    :hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    :active {
        color: white;
        background-color: ${(props) => {return props.theme.color.darkerColor}};
        border: solid ${(props) => {return props.theme.color.lighterColor}};
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