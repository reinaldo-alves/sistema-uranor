import styled from "styled-components";

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
    grid-template-columns: auto repeat(${props => props.columns}, 12%);
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

//================================================================================================

export const MainInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
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

export const GridContainer = styled.div<{freq?: boolean}>`
    width: ${({ freq }) => freq? '50%' : '100%'};
    display: grid;
    grid-template-columns: ${({ freq }) => freq? 'auto 1fr' : 'auto 1fr auto 1fr'};
    align-items: center;
    align-self: center;
    gap: 20px 10px;
    
    label:nth-child(4n-1) {
        padding-left: 10px;
    }

    @media (max-width: 800px) {
        width: 100%;
        grid-template-columns: auto 1fr;

        label:nth-child(4n-1) {
            padding-left: 0px;
        }
    }
`;

export const FieldContainer = styled.div<{width?: string}>`
    display: flex;
    align-items: center;
    width: ${({ width }) => width? width : '100%'};
    min-width: ${({ width }) => width? width : '150px'};

    label {
        width: auto !important;
        padding-right: 10px;
    }

    @media (max-width: 800px) {
        width: 100%;
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