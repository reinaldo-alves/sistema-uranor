import { ButtonContainer, ButtonOptions } from "./styles";

interface IProps {
    docs: {
        name: string,
        link: (() => void) | null,
    }[]
}

function GridButton(props: IProps) {
    
    return (
        <ButtonContainer>
            {props.docs.map((item, index) => (
                <ButtonOptions disabled={item.link === null} key={index} onClick={item.link? item.link : () => {}}>{item.name}</ButtonOptions>
            ))}
        </ButtonContainer>
    )
}

export default GridButton