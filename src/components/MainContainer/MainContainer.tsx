import { Container, MainTitle, SubTitle } from './styles'

interface IProps {
    title?: string,
    subtitle?: string,
    children: React.ReactNode
}

function MainContainer(props: IProps) {
    return (
        <Container>
            {props.title && <MainTitle>{props.title}</MainTitle>}
            {props.subtitle && <SubTitle>{props.subtitle}</SubTitle>}
            {props.children}
        </Container>
    )
}

export default MainContainer