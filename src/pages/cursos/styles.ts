import styled from "styled-components";

export const ConsagracaoCard = styled.div<{hide?: boolean}>`
    width: 90%;
    max-width: 1400px;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: ${({hide}) => hide? 'none' : 'flex'};
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

export const ResultsPanel = styled.div<{columns: string}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: ${({columns}) => columns? columns : 'auto'};
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

export const ResultsTableC = styled.div<{show: number}>`
    width: 100%;
    overflow-y: auto;
    display: ${({show}) => show? 'flex' : 'none'};
    flex-direction: column;
`;

export const ResultsDataC = styled.div<{align?: string, isNegative?: boolean}>`
    height: 100%;
    font-size: 18px;
    color: ${(props) => (props.isNegative? 'white' : props.theme.color.darkerColor)};
    background-color: ${({isNegative}) => isNegative? 'red' : 'transparent'};
    padding: 8px 4px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({align}) => align? align : 'center'};
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 786px) {
        font-size: 14px;
    }
`;

//===============================================================================================

export const DesenvCard = styled.div`
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
    margin-bottom: 30px;

    h3 {
        font-size: 22px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        padding: 4px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;

        @media (max-width: 786px) {
            font-size: 18px;
        }
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

    p {
        color: ${(props) => {return props.theme.color.darkerColor}};
    }
`;

export const ResultsTable = styled.div`
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

export const Results = styled.div<{columns: number}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: minmax(350px, auto) repeat(${props => props.columns}, minmax(90px, 12%));
`;

export const ResultsData = styled.div`
    height: 100%;
    font-size: 18px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 8px 4px;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

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

    @media (max-width: 786px) {
        padding: 4px 2px;
        font-size: 14px;

        select {
            padding: 2px;
            font-size: 10px;
        }
    }
`;

export const ResultsName = styled.div`
    height: 100%;
    font-size: 18px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 8px 4px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    :hover {
        cursor: pointer;
        background-color: ${(props) => {return props.theme.color.lighterColor}};
    }

    @media (max-width: 786px) {
        font-size: 14px;
    }
`;

export const DesenvLegend = styled.span`
    width: 100%;
    display: block;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: right;
    margin-top: -10px;
`;

export const ButtonContainer = styled.div<{hide?: boolean}>`
    display: ${({hide}) => hide? 'none' : 'flex'};
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 0 20px;
    margin-bottom: 25px;

    @media (max-width: 638px) {
        flex-direction: column;
    }
`;

export const ModalMediumContent = styled.div<{vis: boolean}>`
    width: 380px;
    max-width: 1400px;
    max-height: 90vh;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    display: ${({vis}) => vis? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    overflow-y: auto;
`;

export const CursoSubtitle = styled.div`
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    align-items: center;
    color: ${(props) => {return props.theme.color.lighterColor}};
    margin: 30px 0;

    h2, h3 {
        text-align: center;
    }
`;

export const MonthArrow = styled.polygon<{disabled?: boolean}>`
    cursor: pointer;
    fill: ${(props) => {return props.theme.color.lighterColor}};
    visibility: ${({ disabled }) => disabled? 'hidden' : 'visible'};
        
    :hover {
        fill: ${(props) => {return props.theme.color.mediumColorOp}};
    }
`;