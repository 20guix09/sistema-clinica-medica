# MediCare Connect

Crie o design completo de um sistema web responsivo chamado MediAgenda, desenvolvido para o gerenciamento de uma clínica médica.

O objetivo do sistema é permitir que funcionários da clínica organizem pacientes, médicos, especialidades e agendamentos de consultas de maneira simples, rápida e profissional.

O design deve ser moderno, limpo, acessível e transmitir confiança, organização e cuidado com a saúde.

Estilo visual

Utilize uma identidade visual profissional para a área da saúde:

Cor principal: azul médio ou azul-petróleo.

Cor secundária: verde suave.

Fundo geral: cinza muito claro ou branco.

Cards brancos com sombras discretas.

Bordas arredondadas entre 8px e 12px.

Ícones minimalistas e modernos.

Tipografia limpa, como Inter, Poppins ou Roboto.

Interface clara, sem excesso de elementos.

Bom contraste entre textos, fundos e botões.

Layout responsivo para desktop, tablet e celular.

A interface deve lembrar sistemas modernos de gestão médica, mas sem copiar nenhuma plataforma existente.

Estrutura geral do sistema

Crie uma aplicação com menu lateral fixo no desktop e menu recolhível no celular.

O menu lateral deve conter:

Logo MediAgenda.

Dashboard.

Pacientes.

Médicos.

Consultas.

Especialidades.

Sair.

No topo da aplicação, inclua:

Título da página atual.

Campo de pesquisa.

Ícone de notificações.

Foto ou avatar do usuário.

Nome do usuário logado.

Função do usuário, como “Administrador” ou “Recepcionista”.

Tela 1 — Login

Crie uma tela de login profissional e centralizada.

Elementos:

Logo MediAgenda.

Título “Acesse sua conta”.

Texto: “Entre para gerenciar os atendimentos da clínica”.

Campo de e-mail.

Campo de senha.

Ícone para mostrar ou ocultar senha.

Checkbox “Lembrar de mim”.

Link “Esqueci minha senha”.

Botão principal “Entrar”.

Mensagem de erro abaixo dos campos quando os dados forem inválidos.

Ilustração relacionada à saúde ou atendimento médico em um dos lados no desktop.

No celular, exiba somente o formulário, ocupando praticamente toda a largura da tela.

Tela 2 — Dashboard

Crie um dashboard administrativo com visão geral da clínica.

Na parte superior, adicione uma saudação:

“Olá, Guilherme! Veja o resumo dos atendimentos de hoje.”

Crie quatro cards de informações:

Consultas de hoje.

Pacientes cadastrados.

Médicos ativos.

Consultas pendentes.

Cada card deve conter:

Ícone.

Título.

Número em destaque.

Pequena informação comparativa ou descritiva.

Abaixo dos cards, crie a seção “Consultas de hoje”.

Exiba uma tabela com:

Horário.

Paciente.

Médico.

Especialidade.

Status.

Ações.

Use status visuais:

Confirmada: verde.

Pendente: amarelo.

Cancelada: vermelho.

Finalizada: azul ou cinza.

As ações podem conter botões ou ícones para:

Visualizar.

Editar.

Cancelar.

Inclua também um botão principal “Nova consulta”.

Adicione ao lado ou abaixo um pequeno calendário mensal, destacando os dias com consultas.

Tela 3 — Lista de pacientes

Crie uma página chamada “Pacientes”.

No topo, inclua:

Título “Pacientes”.

Texto de apoio: “Gerencie os pacientes cadastrados na clínica”.

Campo de pesquisa por nome, CPF, telefone ou e-mail.

Botão “Novo paciente”.

Exiba os pacientes em uma tabela com:

Foto ou avatar.

Nome completo.

CPF.

Telefone.

E-mail.

Data de nascimento.

Ações.

Ações:

Visualizar.

Editar.

Excluir.

Inclua paginação na parte inferior da tabela.

No celular, transforme a tabela em cards individuais.

Tela 4 — Cadastro e edição de paciente

Crie um formulário dividido em seções.

Seção “Dados pessoais”:

Nome completo.

CPF.

Data de nascimento.

Sexo.

Telefone.

E-mail.

Seção “Endereço”:

CEP.

Rua.

Número.

Complemento.

Bairro.

Cidade.

Estado.

O campo de CEP deve ter indicação visual de preenchimento automático utilizando uma API externa de CEP.

Inclua:

Botão “Cancelar”.

Botão principal “Salvar paciente”.

Mensagens de validação abaixo dos campos obrigatórios.

Indicação dos campos obrigatórios com asterisco.

Tela 5 — Lista de médicos

Crie uma página chamada “Médicos”.

No topo, inclua:

Título “Médicos”.

Campo de pesquisa.

Filtro por especialidade.

Filtro por status.

Botão “Novo médico”.

