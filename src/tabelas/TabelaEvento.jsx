import React, { useState, useEffect } from "react";
import { Button, Container, Table, Form, Row } from "react-bootstrap";
import moment from "moment";
import EventCalendar from "./calendarioEvento";
import { FaTimes } from "react-icons/fa";
import { useTable, usePagination } from "react-table";
import Pagination from "react-bootstrap/Pagination";


export default function TabelaEvento(props) {
  const [eventosCadastrados, setEventosCadastrados] = useState([]); // Estado para armazenar a lista de eventos cadastrados
  const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar a exibição do calendário

  const [ResponsavelEventos, setResponsavelEventos] = useState([]);
  const [, setExibirTabela] = useState(false);


  useEffect(() => {
    fetch("https://129.146.68.51/aluno49-pfsii/evento", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          const eventosComCor = dados.map((evento) => ({
            ...evento,
            color: "#00FF00", // Defina a cor desejada para o evento
          }));
          setEventosCadastrados(eventosComCor);
        }
      })
      .catch((erro) => {
        alert("Erro ao obter eventos: " + erro.message);
      });
  }, []);

  function filtarEvento(e) {
    const termoBusca = e.currentTarget.value;
    fetch("https://129.146.68.51/aluno49-pfsii/evento", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaEvento) => {
        if (Array.isArray(listaEvento)) {
          const resultadoBusca = listaEvento.filter((evento) =>
            evento.nomeEvento.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setEvento(resultadoBusca);
        }
      });
  }

  // Definindo 'data', que armazenará a lista de eventos recebida via props ou uma lista vazia se não houver eventos.
  const data = React.useMemo(() => props.listaEvento || [], [props.listaEvento]);

  const columns = React.useMemo( // Definindo 'columns', que é um array de objetos que descrevem as colunas da tabela.
    () => [
      {
        Header: "ID", // Título da coluna
        accessor: "idEvento", // Chave do objeto do evento para acessar o valor a ser exibido nesta coluna
      },
      {
        Header: "Evento",
        accessor: "nomeEvento",
      },
      {
        Header: "Público",
        accessor: "PublicoAlvo",
      },
      {
        Header: "Data",
        accessor: "DataEvento",
        Cell: ({ value }) => moment(value).format("DD/MM/YYYY"), // Cell é uma função que formata o valor (data) exibido nesta coluna usando a biblioteca 'moment.js'
      },
      {
        Header: "Hora",
        accessor: "HoraEvento",
      },
      {
        Header: "Localização",
        accessor: "Localizacao",
      },
      {
        Header: "Status",
        accessor: "StatusType",
      },
      {
        Header: "Descrição",
        accessor: "Descricao",
        Cell: ({ value }) => ( // renderiza o valor (descrição) formatado dentro de uma div com estilos aplicados.
          <div style={{ whiteSpace: "pre-wrap", maxWidth: "300px", overflow: "auto" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Editar/Excluir/Calendário",
        Cell: ({ row }) => ( // renderiza os botões de ação (editar, excluir, calendário) para cada linha da tabela.
          <div>
            <Button
              onClick={() => {
                props.editarEvento(row.original);
              }}
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
              onClick={() => {
                if (window.confirm("Confirma a exclusão do Evento?")) {
                  props.excluirEvento(row.original);
                }
              }}
              title="Excluir"
              variant="btn btn-outline-danger"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </Button>{" "}
            <Button
              onClick={() => {
                setMostrarCalendario(true);
              }}
              title="Calendário"
              variant="btn btn-outline-primary"
            >
              <svg
                viewBox="0 0 448 512"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M128 0c17.7 0 32 14.3 32 32v32h128V32c0-17.7 14.3-32 32-32s32 14.3 32 32v32h48c26.5 0 48 21.5 48 48v48H0v-48c0-26.5 21.5-48 48-48h48V32c0-17.7 14.3-32 32-32zM0 192h448v272c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16z" />
              </svg>
            </Button>
          </div>
        ),
      },
    ],
    [props.editarEvento, props.excluirEvento]
  );

  const {
    getTableProps,    // Propriedades da tabela
    getTableBodyProps, // Propriedades do corpo da tabela
    headerGroups, // Grupos de cabeçalho da tabela
    prepareRow, // Preparação de cada linha da tabela
    page, // Dados da página atual (dados paginados a serem exibidos)
    canPreviousPage, // Verifica se é possível ir para a página anterior
    canNextPage, // Verifica se é possível ir para a próxima página
    nextPage, // Função para ir para a próxima página
    previousPage, // Função para ir para a página anterior
    pageOptions, // Opções de páginas disponíveis (números das páginas)
    state: { pageIndex }, // Índice da página atual
    gotoPage, // Adicione gotoPage à desestruturação (função para ir para uma página específica)
  } = useTable(
    {
      columns, // Configuração das colunas da tabela
      data, // Dados a serem exibidos na tabela
      initialState: { pageIndex: 0 }, // Configuração inicial do índice da página (página inicial)
    },
    usePagination // Configuração do hook usePagination para a tabela paginada
  );

  const buscarResponsavelEventos = () => {
    fetch("https://129.146.68.51/aluno49-pfsii/responsavel_evento", {
      method: "GET",
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setResponsavelEventos(dados);
          setExibirTabela(false);
        }
      })
      .catch((erro) => {
        console.error("Erro ao obter as responsaveis:", erro);
      });
  };


  return (

    <Container>
      <Container>
        <Row className="col-4">
          <Form.Control
            type="text"
            id="termoBusca"
            onChange={filtarEvento}
            className="my-2"
            placeholder="Pesquisar..."
            aria-label="Search"
          />
        </Row>
      </Container>

      <div className="table-responsive">
        <Table striped bordered hover className="shadow-lg" {...getTableProps()}>
          <thead>
            {/* Cabeçalho da tabela */}
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {/* Mapeando cada coluna do cabeçalho */}
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th> // Renderiza o nome da coluna na célula do cabeçalho
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}> {/* Corpo da tabela */}
            {/* Mapeando cada linha do corpo da tabela */}
            {page.map((row) => {
              prepareRow(row); // Preparando a linha para ser renderizada
              return (
                // Renderiza a linha 
                <tr {...row.getRowProps()}>
                  {/* Mapeando cada linha */}
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>; // Renderiza o conteúdo
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Pagination>
          <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage} />
          {/* Mapeia as opções de páginas disponíveis para exibir os números de página */}
          {pageOptions.map((pageNumber) => (
            <Pagination.Item // Renderiza cada número de página como um item da paginação
              key={pageNumber}
              active={pageIndex === pageNumber} // Define a página atual como ativa para destacá-la visualmente
              onClick={() => gotoPage(pageNumber)} // Chama a função 'gotoPage' ao clicar em um número de página
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={nextPage} disabled={!canNextPage} />
        </Pagination>
      </div>

      {props.listaEvento && props.listaEvento.length === 0 && (
        <p className="text-center my-4">Nenhum evento cadastrado.</p>
      )}
      <div className="text-center">
        <Button variant="success" onClick={buscarResponsavelEventos}>
          Responsaveis dos eventos
        </Button>
      </div>

      <div>
        <h3>Reponsaveis</h3>
        <ul>
          {ResponsavelEventos.map((item) => (
            <li key={item.id}>{item.cpf} - {item.idEvento}</li>
          ))}
        </ul>
      </div>

      {mostrarCalendario && (
        <div>
          <div // Div para criar um fundo escuro ao abrir calendario
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.6)",
            }}
          ></div>
          <div // Div que contém o calendário
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Botão para fechar o calendário */}
            <div className="d-flex justify-content-end mb-3">
              <Button
                onClick={() => {
                  setMostrarCalendario(false);
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#1976D2",
                }}
              >
                <FaTimes />   {/* Ícone de "X" */}
              </Button>
            </div>
            {/* Renderiza o componente 'EventCalendar' passando a lista de 'eventosCadastrados' como propriedade */}
            <EventCalendar eventos={eventosCadastrados} />
          </div>
        </div>
      )}
      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="btn btn-outline-success"
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

