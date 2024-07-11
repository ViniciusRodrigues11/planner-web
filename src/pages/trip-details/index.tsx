import { MapPin, Plus, Settings2 } from "lucide-react";
import { ButtonWithIcon } from "../../components/button";
import { useEffect, useState } from "react";
import { ActivityModal } from "./activity-modal";
import { Links } from "./links";
import { Guests } from "./guests";
import { Activity } from "./activity";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function toggleCreateActivityModal() {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  }

  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null;

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400" />
            <span className="text-base text-zinc-400 md:text-lg">
              {trip?.destination}
            </span>
          </div>

          <span className="text-xs md:hidden text-zinc-400">
            {displayedDate}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm md:text-base text-zinc-400">
              {displayedDate}
            </span>
          </div>

          <div className=" hidden md:block h-6 w-px bg-zinc-200 dark:bg-zinc-800"></div>

          <ButtonWithIcon
            Icon={Settings2}
            label="Alterar local/data"
            variant="secondary"
            hideLabel
          />
        </div>
      </div>

      <div className="flex md:flex-row mt-4 flex-col gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">Atividades</span>
            <ButtonWithIcon
              Icon={Plus}
              label="Cadastrar atividades"
              variant="primary"
              hideLabel
              clickFunction={toggleCreateActivityModal}
            />
          </div>

          <Activity/>
        </div>
        <div className="md:w-80 space-y-6">
          <Links items={[{ title: "Google", link: "https://google.com" }]} />
          <div className="h-px bg-zinc-200 dark:bg-zinc-800"></div>
          <Guests />
        </div>
      </div>

      {/* MODAL */}
      {isCreateActivityModalOpen && (
        <ActivityModal
          toggleCreateActivityModal={toggleCreateActivityModal}
        />
      )}
    </div>
  );
}
