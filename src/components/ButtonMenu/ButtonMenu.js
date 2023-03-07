import React from "react";
import './styles.css'

function ButtonMenu(props) {
    return (
        <div className={`button-menu-container ${props.active ? 'active' : 'inactive'}`}>
            <div className='button-canto' onClick={props.click}>{props.name}</div>
            <div className={`dropdown-container ${props.active ? 'active' : 'inactive'}`}>
                <nav className={`dropdown ${props.active ? 'active' : 'inactive'}`}>
                    <ul>
                        {props.list.map((item) => (
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