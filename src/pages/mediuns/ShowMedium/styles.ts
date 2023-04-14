import styled from "styled-components";

export const MainContainer = styled.div`
    min-height: ${(props) => {return props.theme.height.mainContent}};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

export const MainInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const PersonalCard = styled.div`
    margin-top: 30px;
    width: 90%;
    max-width: 1200px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const NameAndId = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const SectionTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
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
`;

export const MediumButton = styled.button<{color: string}>`
    font-weight: bold;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    margin-top: 30px;
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
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

export const MediumInfo = styled.span<{align?: string}>`
    font-size: 18px;
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