import styled from "styled-components";

export const MainContainer = styled.div`
    height: 100%;
    width: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SearchCard = styled.div`
    width: 90%;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: grid;
    grid-template-columns: 1fr 250px 90px;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
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
    }

    input {
        width: 100%;
        height: 35px;
        padding: 0.4em;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }

    select {
        width: 100%;
        height: 35px;
        padding: 0.4em;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }
`;

export const SearchButton = styled.button`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    margin-top: 20px;
    width: 100%;
    background-color: green;
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 35px;
    font-size: 20px;
    align-self: flex-end;

    :hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    :active {
        color: white;
        background-color: ${(props) => {return props.theme.color.darkerColor}};
        border: solid ${(props) => {return props.theme.color.lighterColor}};
    }
`;

export const ResultsCard = styled.div`
    width: 90%;
    height: 100%;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: flex-start;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-top: 30px;
    overflow: auto;
`;

export const TableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    max-height: 400px;
`;

export const ResultsTable = styled.table`
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    text-indent: initial;
    border-spacing: 2px;
    border-top: 1px solid ${(props) => {return props.theme.color.lighterColor}};
`;

export const Results = styled.tr`
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};

    :hover {
        background-color: ${(props) => {return props.theme.color.lighterColor}};
        cursor: pointer;
    }
`;

export const ResultsCell = styled.td<{width?: string, align?: string}>`
    font-size: 16px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 4px;
    font-weight: bold;
    width: ${({ width }) => width? width : 'auto'};
    max-width: ${({ width }) => width? width : 'auto'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({ align }) => align? align : 'center'};
`;

export const InfoCard = styled.div`
    width: 100%;
    min-width: 100%;
    min-height: 270px;
    border: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    border-radius: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    margin-bottom: 5px;
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
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const MediumInfo = styled.span<{align?: string}>`
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    text-align: ${({ align }) => align? align : 'left'};
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

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

export const MediumButton = styled.button`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    margin: 15px 0;
    width: 100px;
    background-color: green;
    color: ${(props) => {return props.theme.color.lighterColor}};
    text-align: center;
    height: 30px;
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
`;