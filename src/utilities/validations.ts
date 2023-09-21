import { IMedium } from "src/types/types";
import { Alert } from "./popups";

export const validateMedium = (medium: IMedium, action: () => void) => {
    const dtIngresso = new Date(medium.dtIngresso);
    const dtEmplac = new Date(medium.dtEmplac);
    const dtIniciacao = new Date(medium.dtIniciacao);
    const dtElevacao = new Date(medium.dtElevacao);
    const dtCenturia = new Date(medium.dtCenturia);
    const dtSetimo = new Date(medium.dtSetimo);

    if (!medium.nome) {
        Alert('Insira o nome do médium', 'error');
        return;
    }
    if (!medium.med) {
        Alert('Selecione a mediunidade', 'error');
        return;
    }
    if (!medium.sex) {
        Alert('Selecione o sexo', 'error');
        return;
    }
    if (!medium.templo) {
        Alert('Selecione o templo do médium', 'error');
        return;
    }
    if (!medium.dtNasc) {
        Alert('Insira a data de nascimento do médium', 'error');
        return;
    }
    if (!medium.mae) {
        Alert('Insira o nome da mãe do médium', 'error');
        return;
    }
    if (dtEmplac < dtIngresso) {
        Alert('Data de emplacamento não pode ser anterior à data de ingresso', 'error');
        return;
    }
    if (dtIniciacao < dtEmplac) {
        Alert('Data de iniciação não pode ser anterior à data de emplacamento', 'error');
        return;
    }
    if (dtElevacao < dtIniciacao) {
        Alert('Data de elevação não pode ser anterior à data de iniciação', 'error');
        return;
    }
    if (dtSetimo < dtCenturia) {
        Alert('Data de sétimo não pode ser anterior à data de centúria', 'error');
        return;
    }
    if (medium.falMiss && !medium.adjDevas) {
        Alert('Selecione um Adjunto Devas', 'error');
        return
    }
    if ((medium.falMiss === 1 || medium.falMiss === 2 || medium.falMiss === 4 || medium.falMiss === 5 || medium.falMiss === 6 || medium.falMiss === 7) && medium.falMest !== 'Sublimação') {
        Alert('Médiuns de falange de corte devem ser Sublimação', 'error');
        return;
    }
    if (medium.trinoSar && !medium.herdeiro) {
        Alert('Trino Sardyos deve ser herdeiro de algum mestre', 'error');
        return;
    }

    action()

}

