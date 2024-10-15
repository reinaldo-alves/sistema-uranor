import { IAdjunto, ICavaleiro, IFalange, IMedium, IMenor, IMentor, ITemplo } from "src/types/types";

export const emissaoText = (medium: IMedium, mediuns: Array<IMedium>, ministros: Array<IMentor>, cavaleiros: Array<ICavaleiro>, guias: Array<IMentor>, adjuntos: Array<IAdjunto>, templos: Array<ITemplo>, falMiss: Array<IFalange>) => {
    
    //INFORMAÇÕES PARA TODOS OS MÉDIUNS

    //Armazena o objeto méduim que corresponde ao mestre da ninfa
    const mestre = mediuns.find((item: IMedium) => item.medium_id === medium.mestre)
  
    //Adiciona o termo 'do ministro Janarã' em médiuns da falange Estrela Candente
    const falMest = medium.falMest === 'Estrela Candente' && medium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' && mestre?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' ? 'ESTRELA CANDENTE, DO MINISTRO JANARÃ' : medium.falMest;

    //Armazena o nome da falange missionária
    const falMissNome = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.nome;
    
    //Armazena o nome do Adjunto Devas, Barros ou Fróes
    const adjDevasNome = medium.adjDevas === 'Alufã' ? 'BARROS' : medium.adjDevas === 'Adejã' ? 'FRÓES' : '';

    //Armazena o nome do ministro do adjunto de origem
    const adjOrigemMin = ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.ministro)?.nome;

    //Armazena o nome do adjunto de origem
    const adjOrigemNome = adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.nome;
    
    //Armazena a classificação do adjunto de origem (Arcanos ou Rama 2000)
    const adjOrigemClassif = adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.classif;
    
    //Se o adjunto de origem for esperança, retorna true. Caso contrário, retorna false
    const esperanca = adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.esperanca;
    
    //Armazena o objeto adjunto correspondente ao presidente do templo atual que o médium faz parte
    const presidente = adjuntos.find((item: IAdjunto) => item.adjunto_id === templos.find((item: ITemplo) => item.templo_id === medium.templo)?.presidente)

    //Armazena o objeto templo correspondente ao templo atual do médium
    const templo = templos.find((item: ITemplo) => item.templo_id === medium.templo)
    
    // INFORMAÇÕES PARA TODAS AS NINFAS 

    //Retorna o termo da emissão correspondente à falange, após o povo
    const termoFalangeNinfa = medium.falMiss ? `${medium.regente? 'REGENTE ' : ''}${falMissNome} ${medium.janda? 'JANDA ' : ''}MISSIONÁRIA DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}. ` : '';
    
    //Se a ninfa for Nityama Madruxa, retorna 'Nityama', caso contrário, retorna o nome da falange 
    const falMissNomeP = medium.falMiss === 2? 'Nityama' : medium.falMiss === 12? 'Ariana' : falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.nome;

    //Armazena nome da primeira da falange
    const falMissPrimeira = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.primeira;
    
    //Armazena a classificação do adjunto de apoio da falange
    const falMissAdjMin = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.adjMin;
    
    //Armazena o nome do adjunto de apoio da falange
    const falMissAdjNome = falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.adjNome;
    
    //Retorna o termo da primeira da falange
    const termoPrimeira = medium.falMiss? `NA ORDEM DA 1ª ${falMissNomeP} ${falMissPrimeira}${falMissAdjMin ? `, NA REGÊNCIA DO ${falMissAdjMin} KOATAY 108 MESTRE ${falMissAdjNome}. ` : '. '}` : '';

    //Retorna o prefixo da falange, conforme a mediunidade
    const prefixo = medium.med === 'Doutrinador' ? falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.prefSol : medium.med === 'Apará' ? falMiss.find((item: IFalange) => item.falange_id === medium.falMiss)?.prefLua : ''

    //Retorna o termo da emissão que cita a guia missionária da ninfa
    const termoGuia = medium.guia ? `DA GUIA MISSIONÁRIA ${guias.find((item: IMentor) => item.id === medium.guia)?.nome} ${medium.cor} ${medium.falMiss ? prefixo : ''}` : `DE MINHA GUIA MISSIONÁRIA ${medium.falMiss ? prefixo : ''}`;

    //Adiciona o termo 'Na força do Ministro Yuricy' para as ninfas Yuricys
    const termoYuricy = medium.falMiss === 8 ? 'NA FORÇA DO MINISTRO YURICY, ' : '';

    //INFORMAÇÕES PARA NINFAS LUA

    //Adiciona o termo em que a ninfa cita seu adjunto de origem, que é diferente quando a ninfa é escrava de Arcanos/Presidente
    const termoOrigemLua = mestre?.presidente === 'Presidente' || mestre?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? `NA ORDEM DO MINISTRO ${adjOrigemMin}. ` : esperanca? `NA ORDEM DO MINISTRO ${adjOrigemMin}, ${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : `${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. `

    //Adiciona o termo 'Em missão do adjunto...' caso o presidente do templo não seja o adjunto da ninfa e caso seu mestre não seja Arcanos/Presidente
    const termoEmMissaoLua = presidente?.adjunto_id !== medium.adjOrigem && !esperanca && mestre?.presidente !== 'Presidente' && mestre?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? `EM MISSÃO DO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : '';

    //Adiciona o termo de escrava na emissão da ninfa, caso seu mestre não seja Arcanos
    const termoEscrava = mestre? `ESCRAVA DO ${mestre.trinoSar && mestre.trinoSol? `TRINO SARDYOS SOLITÁRIO ${mestre.trinoSol} ` : mestre.trinoSol? `TRINO SOLITÁRIO ${mestre.trinoSol} ` : mestre.trinoSar? 'TRINO SARDYOS ' : ''}${mestre.ministro? mestre.classif === 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração' ? `ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === mestre.ministro)?.nome} KOATAY 108 TAUMANTES RAIO RAMA ADJURAÇÃO` : `ADJUNTO ${ministros.find((item: IMentor) => item.id === mestre.ministro)?.nome}${mestre.classif.replace(/Adjunto/g, '')}` : mestre.classif} MESTRE ${mestre.nomeEmissao}. ` : '';

    //Adiciona o termo de escrava na emissão da ninfa, caso seu mestre seja Arcanos
    const termoEscravaArcanos = mestre? `ESCRAVA DO ADJUNTO ${ministros.find((item: IMentor) => item.id === mestre.ministro)?.nome} KOATAY 108 MESTRE ${mestre.nomeEmissao}, 7º RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : '';

    //INFORMAÇÕES PARA AS NINFAS SOL
    
    //Retorna o objeto medium correspondente ao afilhado da ninfa
    const afilhado = mediuns.find((item: IMedium) => item.medium_id === medium.afilhado)

    //Adiciona o termo em que a ninfa cita seu adjunto de origem, que é diferente quando a ninfa é madrinha de Arcanos/Presidente
    const termoOrigemSol = afilhado?.presidente === 'Presidente' || afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? `NA ORDEM DO MINISTRO ${adjOrigemMin}. ` : esperanca? `NA ORDEM DO MINISTRO ${adjOrigemMin}, ${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : `${medium.falMiss ? 'NO' : 'DO'} ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. `

    //Adiciona o termo 'Em missão do adjunto...' caso o presidente do templo não seja o adjunto da ninfa e caso seu afilhado não seja Arcanos/Presidente
    const termoEmMissaoSol = presidente?.adjunto_id !== medium.adjOrigem && !esperanca && afilhado?.presidente !== 'Presidente' && afilhado?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? `EM MISSÃO DO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : '';

    //Adiciona o termo de madrinha na emissão da ninfa, caso seu afilhado não seja Arcanos
    const termoMadrinha = afilhado? `MADRINHA DO ${afilhado.trinoSar && afilhado.trinoSol? `TRINO SARDYOS SOLITÁRIO ${afilhado.trinoSol} ` : afilhado.trinoSol? `TRINO SOLITÁRIO ${afilhado.trinoSol} ` : afilhado.trinoSar? 'TRINO SARDYOS ' : ''}${afilhado.ministro? afilhado.classif === 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração' ? `ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome} KOATAY 108 TAUMANTES RAIO RAMA ADJURAÇÃO` : `ADJUNTO ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome}${afilhado.classif.replace(/Adjunto/g, '')}` : afilhado.classif} MESTRE ${afilhado.nomeEmissao}. ` : '';

    //Adiciona o termo de madrinha na emissão da ninfa, caso seu afilhado não seja Arcanos
    const termoMadrinhaArcanos = afilhado? `MADRINHA DO ADJUNTO ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome} KOATAY 108 MESTRE ${afilhado.nomeEmissao}, 7º RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : '';

    //INFORMAÇÕES PARA TODOS OS JAGUARES

    //Armazena a maneira como a classificação de mestrado do mestre vai aparecer na emissão
    const classMest = medium.classMest.includes('Sol') ? 'Mestre Sol' : medium.classMest.includes('Luz') ? 'Mestre Luz' : medium.classMest.includes('Lua') ? 'Mestre Lua' : '';
    
    //Retorna o termo da emissão correspondente à falange do mestre
    const termoFalangeJaguar = medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' && medium.devas && medium.falMiss === 6 ? '' : medium.falMiss ? `${medium.regente? 'REGENTE ' : ''}${medium.falMiss === 6 ? `${medium.devas? 'MISSIONÁRIO' : 'MAGO MISSIONÁRIO' }` : medium.falMiss === 7 ? 'PRÍNCIPE MAYA DESTE AMANHECER' : ''}${medium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' ? ` DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}` : ''}. ${medium.falMiss === 7 && medium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' ? 'NA REGÊNCIA DO MINISTRO YURICY. ' : ''}`: '';

    //Retorna o termo que cita a classificação do adjunto de origem do mestre, se não for esperança
    const termoClassifOrigem = medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || medium.presidente === 'Presidente' ? '. ' : adjOrigemClassif === 'Arcanos' ? `, NA LINHA DO MESTRE ${adjOrigemNome}, 7º RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : `, NA LINHA DO MESTRE ${adjOrigemNome}, RAIO ADJURAÇÃO RAMA 2000. `;

    //Retorna o termo que cita a classificação do adjunto de origem do mestre, se for esperança
    const termoClassifOrigemEsp = medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || medium.presidente === 'Presidente' ? '. ' : `, NO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 NA LINHA DO MESTRE ${presidente?.nome}, ${presidente?.classif === 'Arcanos' ? `7º RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : `RAIO ADJURAÇÃO RAMA 2000. `}`;

    //Retorna o termo 'Em missão do adjunto...', caso o presidente do templo não seja o adjunto de origem do mestre, ou que esse adjunto não seja esperança, ou que o mestre não seja Arcanos/Presidente
    const termoEmMissao = presidente?.adjunto_id !== medium.adjOrigem && !esperanca && medium?.presidente !== 'Presidente' && medium?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' && afilhado?.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' && afilhado?.presidente !== 'Presidente'? `EM MISSÃO DO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : '';

    //Retorna o termo 'Afilhado de Koatay 108...' nos príncipes
    const termoAfilhadoPrincipe = medium.falMiss === 7 ? 'AFILHADO DE KOATAY 108 MINHA MÃE CLARIVIDENTE EM CRISTO JESUS. ' : '';

    //Retorna o objeto médium correspondente ao Arcanos cujo mestre (Trino Sardyos) é herdeiro
    const herdeiroSardyos = mediuns.find((item: IMedium) => item.medium_id === medium.herdeiro)
    
    //Retorna true somente quando o adjunto de origem do Trino Sardyos for o mesmo mestre que ele é herdeiro
    const sardyosFC = mediuns.find((item: IMedium) => item.medium_id === medium.herdeiro)?.nomeEmissao === adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.nome && mediuns.find((item: IMedium) => item.medium_id === medium.herdeiro)?.ministro === adjuntos.find((item: IAdjunto) => item.adjunto_id === medium.adjOrigem)?.ministro

    //INFORMAÇÕES PARA OS JAGUARES SOL

    //Retorna o termo 'Comandante do Adjunto Janatã...' para os janatãs
    const termoJanata = medium.comando.includes('Janatã') && medium.classif !== 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' ? 'COMANDANTE DO ADJUNTO JANATÃ MESTRE JOSÉ LUIZ. ' : '';

    //Retorna o termo 'Vindo do 7º Raio' ou '7º Raio', dependendo do caso
    const termoSetimo = medium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' ? '7º Raio, ' : medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || medium.presidente === 'Presidente' ? '' : 'VINDO DO 7º RAIO, ';

    //Retorna a classificação do mestre
    const termoClassifSol = `${medium.trinoSar && medium.trinoSol? `TRINO SARDYOS SOLITÁRIO ${medium.trinoSol} ` : medium.trinoSol? `TRINO SOLITÁRIO ${medium.trinoSol} ` : medium.trinoSar? 'TRINO SARDYOS ' : ''}${medium.classif === '7º Raio Autorizado Taumantes Raio Rama Adjuração' ? medium.classif : medium.ministro? medium.classif === 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração' ? `ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === medium.ministro)?.nome} KOATAY 108 TAUMANTES RAIO RAMA ADJURAÇÃO` : `ADJUNTO ${ministros.find((item: IMentor) => item.id === medium.ministro)?.nome}${medium.classif.replace(/Adjunto/g, '')}` : medium.classif} MESTRE ${medium.nomeEmissao}. `;

    //Retorna o termo 'Herdeiro do Adjunto...' para os Trinos Sardyos doutrinadores
    const termoSardyosSol = medium.trinoSar ? `HERDEIRO DO ADJUNTO ${ministros.find((item: IMentor) => item.id === herdeiroSardyos?.ministro)?.nome} KOATAY 108 MESTRE ${herdeiroSardyos?.nomeEmissao}${medium.filho? ', MEU PAI' : ''}. ` : '';

    //Retorna o termo que indica que o mestre é presidente ou vice-presidente
    const termoPresidente = medium.presidente ? `${medium.presidente === 'Vice' ? 'VICE-PRESIDENTE' : medium.presidente} DO AMANHECER DE ${templo?.cidade}, ${templo?.estado.state}. ` : '';

    //Retorna a estrela do cavaleiro, (Anday, Randay ou Randyê)
    const estrelaCav = medium.trinoSar ? 'RANDAY' : medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || medium.presidente === 'Presidente' ? 'RANDYÊ' : 'ANDAY';

    //Retorna o termo que cita o cavaleiro na emissão do mestre
    const termoCavaleiroSol = medium.cavaleiro ? `1º CAVALEIRO DA LANÇA ${cavaleiros.find((item: IMentor) => item.id === medium.cavaleiro)?.nome} VERDE ${estrelaCav}` : `MEU 1º CAVALEIRO DA LANÇA VERDE ${estrelaCav}`;

    //Retorna o termo de emissão (barras)
    const termoBarras = medium.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' ? '– 0 – X – X –' : medium.presidente === 'Presidente' ? '– 0 – X –' : '– 0 –';

    //INFORMAÇÕES PARA OS JAGUARES LUA

    //Adiciona o termo de padrinho na emissão do mestre, caso seu afilhado não seja Arcanos
    const termoPadrinho = afilhado? `PADRINHO DO ${afilhado.trinoSar && afilhado.trinoSol? `TRINO SARDYOS SOLITÁRIO ${afilhado.trinoSol} ` : afilhado.trinoSol? `TRINO SOLITÁRIO ${afilhado.trinoSol} ` : afilhado.trinoSar? 'TRINO SARDYOS ' : ''}${afilhado.ministro? afilhado.classif === 'Adjunto Regente Koatay 108 Taumantes Raio Rama Adjuração' ? `ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome} KOATAY 108 TAUMANTES RAIO RAMA ADJURAÇÃO` : `ADJUNTO ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome}${afilhado.classif.replace(/Adjunto/g, '')}` : afilhado.classif} MESTRE ${afilhado.nomeEmissao}. ` : '';
    
    //Adiciona o termo de padrinho na emissão do mestre, caso seu afilhado seja Arcanos
    const termoPadrinhoArcanos = afilhado && medium.herdeiro !== medium.afilhado? `PADRINHO DO ADJUNTO ${ministros.find((item: IMentor) => item.id === afilhado.ministro)?.nome} KOATAY 108 MESTRE ${afilhado.nomeEmissao}, 7º RAIO ADJURAÇÃO ARCANOS RAMA 2000. ` : '';

    //Retorna a classificação do mestre
    const termoClassifLua = `${medium.trinoSar? 'TRINO SARDYOS ' : ''}${medium.classif === '5º Yurê Raio Autorizado Cautanenses Raio Rama Ajanã' ? medium.classif : medium.ministro? medium.classif === '5º Yurê Adjunto Regente Cautanenses Raio Rama Ajanã' ? `5º YURÊ ADJUNTO REGENTE ${ministros.find((item: IMentor) => item.id === medium.ministro)?.nome} CAUTANENSES RAIO RAMA AJANÃ` : `5º YURÊ ADJUNTO ${ministros.find((item: IMentor) => item.id === medium.ministro)?.nome}${medium.classif.replace(/5º Yurê Adjunto/g, '')}` : medium.classif} MESTRE ${medium.nomeEmissao}. `;
    
    //Retorna o termo que cita o cavaleiro na emissão do mestre
    const termoCavaleiroLua = medium.cavaleiro ? `CAVALEIRO DA LANÇA ${cavaleiros.find((item: IMentor) => item.id === medium.cavaleiro)?.nome} ${medium.cor? medium.cor : 'VERDE'}` : `MEU CAVALEIRO DA LANÇA ${medium.cor? medium.cor : 'VERDE'}`;

    //Retorna o termo 'Herdeiro do Adjunto...' para os Trinos Sardyos doutrinadores 
    const termoSardyosLua = medium.trinoSar ? `${medium.herdeiro === medium.afilhado? 'PADRINHO ' : ''}HERDEIRO DO ADJUNTO ${ministros.find((item: IMentor) => item.id === herdeiroSardyos?.ministro)?.nome} KOATAY 108 MESTRE ${herdeiroSardyos?.nomeEmissao}${medium.filho? ', MEU PAI' : ''}. ` : '';

    //EMISSÕES

    //Emissão da ninfa não centuriã de falange missionária
    const ninfaMenor = `EU, NINFA ${medium.med === 'Doutrinador' ? 'SOL' : medium.med === 'Apará' ? 'LUA' : ''} DA FALANGE DE SUBLIMAÇÃO, ${termoFalangeNinfa}, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. ${termoPrimeira}EU, ${medium.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`

    //Emissão do mago não centurião
    const magoMenor = `EU, ${medium.dtElevacao ? `JAGUAR ${classMest}, DA FALANGE DE SUBLIMAÇÃO. ` : ''}MAGO MISSIONÁRIO DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. EU, ${medium.med === 'Doutrinador' && medium.dtElevacao ? '7º RAIO AUTORIZADO ' : medium.med === 'Apará' && medium.dtElevacao ? '5º YURÊ RAIO AUTORIZADO ' : ''}MESTRE ${medium.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`;

    //Emissão do príncipe maya não centurião
    const principeMenor = `EU, ${medium.dtElevacao ? `JAGUAR ${classMest}, DA FALANGE DE SUBLIMAÇÃO. ` : ''}PRÍNCIPE MAYA DESTE AMANHECER, DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}, NA REGÊNCIA DO MINISTRO YURICY, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. AFILHADO DE KOATAY 108 MINHA MÃE CLARIVIDENTE EM CRISTO JESUS. EU, ${medium.med === 'Doutrinador' && medium.dtElevacao ? '7º RAIO AUTORIZADO MESTRE ' : medium.med === 'Apará' && medium.dtElevacao ? '5º YURÊ RAIO AUTORIZADO MESTRE ' : ''}${medium.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`;

    //Emissão da ninfa lua centuriã
    const ninfaLua = `EU, NINFA LUA ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? 'FILHA DE DEVAS' : ''}, DA FALANGE DE ${falMest}, POVO DE ${medium.povo}, ${termoFalangeNinfa}${termoYuricy}${termoOrigemLua}${termoEmMissaoLua}${mestre?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? termoEscravaArcanos : termoEscrava}${termoPrimeira}OH JESUS! ACABO DE RECEBER DE DEUS PAI TODO PODEROSO, A SINTONIA DO GRANDE E DIVINO MESTRE OLORUM, NA LINHA DESTE AMANHECER. DESEJANDO ALCANÇAR OS PODERES DO REINO CENTRAL, COLOCO JESUS! A TERNURA DE TODOS OS TEMPOS. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. EU, ${medium.nomeEmissao}, SOU UMA GUIA MISSIONÁRIA VINDA DO MUNDO VERDE EM MISSÃO ESPECIAL, VENHO NA FORÇA DECRESCENTE ${termoGuia}, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE MINHA ESTRELA ${medium.estrela} DO MEU 2º VERBO, NA ORDEM DO 1º 7º, LEVANDO OS PODERES ${medium.mestre ? 'DO MESTRE' : 'DE MINHA MÃE KOATAY 108'} QUE ME FEZ ${medium.turnoTrab}, PARA FORTALECER O MEU SOL INTERIOR, NOS TRÊS REINOS DE MINHA NATUREZA, PARTIREI SEMPRE COM ${medium.mestre? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`

    //Emissão da ninfa sol centuriã
    const ninfaSol = `EU, NINFA SOL ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? 'FILHA DE DEVAS' : ''}, DA FALANGE DE ${falMest}, POVO DE ${medium.povo}, ${termoFalangeNinfa}${termoYuricy}${termoOrigemSol}${termoEmMissaoSol}${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? termoMadrinhaArcanos : termoMadrinha}${termoPrimeira}OH JESUS! ACABO DE RECEBER DE DEUS PAI TODO PODEROSO, A SINTONIA DO GRANDE E DIVINO MESTRE OBATALÁ, NA LINHA DESTE AMANHECER. DESEJANDO ALCANÇAR OS PODERES DO REINO CENTRAL, COLOCO JESUS! A TERNURA DE TODOS OS TEMPOS. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. EU, ${medium.nomeEmissao}, SOU UMA GUIA MISSIONÁRIA VINDA DO MUNDO VERDE EM MISSÃO ESPECIAL, VENHO NA FORÇA DECRESCENTE ${termoGuia}, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE MINHA ESTRELA ${medium.estrela} DO MEU 3º VERBO, NA ORDEM DO 1º 7º, LEVANDO OS PODERES ${medium.mestre ? 'DO MESTRE' : 'DE MINHA MÃE KOATAY 108'} QUE ME FEZ ${medium.turnoTrab}, PARA FORTALECER O MEU SOL INTERIOR, NOS TRÊS REINOS DE MINHA NATUREZA, PARTIREI SEMPRE COM ${medium.mestre? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`

    //Emissão do mestre sol/luz centurião (exceto trino sardyos filho e componente do mesmo adjunto) 
    const mestreSol = `EU, JAGUAR ${classMest} ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? medium.falMiss === 6 ? 'MAGO FILHO DE DEVAS' : 'FILHO DE DEVAS' : ''}, DA FALANGE DE ${falMest}, POVO DE ${medium.povo}. ${termoJanata}${termoFalangeJaguar}${termoSetimo}NA ORDEM DO MINISTRO ${adjOrigemMin}${esperanca? termoClassifOrigemEsp : termoClassifOrigem}${termoAfilhadoPrincipe}${termoEmMissao}EU, ${termoClassifSol}${termoSardyosSol}${termoPresidente}COM OS PODERES DE OLORUM, NA LINHA DESTE AMANHECER. TENHO O MEU DEUS E MINISTRO OBATALÁ QUE ME REGE E ME GUARDA NO CAMINHO DESTA JORNADA. ACABO DE RECEBER DE DEUS PAI TODO PODEROSO NA MINHA LEGIÃO, O TÍTULO DE MESTRE INSTRUTOR UNIVERSAL DAS TRÊS FORÇAS LIGADAS AOS PODERES DESTE AMANHECER. SUBI AO REINO DE JUREMA E ESTOU NA CONTINUAÇÃO DESTA JORNADA PARA O TERCEIRO MILÊNIO. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. SOU UM CAVALEIRO VERDE, CAVALEIRO ESPECIAL, VENHO NA FORÇA DECRESCENTE DO ${termoCavaleiroSol} // REINO CENTRAL, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE ALIMENTAR O MEU SOL INTERIOR, NA GRANDEZA QUE ME FEZ CAVALEIRO DO TURNO ${medium.turnoTrab}, PARTIREI NOS TRÊS REINOS DE MINHA NATUREZA COM – 0 –, DO MEU 3º 7º, NO 5º CICLO INICIÁTICO, SEGUIREI SEMPRE COM ${medium.ninfa? '– 0 ' : ''}${termoBarras} // EM CRISTO JESUS.`;

    //Emissão do trino sardyos sol/luz filho e componente do mesmo adjunto
    const mestreSolSardyosFC = `EU, JAGUAR ${classMest} ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? medium.falMiss === 6 ? 'MAGO FILHO DE DEVAS' : 'FILHO DE DEVAS' : ''}, DA FALANGE DE ${falMest}, POVO DE ${medium.povo}. ${termoJanata}${termoFalangeJaguar}${termoAfilhadoPrincipe}${medium.falMiss || medium.comando.includes('Janatã') ? 'EU, ' : ''}${termoClassifSol}${termoSardyosSol}${termoPresidente}COM OS PODERES DE OLORUM, NA LINHA DESTE AMANHECER. TENHO O MEU DEUS E MINISTRO OBATALÁ QUE ME REGE E ME GUARDA NO CAMINHO DESTA JORNADA. ACABO DE RECEBER DE DEUS PAI TODO PODEROSO NA MINHA LEGIÃO, O TÍTULO DE MESTRE INSTRUTOR UNIVERSAL DAS TRÊS FORÇAS LIGADAS AOS PODERES DESTE AMANHECER. SUBI AO REINO DE JUREMA E ESTOU NA CONTINUAÇÃO DESTA JORNADA PARA O TERCEIRO MILÊNIO. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. SOU UM CAVALEIRO VERDE, CAVALEIRO ESPECIAL, VENHO NA FORÇA DECRESCENTE DO ${termoCavaleiroSol} // REINO CENTRAL, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE ALIMENTAR O MEU SOL INTERIOR, NA GRANDEZA QUE ME FEZ CAVALEIRO DO TURNO ${medium.turnoTrab}, PARTIREI NOS TRÊS REINOS DE MINHA NATUREZA COM – 0 –, DO MEU 3º 7º, NO 5º CICLO INICIÁTICO, SEGUIREI SEMPRE COM ${medium.ninfa? '– 0 ' : ''}${termoBarras} // EM CRISTO JESUS.`;

    //Emissão do mestre lua centurião (exceto príncipes e trino sardyos filho e componente do mesmo adjunto)
    const mestreLua = `EU, JAGUAR MESTRE LUA ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? medium.falMiss === 6 ? 'MAGO FILHO DE DEVAS' : 'FILHO DE DEVAS' : ''}, DA FALANGE DE ${falMest}, POVO DE ${medium.povo}. ${termoFalangeJaguar}NA ORDEM DO MINISTRO ${adjOrigemMin}${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || afilhado?.presidente === 'Presidente' ? '. ' : esperanca ? termoClassifOrigemEsp : termoClassifOrigem}${termoAfilhadoPrincipe}${termoEmMissao}${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? termoPadrinhoArcanos : termoPadrinho}EU, ${termoClassifLua}${termoSardyosLua}COM OS PODERES DE OBATALÁ, NA LINHA DESTE AMANHECER. TENHO O MEU DEUS E MINISTRO OLORUM QUE ME REGE E ME GUARDA NO CAMINHO DESTA JORNADA. ACABO DE RECEBER DE DEUS PAI TODO PODEROSO NA MINHA LEGIÃO, O TÍTULO DE MESTRE INSTRUTOR UNIVERSAL DAS TRÊS FORÇAS LIGADAS AOS PODERES DESTE AMANHECER. SUBI AOS MUNDOS ENCANTADOS, SENTI AS FORÇAS BRILHAREM EM NOSSOS CORAÇÕES. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. SOU UM CAVALEIRO VERDE, CAVALEIRO ESPECIAL, VENHO NA FORÇA DECRESCENTE DO ${termoCavaleiroLua} // REINO CENTRAL, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE ALIMENTAR O MEU SOL INTERIOR, NA GRANDEZA QUE ME FEZ CAVALEIRO DO TURNO ${medium.turnoTrab}, PARTIREI NOS TRÊS REINOS DE MINHA NATUREZA COM – 0 –, E NA FORÇA UNIVERSAL DO MEU 5º, SEGUIREI SEMPRE COM ${medium.ninfa? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`;

    //Emissão do príncipe maya lua centurião (exceto trino sardyos filho e componente do mesmo adjunto)
    const mestreLuaPrincipe = `EU, JAGUAR MESTRE LUA ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas ? 'FILHO DE DEVAS' : ''}, DA FALANGE DE SUBLIMAÇÃO, POVO DE ${medium.povo}. ${medium.regente? 'REGENTE ' : ''}PRÍNCIPE MAYA DESTE AMANHECER, DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}. NA REGÊNCIA DO MINISTRO YURICY. ${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || afilhado?.presidente === 'Presidente' ? `NA ORDEM DO MINISTRO ${adjOrigemMin}. ${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? termoPadrinhoArcanos : termoPadrinho}${termoAfilhadoPrincipe}` : `${esperanca? `NA ORDEM DO MINISTRO ${adjOrigemMin}, NO ADJUNTO ${ministros.find((min: IMentor) => min.id === adjuntos.find((item: IAdjunto) => item.adjunto_id === presidente?.adjunto_id)?.ministro)?.nome} KOATAY 108 MESTRE ${presidente?.nome}. ` : `NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. `}${termoAfilhadoPrincipe}${termoEmMissao}${termoPadrinho}`}EU, ${termoClassifLua}${termoSardyosLua}COM OS PODERES DE OBATALÁ, NA LINHA DESTE AMANHECER. TENHO O MEU DEUS E MINISTRO OLORUM QUE ME REGE E ME GUARDA NO CAMINHO DESTA JORNADA. ACABO DE RECEBER DE DEUS PAI TODO PODEROSO NA MINHA LEGIÃO, O TÍTULO DE MESTRE INSTRUTOR UNIVERSAL DAS TRÊS FORÇAS LIGADAS AOS PODERES DESTE AMANHECER. SUBI AOS MUNDOS ENCANTADOS, SENTI AS FORÇAS BRILHAREM EM NOSSOS CORAÇÕES. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. SOU UM CAVALEIRO VERDE, CAVALEIRO ESPECIAL, VENHO NA FORÇA DECRESCENTE DO ${termoCavaleiroLua} // REINO CENTRAL, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE ALIMENTAR O MEU SOL INTERIOR, NA GRANDEZA QUE ME FEZ CAVALEIRO DO TURNO ${medium.turnoTrab}, PARTIREI NOS TRÊS REINOS DE MINHA NATUREZA COM – 0 –, E NA FORÇA UNIVERSAL DO MEU 5º, SEGUIREI SEMPRE COM ${medium.ninfa? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`;

    //Emissão do trino sardyos lua filho e componente do mesmo adjunto (exceto príncipes mayas)
    const mestreLuaSardyosFC = `EU, JAGUAR MESTRE LUA ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas? medium.falMiss === 6 ? 'MAGO FILHO DE DEVAS' : 'FILHO DE DEVAS' : ''}, DA FALANGE DE ${falMest}, POVO DE ${medium.povo}. ${termoFalangeJaguar}${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? termoPadrinhoArcanos : termoPadrinho}${medium.falMiss || medium.afilhado ? 'EU, ' : ''}${termoClassifLua}${termoSardyosLua}COM OS PODERES DE OBATALÁ, NA LINHA DESTE AMANHECER. TENHO O MEU DEUS E MINISTRO OLORUM QUE ME REGE E ME GUARDA NO CAMINHO DESTA JORNADA. ACABO DE RECEBER DE DEUS PAI TODO PODEROSO NA MINHA LEGIÃO, O TÍTULO DE MESTRE INSTRUTOR UNIVERSAL DAS TRÊS FORÇAS LIGADAS AOS PODERES DESTE AMANHECER. SUBI AOS MUNDOS ENCANTADOS, SENTI AS FORÇAS BRILHAREM EM NOSSOS CORAÇÕES. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. SOU UM CAVALEIRO VERDE, CAVALEIRO ESPECIAL, VENHO NA FORÇA DECRESCENTE DO ${termoCavaleiroLua} // REINO CENTRAL, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE ALIMENTAR O MEU SOL INTERIOR, NA GRANDEZA QUE ME FEZ CAVALEIRO DO TURNO ${medium.turnoTrab}, PARTIREI NOS TRÊS REINOS DE MINHA NATUREZA COM – 0 –, E NA FORÇA UNIVERSAL DO MEU 5º, SEGUIREI SEMPRE COM ${medium.ninfa? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`;

    //Emissão do príncipe maya lua trino sardyos filho e componente do mesmo adjunto
    const mestreLuaPrincipeSardyosFC = `EU, JAGUAR MESTRE LUA ${medium.recepcao? 'RECEPÇÃO' : ''}${medium.devas ? 'FILHO DE DEVAS' : ''}, DA FALANGE DE SUBLIMAÇÃO, POVO DE ${medium.povo}. ${medium.regente? 'REGENTE ' : ''}PRÍNCIPE MAYA DESTE AMANHECER, DO ADJUNTO ${medium.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}. NA REGÊNCIA DO MINISTRO YURICY. ${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000' || afilhado?.presidente === 'Presidente' ? `${afilhado?.classif === 'Adjunto Koatay 108 Herdeiro Triada Harpásios 7º Raio Adjuração Arcanos Rama 2000'? termoPadrinhoArcanos : termoPadrinho}${termoAfilhadoPrincipe}` : `${termoAfilhadoPrincipe}${termoPadrinho}`}EU, ${termoClassifLua}${termoSardyosLua}COM OS PODERES DE OBATALÁ, NA LINHA DESTE AMANHECER. TENHO O MEU DEUS E MINISTRO OLORUM QUE ME REGE E ME GUARDA NO CAMINHO DESTA JORNADA. ACABO DE RECEBER DE DEUS PAI TODO PODEROSO NA MINHA LEGIÃO, O TÍTULO DE MESTRE INSTRUTOR UNIVERSAL DAS TRÊS FORÇAS LIGADAS AOS PODERES DESTE AMANHECER. SUBI AOS MUNDOS ENCANTADOS, SENTI AS FORÇAS BRILHAREM EM NOSSOS CORAÇÕES. EMITE JESUS! DEIXE QUE AS FORÇAS SE DESLOQUEM ATÉ O MEU PLEXO. SOU UM CAVALEIRO VERDE, CAVALEIRO ESPECIAL, VENHO NA FORÇA DECRESCENTE DO ${termoCavaleiroLua} // REINO CENTRAL, TURNO ${medium.turnoLeg}, NA ESPERANÇA DE ALIMENTAR O MEU SOL INTERIOR, NA GRANDEZA QUE ME FEZ CAVALEIRO DO TURNO ${medium.turnoTrab}, PARTIREI NOS TRÊS REINOS DE MINHA NATUREZA COM – 0 –, E NA FORÇA UNIVERSAL DO MEU 5º, SEGUIREI SEMPRE COM ${medium.ninfa? '– 0 – 0 –' : '– 0 –'} // EM CRISTO JESUS.`;

    //Validações para escolher o tipo de emissão a ser usada
    if (medium.dtCenturia) {
        if (medium.sex.concat(medium.med) === 'MasculinoDoutrinador') {
            if (sardyosFC) {
                return mestreSolSardyosFC
            } else {
                return mestreSol
            }
        } else if (medium.sex.concat(medium.med) === 'MasculinoApará') {
            if (sardyosFC) {
                if (medium.falMiss === 7) {
                    return mestreLuaPrincipeSardyosFC
                } else {
                    return mestreLuaSardyosFC
                }
            } else {
                if (medium.falMiss === 7) {
                    return mestreLuaPrincipe
                } else {
                    return mestreLua
                }
            } 
        } else if (medium.sex.concat(medium.med) === 'FemininoDoutrinador') {
            return ninfaSol
        } else if (medium.sex.concat(medium.med) === 'FemininoApará') {
            return ninfaLua
        } else {
            return ''
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

export const emissaoMenorText = (menor: IMenor, ministros: Array<IMentor>, adjuntos: Array<IAdjunto>, templos: Array<ITemplo>, falMiss: Array<IFalange>) => {
    
    //INFORMAÇÕES PARA TODOS OS MÉDIUNS

    //Armazena o nome da falange missionária
    const falMissNome = falMiss.find((item: IFalange) => item.falange_id === menor.falMiss)?.nome;
    
    //Armazena o nome do Adjunto Devas, Barros ou Fróes
    const adjDevasNome = menor.adjDevas === 'Alufã' ? 'BARROS' : menor.adjDevas === 'Adejã' ? 'FRÓES' : '';

    //Armazena o objeto adjunto correspondente ao presidente do templo atual que o médium faz parte
    const presidente = adjuntos.find((item: IAdjunto) => item.adjunto_id === templos.find((item: ITemplo) => item.templo_id === menor.templo)?.presidente)

    //Armazena o nome do ministro do adjunto de origem
    const adjOrigemMin = ministros.find((min: IMentor) => min.id === presidente?.ministro)?.nome;

    //Armazena o nome do adjunto de origem
    const adjOrigemNome = presidente?.nome;
    
    // INFORMAÇÕES PARA TODAS AS NINFAS 

    //Retorna o termo da emissão correspondente à falange, após o povo
    const termoFalangeNinfa = menor.falMiss ? `${falMissNome} MISSIONÁRIA DO ADJUNTO ${menor.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}. ` : '';
    
    //Se a ninfa for Nityama Madruxa, retorna 'Nityama', caso contrário, retorna o nome da falange 
    const falMissNomeP = menor.falMiss === 2? 'Nityama' : menor.falMiss === 12? 'Ariana' : falMiss.find((item: IFalange) => item.falange_id === menor.falMiss)?.nome;

    //Armazena nome da primeira da falange
    const falMissPrimeira = falMiss.find((item: IFalange) => item.falange_id === menor.falMiss)?.primeira;
    
    //Armazena a classificação do adjunto de apoio da falange
    const falMissAdjMin = falMiss.find((item: IFalange) => item.falange_id === menor.falMiss)?.adjMin;
    
    //Armazena o nome do adjunto de apoio da falange
    const falMissAdjNome = falMiss.find((item: IFalange) => item.falange_id === menor.falMiss)?.adjNome;
    
    //Retorna o termo da primeira da falange
    const termoPrimeira = menor.falMiss? `NA ORDEM DA 1ª ${falMissNomeP} ${falMissPrimeira}${falMissAdjMin ? `, NA REGÊNCIA DO ${falMissAdjMin} KOATAY 108 MESTRE ${falMissAdjNome}. ` : '. '}` : '';

    //EMISSÕES

    //Emissão da ninfa não centuriã de falange missionária
    const ninfaMenor = `EU, NINFA SOL DA FALANGE DE SUBLIMAÇÃO, ${termoFalangeNinfa} NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. ${termoPrimeira}EU, ${menor.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`

    //Emissão do mago não elevado
    const magoMenor = `EU, MAGO MISSIONÁRIO DO ADJUNTO ${menor.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. EU, MESTRE ${menor.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`;

    //Emissão do príncipe maya não elevado
    const principeMenor = `EU, PRÍNCIPE MAYA DESTE AMANHECER, DO ADJUNTO ${menor.adjDevas} KOATAY 108 MESTRE ${adjDevasNome}, NA REGÊNCIA DO MINISTRO YURICY, NO ADJUNTO ${adjOrigemMin} KOATAY 108 MESTRE ${adjOrigemNome}. AFILHADO DE KOATAY 108 MINHA MÃE CLARIVIDENTE EM CRISTO JESUS. EU, ${menor.nomeEmissao}, PARTO COM – 0 – // EM CRISTO JESUS.`;

    //Validações para escolher o tipo de emissão a ser usada
    if (menor.falMiss === 1 || menor.falMiss === 2 || menor.falMiss === 4 || menor.falMiss === 5) {
        return ninfaMenor
    } else if (menor.falMiss === 6) {
        return magoMenor    
    } else if (menor.falMiss === 7) {
        return principeMenor
    } else {
        return ''
    }
}