### Padrões para Commits no GitHub

Ao fazer commits em um repositório do GitHub, é importante seguir um padrão consistente para facilitar a compreensão do histórico de alterações. Recomenda-se a utilização do padrão [Conventional Commits](https://www.conventionalcommits.org/) para padronizar as mensagens de commit.

O padrão Conventional Commits consiste em três partes principais: tipo, escopo e descrição. Aqui está um exemplo de formato de commit:

    <tipo>(<escopo>): <descrição>
    
    -> refac(directory): Reorganizar estrutura de pastas e arquivos

Segue uma descrição das partes do commit:

1. **Tipo**: Indica o propósito do commit. Alguns exemplos comuns são:

   - **feat**: para adicionar uma nova funcionalidade.
   - **fix**: para corrigir um bug.
   - **doc**: para alterações na documentação.
   - **refac**: para alterações no código que não adicionam novas funcionalidades ou corrigem bugs.
   - **chore**: para tarefas de manutenção, como atualizações de dependências.
   - **test**: Mudança em testes da aplicação
   - **style**: Ajustes na formatação do código
   - **perf**: Alteração de código que melhora o desempenho
   - **env**: Modificações em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers

2. **Escopo**: Indica a área do projeto afetada pela alteração. Por exemplo:

   Mais usado:

   - **APP**: Referente a todas as pastas do aplicativo ou dentro desse conjunto.
   - **SERVER**: Referente a todas as pastas do servidor ou dentro desse conjunto.

   Outros:

   - **auth**: para alterações relacionadas à autenticação.
   - **ui**: para alterações na interface do usuário.
   - **tests**: para alterações nos testes.
   - **directory**: para pastas e arquivos.
   - **models**: Mudança nas models
   - **views**: mudança nas views
   - **util**: mudança nas util
   - **settings**: mudança nas settings
   - **routes**: mudança nas routes
   - **dao**: mudança nas dao
   - **src**: mudança nas src "raiz do projeto, usar quando tiver muitas alterações"

3. **Descrição**: Uma descrição breve e concisa do que foi realizado no commit. Evite mensagens longas e detalhadas.

Exemplo de commit:

    feat(auth): Adicionar autenticação por token JWT

Adotar um padrão consistente para mensagens de commit ajuda a manter um histórico de alterações claro e organizado, facilitando a navegação e entendimento do projeto.

Além disso, recomenda-se dividir as alterações em commits pequenos, lógicos e coesos. Isso permite um melhor rastreamento das alterações e facilita a revisão e o entendimento das alterações realizadas.

Ao enviar pull requests para repositórios do git, siga as diretrizes estabelecidas pela equipe de desenvolvimento ou o projeto específico em que você está contribuindo.

Lembre-se de que essas são apenas diretrizes e podem ser adaptadas às necessidades do projeto e às práticas adotadas pela equipe de desenvolvimento.
