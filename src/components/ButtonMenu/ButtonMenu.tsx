import { MouseEventHandler } from 'react'
import { ButtonMenuContainer, CantoButton, Dropdown, DropdownContainer } from './styles'

interface ICanto {
    link: string,
    canto: string
}

interface IButtonMenu {
    active: boolean,
    click: MouseEventHandler,
    name: string,
    list: Array<ICanto>,
    height?: string | undefined
}

function ButtonMenu(props: IButtonMenu) {
    return (
        <ButtonMenuContainer>
            <CantoButton onClick={props.click} height={props.height}>{props.name}</CantoButton>
            <DropdownContainer active={props.active}>
                <Dropdown active={props.active}>
                    <ul>
                        {props.list.map((item: ICanto, index: number) => (
                            <li key={index}>
                                <a href={item.link} target='_blank' rel='noreferrer'>{item.canto}</a>
                            </li>
                        ))}
                    </ul>
                </Dropdown>
            </DropdownContainer>
        </ButtonMenuContainer>
    )
}

export default ButtonMenu