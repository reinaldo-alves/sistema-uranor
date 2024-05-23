import { ButtonContainer, ButtonOptions, ButtonOptionsPDF } from "./styles";

interface IProps {
    docs: {
        name: string,
        link?: (() => void) | null,
        pdf?: string | null,
    }[],
    fontSize?: number,
    pdf?: boolean
}

function GridButton(props: IProps) {
    
    return (
        <ButtonContainer>
            {props.docs.map((item, index) => (
                props.pdf ? 
                    <ButtonOptionsPDF disabled={!item.pdf} fontSize={props.fontSize} key={index} href={item.pdf? item.pdf : ''} target="_blank">{item.name}</ButtonOptionsPDF>
                :
                    <ButtonOptions disabled={item.link === null} key={index} onClick={item.link? item.link : () => {}}>{item.name}</ButtonOptions>
            ))}
        </ButtonContainer>
    )
}

export default GridButton