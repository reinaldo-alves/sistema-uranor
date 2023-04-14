import { createContext } from "react";

export const MediumContext = createContext({} as any);

export const MediumStore = ({ children }: any) => {
    const medium = [
        {id: '12', nome: 'Irene Souza', med: 'Doutrinador', templo: 'Jaboatão - PE', sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Afastado', foto: 'https://789d77d27f49a880d02e-714b7dc0b51e300a567fc89d2a0837e5.ssl.cf1.rackcdn.com/PaginaConteudo/depositphotos46976671xl-2015-copia.jpg'},
        {id: '65', nome: 'Marcos Ambrósio da Silva Gomes Ferreira', med: 'Doutrinador', templo: 'Jaboatão - PE', sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Ativo', foto: 'https://guiaavare.com/public/Noticias/3778/20121217024459bc2f826fefe2cf2620c4b4d83681059d.jpg'},
        {id: '14', nome: 'Laura Gonçalves', med: 'Apará', templo: 'Jaboatão - PE', sexo: 'Feminino', situacao: 'Emplacado', condicao: 'Entregou as Armas', foto: 'http://static1.squarespace.com/static/5c3e25923e2d0977a884f82c/5c3f4b9e010685e0e261593a/5c3f4e6a010685e0e261b6ea/1547652714741/IMG_1322.jpg?format=original'},
        {id: '18', nome: 'Gustavo Souza', med: 'Apará', templo: 'Jaboatão - PE', sexo: 'Masculino', situacao: 'Iniciado', condicao: 'Desencarnado', foto: 'https://www.ifpb.edu.br/sic/auditoria/3x4-augusto.jpg'},
        {id: '46', nome: 'Bárbara Pereira', med: 'Doutrinador', templo: 'Prazeres - PE', sexo: 'Feminino', situacao: 'Elevado', condicao: 'Ativo', foto: 'https://cf.shopee.com.br/file/653ab01fb044b2051638df7b5efd889d'},
        {id: '31', nome: 'Dionísio Ávila', med: 'Doutrinador', templo: 'Prazeres - PE', sexo: 'Masculino', situacao: 'Centurião', condicao: 'Afastado', foto: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2018/02/23/balbuena_na_tradicional_foto_3x4_do_elenco_e.jpg'},
        {id: '09', nome: 'Suzana Ávila', med: 'Apará', templo: 'Prazeres - PE', sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Desencarnado', foto: 'https://pbs.twimg.com/media/EX2rHNlWoAEv-KT.jpg'},
        {id: '17', nome: 'Bruno Silva', med: 'Apará', templo: 'São Lourenço da Mata - PE', sexo: 'Masculino', situacao: 'Emplacado', condicao: 'Entregou as Armas', foto: 'https://zipanuncios.com.br/images/2468415/1549458641201085.jpeg'},
        {id: '21', nome: 'Sofia Cavalcanti', med: 'Doutrinador', templo: 'Jaboatão - PE', sexo: 'Feminino', situacao: 'Iniciado', condicao: 'Entregou as Armas', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_jSFJdFmLAfD3FoCryVNSUAggLSt-AFOCOw&usqp=CAU'},
        {id: '69', nome: 'Eduardo Martins', med: 'Doutrinador', templo: 'Jaboatão - PE', sexo: 'Masculino', situacao: 'Elevado', condicao: 'Desencarnado', foto: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Ronaldo_Helal_3x4.jpg'},
        {id: '27', nome: 'Lara Rodrigues', med: 'Apará', templo: 'Jaboatão - PE', sexo: 'Feminino', situacao: 'Centurião', condicao: 'Ativo', foto: 'http://s.glbimg.com/jo/g1/f/original/2012/04/13/tereza_fotoboa_300_400.jpg'},
        {id: '48', nome: 'Rodrigo Azevedo', med: 'Apará', templo: 'Jaboatão - PE', sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Afastado', foto: 'https://www.meutimao.com.br/fotos-do-corinthians/w941/2018/10/10/mantuan_foto_3x4_camisa_i_m.jpg'},
        {id: '91', nome: 'Carolina Barbosa', med: 'Doutrinador', templo: 'Prazeres - PE', sexo: 'Feminino', situacao: 'Em Desenvolvimento', condicao: 'Desencarnado', foto: 'https://static1.tudosobremake.com.br/articles/7/26/7/@/1467-o-segredo-de-uma-boa-foto-3x4-esta-em-article_media_new_1-4.jpg'},
        {id: '81', nome: 'Felipe Castro', med: 'Doutrinador', templo: 'Prazeres - PE', sexo: 'Masculino', situacao: 'Elevado', condicao: 'Entregou as Armas', foto: 'https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3789888.jpg&fm=jpg'},
        {id: '15', nome: 'Luana Rocha', med: 'Apará', templo: 'Prazeres - PE', sexo: 'Feminino', situacao: 'Centurião', condicao: 'Afastado', foto: 'http://2.bp.blogspot.com/-zR-hDp8vxeA/VNFfAVj4XZI/AAAAAAAAh2s/ehDIfLBWmCQ/s1600/10968265_935551193136326_1104116575_n.jpg'},
        {id: '41', nome: 'Pablo Garcia', med: 'Apará', templo: 'Goiana - PE', sexo: 'Masculino', situacao: 'Centurião', condicao: 'Presente', foto: 'https://img.a.transfermarkt.technology/portrait/big/35639-1614006897.png?lm=1'},
        {id: '71', nome: 'Breno Cardoso', med: 'Apará', templo: 'São Lourenço da Mata - PE', sexo: 'Masculino', situacao: 'Centurião 7° Raio', condicao: 'Ativo', foto: 'https://cdn.meutimao.com.br/fotos-do-corinthians/w941/2021/03/05/marcio_bittencourt_foto_3x4_6zok.jpg'}
    ];

    return (
        <MediumContext.Provider value={{medium}} >
            { children }
        </MediumContext.Provider>
    )
}