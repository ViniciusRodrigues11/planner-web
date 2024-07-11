/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideProps } from "lucide-react";

interface InputProps {
  isDisabled?: boolean;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  grow?: boolean;
  placeholder?: string;
  inputClassName?: string;
  type: "email" | "text" | "date" | "time";
  name: string;
  filled?: boolean;
  changeHandler?: (value: any) => void;
}

export function InputWithIcon({
  Icon,
  isDisabled = false,
  grow = false,
  placeholder,
  inputClassName = "",
  type = "text",
  name,
  filled = false,
  changeHandler = () => {},
}: InputProps) {
  let growStyle = "flex-shrink-0 flex-grow-0";
  let baseStyle = "flex items-center gap-2";
  let baseInputStyle = "text-sm md:text-base"

  if (grow) {
    growStyle = "md:flex-shrink md:flex-grow w-full";
  }

  if (filled) {
    baseStyle += "gap-2 bg-zinc-950 p-2.5 rounded-lg";
  }

  if(type === "date" || type === "time") {
    baseInputStyle += " cursor-pointer";
  }

  return (
    <div className={`${growStyle} ${baseStyle}`}>
      <Icon className="text-zinc-400 size-5" />

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`bg-transparent text-zinc-400 placeholder-zinc-400 outline-none ${inputClassName} ${baseInputStyle}`}
        disabled={isDisabled}
        onChange={event => changeHandler(event.target.value)}
      />
    </div>
  );
}
