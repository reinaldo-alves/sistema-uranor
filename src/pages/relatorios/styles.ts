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
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 20px 10px;

    @media (max-width: 540px) {
        grid-template-columns: 1fr;

        label {
            text-align: center;
            margin-bottom: -15px;
        }
    }
`;

export const DatesContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px 10px;

    span {
        text-decoration: none;
    }
`;

export const GridEventContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 20px;

    @media (max-width: 670px) {
        grid-template-columns: 1fr;

    }
`;

export const EventContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px 10px;

    label {
        width: auto;
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

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${(props) => {return props.theme.color.lighterColor}};
`;

export const CheckboxContainer = styled.div`
    display: flex;
    gap: 10px 30px;
    justify-content: center;
    flex-wrap: wrap;
`;

export const MixedContainer = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;