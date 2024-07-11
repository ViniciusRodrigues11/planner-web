import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { TermsAndPrivacy } from "./terms-and-privacy";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function toggleGuestInput() {
    setIsGuestInputOpen(!isGuestInputOpen);
  }

  function toggleGuestModal() {
    setIsGuestModalOpen(!isGuestModalOpen);
  }

  function addEmailToInvite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailToInvite(email: string) {
    setEmailsToInvite(emailsToInvite.filter((e) => e !== email));
  }

  function toggleModalConfirm() {
    setIsModalConfirmOpen(!isModalConfirmOpen);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col space-y-3">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-11 filter invert dark:filter-none"
          />
          <p className="dark:text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
            isGuestInputOpen={isGuestInputOpen}
            toggleGuestInput={toggleGuestInput}
            setDestination={setDestination}
            key="step-1"
          />

          {isGuestInputOpen && (
            <InviteGuestStep
              toggleModalConfirm={toggleModalConfirm}
              emailsToInvite={emailsToInvite}
              toggleGuestModal={toggleGuestModal}
              key="step-2"
            />
          )}
        </div>

        <TermsAndPrivacy />
      </div>

      {isGuestModalOpen && (
        <InviteGuestModal
          addEmailToInvite={addEmailToInvite}
          emailsToInvite={emailsToInvite}
          removeEmailToInvite={removeEmailToInvite}
          setEmailsToInvite={setEmailsToInvite}
          toggleGuestModal={toggleGuestModal}
          key="guest-modal"
        />
      )}

      {isModalConfirmOpen && (
        <ConfirmTripModal
          CreateTrip={createTrip}
          toggleModalConfirm={toggleModalConfirm}
          key="confirm-modal"
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}
    </div>
  );
}
