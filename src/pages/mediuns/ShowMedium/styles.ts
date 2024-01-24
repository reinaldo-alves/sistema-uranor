import styled from "styled-components";

export const MainContainer = styled.div`
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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

export const PersonalCard = styled.div<{hide?: boolean}>`
    margin-top: 20px;
    width: 100%;
    max-width: 1200px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    display: ${({ hide }) => hide? 'none' : 'flex'};
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

export const MediumMainInfo = styled.span`
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
        text-decoration: underline;
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

export const SectionTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px;
    width: 100%;
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

export const MediumButton = styled.button<{color: string}>`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    width: 150px;
    background-color: ${({color}) => {return color}};
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 35px;
    font-size: 20px;

    :hover {
        cursor: pointer;
        transform: scale(1.05);
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
        text-decoration: underline;
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

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        width: 100%;
        margin-bottom: 5px; 
        text-align: center;
    }

    input {
        width: 180px;
        height: 35px;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
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

export const ModalContent = styled.div`
    width: 380px;
    max-width: 1400px;
    border-radius: 10px;
    padding: 20px;
    background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    display: flex;
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