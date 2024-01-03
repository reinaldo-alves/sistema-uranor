import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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

    :disabled {
        border-color: gray;
        background-color: gray;

        :hover {
            cursor: not-allowed;
            transform: scale(1);
        }

        :active {
            border-color: gray;
            background-color: gray;
        }
    }
`;

export const ResultsTable = styled.table<{show: number}>`
    width: 100%;
    overflow-y: auto;
    display: ${({show}) => show? 'flex' : 'none'};
    flex-direction: column;
`;

export const ResultsPanel = styled.tr<{columns: string}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: ${({columns}) => columns? columns : 'auto'};
`;

export const Results = styled.tr<{columns: string}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: ${({columns}) => columns? columns : 'auto'};
    
    :hover {
        background-color: ${(props) => {return props.theme.color.lighterColor}};
        cursor: pointer;
    }
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

export const Modal = styled.div<{vis: boolean}>`
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    position: fixed;
    visibility: ${({vis}) => vis? 'visible' : 'hidden'};
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalMediumContent = styled.div<{vis: boolean}>`
    width: 380px;
    max-width: 1400px;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    display: ${({vis}) => vis? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
`;

export const ModalTitle = styled.h1`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 20px;
    text-align: center;
`;

export const ModalSubTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: center;
`;

export const PageSubTitle = styled.h2<{hide?: boolean}>`
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    margin: 20px;
    display: ${({hide}) => hide? 'none' : 'block'};
`;

export const ModalButton = styled.button<{color: string}>`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: 150px;
    background-color: ${({color}) => color? color : 'green'};
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

export const InputContainer = styled.div<{box?: boolean}>`
    width: 100%;
    display: flex;
    flex-direction: ${({box}) => box? 'row' : 'column'};
    justify-content: center;
    align-items: center;

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        width: 100%;
        margin-bottom: ${({box}) => box? '0' : '5px'}; 
    }

    input {
        width: ${({box}) => box? '35px' : '100%'};
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

