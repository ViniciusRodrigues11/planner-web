export function TermsAndPrivacy() {
    return (
      <p className="dark:text-zinc-500 text-sm">
        Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
        <br /> com nossos{" "}
        <a
          href="/terms"
          className="underline  text-zinc-500 dark:text-zinc-300"
        >
          termos de uso
        </a>{" "}
        e{" "}
        <a
          href="/privacy"
          className="underline text-zinc-500 dark:text-zinc-300 "
        >
          políticas de privacidade
        </a>
        .
      </p>
    );

}