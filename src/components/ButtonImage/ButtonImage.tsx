import { ButtonContainer, ButtonOptions } from "./styles";

interface IProps {
    docs: {
        name: string,
        image: string, 
        link: (() => void) | null,
    }[]
}

function ButtonImage(props: IProps) {
    
    return (
        <ButtonContainer>
            {props.docs.map((item, index) => (
                <ButtonOptions key={index} onClick={item.link? item.link : () => {}}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                </ButtonOptions>
            ))}
        </ButtonContainer>
    )
}

export default ButtonImage