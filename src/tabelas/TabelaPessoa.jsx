import { useState } from "react";
import { Button, Container, Table, Row, Modal } from "react-bootstrap";
import moment from "moment";
import BarraDePesquisa from '../BarraDeBusca/BarraDePesquisa'; // Importar o componente BarraDePesquisa

export default function TabelaPessoa(props) {
  const [showModal, setShowModal] = useState(false);
  const [pessoaVisualizada, setPessoaVisualizada] = useState(null);

  const [searchTerm, setSearchTerm] = useState(''); // Adicione o estado searchTerm

  const handleSearch = (termoDePesquisa) => {
    setSearchTerm(termoDePesquisa); // Atualize o estado searchTerm com o termo de pesquisa
  };

  const pessoasFiltradas = props.listaPessoa.filter((pessoa) =>
    pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filtrar pessoas com base em searchTerm



  function filtrarPessoa(termoBusca) { // Modifique a função filtrarPessoa para receber o termo de busca diretamente
    fetch("https://129.146.68.51/aluno49-pfsii/pessoa", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaPessoa) => {
        if (Array.isArray(listaPessoa)) {
          const resultadoBusca = listaPessoa.filter((pessoa) =>
            pessoa.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setPessoa(resultadoBusca);
        }
      });
  }

  const VisualizarPessoaModal = ({ pessoa, showModal, handleCloseModal }) => {
    return (
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Informações da Pessoa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>CPF:</strong> {pessoa.cpf}</p>
          <p><strong>Nome:</strong> {pessoa.nome}</p>
          <p><strong>Data de Nascimento:</strong> {moment(pessoa.dataNasc).format("DD/MM/YYYY")}</p>
          <p><strong>Gênero:</strong> {pessoa.genero}</p>
          <p><strong>Endereço:</strong> {pessoa.endereco}</p>
          <p><strong>Bairro:</strong> {pessoa.bairro}</p>
          <p><strong>Uf:</strong> {pessoa.uf}</p>
          <p><strong>Cep:</strong> {pessoa.cep}</p>
          <p><strong>Cidade:</strong> {pessoa.cidade}</p>
          <p><strong>Email:</strong> {pessoa.email}</p>
          <p><strong>Celular:</strong> {pessoa.celular}</p>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Container>
      <Container>
        <Row className="col-4">
        <BarraDePesquisa onSearch={handleSearch} />
        </Row>
      </Container>
      {/* Tabela de pessoas */}
      <div className="table-responsive">
        <Table striped bordered hover className="shadow-lg">
          <thead>
            <tr>
              
              <th>Nome</th>
              <th>Data Nasc.</th>
              {/* <th>Cargo</th> */}
              <th>Email</th>
              <th>Celular</th>
              <th>Editar/Excluir/Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {props.listaPessoa?.map((pessoa) => (
              <tr key={pessoa.cpf}>
               
                <td>{pessoa.nome}</td>
                <td>{moment(pessoa.dataNasc).format("DD/MM/YYYY")}</td>
                {/* <td>{pessoa.funcaomembro}</td> */}
                <td>{pessoa.email}</td>
                <td>{pessoa.celular}</td>
                <td>
                  <Button
                    onClick={() => props.editarpessoa(pessoa)}
                    title="Editar"
                    variant="btn btn-outline-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </Button>{" "}
                  <Button
                    title="Excluir"
                    variant="btn btn-outline-danger"
                    onClick={() => {
                      if (window.confirm("Confirma a exclusão da pessoa?")) {
                        props.excluirpesssoa(pessoa);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </Button>{" "}
                  {/* Botão para abrir o modal de visualização */}
                  <Button onClick={() => {
                    setShowModal(true);
                    setPessoaVisualizada(pessoa);
                  }} variant="btn btn-outline-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fill="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {props.listaPessoa && props.listaPessoa.length === 0 && (
          <p className="text-center my-4">Nenhuma Pessoa cadastrada.</p>
        )}
      </div>
      {/* Componente do modal de visualização */}
      {pessoaVisualizada && (
        <VisualizarPessoaModal
          pessoa={pessoaVisualizada}
          showModal={showModal}
          handleCloseModal={() => setShowModal(false)} // Função para fechar o modal
        />
      )}
      {/* Fim da tabela de pessoas */}
      <div className="d-flex justify-content-end">
        <Button
          variant="btn btn-outline-success"
          className="my-3"
          onClick={() => {
            props.exibirTabela(false);
          }}
        >
          Cadastrar
        </Button>
      </div>
    </Container>
  );
}


