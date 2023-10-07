import Pagina from "../templates/Pagina";
import FormEvento from "../formularios/FormEvento";
import TabelaEvento from "../tabelas/TabelaEvento";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";

export default function TelaCadastroEvento(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [eventos, setEvento] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  //editar
  const [atualizando, setAtualizando] = useState(false);
  const [EventoEmEdicao, setEventoEmEdicao] = useState({

    idEvento: 0,
    nomeEvento: "",
    Responsavel: "",
    cpf_responsavel: "",
    PublicoAlvo: "",
    DataEvento: "",
    HoraEvento: "",
    Localizacao: "",
    StatusType: "",
    Descricao: ""

  });
  //editar
  function prepararEventoParaEdicao(evento) {
    setAtualizando(true);
    setEventoEmEdicao(evento);
    setExibirTabela(false);
  }

  function apagarEvento(evento) {
    fetch("https://129.146.68.51/aluno49-pfsii/evento", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    })
      .then((resposta) => {
        if (resposta.ok) {
          const listaAtualizada = eventos.filter(
            (item) => item.idEvento !== evento.idEvento
          );
          setEvento(listaAtualizada);
          alert("Evento excluído com sucesso!");
        } else {
          alert("Não foi possível excluir o evento.");
        }
      })
      .catch((erro) => {
        alert("Erro ao executar a requisição: " + erro.message);
      });
  }

  useEffect(() => {
    fetch("https://129.146.68.51/aluno49-pfsii/evento", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setEvento(dados);
        }
      })
      .catch((erro) => {
        alert("Erro ao obter eventos: " + erro.message);
      });
  }, []);

  return (
    <Pagina>
      <Container>
        <Alert
          variant={"secondary"}
          className="text-center m-2 shadow-sm mb-4 rounded"
        >
          Cadastro de Eventos
        </Alert>
        {exibirTabela ? (
          <TabelaEvento
            listaEvento={eventos}
            setEvento={setEvento}
            exibirTabela={setExibirTabela}
            editarEvento={prepararEventoParaEdicao}
            excluirEvento={apagarEvento}
          />
        ) : (
          <FormEvento
            listaEvento={eventos}
            setEvento={setEvento}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            atualizando={atualizando}
            evento={EventoEmEdicao}
          />
        )}
      </Container>
    </Pagina>
  );
}
