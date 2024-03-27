import styled from "styled-components";

export const MainInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const PersonalCard = styled.div`
    margin-top: 30px;
    width: 90%;
    max-width: 1200px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    display: flex;
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
        
        @media (max-width: 1000px) {
            font-size: 14px;
        }
    }

`;

export const MainContent = styled.div`
    display: flex;
    gap: 30px;
    width: 100%;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const SectionTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
    }

    @media (max-width: 520px) {
        flex-direction: column;
    }
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

export const GridDatesContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 20px 10px;

    @media (max-width: 540px) {
        grid-template-columns: 1fr;

        label {
            text-align: center;
            margin-bottom: -15px;
        }
    }
`;

export const DatesContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px 10px;
`;

export const FieldContainer = styled.div<{width?: string}>`
    display: flex;
    align-items: center;
    width: ${({ width }) => width? width : '100%'};
    min-width: ${({ width }) => width? width : '150px'};

    label {
        width: auto;
        padding-right: 10px;
    }

    @media (max-width: 800px) {
        width: 100%;
    }
`;

export const FieldContainerBox = styled.div`
    display: flex;
    align-items: center;

    label {
        text-align: left;
        flex: 1;
    }
    
    input[type=checkbox] {
        margin-right: 10px;
        width: 25px;
        height: 25px;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
        padding: 0;

        @media (max-width: 1000px) {
            width: 20px;
            height: 20px;
        }
    }
`;

export const ReportButton = styled.button<{color: string}>`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    margin-top: 30px;
    width: 165px;
    background-color: ${({color}) => {return color}};
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

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${(props) => {return props.theme.color.lighterColor}};
`;

export const CheckboxContainer = styled.div`
    display: flex;
    gap: 10px 30px;
    justify-content: center;
    flex-wrap: wrap;
`;