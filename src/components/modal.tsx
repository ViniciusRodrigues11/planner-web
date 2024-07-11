import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
  title: string;
  subtitle?: string;
}

export function Modal({ children, toggleModal, title, subtitle }: ModalProps) {
  return (
    <div className="fixed inset-0 dark:bg-black/60 bg-black/40 md:p-0 p-4 flex items-center justify-center">
      <div className="w-[648px] rounded-xl py-5 px-6 shadow-shape bg-zinc-100 dark:bg-zinc-900 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={toggleModal}>
              <X className="size-5 dark:text-zinc-400" />
            </button>
          </div>
          {subtitle && (
            <p className="text-zinc-600 dark:text-zinc-300 text-sm">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
