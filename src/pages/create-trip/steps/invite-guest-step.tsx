import { ArrowRight, UserRoundPlus } from "lucide-react";
import { ButtonWithIcon } from "../../../components/button";

interface inviteGuestStepProps {
  toggleModalConfirm: () => void;
  toggleGuestModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestStep({
  emailsToInvite,
  toggleGuestModal,
  toggleModalConfirm,
}: inviteGuestStepProps) {
  return (
    <div className="md:h-16 h-fit md:py-0 py-4 bg-zinc-100 dark:bg-zinc-900 px-4 rounded-xl shadow-shape flex md:items-center md:flex-row flex-col md:gap-3 gap-6">
      <button
        type="button"
        onClick={toggleGuestModal}
        className="bg-transparent text-lg flex-1 text-left flex items-center gap-2"
      >
        <UserRoundPlus className="text-zinc-400 size-5" />
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-300">
            {emailsToInvite.length} convidado(s)
          </span>
        ) : (
          <span className="text-sm md:text-lg text-zinc-400">Quem estará na viagem?</span>
        )}
      </button>

      <ButtonWithIcon
        clickFunction={toggleModalConfirm}
        Icon={ArrowRight}
        label="Confirmar viagem"
        variant="primary"
      />
    </div>
  );
}
