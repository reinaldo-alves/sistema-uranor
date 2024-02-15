import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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

export const SearchContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 90px 1fr 160px;
    align-items: center;
    gap: 20px;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
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
`;

export const SearchButton = styled.button`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: 100%;
    background-color: green;
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

export const ResultsTable = styled.div`
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 30px;

    @media (max-width: 1120px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 786px) {
        grid-template-columns: 1fr;
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

export const ResultsTitle = styled.span`
    font-size: 18px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 4px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

export const ResultsDetails = styled.span`
    font-size: 12px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding-left: 4px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

export const InfoCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 786px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const InfoContent = styled.span`
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: ${(props) => {return props.theme.color.darkerColor}};
    
    @media (max-width: 786px) {
        text-align: center;
    }
`;