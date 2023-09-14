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
                oldCor: item.oldCor === null ? '' : item.oldCor,
                oldDtMentor: item.oldDtMentor === null ? '' : item.oldDtMentor.toString().split('T')[0],
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