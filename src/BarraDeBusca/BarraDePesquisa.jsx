import React, { useState } from 'react';

const BarraDePesquisa = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  //chamar a função de filtro 
  const handleChange = (e) => {
    const termoDePesquisa = e.target.value;
    setSearchTerm(termoDePesquisa);
    onSearch(termoDePesquisa);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar Componentizado..."
        value={searchTerm}
        onChange={handleChange} //evento onChange para chamar a função de filtro
      />
    </div>
  );
};

export default BarraDePesquisa;
