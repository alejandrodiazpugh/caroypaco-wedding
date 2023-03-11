import { useState } from "react";
import { BiCopy } from "react-icons/bi";
type Props = {};

export default function DepositCard({}: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  async function handleCopy(copyValue: string) {
    await navigator.clipboard.writeText(copyValue);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <article className="deposit-card">
      <h3>Cuenta</h3>
      <div className="deposit-card-subsection">
        <h4 className="deposit-card-subheading">Titular</h4>
        <p className="deposit-card-content">Carolina Díaz Pugh</p>
      </div>
      <div className="deposit-card-subsection">
        <h4 className="deposit-card-subheading">Banco</h4>
        <p className="deposit-card-content">BBVA</p>
      </div>
      <div className="deposit-card-subsection">
        <h4 className="deposit-card-subheading">Cuenta</h4>
        <div>
          <p className="deposit-card-content">155 691 9782</p>
          <BiCopy onClick={() => handleCopy("1556919782")} />{" "}
        </div>
      </div>
      <div className="deposit-card-subsection">
        <h4 className="deposit-card-subheading">Clabe</h4>
        <div>
          <p className="deposit-card-content">0125 80015569 197821</p>
          <BiCopy onClick={() => handleCopy("012580015569197821")} />
        </div>
      </div>
      <div className="copy-alert">
        {isCopied ? "Se ha copiado al portapapeles" : ""}
      </div>
    </article>
  );
}
