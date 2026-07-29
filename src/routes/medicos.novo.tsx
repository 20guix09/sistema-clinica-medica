import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { especialidades } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/medicos/novo")({
  head: () => ({
    meta: [
      { title: "Novo médico — MediAgenda" },
      {
        name: "description",
        content:
          "Cadastre médicos com CRM, especialidade, dias e horários de atendimento e status de atividade.",
      },
      { property: "og:title", content: "Novo médico — MediAgenda" },
      {
        property: "og:description",
        content: "Formulário de cadastro e edição de profissionais da clínica.",
      },
    ],
  }),
  component: MedicoForm,
});

const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function MedicoForm() {
  const navigate = useNavigate();

  return (
    <AppShell title="Novo médico">
      <PageHeader
        title="Cadastro de médico"
        description="Informe os dados profissionais e a disponibilidade de atendimento."
      />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Médico salvo com sucesso!");
          navigate({ to: "/medicos" });
        }}
      >
        <section className="surface-card p-5 md:p-6">
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="size-16">
              <AvatarFallback className="bg-info-soft text-info">FT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Foto do profissional</p>
              <p className="text-xs text-muted-foreground">JPG ou PNG, até 2 MB.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => toast.info("Selecione um arquivo de imagem.")}
              >
                <Upload /> Enviar foto
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="mnome">
                Nome completo <span className="text-destructive">*</span>
              </Label>
              <Input id="mnome" placeholder="Ex.: Dra. Helena Vasconcelos" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcpf">
                CPF <span className="text-destructive">*</span>
              </Label>
              <Input id="mcpf" placeholder="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mcrm">
                CRM <span className="text-destructive">*</span>
              </Label>
              <Input id="mcrm" placeholder="000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="muf">Estado do CRM</Label>
              <Select>
                <SelectTrigger id="muf">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {["SP", "RJ", "MG", "PR", "RS", "BA"].map((uf) => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mesp">
                Especialidade <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger id="mesp">
                  <SelectValue placeholder="Selecionar" />
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
              <Label htmlFor="mtel">Telefone</Label>
              <Input id="mtel" placeholder="(00) 0000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memail">E-mail</Label>
              <Input id="memail" type="email" placeholder="medico@mediagenda.com" />
            </div>
          </div>
        </section>

        <section className="surface-card p-5 md:p-6">
          <h3 className="mb-4 text-sm font-semibold">Disponibilidade</h3>
          <div className="space-y-2">
            <Label>Dias de atendimento</Label>
            <div className="flex flex-wrap gap-3">
              {dias.map((d) => (
                <label
                  key={d}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                >
                  <Checkbox id={`dia-${d}`} />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hini">Horário inicial</Label>
              <Input id="hini" type="time" defaultValue="08:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hfim">Horário final</Label>
              <Input id="hfim" type="time" defaultValue="18:00" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium">Profissional ativo</p>
              <p className="text-xs text-muted-foreground">
                Médicos inativos não aparecem no agendamento.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" asChild>
            <Link to="/medicos">Cancelar</Link>
          </Button>
          <Button type="submit">Salvar médico</Button>
        </div>
      </form>
    </AppShell>
  );
}
