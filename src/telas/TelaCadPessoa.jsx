import Pagina from "../templates/Pagina";
import FormPessoa from "../formularios/FormPessoa";
import TabelaPessoa from "../tabelas/TabelaPessoa";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from '../utilitarios/definicoes'

export default function TelaCadPessoa(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [pessoas, setPessoa] = useState([]);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [PessoaEmEdicao, setPessoaEmEdicao] = useState(
    {

      cpf: "",
      nome: "",
      dataNasc: "",
      genero: "",
      endereco: "",
      cidade: "",
      bairro: "",
      uf: "",
      cep: "",
      email: "",
      celular: ""
    });

  function prepararParaEdicao(pessoa) {
    setAtualizando(true);
    setPessoaEmEdicao(pessoa);
    setExibirTabela(false);
  }

  function apagarPessoa(pessoa) {
    fetch(urlBase + "/pessoa", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pessoa),
    })
      .then((resposta) => {
        if (resposta.ok) {
          const listaAtualizada = pessoas.filter(
            (item) => item.cpf !== pessoa.cpf
          );
          setPessoa(listaAtualizada);
          alert("Pessoa excluída com sucesso");
        } else {
          alert("Não foi possível excluir essa pessoa");
        }
      })
      .catch((erro) => {
        alert("Erro ao executar essa requisição: " + erro.message);
      });
  }

  useEffect(() => {
    fetch(urlBase + "/pessoa", {
      method: "GET"
    }).then((resposta) => {
      return resposta.json();
    }).then((dados) => {
      if (Array.isArray(dados)) {
        setPessoa(dados)
      }
    })
    .catch((erro) => {
      console.error("Erro ao obter os pessoas:", erro);
    });
  }, []);
  return (
    <Pagina>
      <Container>
        <Alert variant={"secondary"} className="text-center m-2 shadow-sm mb-4 rounded">Cadastro de Pessoas</Alert>

        {
          exibirTabela ?
            <TabelaPessoa listaPessoa={pessoas}
              setPessoa={setPessoa}
              exibirTabela={setExibirTabela}
              editarpessoa={prepararParaEdicao}
              excluirpesssoa={apagarPessoa} />
            :
            <FormPessoa listaPessoa={pessoas}
              setPessoa={setPessoa}
              exibirTabela={setExibirTabela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              atualizando={atualizando}
              pessoa={PessoaEmEdicao} />
        }
      </Container>
    </Pagina>
  );
}