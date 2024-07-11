import { Link2, Plus } from "lucide-react";
import { ButtonWithIcon } from "../../components/button";

interface LinksProps {
  items: { title: string; link: string }[];
}

export function Links({ items }: LinksProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      {items.map((item) => (
        <div key={item.title} className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{item.title}</span>

              <a
                href="#"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {item.link}
              </a>
            </div>
            <Link2 className="size-5 text-zinc-400 shrink-0" />
          </div>
        </div>
      ))}

      <ButtonWithIcon
        Icon={Plus}
        label="Cadastrar novo link"
        variant="secondary"
        className="w-full justify-center"
      />
    </div>
  );
}
