"use client";

import style from "./draft.module.css";
import logo from "../../../public/logo.png";
import Image from "next/image";
import MarkdownView from "react-showdown";
import { useDraft } from "@/app/contexts/DraftProvider";

export default function Draft() {
  const { lastDraft } = useDraft();

  function defaultText() {
    return (
      <div className={style.wrapper}>
        <Image className={style.logo} src={logo} alt="Logo Tarsila" />
        <h2 className={style.title}>
          A elaboração de projetos em um novo patamar
        </h2>
        <p className={style.text}>
          Acreditamos na cocriação como a melhor forma de promover a inclusão de
          empreendedores culturais. Cada um se beneficia do todo, ao mesmo tempo
          em que oferece a sua contribuição, ampliando, diversificando e
          fortalecendo a comunidade.
        </p>
        <p className={style.text}>
          A Tarsila surgiu para democratizar o acesso à elaboração de projetos,
          com o uso de tecnologias generativas de ponta.
        </p>
        <h2 className={style.title}>Tecnologia a serviço da colaboração</h2>
        <p className={style.text}>
          Tarsila te ajuda a colocar em palavras o trabalho que você ou o seu
          grupo já realizam ou querem realizar. O resultado é a geração de um
          pré-projeto com objetivo, justificativa e sugestão de orçamento,
          concebido a partir das melhores práticas.
        </p>
        <p className={style.text}>
          As ferramentas de LLM (Large Language Model) utilizadas pela CocrIA
          são treinadas constantemente sobre os termos mais prováveis empregados
          em cada tipo de projeto e, a partir disto, produzem um texto-base
          próprio ao qual você poderá acrescentar as suas próprias palavras.
        </p>
      </div>
    );
  }

  return lastDraft ? (
    <div className={style.drafWrapper}>
      <MarkdownView
        className="markdown"
        markdown={lastDraft}
        options={{ tables: true, emoji: true }}
      />
    </div>
  ) : (
    defaultText()
  );
}
