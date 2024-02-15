import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TitleContainer = styled.div`
    padding: 32px;
    text-align: center;
    color: ${(props) => {return props.theme.color.lighterColor}};

    h1 {
        padding-bottom: 10px;
    }
`;

export const ResultsCard = styled.div<{show: boolean}>`
    width: 90%;
    max-width: 1400px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: ${({ show }) => show ? 'flex' : 'none'};
    align-items: flex-start;
    gap: 10px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 20px;

    @media (max-width: 786px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const YearTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => {return props.theme.color.darkerColor}};

    @media (max-width: 786px) {
        width: 100%;
        text-align: center;
    }
`;

export const ResultsTable = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-left: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    padding-left: 10px;

    @media (max-width: 786px) {
        border: none;
        padding: 0;
    }
`;

export const Results = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ResultsTitle = styled.span`
    font-size: 18px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    text-align: left;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const ResultsDetails = styled.span`
    font-size: 12px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    text-align: left;
    padding-left: 10px;
`;

export const MediumButton = styled.button`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: 200px;
    background-color: green;
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 45px;
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
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-bottom: 30px;

    @media (max-width: 500px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const EditObs = styled.span`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin-bottom: 30px;
    padding: 0 20px;
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