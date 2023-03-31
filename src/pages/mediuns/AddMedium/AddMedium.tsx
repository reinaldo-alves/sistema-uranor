import { useContext } from "react";
import { TemploContext } from "src/contexts/TemploContext";
import { FieldContainer, InputContainer, MainContainer, PersonalCard, SectionTitle } from "./styles";

function AddMedium() {
    const { templos } = useContext(TemploContext);
    
    return (
        <MainContainer>
            <PersonalCard>
                <InputContainer>
                    <FieldContainer width="110px">
                        <label>ID: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>Nome do Médium: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer width="180px">
                        <label>Sexo: </label>
                        <select>
                            <option value={undefined}></option>
                            <option value={'Feminino'}>Feminino</option>
                            <option value={'Masculino'}>Masculino</option>
                        </select>
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer width="267px">
                        <label>Mediunidade: </label>
                        <select>
                            <option value={undefined}></option>
                            <option value={'Apará'}>Apará</option>
                            <option value={'Doutrinador'}>Doutrinador</option>
                        </select>
                    </FieldContainer>
                    <FieldContainer>
                        <label>Templo: </label>
                        <select>
                            <option value={undefined}></option>
                            {templos.map((item: string) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </FieldContainer>
                    <FieldContainer width="340px">
                        <label>Condição Atual: </label>
                        <select>
                            <option value={'Ativo'}>Ativo</option>
                            <option value={'Afastado'}>Afastado</option>
                            <option value={'Entregou as Armas'}>Entregou as Armas</option>
                            <option value={'Feminino'}>Desencarnado</option>
                        </select>
                    </FieldContainer>
                </InputContainer>
            </PersonalCard>
            <PersonalCard>
                <SectionTitle>Dados Pessoais</SectionTitle>
                <InputContainer>
                    <FieldContainer width="330px">
                        <label>Data de Nascimento: </label>
                        <input type="date" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>RG: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>CPF: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Mãe: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer>
                        <label>Pai: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
                <InputContainer>
                    <FieldContainer>
                        <label>Natural de: </label>
                        <input type="text" />
                    </FieldContainer>
                    <FieldContainer width="270px">
                        <label>Estado Civil: </label>
                        <select>
                            <option value={undefined}></option>
                            <option value={'Casado'}>Casado</option>
                            <option value={'Divorciado'}>Divorciado</option>
                            <option value={'Solteiro'}>Solteiro</option>
                            <option value={'Separado'}>Separado</option>
                            <option value={'União Estável'}>União Estável</option>
                            <option value={'Viúvo'}>Viúvo</option>
                        </select>
                    </FieldContainer>
                    <FieldContainer>
                        <label>Cônjuge: </label>
                        <input type="text" />
                    </FieldContainer>
                </InputContainer>
            </PersonalCard>
        </MainContainer>
    )
}

export default AddMedium