import { ButtonContainer, ButtonLink, ButtonOptions } from "./styles";

interface IProps {
    docs: {
        name: string,
        image: string, 
        link: any,
        pdf: boolean
    }[]
}

function ButtonImage(props: IProps) {
    
    return (
        <ButtonContainer>
            {props.docs.map((item, index) => (
                item.pdf ? 
                    <ButtonLink key={index} href={item.link? item.link : ''} target="_blank">
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                    </ButtonLink>
                :
                    <ButtonOptions key={index} onClick={item.link? item.link : () => {}}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                    </ButtonOptions>
            ))}
        </ButtonContainer>
    )
}

export default ButtonImage