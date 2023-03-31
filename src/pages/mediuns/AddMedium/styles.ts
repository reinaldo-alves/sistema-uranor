import styled from "styled-components";

export const MainContainer = styled.div`
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;

export const FieldContainer = styled.div<{width?: string}>`
    display: flex;
    align-items: center;
    min-width: ${({ width }) => width? width : '0'};
    width: ${({ width }) => width? width : '100%'};

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        white-space: nowrap;
        margin-right: 10px;
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