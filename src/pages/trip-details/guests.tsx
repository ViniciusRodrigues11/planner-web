import { CheckCircle2, CircleDashed, Plus } from "lucide-react";
import { ButtonWithIcon } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Convidados</h2>

        {participants.map((item) => (
          <div key={item.email} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {item.name}
                </span>

                <span className="block text-sm text-zinc-400 truncate">
                  {item.email}
                </span>
              </div>
              {item.is_confirmed ? (
                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          </div>
        ))}

        <ButtonWithIcon
          Icon={Plus}
          label="Adicionar convidado"
          variant="secondary"
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}
