import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";
import { Ban, CheckCircle2, ClipboardCheck, Pencil } from "lucide-react";
import type { Consulta } from "@/lib/mock-data";

export function ConsultaDetalhesDialog({
  consulta,
  onOpenChange,
}: {
  consulta: Consulta | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!consulta} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {consulta && (
          <>
            <DialogHeader>
              <DialogTitle>Detalhes da consulta</DialogTitle>
              <DialogDescription>
                Informações completas do atendimento agendado.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Paciente", consulta.paciente],
                ["Telefone", consulta.telefone],
                ["E-mail", consulta.email],
                ["Médico responsável", consulta.medico],
                ["Especialidade", consulta.especialidade],
                ["Tipo", consulta.tipo],
                ["Data", consulta.data],
                ["Horário", consulta.hora],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="truncate text-sm font-medium">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <div className="mt-1">
                  <StatusBadge status={consulta.status} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/60 p-3">
              <p className="text-xs text-muted-foreground">Observações</p>
              <p className="mt-1 text-sm">{consulta.observacoes}</p>
            </div>

            <DialogFooter className="flex-wrap gap-2 sm:justify-start">
              <Button variant="outline" onClick={() => toast.success("Consulta atualizada.")}>
                <Pencil /> Editar
              </Button>
              <Button variant="outline" onClick={() => toast.success("Consulta confirmada.")}>
                <CheckCircle2 /> Confirmar
              </Button>
              <Button variant="outline" onClick={() => toast.success("Atendimento finalizado.")}>
                <ClipboardCheck /> Finalizar
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:bg-destructive-soft hover:text-destructive"
                onClick={() => toast.error("Consulta cancelada.")}
              >
                <Ban /> Cancelar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
