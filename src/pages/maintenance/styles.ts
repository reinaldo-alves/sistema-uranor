import styled from "styled-components";

export const ThreeColTable = styled.div` //Adjuntos, Falanges, Templos
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 30px;

    @media (max-width: 1120px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 786px) {
        grid-template-columns: 1fr;
    }
`;

export const FileInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        margin-bottom: 5px; 
    }

    input {
        width: 150px;
        font-size: 18px;
        font-weight: bold;
        display: block;
    }
`;

export const ObsContainer = styled.div`
    max-width: 750px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    h2, p {
        color: ${(props) => {return props.theme.color.lighterColor}};
        text-align: center;
        font-weight: bold;
    }

    p {
        font-size: 18px;
    }
`;

export const CalInputContainer = styled.div`
    max-width: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    label {
        font-weight: bold;
        text-align: right;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        width: 100%;
        margin-bottom: 5px; 
    }

    input {
        width: 100%;
        height: 35px;
        padding: 6px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }
`;

export const ResultsCard = styled.div`
    width: 90%;
    max-width: 1400px;
    border-radius: 10px;
    padding: 15px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
    margin-bottom: 30px;
    overflow: auto;

    @media (max-width: 786px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const FiveColTable = styled.div` //Guias, Ministros, Cavaleiros, Users, Calendar (adiciona justify-items center)
    width: 100%;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px 30px;

    @media (max-width: 1250px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1020px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 786px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

export const UserCapsLock = styled.p<{modal?: boolean, user?: boolean}>`
    color: ${(props) => {return props.theme.color.darkerColor}};
    text-align: ${({modal}) => modal? 'center' : 'right'};
    font-weight: bold;
    font-size: ${({user}) => user? '15px' : '12px'};
    height: ${({modal}) => modal? '12px' : '1px'};
    width: 100%;
    position: relative;
    top: ${({ modal, user }) => modal? '5px' : user? '-60px' : '-75px'};
`;

export const PasswordForm = styled.div`
    width: 380px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: ${(props) => {return props.theme.color.mediumColorTr}};
    border: solid 1px ${(props) => {return props.theme.color.darkerColor}};

    label {
        font-weight: bold;
        font-size: 20px;
        color: ${(props) => {return props.theme.color.darkerColor}};
        width: 100%;
        margin-bottom: 5px; 
    }

    input {
        width: 100%;
        margin-bottom: 20px;
        height: 35px;
        padding: 0.4em;
        font-size: 18px;
        font-weight: bold;
        border-radius: 8px;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        display: block;
    }

    button {
        font-weight: bold;
        border: solid 1px ${(props) => {return props.theme.color.darkerColor}};
        border-radius: 8px;
        margin-top: 20px;
        width: 50%;
        background-color: green;
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
    }
`;