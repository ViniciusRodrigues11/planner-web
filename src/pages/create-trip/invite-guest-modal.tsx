import { AtSign, Plus, X } from "lucide-react";
import { InputWithIcon } from "../../components/input";
import { ButtonWithIcon } from "../../components/button";

interface inviteGuestModalProps {
  toggleGuestModal: () => void;
  addEmailToInvite: (event: React.FormEvent<HTMLFormElement>) => void;
  setEmailsToInvite: React.Dispatch<React.SetStateAction<string[]>>;
  emailsToInvite: string[];
  removeEmailToInvite: (email: string) => void;
}

export function InviteGuestModal(props: inviteGuestModalProps) {
  return (
    <div className="fixed inset-0 dark:bg-black/60 bg-black/40 md:p-0 p-4 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-100 dark:bg-zinc-900 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={props.toggleGuestModal}>
              <X className="size-5 dark:text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {props.emailsToInvite.map((email) => (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-300 dark:bg-zinc-800 flex items-center gap-2"
            >
              <span className="dark:text-zinc-300 text-sm">{email}</span>
              <X
                onClick={() => props.removeEmailToInvite(email)}
                className="size-3 text-zinc-400 hover:text-zinc-300 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>

        <form
          onSubmit={props.addEmailToInvite}
          className="p-2.5 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <InputWithIcon
            Icon={AtSign}
            name="email"
            type="email"
            placeholder="Digite o email do convidado"
            grow
          />

          <ButtonWithIcon Icon={Plus} label="Convidar" variant="primary" hideLabel />
        </form>
      </div>
    </div>
  );
}
