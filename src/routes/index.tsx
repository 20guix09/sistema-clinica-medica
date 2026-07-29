import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  CalendarClock,
  Users,
  Stethoscope,
  Plus,
  Eye,
  Pencil,
  Ban,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { NovaConsultaDialog } from "@/components/nova-consulta-dialog";
import { ConsultaDetalhesDialog } from "@/components/consulta-detalhes-dialog";
import { consultas, iniciais, type Consulta } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MediAgenda | Gestão de clínica médica" },
      {
        name: "description",
        content:
          "Acompanhe consultas do dia, pacientes cadastrados e médicos ativos da clínica em um painel claro e organizado.",
      },
      { property: "og:title", content: "Dashboard — MediAgenda" },
      {
        property: "og:description",
        content: "Resumo diário dos atendimentos, agenda e indicadores da clínica.",
      },
    ],
  }),
  component: Dashboard,
});

const cards = [
  {
    icon: CalendarCheck,
    titulo: "Consultas de hoje",
    valor: "18",
    nota: "+3 em relação a ontem",
    tone: "text-primary bg-primary-soft",
  },
  {
    icon: Users,
    titulo: "Pacientes cadastrados",
    valor: "1.284",
    nota: "42 novos neste mês",
    tone: "text-success bg-success-soft",
  },
  {
    icon: Stethoscope,
    titulo: "Médicos ativos",
    valor: "23",
    nota: "5 especialidades atendidas",
    tone: "text-info bg-info-soft",
  },
  {
    icon: CalendarClock,
    titulo: "Consultas pendentes",
    valor: "6",
    nota: "Aguardando confirmação",
    tone: "text-warning bg-warning-soft",
  },
];

const diasComConsulta = [3, 7, 12, 15, 18, 22, 29, 30];

function MiniCalendario() {
  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <section className="surface-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Julho de 2026</h3>
        <span className="text-xs text-muted-foreground">Dias com consultas</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={i} className="py-1">
            {d}
          </span>
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {dias.map((d) => {
          const marcado = diasComConsulta.includes(d);
          const hoje = d === 29;
          return (
            <span
              key={d}
              className={cn(
                "grid aspect-square place-items-center rounded-lg text-xs text-foreground",
                marcado && "bg-primary-soft font-semibold text-primary",
                hoje && "bg-primary font-semibold text-primary-foreground",
              )}
            >
              {d}
            </span>
          );
        })}
      </div>
      <div className="mt-5 rounded-lg bg-success-soft p-3">
        <p className="flex items-center gap-2 text-xs font-medium text-success">
          <TrendingUp className="size-4" /> Taxa de comparecimento
        </p>
        <p className="mt-1 text-2xl font-semibold text-success">92%</p>
        <p className="text-xs text-success/80">Últimos 30 dias</p>
      </div>
    </section>
  );
}

function Dashboard() {
  const [detalhe, setDetalhe] = useState<Consulta | null>(null);
  const hoje = consultas.filter((c) => c.data === "29/07/2026");

  return (
    <AppShell title="Dashboard">
      <div className="mb-6 grid gap-4 sm:flex sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Olá, Guilherme!</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Veja o resumo dos atendimentos de hoje.
          </p>
        </div>
        <NovaConsultaDialog
          trigger={
            <Button className="w-full sm:w-auto">
              <Plus /> Nova consulta
            </Button>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <article key={c.titulo} className="surface-card p-5">
            <div className={cn("grid size-10 place-items-center rounded-xl", c.tone)}>
              <c.icon className="size-5" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{c.titulo}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">{c.valor}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.nota}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="surface-card overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
            <h3 className="text-sm font-semibold">Consultas de hoje</h3>
            <span className="text-xs text-muted-foreground">{hoje.length} agendamentos</span>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hoje.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.hora}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary-soft text-xs font-semibold text-primary">
                            {iniciais(c.paciente)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{c.paciente}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.medico}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {c.especialidade}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Visualizar"
                          onClick={() => setDetalhe(c)}
                        >
                          <Eye />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Editar"
                          onClick={() => toast.success("Dados atualizados com sucesso.")}
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Cancelar"
                          className="text-destructive hover:bg-destructive-soft hover:text-destructive"
                          onClick={() => toast.error("Consulta cancelada.")}
                        >
                          <Ban />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="divide-y md:hidden">
            {hoje.map((c) => (
              <div key={c.id} className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{c.hora}</span>
                  <StatusBadge status={c.status} />
                </div>
                <p className="text-sm font-medium">{c.paciente}</p>
                <p className="text-xs text-muted-foreground">
                  {c.medico} · {c.especialidade}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => setDetalhe(c)}>
                    <Eye /> Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success("Dados atualizados com sucesso.")}
                  >
                    <Pencil /> Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MiniCalendario />
      </div>

      <ConsultaDetalhesDialog consulta={detalhe} onOpenChange={() => setDetalhe(null)} />
    </AppShell>
  );
}
