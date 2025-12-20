import { Header, Heading, OptionsContainer, Group } from './TaskHeader.styles';

export const TaskHeader = () => {
  return (
    <Header>
      <Heading>
        <h2>Tarefas</h2>
        <p>Organize seu dia e alcance mais 📈</p>
      </Heading>

      <OptionsContainer>
        <Group>
          <label htmlFor="ordenar">Ordenar:</label>
          <select id="ordenar" name="ordenar">
            <option value="data">Data</option>
            <option value="prioridade">Prioridade</option>
            <option value="titulo">Título</option>
          </select>
        </Group>

        <Group>
          <label htmlFor="agrupar">Agrupar:</label>
          <select id="agrupar" name="agrupar">
            <option value="nenhum">Nenhum</option>
            <option value="tags">Tags</option>
            <option value="projetos">Projetos</option>
          </select>
        </Group>
      </OptionsContainer>
    </Header>
  );
};
