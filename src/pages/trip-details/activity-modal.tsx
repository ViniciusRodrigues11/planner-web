import { Calendar, Clock, Tag } from "lucide-react";
import { InputWithIcon } from "../../components/input";
import { Modal } from "../../components/modal";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface ActivityModalProps {
  toggleCreateActivityModal: () => void;
}


export function ActivityModal({
  toggleCreateActivityModal,
}: ActivityModalProps) {

  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const date = data.get("date")?.toString();
    const time = data.get("time")?.toString();

    const occurs_at = `${date}T${time}:00`;

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }


  return (
    <Modal
      title="Cadastrar nova atividade"
      subtitle="Todos convidados podem visualizar as atividades."
      toggleModal={toggleCreateActivityModal}
    >
      <form
        onSubmit={createActivity}
        className="rounded-lg flex flex-col items-center gap-3"
      >
        <InputWithIcon
          Icon={Tag}
          placeholder="Qual a atividade?"
          type="text"
          name="title"
          grow
          filled
        />

        <div className="flex gap-2 w-full">
          <InputWithIcon
            Icon={Calendar}
            type="date"
            name="date"
            placeholder="Dia"
            filled
            grow
          />

          <InputWithIcon
            Icon={Clock}
            type="time"
            name="time"
            placeholder="Horário"
            filled
            inputClassName="w-36"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-lime-300 text-lime-950 rounded-lg p-2.5 hover:bg-lime-400"
        >
          Criar nova atividade
        </button>
      </form>
    </Modal>
  );
}
