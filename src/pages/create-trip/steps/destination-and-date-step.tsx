import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";

import "react-day-picker/dist/style.css";

import { InputWithIcon } from "../../../components/input";
import { ButtonWithIcon } from "../../../components/button";

interface destinationAndDateStepProps {
  isGuestInputOpen: boolean;
  toggleGuestInput: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  setDestination: (destination: string) => void;
}

export function DestinationAndDateStep(props: destinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    props.eventStartAndEndDates &&
    props.eventStartAndEndDates.from &&
    props.eventStartAndEndDates.to
      ? format(props.eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(props.eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="h-fit md:h-16 py-4 md:py-0 bg-zinc-100 dark:bg-zinc-900 px-4 rounded-xl shadow-shape flex md:items-center md:gap-3 gap-5 md:flex-row flex-col ">
      <InputWithIcon
        name="destination"
        type="text"
        Icon={MapPin}
        isDisabled={props.isGuestInputOpen}
        changeHandler={props.setDestination}
        placeholder="Para onde você vai?"
        grow
      />

      <button
        disabled={props.isGuestInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left md:w-80"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-sm md:text-base text-zinc-400  md:w-40 truncate">
          {displayedDate || "Quando"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    className="size-5 text-zinc-400"
                    onClick={closeDatePicker}
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={props.eventStartAndEndDates}
              onSelect={props.setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="md:w-px md:h-6 h-px w-full dark:bg-zinc-800"></div>

      {props.isGuestInputOpen ? (
        <ButtonWithIcon
          Icon={Settings2}
          label="Alterar local/data"
          variant="secondary"
          clickFunction={props.toggleGuestInput}
        />
      ) : (
        <ButtonWithIcon
          Icon={ArrowRight}
          label="Continuar"
          variant="primary"
          clickFunction={props.toggleGuestInput}
        />
      )}
    </div>
  );
}
