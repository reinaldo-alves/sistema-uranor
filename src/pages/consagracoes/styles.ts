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

export const ResultsTable = styled.div<{show: number}>`
    width: 100%;
    overflow-y: auto;
    display: ${({show}) => show? 'flex' : 'none'};
    flex-direction: column;
`;

export const ResultsPanel = styled.div<{columns: string}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: ${({columns}) => columns? columns : 'auto'};
`;

export const ResultsUpdate = styled.div`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 1fr;
`;

export const Results = styled.div<{columns: string}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: ${({columns}) => columns? columns : 'auto'};
    
    :hover {
        background-color: ${(props) => {return props.theme.color.lighterColor}};
        cursor: pointer;
    }
`;

export const ResultsData = styled.div<{align?: string, isNegative?: boolean}>`
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

export const CheckboxContainer = styled.div`
    display: flex;
    gap: 30px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 8px 4px;
    justify-content: center;
`;

export const SelectContainer = styled.div`
    display: flex;
    gap: 30px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 8px 4px;
    justify-content: center;

    @media (max-width: 880px) {
        flex-direction: column;
        gap: 15px;
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

export const MudancaWarning = styled.span<{show: boolean}>`
    display: ${({show}) => show? 'block' : 'none'};
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: red;
    text-align: center;
    padding: 5px;
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

export const PageSubTitle = styled.h2<{hide?: boolean}>`
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    margin: 20px;
    display: ${({hide}) => hide? 'none' : 'block'};
`;

export const UpdateInputContainer = styled.div<{box?: boolean, hide?: boolean, extend?: boolean}>`
    display: ${({hide}) => hide? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    margin: ${({box}) => box? '0' : '20px 0'};
    gap: 12px;

    label {
        font-weight: bold;
        font-size: ${({box}) => box? '18px' : '20px'};
        color: ${(props) => props.box ? props.theme.color.darkerColor : props.theme.color.lighterColor};

        @media (max-width: 786px) {
            font-size: ${({box}) => box? '14px' : '20px'};
        }
    }

    input {
        width: ${({box}) => box? '20px' : '180px'};
        height: ${({box}) => box? '20px' : '35px'};
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }

    select {
        height: 35px;
        width: ${({extend}) => extend? '100%' : 'auto'};
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;

        @media (max-width: 786px) {
            height: 30px;
            width: ${({extend}) => extend? 'calc(100% - 100px)' : 'auto'};
            padding: 4px;
            font-size: 14px;
        }
    }
`;

export const PhotoContainer = styled.div<{photo: string | null}>`
    height: 182px;
    aspect-ratio: 3 / 4;
    border-radius: 10px;
    border: 2px solid ${(props) => {return props.theme.color.lighterColor}};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: center;
    font-weight: bold;
    padding: 15px;
    position: relative;
    background-image: ${({ photo }) => photo? `url(${photo})` : 'none'};
    background-size: cover;
    background-position: 50% 50%;
    
    input {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
        
    }

    @media (max-width: 800px) {
        width: 136px
    }

`;