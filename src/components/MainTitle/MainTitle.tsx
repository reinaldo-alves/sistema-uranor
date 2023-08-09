import { SectionTitle } from './styles'

interface IProps {
    content: string
}

function MainTitle(props: IProps) {
    return (
        <SectionTitle>{props.content}</SectionTitle>
    )
}

export default MainTitle