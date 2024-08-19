import styled from "styled-components";

export const InputContainer = styled.div`
    max-width: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    label {
        font-weight: bold;
        text-align: right;
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
`;

export const SearchButton = styled.button`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: 200px;
    background-color: green;
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 35px;
    font-size: 20px;

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

export const ResultsCard = styled.div`
    width: 90%;
    max-width: 1400px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 30px;
    overflow: auto;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const ResultsTable = styled.div`
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px 30px;
    justify-items: center;

    @media (max-width: 1250px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1020px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 786px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

export const InfoContent = styled.span`
    font-size: 20px;
    margin-top: 10px;
    font-weight: bold;
    text-align: left;
    color: ${(props) => {return props.theme.color.darkerColor}};
    
    @media (max-width: 786px) {
        text-align: center;
    }
`;