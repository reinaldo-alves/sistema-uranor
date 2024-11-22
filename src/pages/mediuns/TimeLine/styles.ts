import styled from "styled-components";

export const YearCard = styled.div<{show: boolean}>`
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

export const EventTable = styled.div`
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

export const EventTitle = styled.span`
    font-size: 18px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    text-align: left;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const EventDetails = styled.span`
    font-size: 12px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    text-align: left;
    padding-left: 10px;
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