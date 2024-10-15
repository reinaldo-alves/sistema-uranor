import styled from "styled-components";

export const Overlay = styled.div<{openMenu: boolean}>`
    height: 100vh;
    width: calc(100vw - 8px);
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: ${({openMenu}) => openMenu? 'block' : 'none'};;
`;

export const SideMenuContainer = styled.aside<{openMenu: boolean}>`
    width: 250px;
    height: 100vh;
    background-color: ${(props) => {return props.theme.color.darkerColor}};
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    border-right: 1px solid ${(props) => {return props.theme.color.lighterColor}};
    position: fixed;
    top: 0;
    left: -300px;
    transition: 0.5s;
    z-index: 3;

    @media (max-width: 720px) {
        left: ${({openMenu}) => openMenu? '0' : '-300px'};
    }
`;

export const HamburgerIcon = styled.img`
    display: block;
    height: 25px;
    width: 25px;
    cursor: pointer;

    :hover {
        transform: scale(1.05);
    }
`;

export const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 30px;
    border-bottom: 1px solid ${(props) => {return props.theme.color.lighterColor}};

    p {
        font-size: 16px;
        color: ${(props) => {return props.theme.color.lighterColor}};
        font-weight: bold;
    }
`;

export const HeaderButtonContainer = styled.div`
    display: flex;
    margin-top: 5px;
    gap: 10px;
`;

export const SideMenuContent = styled.ul`
    width: 100%;
    font-weight: bold;
    color: ${(props) => {return props.theme.color.lighterColor}};
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

export const SideMenuItem = styled.li`
    margin-right: 10px;

    :hover {
        transform: scale(1.05);
        cursor: pointer;
        text-decoration: underline;
    }

    :active {
        color: ${(props) => {return props.theme.color.mediumColorOp}};
    }
`;