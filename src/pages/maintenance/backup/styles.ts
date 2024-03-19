import styled from "styled-components";

export const InputContainer = styled.div`
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