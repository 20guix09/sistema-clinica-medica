import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { especialidades } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/especialidades")({
  head: () => ({
    meta: [
      { title: "Especialidades — MediAgenda" },
      {
        name: "description",
        content:
          "Cadastre e organize as especialidades atendidas pela clínica e acompanhe os médicos vinculados.",
      },
      { property: "og:title", content: "Especialidades — MediAgenda" },
      {
        property: "og:description",
        content: "Gestão das especialidades médicas da clínica.",
      },
    ],
  }),
  component: EspecialidadesPage,
});

function EspecialidadesPage() {
  const [busca, setBusca] = useState("");
  const [open, setOpen] = useState(false);
  const lista = especialidades.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <AppShell title="Especialidades">
      <PageHeader
        title="Especialidades"
        description="Organize as áreas de atendimento oferecidas pela clínica"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus /> Nova especialidade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova especialidade</DialogTitle>
                <DialogDescription>
                  Informe o nome e uma breve descrição da área de atendimento.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="enome">
                    Nome <span className="text-destructive">*</span>
                  </Label>
                  <Input id="enome" placeholder="Ex.: Neurologia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edesc">Descrição</Label>
                  <Textarea id="edesc" rows={3} placeholder="Resumo da especialidade" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    toast.success("Especialidade cadastrada com sucesso!");
                  }}
                >
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="surface-card overflow-hidden">
        <div className="border-b p-4">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar especialidade"
              className="pl-9"
            />
          </div>
        </div>

        {lista.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="Nenhuma especialidade encontrada"
            description="Cadastre as áreas de atendimento para vincular médicos e consultas."
            actionLabel="Limpar busca"
            onAction={() => setBusca("")}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Especialidade</TableHead>
                  <TableHead className="min-w-[240px]">Descrição</TableHead>
                  <TableHead>Médicos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lista.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="text-sm font-medium">{e.nome}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.descricao}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.medicos}</TableCell>
                    <TableCell>
                      <ActiveBadge ativo={e.ativa} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Editar"
                          onClick={() => toast.success("Dados atualizados com sucesso.")}
                        >
                          <Pencil />
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
                          title="Excluir especialidade?"
                          description={`${e.nome} será removida e desvinculada dos médicos.`}
                          onConfirm={() => toast.success("Especialidade excluída.")}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
