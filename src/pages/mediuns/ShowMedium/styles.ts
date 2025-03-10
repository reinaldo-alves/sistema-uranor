import styled from "styled-components";

export const GridContainer = styled.div`
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

export const MainInfoContainer = styled.div`
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
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
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    text-align: center;
`;

export const PhotoContainer = styled.div<{photo: string | null}>`
    height: 200px;
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
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 20px;

    @media (max-width: 1100px) {
        grid-template-columns: auto;
        width: auto;
    }
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

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${(props) => {return props.theme.color.lighterColor}};
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

export const FrequenciaData = styled.div`
    width: 55%;
    display: flex;
    justify-content: space-between;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
`;