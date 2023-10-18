import { useState, useEffect } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import moment from "moment";

export default function FormEvento(props) {
  const [validado, setValidado] = useState(false);
  const [evento, setEvento] = useState(props.evento);
  const [Responsaveis, setResponsaveis] = useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setEvento({ ...evento, [id]: valor });
  }

  function adicionarResponsaveis() {
    console.log("Adicionar Responsável acionado!");
    const selectedRoleId = document.getElementById("cpf").value;
    const selectedRole = Responsaveis.find((pessoa) => pessoa.cpf === selectedRoleId);
  
    if (selectedRole && !evento.Responsaveis.some((role) => role.cpf === selectedRole.cpf)) {
      const novoResponsaveis = [...evento.Responsaveis, { cpf: selectedRole.cpf, nome: selectedRole.cpf }];
      setEvento({
        ...evento,
        Responsaveis: novoResponsaveis
      });
    }
  }

  function removerResponsaveis(cpf) {
    const updatedRoles = evento.Responsaveis.filter((role) => role.cpf !== cpf);
    setEvento({
      ...evento,
      Responsaveis: updatedRoles
    });
  }

  function manipulaSubmissao(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      // Desestruture o objeto evento aqui
      const {
        idEvento,
        nomeEvento,
        PublicoAlvo,
        DataEvento,
        HoraEvento,
        Localizacao,
        StatusType,
        Descricao,
      } = evento;

      const dataFormatada = moment(DataEvento, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ss");

      // Crie um novo objeto para enviar para a API backend
      const eventoParaEnviar = {
        idEvento,
        nomeEvento,
        PublicoAlvo,
        DataEvento: dataFormatada,
        HoraEvento,
        Localizacao,
        StatusType,
        Descricao,
      };

      if (!props.atualizando) {
        fetch("https://129.146.68.51/aluno49-pfsii/evento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventoParaEnviar),
        })
          .then((resposta) => resposta.json())
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = [...props.listaEvento, eventoParaEnviar];
              props.setEvento(novaLista);
              props.exibirTabela(true);
              window.location.reload();
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        fetch("https://129.146.68.51/aluno49-pfsii/evento", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventoParaEnviar),
        })
          .then((resposta) => resposta.json())
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = [...props.listaEvento, eventoParaEnviar];
              props.setEvento(novaLista);
              props.exibirTabela(true);
              setEvento(props.evento);
              window.location.reload();
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      }
      setValidado(false);
    } else {
      setValidado(true);
    }
  }

  useEffect(() => {
    fetch("https://129.146.68.51/aluno49-pfsii/pessoa", {
      method: "GET"
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setResponsaveis(dados);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter funções:", erro);
      });
  }, []);

  return (
    <Form
      className="shadow-lg p-3 mt-4 bg-white rounded;"
      noValidate
      validated={validado}
      onSubmit={manipulaSubmissao}
    >

      <Row className="justify-content-center">
        <Col className="d-none ">
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control
              className="hidden"
              type="text"
              placeholder="id do Evento"
              value={evento.idEvento}
              id="idEvento"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite o ID deste Evento, em breve será autoincremento....
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="col-4 mb-3">
          <Form.Group>
            <Form.Label>Evento teste1:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Palestra, Workshop..."
              value={evento.nomeEvento}
              id="nomeEvento"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite o nome do evento!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="col-3 mb-3">
          <Form.Group>
            <Form.Label>Público Alvo:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe qual será o público alvo..."
              value={evento.PublicoAlvo}
              id="PublicoAlvo"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite o público alvo!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="col-2 mb-3">
          <Form.Group>
            <Form.Label>Data do evento:</Form.Label>
            <Form.Control
              type="date"
              value={evento.DataEvento ? moment(evento.DataEvento).format("YYYY-MM-DD") : ""}
              id="DataEvento"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite o dia do evento!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="col-2 mb-3">
          <Form.Group>
            <Form.Label>Horário do evento:</Form.Label>
            <Form.Control
              type="time"
              value={evento.HoraEvento}
              id="HoraEvento"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite a hora do evento!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="col-4 mb-3">
          <Form.Group>
            <Form.Label>Localização:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe a localização do evento..."
              value={evento.Localizacao}
              id="Localizacao"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback type="invalid">
              Digite a Localização do evento!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col className="col-5 mb-4">
          <div>
            <label htmlFor="inputEvento" className="form-label">
              Responsaveis:
            </label>
            <Form.Select id="cpf" className="form-control" required onChange={manipularMudanca}>
              <option value="">Selecione</option>
              {Responsaveis && Responsaveis.map((pessoa) => (
                <option key={pessoa.cpf} value={pessoa.cpf}>
                  {pessoa.cpf}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="btn btn-outline-primary mt-2"
              type="button"
              onClick={adicionarResponsaveis}
            >
              Adicionar Responsavel
            </Button>
            <div className="mt-3">
              {evento.Responsaveis && evento.Responsaveis.map((role) => (
                <div key={role.cpf}>
                  {role.nome}{" "}
                  <Button
                    className="mt-3"
                    variant="btn btn-outline-danger btn-sm"
                    type="button"
                    onClick={() => removerResponsaveis(role.cpf)}
                  >
                    Remover
                  </Button>
                </div>
              ))}

            </div>
          </div>
        </Col>

        <Col className="col-3 mb-3">
          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              value={evento.StatusType}
              id="StatusType"
              onChange={manipularMudanca}
              required
            >
              <option value="">Selecione o status...</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Selecione o status do evento!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col className="mt-5 col-11">
          <InputGroup className="descricao">
            <InputGroup.Text>Descrição</InputGroup.Text>
            <Form.Control
              required
              value={evento.Descricao}
              onChange={manipularMudanca}
              id="Descricao"
              as="textarea"
              placeholder="Insira aqui as descrições do evento cadastrado..."
              style={{ height: '100px' }}

            />
            <Form.Control.Feedback>Ok !</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Por favor Insira uma Descrição!</Form.Control.Feedback>
          </InputGroup>
        </Col>

        <div className="d-flex justify-content-end my-3">
          <Button
            style={{ marginRight: "5px" }}
            variant="btn btn-outline-danger"
            type="button"
            className="mt-5 "
            onClick={() => {
              props.exibirTabela(true);
            }}
          >
            Voltar
          </Button>{" "}
          <Button className="mt-5" type="submit" variant="btn btn-outline-success">
            {props.atualizando ? "Atualizar" : "Cadastrar"}
          </Button>{" "}
        </div>
      </Row>
    </Form>
  );
}