Exiba uma tabela ou cards com:

Foto do médico.

Nome.

CRM.

Especialidade.

Telefone.

E-mail.

Status ativo ou inativo.

Ações.

Ações:

Visualizar.

Editar.

Desativar.

Excluir.

Tela 6 — Cadastro e edição de médico

Crie um formulário com:

Nome completo.

CPF.

CRM.

Estado do CRM.

Especialidade.

Telefone.

E-mail.

Dias de atendimento.

Horário inicial.

Horário final.

Status ativo ou inativo.

Foto do profissional.

Inclua botões “Cancelar” e “Salvar médico”.

Tela 7 — Lista de especialidades

Crie uma página simples chamada “Especialidades”.

Elementos:

Título.

Texto de apoio.

Campo de pesquisa.

Botão “Nova especialidade”.

Exiba uma tabela contendo:

Nome da especialidade.

Descrição.

Quantidade de médicos vinculados.

Status.

Ações de editar e excluir.

Exemplos de especialidades:

Cardiologia.

Pediatria.

Dermatologia.

Clínica Geral.

Ortopedia.

Tela 8 — Agendamento de consulta

Crie uma tela ou modal grande chamado “Nova consulta”.

O formulário deve conter:

Selecionar paciente.

Selecionar especialidade.

Selecionar médico.

Escolher data.

Escolher horário disponível.

Tipo de consulta.

Observações.

Status inicial da consulta.

Após selecionar o médico e a data, exiba horários disponíveis em botões, como:

08:00.

08:30.

09:00.

09:30.

10:00.

Horários indisponíveis devem aparecer desativados.

Inclua um resumo lateral ou inferior com:

Nome do paciente.

Médico selecionado.

Especialidade.

Data.

Horário.

Botões:

Cancelar.

Confirmar agendamento.

Tela 9 — Lista de consultas

Crie uma página chamada “Consultas”.

Inclua:

Campo de pesquisa.

Filtro por data.

Filtro por médico.

Filtro por especialidade.

Filtro por status.

Botão “Nova consulta”.

Exiba uma tabela com:

Data.

Horário.

Paciente.

Médico.

Especialidade.

Status.

Ações.

Permita visualizar, editar, confirmar, finalizar ou cancelar uma consulta.

Inclua também uma opção para alternar entre:

Visualização em tabela.

Visualização em calendário.

Tela 10 — Detalhes da consulta

Crie uma tela ou modal com os detalhes completos da consulta:

Nome do paciente.

Telefone.

E-mail.

Médico responsável.

Especialidade.

Data.

Horário.

Status.

Observações.

Adicione botões para:

Editar consulta.

Confirmar consulta.

Finalizar atendimento.

Cancelar consulta.

Componentes e estados importantes

Crie também os seguintes componentes reutilizáveis:

Menu lateral.

Cabeçalho.

Botões primários e secundários.

Campos de formulário.

Selects.

Modais.

Tabelas.

Cards.

Avatares.

Badges de status.

Alertas de sucesso.

Alertas de erro.

Confirmação de exclusão.

Loading.

Estado vazio.

Paginação.

Crie um estado vazio para páginas sem dados, com uma ilustração e mensagens como:

“Nenhum paciente cadastrado.”

“Nenhuma consulta encontrada.”

Adicione botões de ação nesses estados vazios.

Experiência do usuário

A navegação deve ser simples e intuitiva.

Os botões principais devem ficar bem visíveis.

A interface deve fornecer feedback visual para ações como:

Cadastro realizado com sucesso.

Consulta agendada com sucesso.

Dados atualizados.

Exclusão confirmada.

Erro ao carregar dados.

Campos obrigatórios não preenchidos.

Crie confirmações antes de excluir pacientes, médicos, especialidades ou consultas.

Responsividade

Crie versões para:

Desktop em 1440px.

Tablet em 768px.

Celular em 390px.

No celular:

O menu lateral deve virar um menu hambúrguer.

As tabelas devem se transformar em cards ou permitir rolagem horizontal.

Os botões devem ocupar uma largura confortável.

Os formulários devem utilizar uma coluna.

Os cards do dashboard devem aparecer um abaixo do outro.

Organização no Figma

Organize o arquivo com as seguintes páginas:

Design System.

Login.

Dashboard.

Pacientes.

Médicos.

Especialidades.

Consultas.

Componentes.

Versão mobile.

Crie componentes reutilizáveis e use Auto Layout.

Utilize espaçamento consistente baseado em múltiplos de 8px.

O resultado deve parecer um sistema real, profissional e pronto para ser transformado em frontend utilizando HTML, CSS, JavaScript e Bootstrap, conectado posteriormente a um backend com banco de dados e autenticação JWT.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://clinic-care-hub-24.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0c8515f4-9d64-4d00-9248-17d594f32841).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
