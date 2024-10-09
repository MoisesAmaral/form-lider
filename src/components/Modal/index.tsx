import React, { useContext } from 'react'
import './styles.scss'
import { LanguageContext } from '../../context/LanguageContext'

interface ModalProps {
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const { setLanguage, translations } = useContext(LanguageContext)!
  const [indioma, setIndioma] = React.useState('en')

  return (
    <div className="modal-container">
      <div className="modal-contente">
        <div>
          <h2>{translations.bemVindo}</h2>
          <div className="modal-inputs">
            <span
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {translations.selecioneIdioma}
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <input
                  type="checkbox"
                  id="pt-br"
                  name="pt-br"
                  checked={indioma === 'pt-br'}
                  onChange={() => {
                    setIndioma('pt-br')
                    setLanguage('pt')
                  }}
                />
                <label htmlFor="pt-br">{translations.portugues}</label>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <input
                  type="checkbox"
                  id="en"
                  name="en"
                  checked={indioma === 'en'}
                  onChange={() => {
                    setIndioma('en')
                    setLanguage('en')
                  }}
                />
                <label htmlFor="en">{translations.ingles}</label>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <button
            className="button"
            type="button"
            onClick={() => {
              onClose()
            }}
          >
            {translations.prosseguir}
          </button>
        </div>
      </div>
    </div>
  )
}
