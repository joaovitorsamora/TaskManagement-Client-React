# ⚛️ Task Management Client (React + TypeScript)

Uma Single Page Application (SPA) reativa e responsiva desenvolvida para interagir com a API de Gerenciamento de Tarefas. O foco é na experiência do usuário, gerenciamento de estado assíncrono e tipagem segura.

## 🚀 Tecnologias e Ferramentas

* **Framework:** React 18
* **Linguagem:** TypeScript
* **Gerenciamento de Estado:** Context API
* **Estilização:** Styled-Component
* **Comunicação:** Fetch API

## ✨ Principais Funcionalidades

* **Interface Intuitiva:** Criação e listagem de tarefas com formulários validados.
* **Filtros e Busca:** Filtragem instantânea por prioridade (Alta, Média, Baixa), status (Concluída, Aberta) e nome do projeto.
* **Autenticação:** Gerenciamento do ciclo de vida de Login/Logout, utilizando o token JWT retornado pela API para proteger rotas.
* **UX:** Componentes reativos para edição e exclusão de tarefas em tempo real, sem a necessidade de recarregar a página.

## ⚙️ Arquitetura do Projeto

A aplicação é estruturada para escalabilidade, separando responsabilidades em:

1.  **`src/pages`**: Componentes de tela principal (Login, Detalhe da Tarefa).
2.  **`src/components`**: Componentes reutilizáveis (Formulários, Cards de Tarefa, Header).
3.  **`src/redux`**: Lógica de gerenciamento de estado e requisições assíncronas.
4.  **`src/services`**: Funções de comunicação direta com a API.

## 🔗 Link para o Backend

Este cliente foi desenvolvido para consumir a **Task Management API**:

* **Repositório do Backend:** [https://github.com/joaovitorsamora/TaskManagement-API-NETCore]

## 🛠 Como Rodar Localmente

1.  Certifique-se de que a API (`TaskManagement-API-NETCore`) esteja rodando.
2.  Clone este repositório: `git clone [URL]`
3.  Instale as dependências: `npm install`
4.  Crie um arquivo `.env` e configure a variável `REACT_APP_API_URL` apontando para o endereço da sua API.
5.  Inicie a aplicação: `npm run dev`
