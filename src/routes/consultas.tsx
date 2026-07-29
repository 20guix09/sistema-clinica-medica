import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  LayoutList,
  Pencil,
  Plus,
  Search,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { NovaConsultaDialog } from "@/components/nova-consulta-dialog";
import { ConsultaDetalhesDialog } from "@/components/consulta-detalhes-dialog";
import { consultas, especialidades, medicos, type Consulta } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/consultas")({
  head: () => ({
    meta: [
      { title: "Consultas — MediAgenda" },
      {
        name: "description",
        content:
          "Acompanhe todas as consultas da clínica em tabela ou calendário, com filtros por data, médico, especialidade e status.",
      },
      { property: "og:title", content: "Consultas — MediAgenda" },
      {
        property: "og:description",
        content: "Agenda completa de consultas da clínica com filtros e ações rápidas.",
      },
    ],
  }),
  component: ConsultasPage,
});

function ConsultasPage() {
  const [busca, setBusca] = useState("");
  const [medico, setMedico] = useState("todos");
  const [esp, setEsp] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [data, setData] = useState("");
  const [view, setView] = useState<"tabela" | "calendario">("tabela");
  const [detalhe, setDetalhe] = useState<Consulta | null>(null);

  const lista = consultas.filter((c) => {
    const b = [c.paciente, c.medico, c.especialidade].join(" ").toLowerCase();
    return (
      b.includes(busca.toLowerCase()) &&
      (medico === "todos" || c.medico === medico) &&
      (esp === "todas" || c.especialidade === esp) &&
      (status === "todos" || c.status === status) &&
      (!data || c.data === data.split("-").reverse().join("/"))
    );
  });

  const datas = Array.from(new Set(lista.map((c) => c.data)));

  return (
    <AppShell title="Consultas">
      <PageHeader
        title="Consultas"
        description="Acompanhe e organize todos os agendamentos da clínica"
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="inline-flex rounded-lg border p-1">
              <button
                onClick={() => setView("tabela")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  view === "tabela"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutList className="size-4" /> Tabela
              </button>
              <button
                onClick={() => setView("calendario")}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  view === "calendario"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <CalendarDays className="size-4" /> Calendário
              </button>
            </div>
            <NovaConsultaDialog
              trigger={
                <Button className="w-full sm:w-auto">
                  <Plus /> Nova consulta
                </Button>
              }
            />
          </div>
        }
      />

      <div className="surface-card overflow-hidden">
        <div className="grid gap-3 border-b p-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="relative xl:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar"
              className="pl-9"
            />
          </div>
          <Input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            aria-label="Filtrar por data"
          />
          <Select value={medico} onValueChange={setMedico}>
            <SelectTrigger aria-label="Filtrar por médico">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os médicos</SelectItem>
              {medicos.map((m) => (
                <SelectItem key={m.id} value={m.nome}>
                  {m.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={esp} onValueChange={setEsp}>
            <SelectTrigger aria-label="Filtrar por especialidade">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas especialidades</SelectItem>
              {especialidades.map((e) => (
                <SelectItem key={e.id} value={e.nome}>
                  {e.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label="Filtrar por status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
              <SelectItem value="finalizada">Finalizada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {lista.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="Nenhuma consulta encontrada"
            description="Ajuste os filtros ou crie um novo agendamento para a clínica."
            actionLabel="Limpar filtros"
            onAction={() => {
              setBusca("");
              setMedico("todos");
              setEsp("todas");
              setStatus("todos");
              setData("");
            }}
          />
        ) : view === "tabela" ? (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lista.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="text-sm font-medium">{c.data}</TableCell>
                      <TableCell className="text-sm">{c.hora}</TableCell>
                      <TableCell className="text-sm font-medium">{c.paciente}</TableCell>
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
                            aria-label="Confirmar"
                            onClick={() => toast.success("Consulta confirmada.")}
                          >
                            <CheckCircle2 />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Finalizar"
                            onClick={() => toast.success("Atendimento finalizado.")}
                          >
                            <ClipboardCheck />
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

            <div className="divide-y lg:hidden">
              {lista.map((c) => (
                <div key={c.id} className="space-y-2 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">
                      {c.data} · {c.hora}
                    </span>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-sm font-medium">{c.paciente}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.medico} · {c.especialidade}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => setDetalhe(c)}
                  >
                    <Eye /> Ver detalhes
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {datas.map((d) => (
              <section key={d} className="rounded-xl border p-4">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="size-4 text-primary" /> {d}
                </p>
                <div className="mt-3 space-y-2">
                  {lista
                    .filter((c) => c.data === d)
                    .map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setDetalhe(c)}
                        className="w-full rounded-lg bg-muted/60 p-3 text-left transition-colors hover:bg-primary-soft"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold">{c.hora}</span>
                          <StatusBadge status={c.status} />
                        </div>
                        <p className="mt-1 truncate text-sm font-medium">{c.paciente}</p>
                        <p className="truncate text-xs text-muted-foreground">{c.medico}</p>
                      </button>
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <ConsultaDetalhesDialog consulta={detalhe} onOpenChange={() => setDetalhe(null)} />
    </AppShell>
  );
}
