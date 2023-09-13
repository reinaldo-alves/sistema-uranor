import { createContext, useState, useEffect, useContext } from "react";
import api from "src/api";
import { IMedium } from "src/types/types";
import { IMediumAPI } from "src/types/typesAPI";
import { UserContext } from "./UserContext";
import { Alert } from "src/utilities/popups";

export const MediumContext = createContext({} as any);

export const MediumStore = ({ children }: any) => {
    const [mediuns, setMediuns] = useState([] as Array<IMedium>);

    const { token } = useContext(UserContext);
    
    // const medium = [
    //     {id: '12', nome: 'Irene Souza', med: 'Doutrinador', templo: 1, sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Afastado', foto: 'https://789d77d27f49a880d02e-714b7dc0b51e300a567fc89d2a0837e5.ssl.cf1.rackcdn.com/PaginaConteudo/depositphotos46976671xl-2015-copia.jpg'},
    //     {id: '65', nome: 'Marcos Ambrósio da Silva Gomes Ferreira', med: 'Doutrinador', templo: 1, sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Ativo', foto: 'https://guiaavare.com/public/Noticias/3778/20121217024459bc2f826fefe2cf2620c4b4d83681059d.jpg'},
    //     {id: '14', nome: 'Laura Gonçalves', med: 'Apará', templo: 1, sexo: 'Feminino', situacao: 'Emplacado', condicao: 'Entregou as Armas', foto: 'http://static1.squarespace.com/static/5c3e25923e2d0977a884f82c/5c3f4b9e010685e0e261593a/5c3f4e6a010685e0e261b6ea/1547652714741/IMG_1322.jpg?format=original'},
    //     {id: '18', nome: 'Gustavo Souza', med: 'Apará', templo: 1, sexo: 'Masculino', situacao: 'Iniciado', condicao: 'Desencarnado', foto: 'https://www.ifpb.edu.br/sic/auditoria/3x4-augusto.jpg'},
    //     {id: '46', nome: 'Bárbara Pereira', med: 'Doutrinador', templo: 5, sexo: 'Feminino', situacao: 'Elevado', condicao: 'Ativo', foto: 'https://cf.shopee.com.br/file/653ab01fb044b2051638df7b5efd889d'},
    //     {id: '31', nome: 'Dionísio Ávila', med: 'Doutrinador', templo: 5, sexo: 'Masculino', situacao: 'Centurião', condicao: 'Afastado', foto: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2018/02/23/balbuena_na_tradicional_foto_3x4_do_elenco_e.jpg'},
    //     {id: '09', nome: 'Suzana Ávila', med: 'Apará', templo: 5, sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Desencarnado', foto: 'https://pbs.twimg.com/media/EX2rHNlWoAEv-KT.jpg'},
    //     {id: '17', nome: 'Bruno Silva', med: 'Apará', templo: 2, sexo: 'Masculino', situacao: 'Emplacado', condicao: 'Entregou as Armas', foto: 'https://zipanuncios.com.br/images/2468415/1549458641201085.jpeg'},
    //     {id: '21', nome: 'Sofia Cavalcanti', med: 'Doutrinador', templo: 1, sexo: 'Feminino', situacao: 'Iniciado', condicao: 'Entregou as Armas', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_jSFJdFmLAfD3FoCryVNSUAggLSt-AFOCOw&usqp=CAU'},
    //     {id: '69', nome: 'Eduardo Martins', med: 'Doutrinador', templo: 1, sexo: 'Masculino', situacao: 'Elevado', condicao: 'Desencarnado', foto: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Ronaldo_Helal_3x4.jpg'},
    //     {id: '27', nome: 'Lara Rodrigues', med: 'Apará', templo: 1, sexo: 'Feminino', situacao: 'Centurião', condicao: 'Ativo', foto: 'http://s.glbimg.com/jo/g1/f/original/2012/04/13/tereza_fotoboa_300_400.jpg'},
    //     {id: '48', nome: 'Rodrigo Azevedo', med: 'Apará', templo: 1, sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Afastado', foto: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2018/10/10/mantuan_foto_3x4_camisa_i_m.jpg'},
    //     {id: '91', nome: 'Carolina Barbosa', med: 'Doutrinador', templo: 5, sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Desencarnado', foto: 'https://static1.tudosobremake.com.br/articles/7/26/7/@/1467-o-segredo-de-uma-boa-foto-3x4-esta-em-article_media_new_1-4.jpg'},
    //     {id: '81', nome: 'Felipe Castro', med: 'Doutrinador', templo: 5, sexo: 'Masculino', situacao: 'Elevado', condicao: 'Entregou as Armas', foto: 'https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3789888.jpg&fm=jpg'},
    //     {id: '15', nome: 'Luana Rocha', med: 'Apará', templo: 5, sexo: 'Feminino', situacao: 'Centurião', condicao: 'Afastado', foto: 'http://2.bp.blogspot.com/-zR-hDp8vxeA/VNFfAVj4XZI/AAAAAAAAh2s/ehDIfLBWmCQ/s1600/10968265_935551193136326_1104116575_n.jpg'},
    //     {id: '41', nome: 'Pablo Garcia', med: 'Apará', templo: 4, sexo: 'Masculino', situacao: 'Centurião', condicao: 'Presente', foto: 'https://img.a.transfermarkt.technology/portrait/big/35639-1614006897.png?lm=1'},
    //     {id: '71', nome: 'Breno Cardoso', med: 'Apará', templo: 2, sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Ativo', foto: 'https://cdn.meutimao.com.br/fotos-do-corinthians/w941/2021/03/05/marcio_bittencourt_foto_3x4_6zok.jpg'}
    // ];

    const loadMedium = async (token: string) => {
        try {
            const { data } = await api.get('/medium/get-mediuns', {headers:{Authorization: token}})
            const medium = data.medium.map((item: IMediumAPI) => ({
                ...item,
                foto: !item.foto ? '' : `http://localhost:4000/upload/medium/${item.foto}`,
                condicao: item.condicao === null ? '' : item.condicao,
                dtNasc: item.dtNasc === null ? '' : item.dtNasc.toString().split('T')[0],
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
                dtIngresso: item.dtIngresso === null ? '' : item.dtIngresso.toString().split('T')[0],
                dtEmplac: item.dtEmplac === null ? '' : item.dtEmplac.toString().split('T')[0],
                dtIniciacao: item.dtIniciacao === null ? '' : item.dtIniciacao.toString().split('T')[0],
                dtElevacao: item.dtElevacao === null ? '' : item.dtElevacao.toString().split('T')[0],
                dtCenturia: item.dtCenturia === null ? '' : item.dtCenturia.toString().split('T')[0],
                dtSetimo: item.dtSetimo === null ? '' : item.dtSetimo.toString().split('T')[0],
                dtTest: item.dtTest === null ? '' : item.dtTest.toString().split('T')[0],
                adjOrigem: item.adjOrigem === null ? 0 : item.adjOrigem,
                temploOrigem: item.temploOrigem === null ? 0 : item.temploOrigem,
                colete: item.colete === null ? 0 : item.colete,
                classMest: item.classMest === null ? '' : item.classMest,
                falMest: item.falMest === null ? '' : item.falMest,
                povo: item.povo === null ? '' : item.povo,
                falMiss: item.falMiss === null ? 0 : item.falMiss,
                adjDevas: item.adjDevas === null ? '' : item.adjDevas,
                turnoLeg: item.turnoLeg === null ? '' : item.turnoLeg,
                turnoTrab: item.turnoTrab === null ? '' : item.turnoTrab,
                ministro: item.ministro === null ? 0 : item.ministro,
                cavaleiro: item.cavaleiro === null ? 0 : item.cavaleiro,
                dtMinistro: item.dtMinistro === null ? '' : item.dtMinistro.toString().split('T')[0],
                guia: item.guia === null ? 0 : item.guia,
                dtGuia: item.dtGuia === null ? '' : item.dtGuia.toString().split('T')[0],
                cor: item.cor === null ? '' : item.cor,
                estrela: item.estrela === null ? '' : item.estrela,
                classif: item.classif === null ? '' : item.classif,
                dtClassif: item.dtClassif === null ? '' : item.dtClassif.toString().split('T')[0],
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
                dtTrinoSol: item.dtTrinoSol === null ? '' : item.dtTrinoSol.toString().split('T')[0],
                trinoSar: item.trinoSar === 1 ? true : false,
                dtTrinoSar: item.dtTrinoSar === null ? '' : item.dtTrinoSar.toString().split('T')[0],
                herdeiro: item.herdeiro === null ? '' : item.herdeiro,
                filho: item.filho === 1 ? true : false,
                observ: item.observ === null ? '' : item.observ,
                oldFoto: item.oldFoto === null ? '' : item.oldFoto,
                oldDtEmplac: item.oldDtEmplac === null ? '' : item.oldDtEmplac.toString().split('T')[0],
                oldDtIniciacao: item.oldDtIniciacao === null ? '' : item.oldDtIniciacao.toString().split('T')[0],
                oldDtElevacao: item.oldDtElevacao === null ? '' : item.oldDtElevacao.toString().split('T')[0],
                oldDtTest: item.oldDtTest === null ? '' : item.oldDtTest.toString().split('T')[0],
                oldClassMest: item.oldClassMest === null ? '' : item.oldClassMest,
                oldCavaleiro: item.oldCavaleiro === null ? 0 : item.oldCavaleiro,
                oldDtMinistro: item.oldDtMinistro === null ? '' : item.oldDtMinistro.toString().split('T')[0],
                oldEstrela: item.oldEstrela === null ? '' : item.oldEstrela,
                oldClassif: item.oldClassif === null ? '' : item.oldClassif,
                oldDtClassif: item.oldDtClassif === null ? '' : item.oldDtClassif.toString().split('T')[0],
            }));
            setMediuns(medium);
        } catch (error) {
            console.log('Erro ao carregar a lista de médiuns', error);
            Alert('Erro ao carregar a lista de médiuns', 'error');
        }
    }

    const setComponentes = async (medium: IMedium) => {
        const mestre = mediuns.find((item: IMedium) => item.medium_id === medium.mestre);
        const ninfa = mediuns.find((item: IMedium) => item.medium_id === medium.ninfa);
        const madrinha = mediuns.find((item: IMedium) => item.medium_id === medium.madrinha);
        const padrinho = mediuns.find((item: IMedium) => item.medium_id === medium.padrinho);
        const afilhado = mediuns.find((item: IMedium) => item.medium_id === medium.afilhado);

        const updateNinfa = async (ninfa: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: ninfa.medium_id, mestre: medium.medium_id}, {headers:{Authorization: token}})
                console.log(`${ninfa.nome} agora é escrava de ${medium.nome}`)
            } catch (error) {
                console.log('Erro ao adicionar escrava', error);
                Alert('Erro ao adicionar escrava', 'error');
            }
        }

        const updateMadrinha = async (madrinha: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: madrinha.medium_id, afilhado: medium.medium_id, mestre: padrinho? padrinho.medium_id : 0}, {headers:{Authorization: token}})
                console.log(`${madrinha.nome} agora é madrinha de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao adicionar madrinha', error);
                Alert('Erro ao adicionar madrinha', 'error');
            }
        }

        const updatePadrinho = async (padrinho: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: padrinho.medium_id, afilhado: medium.medium_id, ninfa: madrinha? madrinha.medium_id : 0}, {headers:{Authorization: token}})
                console.log(`${padrinho.nome} agora é padrinho de ${medium.nome}`)
            } catch (error) {
                console.log('Erro ao adicionar padrinho', error);
                Alert('Erro ao adicionar padrinho', 'error');
            }
        }

        const updateAfilhadoP = async (afilhado: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: afilhado.medium_id, padrinho: medium.medium_id}, {headers:{Authorization: token}})
                console.log(`${afilhado.nome} agora é afilhado de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao adicionar afilhado', error);
                Alert('Erro ao adicionar afilhado', 'error');
            }
        }

        const updateAfilhadoM = async (afilhado: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: afilhado.medium_id, madrinha: medium.medium_id}, {headers:{Authorization: token}})
                console.log(`${afilhado.nome} agora é afilhado de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao adicionar afilhado', error);
                Alert('Erro ao adicionar afilhado', 'error');
            }
        }

        const updateMestre = async (mestre: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: mestre.medium_id, ninfa: medium.medium_id}, {headers:{Authorization: token}})
                console.log(`${mestre.nome} agora é mestre de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao adicionar mestre', error);
                Alert('Erro ao adicionar mestre', 'error');
            }
        }

        const promises: Array<Promise<void>> = []
        
        if (medium.sex.concat(medium.med) === 'MasculinoDoutrinador') {
            if(ninfa) {promises.push(updateNinfa(ninfa, medium))}
            if(madrinha) {promises.push(updateMadrinha(madrinha, medium))}
            if(padrinho) {promises.push(updatePadrinho(padrinho, medium))}  
        } else if (medium.sex.concat(medium.med) === 'MasculinoApará') {
            if(afilhado) {promises.push(updateAfilhadoP(afilhado, medium))}
        } else if (medium.sex.concat(medium.med) === 'FemininoDoutrinador') {
            if(afilhado) {promises.push(updateAfilhadoM(afilhado, medium))}
        } else if (medium.sex.concat(medium.med) === 'FemininoApará') {
            if(mestre) {promises.push(updateMestre(mestre, medium))}
        }

        try {
            await Promise.all(promises);
        } catch (error) {
            console.log('Erro ao remover componentes', error);
            Alert('Erro ao remover componentes', 'error')
        }
    }   

    const removeComponentes = async (medium: IMedium, token: string) => {
        const arrayComponentes = [];
        if(medium.mestre) {arrayComponentes.push(medium.mestre)}
        if(medium.ninfa) {arrayComponentes.push(medium.ninfa)}
        if(medium.madrinha) {arrayComponentes.push(medium.madrinha)}
        if(medium.padrinho) {arrayComponentes.push(medium.padrinho)}
        if(medium.afilhado) {arrayComponentes.push(medium.afilhado)}
        
        const removeMestre = async (comp: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: comp.medium_id, mestre: null}, {headers:{Authorization: token}})
                console.log(`${comp.nome} não é mais ninfa de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover mestre', error);
                Alert('Erro ao remover mestre', 'error');
            }
        }

        const removeNinfa = async (comp: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: comp.medium_id, ninfa: null}, {headers:{Authorization: token}})
                console.log(`${comp.nome} não é mais mestre de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover ninfa', error);
                Alert('Erro ao remover ninfa', 'error');
            }
        }

        const removeMadrinha = async (comp: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: comp.medium_id, madrinha: null}, {headers:{Authorization: token}})
                console.log(`${comp.nome} não é mais afilhado de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover madrinha', error);
                Alert('Erro ao remover madrinha', 'error');
            }
        }

        const removePadrinho = async (comp: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: comp.medium_id, padrinho: null}, {headers:{Authorization: token}})
                console.log(`${comp.nome} não é mais afilhado de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover padrinho', error);
                Alert('Erro ao remover padrinho', 'error');
            }
        }

        const removeAfilhado = async (comp: IMedium, medium: IMedium) => {
            try {
                await api.put('/medium/update', {medium_id: comp.medium_id, afilhado: null}, {headers:{Authorization: token}})
                console.log(`${comp.nome} não é mais padrinho/madrinha de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover afilhado', error);
                Alert('Erro ao remover afilhado', 'error');
            }
        }

        const promises: Array<Promise<void>> = []

        arrayComponentes.forEach(async (item: number) => {
            const comp = mediuns.find((med: IMedium) => med.medium_id === item);
            if(comp){
                if(comp.mestre === medium.medium_id){promises.push(removeMestre(comp, medium))}
                if(comp.ninfa === medium.medium_id){promises.push(removeNinfa(comp, medium))}
                if(comp.madrinha === medium.medium_id){promises.push(removeMadrinha(comp, medium))}
                if(comp.padrinho === medium.medium_id){promises.push(removePadrinho(comp, medium))}
                if(comp.afilhado === medium.medium_id){promises.push(removeAfilhado(comp, medium))}
            }
        })

        try {
            await Promise.all(promises);
        } catch (error) {
            console.log('Erro ao remover componentes', error);
            Alert('Erro ao remover componentes', 'error');
        }
        
    }   

    const changeMed = async (medium: IMedium, token: string) => {
        const editData = {
            medium_id: medium.medium_id,
            med: medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : '',
            foto: medium.oldFoto.split('/')[medium.oldFoto.split('/').length - 1],
            dtEmplac: medium.oldDtEmplac.split('T')[0] === '' ? null : medium.oldDtEmplac.split('T')[0],
            dtIniciacao: medium.oldDtIniciacao.split('T')[0] === '' ? null : medium.oldDtIniciacao.split('T')[0],
            dtElevacao: medium.oldDtElevacao.split('T')[0] === '' ? null : medium.oldDtElevacao.split('T')[0],
            dtTest: medium.oldDtTest.split('T')[0] === '' ? null : medium.oldDtTest.split('T')[0],
            classMest: medium.oldClassMest,
            cavaleiro: medium.oldCavaleiro === 0 ? null : medium.oldCavaleiro,
            dtMinistro: medium.oldDtMinistro.split('T')[0] === '' ? null : medium.oldDtMinistro.split('T')[0],
            estrela: medium.oldEstrela,
            classif: medium.oldClassif,
            dtClassif: medium.oldDtClassif.split('T')[0] === '' ? null : medium.oldDtClassif.split('T')[0],
            oldFoto: medium.foto.split('/')[medium.foto.split('/').length - 1],
            oldDtEmplac: medium.dtEmplac.split('T')[0] === '' ? null : medium.dtEmplac.split('T')[0],
            oldDtIniciacao: medium.dtIniciacao.split('T')[0] === '' ? null : medium.dtIniciacao.split('T')[0],
            oldDtElevacao: medium.dtElevacao.split('T')[0] === '' ? null : medium.dtElevacao.split('T')[0],
            oldDtTest: medium.dtTest.split('T')[0] === '' ? null : medium.dtTest.split('T')[0],
            oldClassMest: medium.classMest,
            oldCavaleiro: medium.cavaleiro === 0 ? null : medium.cavaleiro,
            oldDtMinistro: medium.dtMinistro.split('T')[0] === '' ? null : medium.dtMinistro.split('T')[0],
            oldEstrela: medium.estrela,
            oldClassif: medium.classif,
            oldDtClassif: medium.dtClassif.split('T')[0] === '' ? null : medium.dtClassif.split('T')[0],
            mestre: null,
            ninfa: null, 
            afilhado: null,
            padrinho: null,
            madrinha: null,
            presidente: '',
            comando: ''
        };
        try {
            await api.put('/medium/update', editData ,{headers:{Authorization: token}})
            removeComponentes(medium, token);
            Alert(`Mediunidade alterada para ${editData.med}`, 'success');
        } catch (error) {
            console.log('Erro ao mudar mediunidade', error);
            Alert('Erro ao mudar mediunidade', 'error');
        }
    }

    return (
        <MediumContext.Provider value={{mediuns, loadMedium, changeMed, setComponentes}} >
            { children }
        </MediumContext.Provider>
    )
}