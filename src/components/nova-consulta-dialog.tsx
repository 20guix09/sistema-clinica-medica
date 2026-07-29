import { useState, type ReactNode } from "react";
import { Calendar as CalendarIcon, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { especialidades, horarios, medicos, pacientes } from "@/lib/mock-data";

export function NovaConsultaDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [paciente, setPaciente] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [medico, setMedico] = useState("");
  const [data, setData] = useState("2026-07-30");
  const [hora, setHora] = useState("");

  const resumo = [
    { label: "Paciente", value: paciente || "—" },
    { label: "Médico", value: medico || "—" },
    { label: "Especialidade", value: especialidade || "—" },
    { label: "Data", value: data ? data.split("-").reverse().join("/") : "—" },
    { label: "Horário", value: hora || "—" },
  ];

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Nova consulta</DialogTitle>
            <DialogDescription>
              Selecione o paciente, o profissional e o melhor horário disponível.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Paciente *</Label>
                  <Select value={paciente} onValueChange={setPaciente}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {pacientes.map((p) => (
                        <SelectItem key={p.id} value={p.nome}>
                          {p.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Especialidade *</Label>
                  <Select value={especialidade} onValueChange={setEspecialidade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {especialidades.map((e) => (
                        <SelectItem key={e.id} value={e.nome}>
                          {e.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Médico *</Label>
                  <Select value={medico} onValueChange={setMedico}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar médico" />
                    </SelectTrigger>
                    <SelectContent>
                      {medicos.map((m) => (
                        <SelectItem key={m.id} value={m.nome}>
                          {m.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-consulta">Data *</Label>
                  <Input
                    id="data-consulta"
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de consulta</Label>
                  <Select defaultValue="Primeira consulta">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primeira consulta">Primeira consulta</SelectItem>
                      <SelectItem value="Retorno">Retorno</SelectItem>
                      <SelectItem value="Exame">Exame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status inicial</Label>
                  <Select defaultValue="pendente">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="confirmada">Confirmada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Horários disponíveis *</Label>
                <div className="flex flex-wrap gap-2">
                  {horarios.map((h) => (
                    <button
                      key={h.hora}
                      type="button"
                      disabled={!h.livre}
                      onClick={() => setHora(h.hora)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                        !h.livre && "cursor-not-allowed bg-muted text-muted-foreground opacity-60",
                        h.livre && hora === h.hora
                          ? "border-primary bg-primary text-primary-foreground"
                          : h.livre && "hover:border-primary hover:bg-primary-soft",
                      )}
                    >
                      {h.hora}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Horários esmaecidos já estão ocupados na agenda do profissional.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="obs">Observações</Label>
                <Textarea id="obs" rows={3} placeholder="Informações adicionais do atendimento" />
              </div>
            </div>

            <aside className="h-fit rounded-xl border bg-muted/50 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CalendarIcon className="size-4 text-primary" /> Resumo
              </p>
              <dl className="mt-4 space-y-3">
                {resumo.map((r) => (
                  <div key={r.label}>
                    <dt className="text-xs text-muted-foreground">{r.label}</dt>
                    <dd className="text-sm font-medium">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X /> Cancelar
            </Button>
            <Button
              onClick={() => {
                if (!paciente || !medico || !hora) {
                  toast.error("Preencha os campos obrigatórios para agendar.");
                  return;
                }
                setOpen(false);
                toast.success("Consulta agendada com sucesso!");
              }}
            >
              <Check /> Confirmar agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
