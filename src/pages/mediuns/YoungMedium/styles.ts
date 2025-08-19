import styled from "styled-components";

export const MainFieldsContainer = styled.div`
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

export const PhotoContainer = styled.div<{photo: string | null}>`
    height: 150px;
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

export const PhotoPosition = styled.div<{hide?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    align-self: flex-end;

    span {
        font-size: 16px;
        cursor: pointer;
        visibility: ${({ hide }) => hide? 'hidden' : 'visible'};;
    }

    @media (max-width: 800px) {
        align-self: center;
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

//=========================================================================================================

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
    grid-template-columns: auto 1fr auto 140px;
    align-items: center;
    width: 100%;
    min-width: 140px;
    gap: 20px 10px;

    label:not(:first-of-type) {
        padding-left: 10px;
    }

    @media (max-width: 800px) {
        grid-template-columns: auto 1fr;
    }
`;

//=========================================================================================================

export const GridShowContainer = styled.div`
    width: 90%;
    max-width: 1472px;
    display: grid;
    gap: 20px;
    grid-template-columns: auto 1fr;
    align-items: flex-start;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        gap: 0;
    }
`;

export const MediumMainInfo = styled.span`
    font-size: 14px !important;
    text-decoration: none !important;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
        font-size: 14px !important;
        text-decoration: underline !important;
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
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
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
        text-decoration: underline !important;
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