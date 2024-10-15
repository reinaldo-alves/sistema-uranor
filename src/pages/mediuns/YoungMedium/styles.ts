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

export const SearchContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 180px;
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

export const ResultsCard = styled.div`
    width: 90%;
    max-width: 1400px;
    height: calc(100vh - 449px);
    min-height: 300px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: flex;
    align-items: flex-start;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-top: 30px;
    overflow: auto;

    @media (max-width: 786px) {
        min-height: 500px;
    }

`;

export const ResultsTable = styled.div`
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0px 30px;

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

//=========================================================================================================

export const PersonalCard = styled.div<{hide?: boolean}>`
    margin-top: 30px;
    width: 90%;
    max-width: 1200px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    display: ${({ hide }) => hide? 'none' : 'flex'};
    flex-direction: column;
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
        white-space: nowrap;
        text-decoration: underline;
        
        @media (max-width: 1000px) {
            font-size: 14px;
        }
    }

`;

export const SectionTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
`;

export const GridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto 1fr;
    align-items: center;
    gap: 20px 10px;
    
    label:nth-child(4n-1) {
        padding-left: 10px;
    }

    @media (max-width: 800px) {
        grid-template-columns: auto 1fr;

        label:nth-child(4n-1) {
            padding-left: 0px;
        }
    }
`;

export const FieldContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto 150px;
    align-items: center;
    width: 100%;
    min-width: 150px;
    gap: 20px 10px;

    label:not(:first-of-type) {
        padding-left: 10px;
    }

    @media (max-width: 800px) {
        grid-template-columns: auto 1fr;
    }
`;

export const Observations = styled.textarea`
    border-radius: 8px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    padding: 6px;
    font-size: 18px;
    font-weight: bold;
    resize: none;
    height: 150px;
    
    @media (max-width: 1000px) {
        font-size: 14px;
    }

    @media (max-width: 500px) {
        height: 200px;
    }
`;

//=========================================================================================================

export const MediumMainInfo = styled.span`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.lighterColor}};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
        text-decoration: underline;
    }
`;

export const NameAndId = styled.div`
    width: 90%;
    color: ${(props) => {return props.theme.color.lighterColor}};
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    text-align: center;
`;

export const MainInfoContainer = styled.div`
    width: 90%;
    max-width: 1000px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;

    @media (max-width: 700px) {
        flex-direction: column;
        gap: 5px;
    }
`;

export const ButtonContainer = styled.div`
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
`;

export const MediumInfo = styled.span<{out?: boolean}>`
    width: ${({ out }) => out? '100%' : 'auto'};
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    color: ${(props) => {return props.theme.color.darkerColor}};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
        text-decoration: underline;
    }

    @media (max-width: 1100px) {
        text-align: ${({ out }) => out? 'center' : 'left'};
    }
`;

export const MediumText = styled.span`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 20px;

    @media (max-width: 800px) {
        grid-template-columns: auto;
        width: auto;
    }
`;