import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, MapPin, User } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/pacientes/novo")({
  head: () => ({
    meta: [
      { title: "Novo paciente — MediAgenda" },
      {
        name: "description",
        content:
          "Cadastre ou edite os dados pessoais e o endereço do paciente com preenchimento automático de CEP.",
      },
      { property: "og:title", content: "Novo paciente — MediAgenda" },
      {
        property: "og:description",
        content: "Formulário de cadastro e edição de pacientes da clínica.",
      },
    ],
  }),
  component: PacienteForm,
});

function Campo({
  id,
  label,
  required,
  erro,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {erro && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5" /> {erro}
        </p>
      )}
    </div>
  );
}

function PacienteForm() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [erros, setErros] = useState<Record<string, string>>({});
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cepOk, setCepOk] = useState(false);

  return (
    <AppShell title="Novo paciente">
      <PageHeader
        title="Cadastro de paciente"
        description="Preencha os dados do paciente. Campos com * são obrigatórios."
      />

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!nome.trim()) {
            setErros({ nome: "Informe o nome completo do paciente." });
            toast.error("Campos obrigatórios não preenchidos.");
            return;
          }
          setErros({});
          toast.success("Cadastro realizado com sucesso!");
          navigate({ to: "/pacientes" });
        }}
      >
        <section className="surface-card p-5 md:p-6">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
              <User className="size-4.5" />
            </div>
            <h3 className="text-sm font-semibold">Dados pessoais</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Campo id="nome" label="Nome completo" required erro={erros.nome}>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex.: Ana Beatriz Moreira"
                />
              </Campo>
            </div>
            <Campo id="cpf" label="CPF" required>
              <Input id="cpf" placeholder="000.000.000-00" />
            </Campo>
            <Campo id="nascimento" label="Data de nascimento" required>
              <Input id="nascimento" type="date" />
            </Campo>
            <Campo id="sexo" label="Sexo">
              <Select>
                <SelectTrigger id="sexo">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="f">Feminino</SelectItem>
                  <SelectItem value="m">Masculino</SelectItem>
                  <SelectItem value="o">Outro</SelectItem>
                </SelectContent>
              </Select>
            </Campo>
            <Campo id="telefone" label="Telefone" required>
              <Input id="telefone" placeholder="(00) 00000-0000" />
            </Campo>
            <div className="md:col-span-2">
              <Campo id="email" label="E-mail">
                <Input id="email" type="email" placeholder="paciente@email.com" />
              </Campo>
            </div>
          </div>
        </section>

        <section className="surface-card p-5 md:p-6">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-success-soft text-success">
              <MapPin className="size-4.5" />
            </div>
            <h3 className="text-sm font-semibold">Endereço</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-2">
              <Campo id="cep" label="CEP" required>
                <div className="relative">
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    onBlur={() => {
                      setBuscandoCep(true);
                      setTimeout(() => {
                        setBuscandoCep(false);
                        setCepOk(true);
                      }, 900);
                    }}
                  />
                  {buscandoCep && (
                    <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {buscandoCep
                    ? "Buscando endereço..."
                    : cepOk
                      ? "Endereço preenchido automaticamente."
                      : "O endereço é preenchido automaticamente via consulta de CEP."}
                </p>
              </Campo>
            </div>
            <div className="md:col-span-3">
              <Campo id="rua" label="Rua" required>
                <Input id="rua" placeholder="Av. Paulista" />
              </Campo>
            </div>
            <Campo id="numero" label="Número" required>
              <Input id="numero" placeholder="1000" />
            </Campo>
            <div className="md:col-span-2">
              <Campo id="complemento" label="Complemento">
                <Input id="complemento" placeholder="Apto 52" />
              </Campo>
            </div>
            <div className="md:col-span-2">
              <Campo id="bairro" label="Bairro">
                <Input id="bairro" placeholder="Bela Vista" />
              </Campo>
            </div>
            <Campo id="cidade" label="Cidade" required>
              <Input id="cidade" placeholder="São Paulo" />
            </Campo>
            <Campo id="estado" label="Estado" required>
              <Select>
                <SelectTrigger id="estado">
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
            </Campo>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" asChild>
            <Link to="/pacientes">Cancelar</Link>
          </Button>
          <Button type="submit">Salvar paciente</Button>
        </div>
      </form>
    </AppShell>
  );
}
