import Pagina from "../templates/Pagina";
import FormFuncao from "../formularios/FormFuncao";
import TabelaFuncao from "../tabelas/TabelaFuncao";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroFuncao(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [funcoes, setFuncao] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false)
    //editar 
    const [atualizando, setAtualizando] = useState(false)
    const [FuncaoEmEdicao, setFuncaoEmEdicao] = useState(
        {
            idCargo: 0,
            funcao: ""
        }
    );
    //editar 
    function prepararFuncaoParaEdicao(funcao) {
        
        setAtualizando(true);
        setFuncaoEmEdicao(funcao);
        setExibirTabela(false);
    }
    //editar     
    //Excluir//
    function apagarFuncao(funcao) {
        fetch(urlBase + "/funcao", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(funcao),
        })
            .then((resposta) => {
                if (resposta.ok) {
                    // Exclusão bem-sucedida, atualize a lista de funções localmente
                    const listaAtualizada = funcoes.filter(
                        (item) => item.idCargo !== funcao.idCargo
                    );

                    setFuncao(listaAtualizada);
                    alert("Função/Cargo excluído com sucesso!");
                } else {
                    alert("Não foi possível excluir a função.");
                }
            })
            .catch((erro) => {
                alert("Erro ao executar a requisição: " + erro.message);
            });
    }
    useEffect(() => {
        fetch(urlBase + "/funcao", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();

        }).then((dados) => {
            if (Array.isArray(dados)) {
                // const result = dados.map(funcao =>{
                //     return {idCargo: funcao.idCargo,NomeDaFuncao:funcao.funcaomembro};
                // })
                setFuncao(dados)
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter cargos:", erro);
          });
    }, []);
    return (
        <Pagina>
            <Container >
                <Alert variant={"secondary"} className="text-center m-2 shadow-sm mb-4 rounded"> Cadastro de Cargos</Alert>
                {
                    exibirTabela ?
                        <TabelaFuncao listaFuncao={funcoes}
                            setFuncao={setFuncao}
                            exibirTabela={setExibirTabela}
                            editarFuncao={prepararFuncaoParaEdicao}
                            excluirFuncao={apagarFuncao} />   //Excluir//
                        :
                        <FormFuncao listaFuncao={funcoes}
                            setFuncao={setFuncao}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            funcao={FuncaoEmEdicao} /> //editar 
                }
            </Container>
        </Pagina>
    );
}