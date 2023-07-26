import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 15px 25px 15px;

    @media (max-width: 675px) {
        justify-content: flex-start;
    }
`;

export const InfoContainer = styled.div`
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LogoImage = styled.img`
    height: 60px;
    width: auto;
    padding-right: 20px;

    @media (max-width: 675px) {
        height: 40px;
        padding-right: 10px;
    }
`;

export const HamburgerIcon = styled.img`
    display: none;
    height: 30px;
    width: 40px;
    padding-right: 10px;
    cursor: pointer;

    @media (max-width: 675px) {
        display: block;
    }
`;

export const TitleContainer = styled.div`
    font-weight: bold;
    font-size: 24px;
    color: ${(props) => {return props.theme.color.lighterColor}};
    border-left: solid 2px;
    padding-left: 20px;

    @media (max-width: 675px) {
        font-size: 15px;
        padding-left: 10px;
    }
`;

export const UserContainer = styled.div`
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    @media (max-width: 675px) {
        display: none;
    }

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

