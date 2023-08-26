import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
export default function FormFuncao(props) {

    const [validado, setValidado] = useState(false);
    const [funcao, setFuncao] = useState(props.funcao);

    function manipularMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setFuncao({ ...funcao, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            //Editar
            console.log(props)
            if (!props.atualizando) {
                fetch(urlBase + "/funcao", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(funcao)
                })
                    .then((resposta) => {
                        return resposta.json();
                    })
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaFuncao;
                            novaLista.push(funcao);
                            props.setFuncao(novaLista);
                            props.exibirTabela(true);
                            window.location.reload()
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message);
                    })
            }
            else {
                fetch(urlBase + "/funcao", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(funcao)
                }).then((resposta) => {
                    return resposta.json()
                })
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaFuncao;
                            novaLista.push(funcao);
                            props.setFuncao(novaLista);
                            props.exibirTabela(true);
                            setFuncao(props.funcao)
                            window.location.reload()
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição: " + erro.message);
                    })
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }
    return (
        <>
            <Form className="shadow-lg p-3 mt-4 bg-white rounded" noValidate validated={validado} onSubmit={manipulaSbmissao}>
                <Row>
                    <Col className="d-none">
                        <Form.Group as={Col} md="12" >
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                ClassName="hidden"
                                type="text"
                                placeholder="id do Cargo"
                                value={funcao.idCargo}
                                id="idCargo"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Digite o ID deste Cargo, em breve será auto encremento....
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Nome do Cargo:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cargo a ser cadastrado, Ex: Diácono, Líder Louvor..."
                                value={funcao.funcaomembro}
                                id="funcaomembro"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Digite o cargo a ser cadastrado, Ex: Diácono, Líder Louvor...
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <div className="d-flex justify-content-end mb-1 mt-5">
                        <Button style={{ marginRight: '5px' }} variant="btn btn-outline-danger" type="button" className="mt-5 " onClick={() => {
                            props.exibirTabela(true);
                        }}>Voltar</Button>{' '}
                        <Button className="mt-5" type="submit" variant="btn btn-outline-success">{props.atualizando ? ('Atualizar') : "Cadastrar"}</Button>{' '}
                    </div>
                </Row>
            </Form>
        </>
    );
}