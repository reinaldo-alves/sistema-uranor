import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 15px 25px 15px;
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
