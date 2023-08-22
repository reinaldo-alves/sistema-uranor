import { createContext, useState, useEffect, useContext } from "react";
import api from "src/api";
import { IMedium } from "src/types/types";
import { IMediumAPI } from "src/types/typesAPI";
import { UserContext } from "./UserContext";

export const MediumContext = createContext({} as any);

export const MediumStore = ({ children }: any) => {
    const [mediuns, setMediuns] = useState([] as Array<IMedium>);

    const { token } = useContext(UserContext);
    
    const medium = [
        {id: '12', nome: 'Irene Souza', med: 'Doutrinador', templo: 1, sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Afastado', foto: 'https://789d77d27f49a880d02e-714b7dc0b51e300a567fc89d2a0837e5.ssl.cf1.rackcdn.com/PaginaConteudo/depositphotos46976671xl-2015-copia.jpg'},
        {id: '65', nome: 'Marcos Ambrósio da Silva Gomes Ferreira', med: 'Doutrinador', templo: 1, sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Ativo', foto: 'https://guiaavare.com/public/Noticias/3778/20121217024459bc2f826fefe2cf2620c4b4d83681059d.jpg'},
        {id: '14', nome: 'Laura Gonçalves', med: 'Apará', templo: 1, sexo: 'Feminino', situacao: 'Emplacado', condicao: 'Entregou as Armas', foto: 'http://static1.squarespace.com/static/5c3e25923e2d0977a884f82c/5c3f4b9e010685e0e261593a/5c3f4e6a010685e0e261b6ea/1547652714741/IMG_1322.jpg?format=original'},
        {id: '18', nome: 'Gustavo Souza', med: 'Apará', templo: 1, sexo: 'Masculino', situacao: 'Iniciado', condicao: 'Desencarnado', foto: 'https://www.ifpb.edu.br/sic/auditoria/3x4-augusto.jpg'},
        {id: '46', nome: 'Bárbara Pereira', med: 'Doutrinador', templo: 5, sexo: 'Feminino', situacao: 'Elevado', condicao: 'Ativo', foto: 'https://cf.shopee.com.br/file/653ab01fb044b2051638df7b5efd889d'},
        {id: '31', nome: 'Dionísio Ávila', med: 'Doutrinador', templo: 5, sexo: 'Masculino', situacao: 'Centurião', condicao: 'Afastado', foto: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2018/02/23/balbuena_na_tradicional_foto_3x4_do_elenco_e.jpg'},
        {id: '09', nome: 'Suzana Ávila', med: 'Apará', templo: 5, sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Desencarnado', foto: 'https://pbs.twimg.com/media/EX2rHNlWoAEv-KT.jpg'},
        {id: '17', nome: 'Bruno Silva', med: 'Apará', templo: 2, sexo: 'Masculino', situacao: 'Emplacado', condicao: 'Entregou as Armas', foto: 'https://zipanuncios.com.br/images/2468415/1549458641201085.jpeg'},
        {id: '21', nome: 'Sofia Cavalcanti', med: 'Doutrinador', templo: 1, sexo: 'Feminino', situacao: 'Iniciado', condicao: 'Entregou as Armas', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_jSFJdFmLAfD3FoCryVNSUAggLSt-AFOCOw&usqp=CAU'},
        {id: '69', nome: 'Eduardo Martins', med: 'Doutrinador', templo: 1, sexo: 'Masculino', situacao: 'Elevado', condicao: 'Desencarnado', foto: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Ronaldo_Helal_3x4.jpg'},
        {id: '27', nome: 'Lara Rodrigues', med: 'Apará', templo: 1, sexo: 'Feminino', situacao: 'Centurião', condicao: 'Ativo', foto: 'http://s.glbimg.com/jo/g1/f/original/2012/04/13/tereza_fotoboa_300_400.jpg'},
        {id: '48', nome: 'Rodrigo Azevedo', med: 'Apará', templo: 1, sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Afastado', foto: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2018/10/10/mantuan_foto_3x4_camisa_i_m.jpg'},
        {id: '91', nome: 'Carolina Barbosa', med: 'Doutrinador', templo: 5, sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Desencarnado', foto: 'https://static1.tudosobremake.com.br/articles/7/26/7/@/1467-o-segredo-de-uma-boa-foto-3x4-esta-em-article_media_new_1-4.jpg'},
        {id: '81', nome: 'Felipe Castro', med: 'Doutrinador', templo: 5, sexo: 'Masculino', situacao: 'Elevado', condicao: 'Entregou as Armas', foto: 'https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3789888.jpg&fm=jpg'},
        {id: '15', nome: 'Luana Rocha', med: 'Apará', templo: 5, sexo: 'Feminino', situacao: 'Centurião', condicao: 'Afastado', foto: 'http://2.bp.blogspot.com/-zR-hDp8vxeA/VNFfAVj4XZI/AAAAAAAAh2s/ehDIfLBWmCQ/s1600/10968265_935551193136326_1104116575_n.jpg'},
        {id: '41', nome: 'Pablo Garcia', med: 'Apará', templo: 4, sexo: 'Masculino', situacao: 'Centurião', condicao: 'Presente', foto: 'https://img.a.transfermarkt.technology/portrait/big/35639-1614006897.png?lm=1'},
        {id: '71', nome: 'Breno Cardoso', med: 'Apará', templo: 2, sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Ativo', foto: 'https://cdn.meutimao.com.br/fotos-do-corinthians/w941/2021/03/05/marcio_bittencourt_foto_3x4_6zok.jpg'}
    ];

    const loadMedium = (token: string) => {
        api.get('/medium/get-mediuns', {headers:{Authorization: token}}).then(({ data }) => {
            const medium = data.medium.map((item: IMediumAPI) => ({
                ...item,
                foto: item.foto === null ? '' : item.foto,
                condicao: item.condicao === null ? '' : item.condicao,
                dtNasc: item.dtNasc === null ? '' : item.dtNasc,
                rg: item.rg === null ? '' : item.rg,
                cpf: item.cpf === null ? '' : item.cpf,
                pai: item.pai === null ? '' : item.pai,
                natur: item.natur === null ? '' : item.natur,
                naturUF: item.naturUF === null ? '' : item.naturUF,
                profissao: item.profissao === null ? '' : item.profissao,
                estCivil: item.estCivil === null ? '' : item.estCivil,
                conjuge: item.conjuge === null ? '' : item.conjuge,
                cep: item.cep === null ? '' : item.cep,
                endereco: item.endereco === null ? '' : item.endereco,
                endNumero: item.endNumero === null ? '' : item.endNumero,
                endCompl: item.endCompl === null ? '' : item.endCompl,
                endBairro: item.endBairro === null ? '' : item.endBairro,
                endCidade: item.endCidade === null ? '' : item.endCidade,
                endUF: item.endUF === null ? '' : item.endUF,
                telefone1: item.telefone1 === null ? '' : item.telefone1,
                telefone2: item.telefone2 === null ? '' : item.telefone2,
                email: item.email === null ? '' : item.email,
                dtIngresso: item.dtIngresso === null ? '' : item.dtIngresso,
                dtEmplac: item.dtEmplac === null ? '' : item.dtEmplac,
                dtIniciacao: item.dtIniciacao === null ? '' : item.dtIniciacao,
                dtElevacao: item.dtElevacao === null ? '' : item.dtElevacao,
                dtCenturia: item.dtCenturia === null ? '' : item.dtCenturia,
                dtSetimo: item.dtSetimo === null ? '' : item.dtSetimo,
                adjOrigem: item.adjOrigem === null ? 0 : item.adjOrigem,
                temploOrigem: item.temploOrigem === null ? 0 : item.temploOrigem,
                colete: item.colete === null ? '' : item.colete,
                classMest: item.classMest === null ? '' : item.classMest,
                falMest: item.falMest === null ? '' : item.falMest,
                povo: item.povo === null ? '' : item.povo,
                falMiss: item.falMiss === null ? 0 : item.falMiss,
                adjDevas: item.adjDevas === null ? '' : item.adjDevas,
                turnoLeg: item.turnoLeg === null ? '' : item.turnoLeg,
                turnoTrab: item.turnoTrab === null ? '' : item.turnoTrab,
                ministro: item.ministro === null ? 0 : item.ministro,
                cavaleiro: item.cavaleiro === null ? 0 : item.cavaleiro,
                dtMinistro: item.dtMinistro === null ? '' : item.dtMinistro,
                guia: item.guia === null ? 0 : item.guia,
                dtGuia: item.dtGuia === null ? '' : item.dtGuia,
                cor: item.cor === null ? '' : item.cor,
                estrela: item.estrela === null ? '' : item.estrela,
                classif: item.classif === null ? '' : item.classif,
                dtClassif: item.dtClassif === null ? '' : item.dtClassif,
                princesa: item.princesa === null ? '' : item.princesa,
                pretovelho: item.pretovelho === null ? '' : item.pretovelho,
                caboclo: item.caboclo === null ? '' : item.caboclo,
                medico: item.medico === null ? '' : item.medico,
                nomeEmissao: item.nomeEmissao === null ? '' : item.nomeEmissao,
                ninfa: item.ninfa === null ? 0 : item.ninfa,
                mestre: item.mestre === null ? 0 : item.mestre,
                padrinho: item.padrinho === null ? 0 : item.padrinho,
                madrinha: item.madrinha === null ? 0 : item.madrinha,
                afilhado: item.afilhado === null ? 0 : item.afilhado,
                comando: item.comando === null ? '' : item.comando,
                presidente: item.presidente === null ? '' : item.presidente,
                recepcao: item.recepcao === 1 ? true : false,
                devas: item.devas === 1 ? true : false,
                regente: item.regente === 1 ? true : false,
                janda: item.janda === 1 ? true : false,
                trinoSol: item.trinoSol === null ? '' : item.trinoSol,
                dtTrinoSol: item.dtTrinoSol === null ? '' : item.dtTrinoSol,
                trinoSar: item.trinoSar === 1 ? true : false,
                dtTrinoSar: item.dtTrinoSar === null ? '' : item.dtTrinoSar,
                herdeiro: item.herdeiro === null ? '' : item.herdeiro,
                filho: item.filho === 1 ? true : false,
                observ: item.observ === null ? '' : item.observ,
            }))
            setMediuns(medium)
        }).catch((error) => {
            console.log('Erro ao carregar a lista de médiuns', error)
        })
    }

    useEffect(() => {
        loadMedium(token)
    }, [])

    return (
        <MediumContext.Provider value={{medium, mediuns, loadMedium}} >
            { children }
        </MediumContext.Provider>
    )
}