import React from 'react';
import { useHistory } from 'react-router';

function Comidas() {
  const goTo = useHistory();
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => goTo.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => goTo.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => goTo.push('/comidas/52771') }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default Comidas;