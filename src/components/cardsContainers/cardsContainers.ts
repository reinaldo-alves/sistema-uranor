import styled from "styled-components";

export const SearchCard = styled.div`
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
`;

export const SearchContainer = styled.div<{template?: string, align?: string}>`
    width: 100%;
    display: grid;
    grid-template-columns: ${({template}) => template? template : '1fr 180px'};
    align-items: ${({align}) => align? align : 'center'};
    gap: 20px;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const InputContainer = styled.div<{box?: boolean, labelWidth?: string, inputWidth?: string}>`
    width: 100%;
    display: flex;
    flex-direction: ${({box}) => box? 'row' : 'column'};
    justify-content: center;
    align-items: center;
    gap: ${({box}) => box? '15px' : '0'};

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        margin-bottom: ${({box}) => box? '0' : '5px'};
	    width: ${({labelWidth}) => labelWidth? labelWidth : '100%'};
    }

    input {
        width: ${({box, inputWidth}) => box? '35px' : inputWidth? inputWidth : '100%'};
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

export const ResultsCard = styled.div`
    width: 90%;
    max-width: 1400px;
    height: calc(100vh - 449px);
    min-height: 300px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-top: 30px;
    overflow: auto;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Results = styled.div`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: flex;
    flex-direction: column;

    :hover {
        background-color: ${(props) => {return props.theme.color.lighterColor}};
        cursor: pointer;
    }
`;

export const InfoCard = styled.div<{falange?: boolean}>`
    width: 100%;
    display: flex;
    flex-direction: ${({falange}) => falange? 'column' : 'row'};
    justify-content: space-between;
    align-items: ${({falange}) => falange? 'flex-end' : 'center'};

    @media (max-width: 786px) {
        flex-direction: column;
        gap: 15px;
        align-items: center;
    }
`;

export const PersonalCard = styled.div<{hide?: boolean, showMedium?: boolean}>`
    margin-top: ${({ showMedium }) => showMedium? '20px' : '30px'};
    width: ${({ showMedium }) => showMedium? '100%' : '90%'};
    max-width: 1200px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    display: ${({ hide }) => hide? 'none' : 'flex'};
    flex-direction: column;
    align-items: ${({ showMedium }) => showMedium? 'center' : 'stretch'};
    gap: 15px;

    label {
        width: 100%;
        font-weight: bold;
        font-size: 18px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        white-space: nowrap;
        text-align: right;
        
        @media (max-width: 1000px) {
            font-size: 14px;
        }
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
        
        @media (max-width: 1000px) {
            font-size: 14px;
        }
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

        @media (max-width: 1000px) {
            font-size: 14px;
        }
    }

    span {
        font-weight: bold;
        font-size: 18px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        white-space: ${({ showMedium }) => showMedium? 'normal' : 'nowrap'};
        text-decoration: ${({ showMedium }) => showMedium? 'none' : 'underline'};
        
        @media (max-width: 1000px) {
            font-size: 14px;
        }
    }

`;