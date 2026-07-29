export type Status = "confirmada" | "pendente" | "cancelada" | "finalizada";

export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  nascimento: string;
}

export interface Medico {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
  ativo: boolean;
}

export interface Especialidade {
  id: string;
  nome: string;
  descricao: string;
  medicos: number;
  ativa: boolean;
}

export interface Consulta {
  id: string;
  data: string;
  hora: string;
  paciente: string;
  telefone: string;
  email: string;
  medico: string;
  especialidade: string;
  status: Status;
  tipo: string;
  observacoes: string;
}

export const pacientes: Paciente[] = [
  { id: "1", nome: "Ana Beatriz Moreira", cpf: "412.887.330-11", telefone: "(11) 98812-4471", email: "ana.moreira@email.com", nascimento: "14/03/1991" },
  { id: "2", nome: "Carlos Eduardo Lima", cpf: "223.556.891-02", telefone: "(11) 99640-2210", email: "carlos.lima@email.com", nascimento: "02/07/1978" },
  { id: "3", nome: "Fernanda Souza Rocha", cpf: "877.201.443-58", telefone: "(21) 98123-7745", email: "fer.rocha@email.com", nascimento: "28/11/1985" },
  { id: "4", nome: "João Pedro Andrade", cpf: "301.774.209-36", telefone: "(11) 97744-1180", email: "jp.andrade@email.com", nascimento: "09/01/2000" },
  { id: "5", nome: "Mariana Castro Dias", cpf: "590.118.762-44", telefone: "(31) 98876-3321", email: "mariana.dias@email.com", nascimento: "17/05/1996" },
  { id: "6", nome: "Roberto Nunes Filho", cpf: "144.902.377-19", telefone: "(11) 99012-8865", email: "roberto.nunes@email.com", nascimento: "23/09/1969" },
  { id: "7", nome: "Larissa Prado Gomes", cpf: "662.334.108-90", telefone: "(11) 98456-2093", email: "larissa.gomes@email.com", nascimento: "05/12/1988" },
  { id: "8", nome: "Thiago Martins Reis", cpf: "718.445.023-67", telefone: "(41) 99321-4407", email: "thiago.reis@email.com", nascimento: "30/06/1994" },
];

export const medicos: Medico[] = [
  { id: "1", nome: "Dra. Helena Vasconcelos", crm: "CRM/SP 128744", especialidade: "Cardiologia", telefone: "(11) 3320-8811", email: "helena.v@mediagenda.com", ativo: true },
  { id: "2", nome: "Dr. Marcelo Tavares", crm: "CRM/SP 093211", especialidade: "Ortopedia", telefone: "(11) 3320-8812", email: "marcelo.t@mediagenda.com", ativo: true },
  { id: "3", nome: "Dra. Patrícia Almeida", crm: "CRM/RJ 771043", especialidade: "Pediatria", telefone: "(21) 3320-8813", email: "patricia.a@mediagenda.com", ativo: true },
  { id: "4", nome: "Dr. Rafael Bittencourt", crm: "CRM/SP 445190", especialidade: "Dermatologia", telefone: "(11) 3320-8814", email: "rafael.b@mediagenda.com", ativo: false },
  { id: "5", nome: "Dr. Sérgio Monteiro", crm: "CRM/MG 220877", especialidade: "Clínica Geral", telefone: "(31) 3320-8815", email: "sergio.m@mediagenda.com", ativo: true },
];

export const especialidades: Especialidade[] = [
  { id: "1", nome: "Cardiologia", descricao: "Diagnóstico e tratamento de doenças do coração", medicos: 4, ativa: true },
  { id: "2", nome: "Pediatria", descricao: "Acompanhamento clínico de crianças e adolescentes", medicos: 6, ativa: true },
  { id: "3", nome: "Dermatologia", descricao: "Cuidados com pele, cabelos e unhas", medicos: 3, ativa: true },
  { id: "4", nome: "Clínica Geral", descricao: "Atendimento clínico e encaminhamentos", medicos: 8, ativa: true },
  { id: "5", nome: "Ortopedia", descricao: "Tratamento de ossos, músculos e articulações", medicos: 2, ativa: false },
];

export const consultas: Consulta[] = [
  { id: "1", data: "29/07/2026", hora: "08:00", paciente: "Ana Beatriz Moreira", telefone: "(11) 98812-4471", email: "ana.moreira@email.com", medico: "Dra. Helena Vasconcelos", especialidade: "Cardiologia", status: "confirmada", tipo: "Retorno", observacoes: "Paciente em acompanhamento de pressão arterial." },
  { id: "2", data: "29/07/2026", hora: "08:30", paciente: "Carlos Eduardo Lima", telefone: "(11) 99640-2210", email: "carlos.lima@email.com", medico: "Dr. Sérgio Monteiro", especialidade: "Clínica Geral", status: "pendente", tipo: "Primeira consulta", observacoes: "Encaminhado pelo convênio." },
  { id: "3", data: "29/07/2026", hora: "09:00", paciente: "Fernanda Souza Rocha", telefone: "(21) 98123-7745", email: "fer.rocha@email.com", medico: "Dra. Patrícia Almeida", especialidade: "Pediatria", status: "finalizada", tipo: "Retorno", observacoes: "Atendimento concluído às 09:35." },
  { id: "4", data: "29/07/2026", hora: "09:30", paciente: "João Pedro Andrade", telefone: "(11) 97744-1180", email: "jp.andrade@email.com", medico: "Dr. Marcelo Tavares", especialidade: "Ortopedia", status: "cancelada", tipo: "Exame", observacoes: "Cancelada pelo paciente." },
  { id: "5", data: "29/07/2026", hora: "10:00", paciente: "Mariana Castro Dias", telefone: "(31) 98876-3321", email: "mariana.dias@email.com", medico: "Dr. Rafael Bittencourt", especialidade: "Dermatologia", status: "confirmada", tipo: "Primeira consulta", observacoes: "Avaliação de manchas na pele." },
  { id: "6", data: "30/07/2026", hora: "11:00", paciente: "Larissa Prado Gomes", telefone: "(11) 98456-2093", email: "larissa.gomes@email.com", medico: "Dra. Helena Vasconcelos", especialidade: "Cardiologia", status: "pendente", tipo: "Exame", observacoes: "Solicitar eletrocardiograma." },
  { id: "7", data: "31/07/2026", hora: "14:30", paciente: "Thiago Martins Reis", telefone: "(41) 99321-4407", email: "thiago.reis@email.com", medico: "Dr. Sérgio Monteiro", especialidade: "Clínica Geral", status: "confirmada", tipo: "Retorno", observacoes: "Revisão de exames laboratoriais." },
];

export const horarios = [
  { hora: "08:00", livre: true },
  { hora: "08:30", livre: false },
  { hora: "09:00", livre: true },
  { hora: "09:30", livre: true },
  { hora: "10:00", livre: false },
  { hora: "10:30", livre: true },
  { hora: "11:00", livre: true },
  { hora: "14:00", livre: true },
  { hora: "14:30", livre: false },
  { hora: "15:00", livre: true },
];

export const iniciais = (nome: string) =>
  nome
    .replace(/^(Dra?\.)\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
