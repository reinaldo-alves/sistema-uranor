import { MouseEventHandler } from 'react'
import { ButtonMenuContainer, CantoButton, Dropdown, DropdownContainer } from './styles'
import { ICanto } from 'src/types/types'
import { generateCanto } from 'src/utilities/createDocs'

interface ICantoItem {
    text: string,
    canto: ICanto
}

interface IButtonMenu {
    active: boolean,
    click: MouseEventHandler,
    name: string,
    list: Array<ICantoItem>,
    height?: string | undefined
}

function ButtonMenu(props: IButtonMenu) {
    return (
        <ButtonMenuContainer>
            <CantoButton onClick={props.click} height={props.height}>{props.name}</CantoButton>
            <DropdownContainer active={props.active}>
                <Dropdown active={props.active}>
                    <ul>
                        {props.list.map((item: ICantoItem, index: number) => (
                            <li key={index} onClick={() => generateCanto(item.canto)}>{item.text}</li>
                        ))}
                    </ul>
                </Dropdown>
            </DropdownContainer>
        </ButtonMenuContainer>
    )
}

export default ButtonMenu