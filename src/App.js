

import TelaCadastrofuncao from "./telas/TelaCadastroFuncao.jsx";
import TelaCadPessoa from "./telas/TelaCadPessoa.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
         
          <Route path="/funcao" element={<TelaCadastrofuncao/>}/>     
          <Route path="/pessoas" element={<TelaCadPessoa/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>} />
            
        </Routes>
        
     </BrowserRouter>
    </div>
  );
}

export default App;
