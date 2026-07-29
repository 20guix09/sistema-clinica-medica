import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { ConfirmDelete } from "@/components/confirm-delete";
import { pacientes, iniciais } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/pacientes/")({
  head: () => ({
    meta: [
      { title: "Pacientes — MediAgenda" },
      {
        name: "description",
        content:
          "Consulte, cadastre e edite os pacientes da clínica com busca por nome, CPF, telefone ou e-mail.",
      },
      { property: "og:title", content: "Pacientes — MediAgenda" },
      {
        property: "og:description",
        content: "Gerencie os pacientes cadastrados na clínica.",
      },
    ],
  }),
  component: PacientesPage,
});

function PacientesPage() {
  const [busca, setBusca] = useState("");
  const lista = pacientes.filter((p) =>
    [p.nome, p.cpf, p.telefone, p.email].join(" ").toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <AppShell title="Pacientes">
      <PageHeader
        title="Pacientes"
        description="Gerencie os pacientes cadastrados na clínica"
        action={
          <Button asChild className="w-full sm:w-auto">
            <Link to="/pacientes/novo">
              <Plus /> Novo paciente
            </Link>
          </Button>
        }
      />

      <div className="surface-card overflow-hidden">
        <div className="border-b p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar por nome, CPF, telefone ou e-mail"
              className="pl-9"
            />
          </div>
        </div>

        {lista.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nenhum paciente encontrado"
            description="Não localizamos pacientes com os dados informados. Ajuste a busca ou cadastre um novo paciente."
            actionLabel="Novo paciente"
            onAction={() => setBusca("")}
          />
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Nascimento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lista.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-primary-soft text-xs font-semibold text-primary">
                              {iniciais(p.nome)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{p.nome}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.cpf}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.telefone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {p.nascimento}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Visualizar"
                            onClick={() => toast.info(`Perfil de ${p.nome}`)}
                          >
                            <Eye />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Editar" asChild>
                            <Link to="/pacientes/novo">
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
                            title="Excluir paciente?"
                            description={`Esta ação removerá ${p.nome} e o histórico vinculado. Não é possível desfazer.`}
                            onConfirm={() => toast.success("Paciente excluído com sucesso.")}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="divide-y md:hidden">
              {lista.map((p) => (
                <div key={p.id} className="space-y-3 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback className="bg-primary-soft text-xs font-semibold text-primary">
                        {iniciais(p.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.nome}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.cpf}</p>
                    </div>
                  </div>
                  <div className="grid gap-1 text-xs text-muted-foreground">
                    <span className="truncate">{p.telefone}</span>
                    <span className="truncate">{p.email}</span>
                    <span>Nascimento: {p.nascimento}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link to="/pacientes/novo">
                        <Pencil /> Editar
                      </Link>
                    </Button>
                    <ConfirmDelete
                      trigger={
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-destructive hover:bg-destructive-soft hover:text-destructive"
                        >
                          <Trash2 /> Excluir
                        </Button>
                      }
                      title="Excluir paciente?"
                      description={`Esta ação removerá ${p.nome} e o histórico vinculado.`}
                      onConfirm={() => toast.success("Paciente excluído com sucesso.")}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                Mostrando {lista.length} de {pacientes.length} pacientes
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button size="sm" className="w-9">
                  1
                </Button>
                <Button variant="outline" size="sm" className="w-9">
                  2
                </Button>
                <Button variant="outline" size="sm" className="w-9">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Próxima
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
