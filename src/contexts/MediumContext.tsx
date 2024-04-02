import { createContext, useState } from "react";
import api from "src/api";
import { IMedium } from "src/types/types";
import { IMediumAPI } from "src/types/typesAPI";
import { Alert } from "src/utilities/popups";

export const MediumContext = createContext({} as any);

export const MediumStore = ({ children }: any) => {
    const [mediuns, setMediuns] = useState([] as Array<IMedium>);

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
                guia: item.guia === null ? 0 : item.guia,
                dtMentor: item.dtMentor === null ? '' : item.dtMentor.toString().split('T')[0],
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
                trinoSar: item.trinoSar === 1 ? true : false,
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
                oldCor: item.oldCor === null ? '' : item.oldCor,
                oldDtMentor: item.oldDtMentor === null ? '' : item.oldDtMentor.toString().split('T')[0],
                oldEstrela: item.oldEstrela === null ? '' : item.oldEstrela,
                oldClassif: item.oldClassif === null ? '' : item.oldClassif,
                oldDtClassif: item.oldDtClassif === null ? '' : item.oldDtClassif.toString().split('T')[0],
            }));
            setMediuns(medium);
        } catch (error) {
            console.log('Erro ao carregar a lista de médiuns', error);
        }
    }

    const convertMediumToSend = (medium: IMedium) => {
        const mediumObj = {
            ...medium,
            dtNasc: medium.dtNasc === '' ? null : medium.dtNasc,
            dtIngresso: medium.dtIngresso === '' ? null : medium.dtIngresso,
            dtEmplac: medium.dtEmplac === '' ? null : medium.dtEmplac,
            dtIniciacao: medium.dtIniciacao === '' ? null : medium.dtIniciacao,
            dtElevacao: medium.dtElevacao === '' ? null : medium.dtElevacao,
            dtCenturia: medium.dtCenturia === '' ? null : medium.dtCenturia,
            dtSetimo: medium.dtSetimo === '' ? null : medium.dtSetimo,
            dtTest: medium.dtTest === '' ? medium.dtIngresso === medium.oldDtTest ? null : medium.dtIngresso : medium.dtTest,
            dtMentor: medium.dtMentor === '' ? null : medium.dtMentor,
            dtClassif: medium.dtClassif === '' ? null : medium.dtClassif,
            colete: medium.colete === 0 ? null : medium.colete,
            ministro: medium.ministro === 0 ? null : medium.ministro,
            cavaleiro: medium.cavaleiro === 0 ? null : medium.cavaleiro,
            guia: medium.guia === 0 ? null : medium.guia,
            falMiss: medium.falMiss === 0 ? null : medium.falMiss,
            adjOrigem: medium.adjOrigem === 0 ? null : medium.adjOrigem,
            temploOrigem: medium.temploOrigem === 0 ? null : medium.temploOrigem,
            mestre: medium.mestre === 0 ? null : medium.mestre,
            ninfa: medium.ninfa === 0 ? null : medium.ninfa,
            padrinho: medium.padrinho === 0 ? null : medium.padrinho,
            madrinha: medium.madrinha === 0 ? null : medium.madrinha,
            afilhado: medium.afilhado === 0 ? null : medium.afilhado,
            oldDtTest: medium.oldDtTest === '' ? null : medium.oldDtTest,
            oldDtEmplac: medium.oldDtEmplac === '' ? null : medium.oldDtEmplac,
            oldDtIniciacao: medium.oldDtIniciacao === '' ? null : medium.oldDtIniciacao,
            oldDtElevacao: medium.oldDtElevacao === '' ? null : medium.oldDtElevacao,
            oldCavaleiro: medium.oldCavaleiro === 0 ? null : medium.oldCavaleiro,
            oldDtMentor: medium.oldDtMentor === '' ? null : medium.oldDtMentor,
            oldDtClassif: medium.oldDtClassif === '' ? null : medium.oldDtClassif
        };
        return mediumObj
    }

    const updateNinfa = async (medium: IMedium, token: string) => {
        const ninfa = mediuns.find((item: IMedium) => item.medium_id === medium.ninfa);
        if(ninfa) {
            try {
                await api.put('/medium/update', {medium_id: ninfa.medium_id, mestre: medium.medium_id}, {headers:{Authorization: token}})
                console.log(`${ninfa.nome} agora é escrava de ${medium.nome}`)
            } catch (error) {
                console.log('Erro ao adicionar escrava', error);
                Alert('Erro ao adicionar escrava', 'error');
            }
        } else {
            console.log('Nenhuma ninfa a adicionar');
        }
    }

    const updateMadrinha = async (medium: IMedium, token: string) => {
        const madrinha = mediuns.find((item: IMedium) => item.medium_id === medium.madrinha);
        const padrinho = mediuns.find((item: IMedium) => item.medium_id === medium.padrinho);
        if (madrinha) {
            try {
                await api.put('/medium/update', {medium_id: madrinha.medium_id, afilhado: medium.medium_id, mestre: padrinho? padrinho.medium_id : null}, {headers:{Authorization: token}})
                if (padrinho) {
                    await api.put('/medium/update', {medium_id: padrinho.medium_id, ninfa: madrinha.medium_id}, {headers:{Authorization: token}})
                }
                console.log(`${madrinha.nome} agora é madrinha de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao adicionar madrinha', error);
                Alert('Erro ao adicionar madrinha', 'error');
            }
        } else {
            console.log('Nenhuma madrinha a adicionar');
        }
    }

    const updatePadrinho = async (medium: IMedium, token: string) => {
        const madrinha = mediuns.find((item: IMedium) => item.medium_id === medium.madrinha);
        const padrinho = mediuns.find((item: IMedium) => item.medium_id === medium.padrinho);
        if(padrinho) {
            try {
                await api.put('/medium/update', {medium_id: padrinho.medium_id, afilhado: medium.medium_id, ninfa: madrinha? madrinha.medium_id : null}, {headers:{Authorization: token}})
                if (madrinha) {
                    await api.put('/medium/update', {medium_id: madrinha.medium_id, mestre: padrinho.medium_id}, {headers:{Authorization: token}})
                }
                console.log(`${padrinho.nome} agora é padrinho de ${medium.nome}`)
            } catch (error) {
                console.log('Erro ao adicionar padrinho', error);
                Alert('Erro ao adicionar padrinho', 'error');
            }
        } else {
            console.log('Nenhum padrinho a adicionar');
        }
    }

    const updateAfilhado = async (medium: IMedium, token: string) => {
        const afilhado = mediuns.find((item: IMedium) => item.medium_id === medium.afilhado);
        if (afilhado) {
            if (medium.sex === 'Masculino') {
                try {
                    await api.put('/medium/update', {medium_id: afilhado.medium_id, padrinho: medium.medium_id}, {headers:{Authorization: token}})
                    if (afilhado.madrinha) {
                        await api.put('/medium/update', {medium_id: medium.medium_id, ninfa: afilhado.madrinha}, {headers:{Authorization: token}})
                        await api.put('/medium/update', {medium_id: afilhado.madrinha, mestre: medium.medium_id}, {headers:{Authorization: token}})
                    }
                    console.log(`${afilhado.nome} agora é afilhado de ${medium.nome}`);
                } catch (error) {
                    console.log('Erro ao adicionar afilhado', error);
                    console.log(token);
                    Alert('Erro ao adicionar afilhado', 'error');
                }
            }
            if (medium.sex === 'Feminino') {
                try {
                    await api.put('/medium/update', {medium_id: afilhado.medium_id, madrinha: medium.medium_id}, {headers:{Authorization: token}})
                    if (afilhado.padrinho) {
                        await api.put('/medium/update', {medium_id: medium.medium_id, mestre: afilhado.padrinho}, {headers:{Authorization: token}})
                        await api.put('/medium/update', {medium_id: afilhado.padrinho, ninfa: medium.medium_id}, {headers:{Authorization: token}})
                    }
                    console.log(`${afilhado.nome} agora é afilhado de ${medium.nome}`);
                } catch (error) {
                    console.log('Erro ao adicionar afilhado', error);
                    Alert('Erro ao adicionar afilhado', 'error');
                }
            }
        } else {
            console.log('Nenhum afilhado a adicionar');
        }
    }

    const updateMestre = async (medium: IMedium, token: string) => {
        const mestre = mediuns.find((item: IMedium) => item.medium_id === medium.mestre);
        if (mestre) {
            try {
                await api.put('/medium/update', {medium_id: mestre.medium_id, ninfa: medium.medium_id}, {headers:{Authorization: token}})
                console.log(`${mestre.nome} agora é mestre de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao adicionar mestre', error);
                Alert('Erro ao adicionar mestre', 'error');
            }
        } else {
            console.log('Nenhum mestre a adicionar');
        }
    }

    const setComponentes = async (medium: IMedium, token: string) => {
        try {
            await updateMestre(medium, token);
            await updateNinfa(medium, token);
            await updateMadrinha(medium, token);
            await updatePadrinho(medium, token);
            await updateAfilhado(medium, token);
        } catch (error) {
            console.log('Erro ao adicionar componentes', error);
            Alert('Erro ao adicionar componentes', 'error')
        }
    }   

    const removeMestre = async (medium: IMedium, token: string) => {
        const mestre = mediuns.find((med: IMedium) => med.medium_id === medium.mestre);
        if(mestre) {
            try {
                await api.put('/medium/update', {medium_id: mestre.medium_id, ninfa: null}, {headers:{Authorization: token}})
                console.log(`${mestre.nome} não é mais mestre de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover mestre', error);
                Alert('Erro ao remover mestre', 'error');
            }
        } else {
            console.log('Nenhum mestre a remover')
        }
    }

    const removeNinfa = async (medium: IMedium, token: string) => {
        const ninfa = mediuns.find((med: IMedium) => med.medium_id === medium.ninfa);
        if (ninfa) {
            try {
                await api.put('/medium/update', {medium_id: ninfa.medium_id, mestre: null}, {headers:{Authorization: token}})
                console.log(`${ninfa.nome} não é mais ninfa de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover ninfa', error);
                Alert('Erro ao remover ninfa', 'error');
            }
        } else {
            console.log('Nenhuma ninfa a remover')
        }
    }

    const removeMadrinha = async (medium: IMedium, token: string) => {
        const madrinha = mediuns.find((med: IMedium) => med.medium_id === medium.madrinha);
        if (madrinha) {
            try {
                await api.put('/medium/update', {medium_id: madrinha.medium_id, afilhado: null, mestre: null}, {headers:{Authorization: token}})
                console.log(`${madrinha.nome} não é mais madrinha de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover madrinha', error);
                Alert('Erro ao remover madrinha', 'error');
            }
        } else {
            console.log('Nenhuma madrinha a remover')
        }
    }

    const removePadrinho = async (medium: IMedium, token: string) => {
        const padrinho = mediuns.find((med: IMedium) => med.medium_id === medium.padrinho);
        if (padrinho) {
            try {
                await api.put('/medium/update', {medium_id: padrinho.medium_id, afilhado: null, ninfa: null}, {headers:{Authorization: token}})
                console.log(`${padrinho.nome} não é mais padrinho de ${medium.nome}`);
            } catch (error) {
                console.log('Erro ao remover padrinho', error);
                Alert('Erro ao remover padrinho', 'error');
            }
        } else {
            console.log('Nenhum padrinho a remover')
        }
    }

    const removeAfilhado = async (medium: IMedium, token: string) => {
        const afilhado = mediuns.find((med: IMedium) => med.medium_id === medium.afilhado);
        if (afilhado) {
            if (medium.sex === 'Masculino') {
                try {
                    await api.put('/medium/update', {medium_id: afilhado.medium_id, padrinho: null}, {headers:{Authorization: token}})
                    await api.put('/medium/update', {medium_id: medium.medium_id, ninfa: null}, {headers:{Authorization: token}})
                    if (afilhado.madrinha) {
                        await api.put('/medium/update', {medium_id: afilhado.madrinha, mestre: null}, {headers:{Authorization: token}})
                    }
                    console.log(`${afilhado.nome} não é mais afilhado de ${medium.nome}`);
                } catch (error) {
                    console.log('Erro ao remover afilhado', error);
                    Alert('Erro ao remover afilhado', 'error');
                }
            }
            if (medium.sex === 'Feminino') {
                try {
                    await api.put('/medium/update', {medium_id: afilhado.medium_id, madrinha: null}, {headers:{Authorization: token}})
                    await api.put('/medium/update', {medium_id: medium.medium_id, mestre: null}, {headers:{Authorization: token}})
                    if (afilhado.padrinho) {
                        await api.put('/medium/update', {medium_id: afilhado.padrinho, ninfa: null}, {headers:{Authorization: token}})
                    }
                    console.log(`${afilhado.nome} não é mais afilhado de ${medium.nome}`);
                } catch (error) {
                    console.log('Erro ao remover afilhado', error);
                    Alert('Erro ao remover afilhado', 'error');
                }
            }
        } else {
            console.log('Nenhum afilhado a remover')
        }
    }

    const removeComponentes = async (medium: IMedium, token: string) => {
        try {
            await removeMestre(medium, token);
            await removeNinfa(medium, token);
            await removeMadrinha(medium, token);
            await removePadrinho(medium, token);
            await removeAfilhado(medium, token);
        } catch (error) {
            console.log('Erro ao remover componentes', error);
            Alert('Erro ao remover componentes', 'error')
        }
    }   

    const changeMed = async (medium: IMedium, token: string, dtTest: string) => {
        const newDtTest = dtTest === '' ? null : dtTest.split('T')[0];
        const editData = {
            medium_id: medium.medium_id,
            med: medium.med === 'Doutrinador' ? 'Apará' : medium.med === 'Apará' ? 'Doutrinador' : '',
            foto: medium.oldFoto.split('/')[medium.oldFoto.split('/').length - 1],
            dtEmplac: medium.oldDtEmplac.split('T')[0] === '' ? null : medium.oldDtEmplac.split('T')[0],
            dtIniciacao: medium.oldDtIniciacao.split('T')[0] === '' ? null : medium.oldDtIniciacao.split('T')[0],
            dtElevacao: medium.oldDtElevacao.split('T')[0] === '' ? null : medium.oldDtElevacao.split('T')[0],
            dtTest: medium.oldDtTest.split('T')[0] === '' ? newDtTest : medium.oldDtTest.split('T')[0],
            classMest: medium.oldClassMest,
            cavaleiro: medium.oldCavaleiro === 0 ? null : medium.oldCavaleiro,
            cor: medium.oldCor,
            dtMentor: medium.oldDtMentor.split('T')[0] === '' ? null : medium.oldDtMentor.split('T')[0],
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
            oldCor: medium.cor,
            oldDtMentor: medium.dtMentor.split('T')[0] === '' ? null : medium.dtMentor.split('T')[0],
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
        const newEvento = {
            medium: medium.medium_id,
            data: dtTest,
            mensagem: `Mudança de Mediunidade: de ${medium.med} para ${editData.med}`,
            tipo: 'Mudança de Mediunidade',
            observ: ''
        };
        try {
            await removeComponentes(medium, token);
            await api.put('/medium/update', editData ,{headers:{Authorization: token}});
            if (dtTest) {
                await api.post('/evento/create', newEvento, {headers:{Authorization: token}});
            }
            Alert(`Mediunidade alterada para ${editData.med}`, 'success');
        } catch (error) {
            console.log('Erro ao mudar mediunidade', error);
            Alert('Erro ao mudar mediunidade', 'error');
        }
    }

    const uploadImage = async (medium_id: number,token: string, photo: File | null) => {
        if(photo){
            const formData = new FormData();
            formData.append('image', photo);
            const headers = {
                'headers': {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            }
            try {
                const { data } = await api.post(`/medium/upload-image?medium_id=${medium_id}`, formData, headers)
                console.log(`Foto ${data.filename} adicionada ao banco de dados`);
            } catch (error) {
                console.log('Erro ao fazer upload da imagem', error);
                Alert('Erro ao fazer upload da imagem', 'error');
            }
        } else {
            console.log('Nenhuma foto foi adicionada');
        }
    }

    return (
        <MediumContext.Provider value={{mediuns, loadMedium, convertMediumToSend, changeMed, setComponentes, removeComponentes, uploadImage}} >
            { children }
        </MediumContext.Provider>
    )
}