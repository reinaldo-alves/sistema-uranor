import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import { CardMenu, CardsContainer, HomeContainer } from "./styles";
import Med from '../../assets/mediuns.jpg'
import Can from '../../assets/cantosechaves.jpg'
import Des from '../../assets/desenvolvimento.jpg'
import Cur from '../../assets/cursos.jpg'
import Con from '../../assets/consagracoes.jpg'
import Rel from '../../assets/relatorios.jpg'
import Doc from '../../assets/documentosuteis.jpg'
import Bib from '../../assets/biblioteca.jpg'
import SideMenu from "src/components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import Loading from "src/utilities/Loading";

interface IMenu {
    title: string,
    image: File,
    link: string
}

function Home() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const menu = [
        {title: 'Médiuns', image: Med, link: 'mediuns/consulta'},
        {title: 'Cantos e Chaves', image: Can, link: 'cantosechaves'},
        {title: 'Desenvolvimento', image: Des, link: 'desenvolvimento/frequencia'},
        {title: 'Cursos', image: Cur, link: 'cursos'},
        {title: 'Consagrações', image: Con, link: 'consagracoes'},
        {title: 'Relatórios', image: Rel, link: 'relatorios'},
        {title: 'Documentos Úteis', image: Doc, link: 'documentosuteis'},
        {title: 'Biblioteca', image: Bib, link: 'biblioteca'}
    ]

    useEffect(() => {
        setLoading(false)
    }, [])

    if(loading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <HomeContainer>
                <CardsContainer>
                    {menu.map((item: IMenu, index: number) => (
                        <CardMenu
                        key={index}
                        style={{backgroundImage:`url(${item.image})`}}
                        onClick={() => navigate(item.link)}
                        >
                            {item.title}
                        </CardMenu>
                    ))}
                </CardsContainer>
            </HomeContainer>
            <SideMenu list={[]}/>
        </>
    )
}

export default Home