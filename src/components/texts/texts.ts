import styled from "styled-components";

export const ResultsTitle = styled.span`
    font-size: 18px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 4px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

export const ColumnTitle = styled.div<{align?: string}>`
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

export const ResultsDetails = styled.span<{resize?: boolean}>`
    font-size: 12px;
    color: ${(props) => {return props.theme.color.darkerColor}};
    padding-left: ${({resize}) => resize? '0' : '4px'};
    font-weight: bold;
    white-space: ${({resize}) => resize? 'normal' : 'nowrap'};
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

    @media (max-width: 786px) {
        font-size: ${({resize}) => resize? '10px' : '12px'};
    }
`;

export const InfoContent = styled.span`
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: ${(props) => {return props.theme.color.darkerColor}};
    
    @media (max-width: 786px) {
        text-align: center;
    }
`;

export const Observations = styled.textarea`
    border-radius: 8px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    padding: 6px;
    font-size: 18px;
    font-weight: bold;
    resize: none;
    height: 150px;
    
    @media (max-width: 1000px) {
        font-size: 14px;
    }

    @media (max-width: 500px) {
        height: 200px;
    }
`;

export const SectionTitle = styled.h2`
    color: ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
`;