import styled from "styled-components";

export const SubMenuContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-bottom: solid 1px ${(props) => {return props.theme.color.lighterColor}};

    @media (max-width: 675px) {
        display: none;
    }
`;

export const SubMenuContent = styled.ul`
    width: 100%;
    margin: 0 15px 15px 15px;
    font-weight: bold;
    color: ${(props) => {return props.theme.color.lighterColor}};
    font-size: 18px;
    display: flex;
    justify-content: flex-start;

    @media (max-width: 786px) {
        font-size: 14px;
    }
`;

export const SubMenuItem = styled.li`
    margin-right: 50px;

    :hover {
        transform: scale(1.05);
        cursor: pointer;
    }

    :active {
        color: ${(props) => {return props.theme.color.mediumColorOp}};
    }
`;






export const InfoContainer = styled.div`
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 60px;
        width: auto;
        padding-right: 20px;
    }
`;

export const TitleContainer = styled.div`
    font-weight: bold;
    font-size: 24px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    border-left: solid 2px;
    padding-left: 20px;
`;

export const UserContainer = styled.div`
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    p {
        font-size: 16px;
        color: ${(props) => {return props.theme.color.lighterColor}};
        font-weight: bold;
    }
`;

export const HeaderButtonContainer = styled.div`
    margin-top: 5px;
`;

export const HeaderButton = styled.button`
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    border: solid 2px ${(props) => {return props.theme.color.lighterColor}};
    background-color: transparent;
    margin-left: 10px;
    border-radius: 8px;

    :hover {
        cursor: pointer;
        transform: scale(1.05);
    }

    :active {
        background-color: red;
    }
`;

