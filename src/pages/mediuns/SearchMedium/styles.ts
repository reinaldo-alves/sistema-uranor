import styled from "styled-components";

export const SearchCard = styled.div`
    width: 90%;
    max-width: 1400px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: grid;
    grid-template-columns: 1fr 250px;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-top: 30px;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 720px) {
        margin-top: 0;
    }
`;

export const ResultsCard = styled.div`
    width: 90%;
    max-width: 1400px;
    height: calc(100vh - 357px);
    min-height: 440px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: flex-start;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-top: 30px;
    overflow: auto;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 606px;
    }
`;

export const TableContainer = styled.div`
    width: 100%;
    overflow-y: auto;
    max-height: calc(100vh - 390px);
    min-height: 400px;

    @media (max-width: 786px) {
        min-height: 150px;
    }
`;

export const ResultsTable = styled.div`
    width: 100%;
    border-top: 1px solid ${(props) => {return props.theme.color.lighterColor}};
`;

export const InfoCard = styled.div`
    width: 100%;
    min-width: 270px;
    min-height: 376px;
    border: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    margin-bottom: 10px;
    margin-top: 0;

    @media (max-width: 786px) {
        width: 270px;
        margin-bottom: 0;
        margin-top: 10px;
    }
`;

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

export const MediumName = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const MediumPhoto = styled.div<{image: string}>`
    border: 2px solid ${(props) => {return props.theme.color.lighterColor}};
    border-radius: 10px;
    height: 150px;
    aspect-ratio: 3 / 4;
    background-image: url(${({ image }) => image? image : ''});
    background-position: 50% 50%;
    background-size: cover;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: center;
    font-weight: bold;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

export const MediumInfo = styled.span`
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
        text-decoration: underline;
    }
`;

export const MessageNull = styled.span`
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;