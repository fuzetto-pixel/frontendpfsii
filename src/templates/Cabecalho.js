import Cabecalhoo from "../Imagens/Cabecalhoo.gif";

export function Cabecalho(props) {
  return (
    <div>
      <img
        className="shadow-lg bg-white img-fluid"
        src={Cabecalhoo}
        alt="imagem"
        style={{ width: '100%',maxWidth: '100%'  }}
      />
    </div>
  );
}

