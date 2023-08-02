import { DocButton } from './styles'

interface IButtonDoc {
    name: string,
    link: string,
    subtitle?: string,
    sameTab?: boolean,
    height: string
}

function ButtonDoc(props: IButtonDoc) {
    return (
        <a href={props.link} target={props.sameTab ? '_self' : '_blank'} rel='noreferrer'> 
            <DocButton height={props.height}>
                {props.name}
                {props.subtitle? <span>{props.subtitle}</span> : ''}
            </DocButton>
        </a>
    )
}

export default ButtonDoc