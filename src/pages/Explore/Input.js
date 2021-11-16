import React from 'react';
import { useHistory } from 'react-router';

function Input() {
  const goTo = useHistory();

  return (
    <form>

      <button
        name="input"
        type="button"
        data-testid="explore-food"
        onClick={ () => goTo.push('explorar/comidas') }
      >
        Explorar Comidas
      </button>

      <button
        name="input"
        type="button"
        data-testid="explore-drinks"
        onClick={ () => goTo.push('explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
    </form>
  );
}

export default Input;
