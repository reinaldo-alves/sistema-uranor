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
    margin-bottom: 30px;
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

export const ResultsTable = styled.div<{show: number}>`
    width: 100%;
    overflow-y: auto;
    display: ${({show}) => show? 'flex' : 'none'};
    flex-direction: column;
`;

export const Results = styled.div<{columns: number}>`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    display: grid;
    align-items: center;
    grid-template-columns: auto repeat(${props => props.columns}, 12%);
`;

export const ResultsTitle = styled.div<{align?: string}>`
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

export const ResultsDetails = styled.div`
    font-size: 12px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

    @media (max-width: 786px) {
        font-size: 10px;
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

export const InputContainer = styled.div<{box?: boolean}>`
    width: 100%;
    display: flex;
    flex-direction: ${({box}) => box? 'row' : 'column'};
    justify-content: center;
    align-items: center;
    gap: 12px;

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
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

export const MonthNameContainer = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: ${(props) => {return props.theme.color.lighterColor}};

    h2 {
        cursor: pointer;

        :hover {
            text-decoration: underline;
        }
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