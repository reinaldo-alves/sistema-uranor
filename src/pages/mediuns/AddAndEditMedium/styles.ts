import styled from "styled-components";

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

export const FieldWrapper = styled.div<{herdeiro?: boolean}>`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: ${({ herdeiro }) => herdeiro? 'center' : 'flex-start'};
    }
`;

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

export const GridDatesContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, auto 1fr);
    align-items: center;
    gap: 20px 10px;

    label:nth-child(6n-1), label:nth-child(6n-3) {
        padding-left: 10px;
    }

    @media (max-width: 1000px) {
        grid-template-columns: repeat(2, auto 1fr);

        label:nth-child(6n-1), label:nth-child(6n-3) {
            padding-left: 0px;
        }

        label:nth-child(4n-1) {
            padding-left: 10px;
        }
    }

    @media (max-width: 680px) {
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

export const FieldContainerBox = styled.div`
    display: flex;
    align-items: center;

    label {
        text-align: left;
        flex: 1;
    }
    
    input[type=checkbox] {
        margin-right: 10px;
        width: 25px;
        height: 25px;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
        padding: 0;

        @media (max-width: 1000px) {
            width: 20px;
            height: 20px;
        }
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

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${(props) => {return props.theme.color.lighterColor}};
`;