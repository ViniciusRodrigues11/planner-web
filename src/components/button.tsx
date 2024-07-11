import { LucideProps } from "lucide-react";

interface ButtonProps{
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  clickFunction?: () => void;
  label: string;
  variant: "primary" | "secondary";
  hideLabel?: boolean;
  className?: string;
}

export function ButtonWithIcon({
  Icon,
  clickFunction,
  label,
  variant = "primary",
  hideLabel = false,
  className = "",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-lime-300 text-lime-950 rounded-lg px-5 flex items-center gap-2 py-2 hover:bg-lime-400 shrink-0",
    secondary:
      "bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 rounded-lg px-5 flex items-center gap-2 py-2 dark:hover:bg-zinc-700 hover:bg-zinc-200 shrink-0",
  };

  return (
    <button
      onClick={() => clickFunction && clickFunction()}
      className={`${variants[variant]} ${className}`}
    >
      <span className={`${hideLabel && "hidden md:block"}`}>{label}</span> <Icon className="size-4" />
    </button>
  );
}
