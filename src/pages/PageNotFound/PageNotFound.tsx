import SubMenu from "src/components/SubMenu/SubMenu";
import Header from "../../components/header/header";
import { ErrorMessage, MessageSpan, ErrorImage, ErrorButton, NotFoundContainer } from "./styles";
import Err from '../../assets/computer.png'
import { useNavigate } from "react-router-dom";
import SideMenu from "src/components/SideMenu/SideMenu";

function PageNotFound() {
    const navigate = useNavigate();
    
    const menuList = [{title: 'Página Inicial', click: '/'}]
    
    return (
        <>
            <Header />
            <SubMenu list={menuList}/>
            <NotFoundContainer>
                <ErrorImage alt="" src={Err} />
                <ErrorMessage>Error 404 - Page not found</ErrorMessage>
                <MessageSpan>A página que você está procurando não foi encontrada. Ela pode ter sido movida ou excluída, ou você não tem permissão para acessá-la</MessageSpan>
                <ErrorButton onClick={() => navigate('/')}>Voltar para página inicial</ErrorButton>
            </NotFoundContainer>
            <SideMenu list={menuList}/>
        </>
    )
}

export default PageNotFound