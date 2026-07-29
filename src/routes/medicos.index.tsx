import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Pencil, Plus, PowerOff, Search, Stethoscope, Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { ActiveBadge } from "@/components/status-badge";
import { ConfirmDelete } from "@/components/confirm-delete";
import { EmptyState } from "@/components/empty-state";
import { medicos, especialidades, iniciais } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/medicos/")({
  head: () => ({
    meta: [
      { title: "Médicos — MediAgenda" },
      {
        name: "description",
        content:
          "Gerencie o corpo clínico: CRM, especialidade, contatos e status de cada profissional da clínica.",
      },
      { property: "og:title", content: "Médicos — MediAgenda" },
      {
        property: "og:description",
        content: "Cadastro e gestão dos profissionais de saúde da clínica.",
      },
    ],
  }),
  component: MedicosPage,
});

function MedicosPage() {
  const [busca, setBusca] = useState("");
  const [esp, setEsp] = useState("todas");
  const [status, setStatus] = useState("todos");

  const lista = medicos.filter((m) => {
    const matchBusca = [m.nome, m.crm, m.email]
      .join(" ")
      .toLowerCase()
      .includes(busca.toLowerCase());
    const matchEsp = esp === "todas" || m.especialidade === esp;
    const matchStatus =
      status === "todos" || (status === "ativos" ? m.ativo : !m.ativo);
    return matchBusca && matchEsp && matchStatus;
  });

  return (
    <AppShell title="Médicos">
      <PageHeader
        title="Médicos"
        description="Gerencie os profissionais que atendem na clínica"
        action={
          <Button asChild className="w-full sm:w-auto">
            <Link to="/medicos/novo">
              <Plus /> Novo médico
            </Link>
          </Button>
        }
      />

      <div className="surface-card overflow-hidden">
        <div className="grid gap-3 border-b p-4 md:grid-cols-[minmax(0,1fr)_180px_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar por nome, CRM ou e-mail"
              className="pl-9"
            />
          </div>
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
              <SelectItem value="ativos">Ativos</SelectItem>
              <SelectItem value="inativos">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {lista.length === 0 ? (
          <EmptyState
            icon={Stethoscope}
            title="Nenhum médico encontrado"
            description="Nenhum profissional corresponde aos filtros aplicados."
            actionLabel="Limpar filtros"
            onAction={() => {
              setBusca("");
              setEsp("todas");
              setStatus("todos");
            }}
          />
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Médico</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead>Especialidade</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lista.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-info-soft text-xs font-semibold text-info">
                              {iniciais(m.nome)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{m.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.crm}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {m.especialidade}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.telefone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.email}</TableCell>
                      <TableCell>
                        <ActiveBadge ativo={m.ativo} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Visualizar"
                            onClick={() => toast.info(`Perfil de ${m.nome}`)}
                          >
                            <Eye />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Editar" asChild>
                            <Link to="/medicos/novo">
                              <Pencil />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Desativar"
                            onClick={() => toast.success("Status do médico atualizado.")}
                          >
                            <PowerOff />
                          </Button>
                          <ConfirmDelete
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Excluir"
                                className="text-destructive hover:bg-destructive-soft hover:text-destructive"
                              >
                                <Trash2 />
                              </Button>
                            }
                            title="Excluir médico?"
                            description={`${m.nome} será removido do sistema junto às suas agendas futuras.`}
                            onConfirm={() => toast.success("Médico excluído com sucesso.")}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:hidden">
              {lista.map((m) => (
                <article key={m.id} className="rounded-xl border p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-11 shrink-0">
                      <AvatarFallback className="bg-info-soft text-sm font-semibold text-info">
                        {iniciais(m.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{m.nome}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.especialidade}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-1 text-xs text-muted-foreground">
                    <span>{m.crm}</span>
                    <span className="truncate">{m.telefone}</span>
                    <span className="truncate">{m.email}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <ActiveBadge ativo={m.ativo} />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" aria-label="Editar" asChild>
                        <Link to="/medicos/novo">
                          <Pencil />
                        </Link>
                      </Button>
                      <ConfirmDelete
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Excluir"
                            className="text-destructive hover:bg-destructive-soft hover:text-destructive"
                          >
                            <Trash2 />
                          </Button>
                        }
                        title="Excluir médico?"
                        description={`${m.nome} será removido do sistema.`}
                        onConfirm={() => toast.success("Médico excluído com sucesso.")}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
