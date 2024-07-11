import { Mail, User, X } from "lucide-react";
import { InputWithIcon } from "../../components/input";

interface confirmTripModalProps {
  toggleModalConfirm: () => void;
  CreateTrip: (event: React.FormEvent<HTMLFormElement>) => void;
  setOwnerName: (value: string) => void;
  setOwnerEmail: (value: string) => void;
}

export function ConfirmTripModal(props: confirmTripModalProps) {
  return (
    <div className="fixed inset-0 dark:bg-black/60 bg-black/40 md:p-0 p-4 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-100 dark:bg-zinc-900 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={props.toggleModalConfirm}>
              <X className="size-5 dark:text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">Florianópolis</span>,
            Brasil nas datas de
            <span className="font-semibold text-zinc-100">
              {" "}
              16 a 27 de Agosto de 2024{" "}
            </span>
            preencha seus dados abaixo:
          </p>
        </div>

        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>

        <form
          onSubmit={props.CreateTrip}
          className="rounded-lg flex flex-col items-center gap-3"
        >
          <InputWithIcon
            Icon={User}
            placeholder="Seu nome completo"
            type="text"
            name="user"
            grow
            filled
            changeHandler={props.setOwnerName}
          />

          <InputWithIcon
            Icon={Mail}
            name="userEmail"
            type="email"
            placeholder="Seu email pessoal"
            grow
            filled
            changeHandler={props.setOwnerEmail}
          />

          <button
            type="submit"
            className="w-full bg-lime-300 text-lime-950 rounded-lg p-2.5 hover:bg-lime-400"
          >
            Confirmar criação da viagem
          </button>
        </form>
      </div>
    </div>
  );
}
