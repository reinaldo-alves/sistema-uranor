import { ButtonContainer, ButtonOptions } from "./styles";

interface IProps {
    docs: {
        name: string,
        link: string | null,
    }[],
    fontSize?: number
}

function GridButtonPDF(props: IProps) {
    
    return (
        <ButtonContainer>
            {props.docs.map((item, index) => (
                <ButtonOptions disabled={item.link === null} fontSize={props.fontSize} key={index} href={item.link? item.link : ''} target="_blank">{item.name}</ButtonOptions>
            ))}
        </ButtonContainer>
    )
}

export default GridButtonPDF