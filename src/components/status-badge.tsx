import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Status } from "@/lib/mock-data";

const map: Record<Status, { label: string; className: string }> = {
  confirmada: { label: "Confirmada", className: "bg-success-soft text-success border-success/20" },
  pendente: { label: "Pendente", className: "bg-warning-soft text-warning border-warning/25" },
  cancelada: {
    label: "Cancelada",
    className: "bg-destructive-soft text-destructive border-destructive/20",
  },
  finalizada: { label: "Finalizada", className: "bg-info-soft text-info border-info/20" },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = map[status];
  return (
    <Badge variant="outline" className={cn("gap-1.5 rounded-full font-medium", s.className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {s.label}
    </Badge>
  );
}

export function ActiveBadge({ ativo }: { ativo: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full font-medium",
        ativo
          ? "bg-success-soft text-success border-success/20"
          : "bg-muted text-muted-foreground border-border",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {ativo ? "Ativo" : "Inativo"}
    </Badge>
  );
}
