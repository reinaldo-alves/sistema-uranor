import './styles.css'

type mudar = any

function ButtonMenu(props: mudar) {
    return (
        <div className={`button-menu-container ${props.active ? 'active' : 'inactive'}`}>
            <div className='button-canto' onClick={props.click}>{props.name}</div>
            <div className={`dropdown-container ${props.active ? 'active' : 'inactive'}`}>
                <nav className={`dropdown ${props.active ? 'active' : 'inactive'}`}>
                    <ul>
                        {props.list.map((item: mudar) => (
                            <li>
                                <a href={item.doc} target='_blank' rel='noreferrer'>{item.canto}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default ButtonMenu