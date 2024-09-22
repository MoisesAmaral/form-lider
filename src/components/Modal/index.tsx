import React from 'react';

interface ModalProps {  
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {

  return (
    <div className='modal-container'>
      <div className='modal-contente'>
        <div>
          <h2>Bem vindo ao formulário de cadastro Lider Aviação!</h2>          
          <p>Gostaria de conhecer mais sobre a Lider Aviação S.A ?</p>
          
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          marginTop: '20px',
        }}>
          <button type='button' onClick={onClose}>Ir para Formulario</button>
          <button type='button' onClick={() => {
            // abrir em uma nova aba o site da lider aviação
            window.open('https://www.lideraviacao.com.br/pt-br/fretamento-de-aeronaves');
          }}>Sim</button>
        </div>
      </div>
    </div>
  );
};