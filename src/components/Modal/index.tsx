import React, { useContext } from 'react';
import './styles.scss';
import { LanguageContext } from '../../context/LanguageContext';

interface ModalProps {  
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const { setLanguage, translations } = useContext(LanguageContext)!;
  const [indioma, setIndioma] = React.useState('en');



  return (
    <div className='modal-container'>
      <div className='modal-contente'>
        <div>
          <h2>{translations.bemVindo}</h2>         
          {/* 
            <p>
              Gostaria de ser redirecionado para o site da Lider Aviação S.A ?
            </p>
          */}

          <div className='modal-inputs'>
            <span>{translations.selecioneIdioma}</span>
            <div>
              <div>
                <input
                  type="checkbox" 
                  id='pt-br' 
                  name='pt-br' 
                  checked={indioma === 'pt-br' ? true : false }
                  onChange={ () => {
                    setIndioma('pt-br') ;
                    setLanguage('pt');
                  }}
                />
                <label htmlFor='pt-br'>{translations.portugues}</label>
              </div>
              <div>
                <input
                 type="checkbox" 
                 id='en' 
                 name='en' 
                 checked={indioma === 'en' ? true : false }
                 onChange={ () => {
                  setIndioma('en') ;
                  setLanguage('en');
                }}
              />
                <label htmlFor='en'>{translations.ingles}</label>
              </div>
            </div>
          </div>          
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          marginTop: '20px',
        }}>
          <button className="button" type='button' onClick={() => {
            onClose();
          }}>{translations.prosseguir}</button>
        </div>
      </div>
    </div>
  );
};