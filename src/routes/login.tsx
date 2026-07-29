import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, HeartPulse, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import illustration from "@/assets/login-illustration.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — MediAgenda | Gestão de clínicas médicas" },
      {
        name: "description",
        content:
          "Acesse o MediAgenda para gerenciar pacientes, médicos, especialidades e agendamentos da sua clínica.",
      },
      { property: "og:title", content: "Entrar — MediAgenda" },
      {
        property: "og:description",
        content: "Entre para gerenciar os atendimentos da clínica com o MediAgenda.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">MediAgenda</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Acesse sua conta</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Entre para gerenciar os atendimentos da clínica
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email || !senha) {
                setErro("Informe o e-mail e a senha para continuar.");
                return;
              }
              setErro(null);
              window.location.href = "/";
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@clinica.com.br"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha *</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="senha"
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="px-9"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {erro && (
              <p className="flex items-start gap-2 rounded-lg bg-destructive-soft px-3 py-2 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                {erro}
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox id="lembrar" />
                Lembrar de mim
              </label>
              <button type="button" className="text-sm font-medium text-primary hover:underline">
                Esqueci minha senha
              </button>
            </div>

            <Button type="submit" className="h-11 w-full text-sm">
              Entrar
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Problemas para acessar?{" "}
            <Link to="/" className="font-medium text-primary hover:underline">
              Fale com o suporte da clínica
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden items-center justify-center bg-primary-soft p-12 lg:flex">
        <div className="max-w-md text-center">
          <img
            src={illustration}
            alt="Ilustração de profissional de saúde organizando agendamentos"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-sm rounded-3xl shadow-float"
          />
          <h2 className="mt-8 text-xl font-semibold tracking-tight">
            Toda a agenda da clínica em um só lugar
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pacientes, médicos, especialidades e consultas organizados com clareza para a sua
            equipe.
          </p>
        </div>
      </div>
    </div>
  );
}
