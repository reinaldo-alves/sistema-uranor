import { IAdjunto, ICavaleiro, IFalange, IMedium, IMentor, ITemplo } from "src/types/types";

export const emissaoText = (medium: IMedium, mediuns: Array<IMedium>, ministros: Array<IMentor>, cavaleiros: Array<ICavaleiro>, guias: Array<IMentor>, adjuntos: Array<IAdjunto>, templos: Array<ITemplo>, falMiss: Array<IFalange>) => {
    const falMissNome = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.nome;
    const adjDevasNome = medium.adjDevas === 'Alufã' ? 'BARROS' : medium.adjDevas === 'Adejã' ? 'FRÓES' : '';
    const adjOrigemMin = ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.ministro)?.nome;
    const adjOrigemNome = adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.nome;
    const esperanca = adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.esperanca;
    const termoFalange = medium.falMiss ? `${medium.regente? 'REGENTE ' : ''}${falMissNome} ${medium.janda? 'JANDA ' : ''}MISSIONÁRIA DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}. ` : '';
    const falMissNomeP = medium.falMiss === 2? 'Nityama' : falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.nome;
    const falMissPrimeira = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.primeira;
    const falMissAdjMin = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.adjMin;
    const falMissAdjNome = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.adjNome;
    const termoPrimeira = medium.falMiss? `NA ORDEM DA 1ª ${falMissNomeP} ${falMissPrimeira}${falMissAdjMin ? `, NA REGÊNCIA DO ${falMissAdjMin} KOATAY 108 MESTRE ${falMissAdjNome}. ` : '. '}` : '';
    const classMest = medium.classMest.includes('Sol') ? 'Mestre Sol' : medium.classMest.includes('Luz') ? 'Mestre Luz' : medium.classMest.includes('Lua') ? 'Mestre Lua' : '';
    const prefixo = medium.med === 'Doutrinador' ? falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.prefSol : medium.med === 'Apará' ? falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.prefLua : ''
    const termoGuia = medium.guia ? `DA GUIA MISSIONÁRIA ${guias.find((item: IMentor) => item.id === medium.guia)?.nome} ${medium.cor} ${medium.falMiss ? prefixo : ''}` : `DE MINHA GUIA MISSIONÁRIA ${medium.falMiss ? prefixo : ''}`;
    const presidente = adjuntos.find((item: IAdjunto) => item.adjunto_id === templos.find((item: ITemplo) => item.templo_id === medium.templo)?.presidente)
    const mestre = mediuns.find((item: IMedium) => item.medium_id === medium.mestre)
    const termoEmMissaoLua = presidente?.adjunto_id !== medium.adjOrigem && !esperanca && mestre?.presidente !== 'Presidente' && mestre?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'? `EM MISSÃO DO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : '';
    const termoEscrava = mestre? `ESCRAVA DO ${mestre.trinoSar? 'TRINO SARDYOS ' : mestre.trinoSol? `TRINO SOLITÁRIO ${mestre.trinoSol} ` : mestre.trinoSar && mestre.trinoSol? `TRINO SARDYOS SOLITÁRIO ${mestre.trinoSol} ` : ''}${mestre.ministro? mestre.classif === 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração' ? `ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === mestre.ministro)?.nome} KOATAY 108 TAUMANTES RAIO RAMA ADJURAÇÃO` : `ADJUNTO ${ministros.find((item: IMentor) => item.id === mestre.ministro)?.nome}${mestre.classif.replace(/Adjunto/g, '')}` : mestre.classif} MESTRE ${mestre.nomeEmissao}. ` : '';
    const termoEscravaArcanos = mestre? `ESCRAVA DO ADJUNTO ${ministros.find((item: IMentor) => item.id === mestre.ministro)?.nome} KOATAY 108 MESTRE ${mestre.nomeEmissao}, 7° RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : '';
    const termoYuricy = medium.falMiss === 8 ? 'NA FORÇA DO MINISTRO YURICY, ' : '';
    const termoOrigemLua = mestre?.presidente === 'Presidente' || mestre?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'? `NA ORDEM DO MINISTRO ${adjOrigemMin}. ` : esperanca? `NA ORDEM DO MINISTRO ${adjOrigemMin}, ${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : `${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. `

    const afilhado = mediuns.find((item: IMedium) => item.medium_id === medium.afilhado)
    const termoMadrinha = afilhado? `MADRINHA DO ${afilhado.trinoSar? 'TRINO SARDYOS ' : afilhado.trinoSol? `TRINO SOLITÁRIO ${afilhado.trinoSol} ` : afilhado.trinoSar && afilhado.trinoSol? `TRINO SARDYOS SOLITÁRIO ${afilhado.trinoSol} ` : ''}${afilhado.ministro? afilhado.classif === 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração' ? `ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome} KOATAY 108 TAUMANTES RAIO RAMA ADJURAÇÃO` : `ADJUNTO ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome}${afilhado.classif.replace(/Adjunto/g, '')}` : afilhado.classif} MESTRE ${afilhado.nomeEmissao}. ` : '';
    const termoMadrinhaArcanos = afilhado? `MADRINHA DO ADJUNTO ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome} KOATAY 108 MESTRE ${afilhado.nomeEmissao}, 7° RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : '';
    const termoOrigemSol = afilhado?.presidente === 'Presidente' || afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'? `NA ORDEM DO MINISTRO ${adjOrigemMin}. ` : esperanca? `NA ORDEM DO MINISTRO ${adjOrigemMin}, ${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : `${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. `
    const termoEmMissaoSol = presidente?.adjunto_id !== medium.adjOrigem && !esperanca && afilhado?.presidente !== 'Presidente' && afilhado?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'? `EM MISSÃO DO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : '';
    


    const ninfaMenor = `EU, NINFA ${medium.med === 'Doutrinador' ? 'SOL' : medium.med === 'Apará' ? 'LUA' : ''} DA FALANGE DE SUBLIMAÇÃO, ${termoFalange}, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. ${termoPrimeira}EU, ${medium.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`

    const magoMenor = `EU, ${medium.dtElevacao ? `JAGUAR ${classMest}, DA FALANGE DE SUBLIMAÇÃO. ` : ''}MAGO MISSIONÁRIO DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. EU, ${medium.med === 'Doutrinador' && medium.dtElevacao ? '7° RAIO AUTORIZADO ' : medium.med === 'Apará' && medium.dtElevacao ? '5° YURÊ RAIO AUTORIZADO ' : ''}MESTRE ${medium.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`;

    const principeMenor = `EU, ${medium.dtElevacao ? `JAGUAR ${classMest}, DA FALANGE DE SUBLIMAÇÃO. ` : ''}PRÍNCIPE MAYA DESTE AMANHECER, DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}, NA REGÊNCIA DO MINISTRO YURICY, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. AFILHADO DE KOATAY 108 MINHA MÃE CLARIVIDENTE EM CRISTO JESUS. EU, ${medium.med === 'Doutrinador' && medium.dtElevacao ? '7° RAIO AUTORIZADO MESTRE ' : medium.med === 'Apará' && medium.dtElevacao ? '5° YURÊ RAIO AUTORIZADO MESTRE ' : ''}${medium.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`;

    const ninfaLua = `EU, NINFA LUA ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? 'FILHA DE DEVAS' : ''}, DA FALANGE DE ${medium.falMest}, POVO DE ${medium.povo}, ${termoFalange}${termoYuricy}${termoOrigemLua}${termoEmMissaoLua}${mestre?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'? termoEscravaArcanos : termoEscrava}${termoPrimeira}OH JESUS! ACABO DE RECEBER DE DEUS PAI TODO PODEROSO, A SINTONIA DO GRANDE E DIVINO MESTRE OLORUM, NA LINHA DESTE AMANHECER. DESEJANDO ALCANÇAR OS PODERES DO REINO CENTRAL, COLOCO JESUS! A TERNURA DE TODOS OS TEMPOS. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. EU, ${medium.nomeEmissao}, SOU UMA GUIA MISSIONÁRIA VINDA DO MUNDO VERDE EM MISSÃO ESPECIAL, VENHO NA FORÇA DECRESCENTE ${termoGuia}, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE MINHA ESTRELA ${medium.estrela} DO MEU 2º VERBO, NA ORDEM DO 1º 7º, LEVANDO OS PODERES ${medium.mestre ? 'DO MESTRE' : 'DE MINHA MÃE KOATAY 108'} QUE ME FEZ ${medium.turnoTrab}, PARA FORTALECER O MEU SOL INTERIOR, NOS TRÊS REINOS DE MINHA NATUREZA, PARTIREI SEMPRE COM ${medium.mestre? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`

    const ninfaSol = `EU, NINFA SOL ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? 'FILHA DE DEVAS' : ''}, DA FALANGE DE ${medium.falMest}, POVO DE ${medium.povo}, ${termoFalange}${termoYuricy}${termoOrigemSol}${termoEmMissaoSol}${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7° Raio Adjuração Arcanos Rama 2000'? termoMadrinhaArcanos : termoMadrinha}${termoPrimeira}OH JESUS! ACABO DE RECEBER DE DEUS PAI TODO PODEROSO, A SINTONIA DO GRANDE E DIVINO MESTRE OBATALÁ, NA LINHA DESTE AMANHECER. DESEJANDO ALCANÇAR OS PODERES DO REINO CENTRAL, COLOCO JESUS! A TERNURA DE TODOS OS TEMPOS. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. EU, ${medium.nomeEmissao}, SOU UMA GUIA MISSIONÁRIA VINDA DO MUNDO VERDE EM MISSÃO ESPECIAL, VENHO NA FORÇA DECRESCENTE ${termoGuia}, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE MINHA ESTRELA ${medium.estrela} DO MEU 3º VERBO, NA ORDEM DO 1º 7º, LEVANDO OS PODERES ${medium.mestre ? 'DO MESTRE' : 'DE MINHA MÃE KOATAY 108'} QUE ME FEZ ${medium.turnoTrab}, PARA FORTALECER O MEU SOL INTERIOR, NOS TRÊS REINOS DE MINHA NATUREZA, PARTIREI SEMPRE COM ${medium.mestre? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`


    if (medium.dtCenturia) {
        if (medium.sex.concat(medium.med) === 'MasculinoDoutrinador') {
            return ''
        }
        if (medium.sex.concat(medium.med) === 'MasculinoApará') {
            return ''
        }
        if (medium.sex.concat(medium.med) === 'FemininoDoutrinador') {
            return ninfaSol
        }
        if (medium.sex.concat(medium.med) === 'FemininoApará') {
            return ninfaLua
        }
    } else if (medium.falMiss === 1 || medium.falMiss === 2 || medium.falMiss === 4 || medium.falMiss === 5) {
        return ninfaMenor
    } else if (medium.falMiss === 6) {
        return magoMenor    
    } else if (medium.falMiss === 7) {
        return principeMenor
    } else {
        return ''
    }
}