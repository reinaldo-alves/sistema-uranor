import styled from "styled-components";

export const ButtonMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CantoButton = styled.div<{height?: string}>`
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${(props) => {return props.theme.color.darkerColor}};
    font-weight: bold;
    font-size: 25px;
    text-align: center;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    height: ${({ height }) => height ? height : '2em'};
    z-index: 1;
    width: 100%;

    @media (max-width: 1099px) {
        font-size: 20px;
    }

    :hover {
        transform: scale(1.05);
        cursor: pointer;
        background-color: ${(props) => {return props.theme.color.mediumColorOp}};
    }

    :active {
        border-color: ${(props) => {return props.theme.color.lighterColor}};
    }
`;

export const DropdownContainer = styled.div<{active: boolean}>`
    position: relative;
    width: 100%;
    overflow: hidden;
    top: -8px;
    height: ${({ active }) => active ? 'auto' : '0'};
`;

export const Dropdown = styled.nav<{active: boolean}>`
    position: relative;
    width: 100%;
    border-top: none;
    border-right: solid 1px ${(props) => {return props.theme.color.lighterColor}};
    border-bottom: solid 1px ${(props) => {return props.theme.color.lighterColor}};
    border-left: solid 1px ${(props) => {return props.theme.color.lighterColor}};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
    transition: .5s;
    top: ${({ active }) => active ? '0' : '-100%'};
    visibility: ${({ active }) => active ? 'visible' : 'hidden'};

    @media (max-width: 1110px) {
        font-size: 12px;
    }

    ul li {
        position: relative;
        color: ${(props) => {return props.theme.color.lighterColor}};
        margin-top: 10px;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    ul li:hover {
        text-decoration: underline;
    }
`;