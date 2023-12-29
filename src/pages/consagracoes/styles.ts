import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ConsagracaoCard = styled.div`
    width: 90%;
    max-width: 1400px;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 25px;
`;

export const ConsagracaoHeader = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 180px;
    align-items: center;
    gap: 20px;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const ConsagracaoTitle = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 28px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px; 
`;

export const NavigateButton = styled.button<{width?: string, color?: string}>`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: ${({width}) => width? width : '180px'};
    background-color: ${({color}) => color? color : 'green'};
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

export const ResultsTable = styled.table<{show: number}>`
    width: 100%;
    overflow-y: auto;
    display: ${({show}) => show? 'flex' : 'none'};
    flex-direction: column;
`;

export const Results = styled.tr<{columns: string}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: ${({columns}) => columns? columns : 'auto'};
`;

export const ResultsTitle = styled.th<{align?: string}>`
    font-size: 22px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 4px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({align}) => align? align : 'center'};

    @media (max-width: 786px) {
        font-size: 18px;
    }
`;

export const ResultsData = styled.td<{align?: string, isNegative?: boolean}>`
    font-size: 18px;
    color: ${(props) => (props.isNegative? 'white' : props.theme.color.darkerColor)};
    background-color: ${({isNegative}) => isNegative? 'red' : 'transparent'};
    padding: 8px 4px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({align}) => align? align : 'center'};

    @media (max-width: 786px) {
        font-size: 14px;
    }
`;

export const MudancaObs = styled.span<{show: number}>`
    width: 100%;
    display: ${({show}) => show? 'block' : 'none'};
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: right;
    margin-top: -10px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0 20px;
    margin-bottom: 25px;

    @media (max-width: 638px) {
        flex-direction: column;
    }
`;