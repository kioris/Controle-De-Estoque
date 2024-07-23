import React, { useState } from 'react';

const ProductCard = ({ product, onEdit, onDelete, onIncrement, onDecrement }) => {
  const [quantity, setQuantity] = useState(parseInt(product.quantity));

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    onIncrement(product.id);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onDecrement(product.id);
    }
  };

  const buttonStyle = {
    backgroundColor: '#0074D9', 
    color: '#FFFFFF', 
    border: 'none',
    padding: '5px 10px',
    margin: '5px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif', 
    fontSize: '14px',
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.name}</h3>
      <p>Quantidade: {quantity}</p>
      <button style={buttonStyle} onClick={() => onEdit(product)}>
        Editar
      </button>
      <button style={buttonStyle} onClick={() => onDelete(product.id)}>
        Excluir
      </button>
      <button style={buttonStyle} onClick={incrementQuantity}>
        +
      </button>
      <button style={buttonStyle} onClick={decrementQuantity}>
        -
      </button>
    </div>
  );
};

export default ProductCard;
