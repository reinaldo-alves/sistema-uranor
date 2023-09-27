import { ICanto } from 'src/types/types'
import { DocButton } from './styles'
import { generateCanto } from 'src/utilities/createDocs'

interface IButtonDoc {
    name: string,
    link: ICanto,
    subtitle?: string,
    height: string
}

function ButtonDoc(props: IButtonDoc) {
    return (
        <DocButton height={props.height} onClick={() => generateCanto(props.link)}>
            {props.name}
            {props.subtitle? <span>{props.subtitle}</span> : ''}
        </DocButton>
    )
}

export default ButtonDoc