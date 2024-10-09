import type React from 'react'
import { useContext } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { RECAPTCHA_SITE_KEY } from '../../App'
import { LanguageContext } from '../../context/LanguageContext'
import './styles.scss'

interface ModalProps {
  reCaptchaToken: React.Dispatch<React.SetStateAction<string | null>>
  onClose: () => void
}

export const ModalConfirm: React.FC<ModalProps> = ({
  onClose,
  reCaptchaToken,
}) => {
  const { translations, language } = useContext(LanguageContext)!

  const handleRecaptchaChange = (token: string | null) => {
    reCaptchaToken(token)
  }

  return (
    <div className="modal-container">
      <div className="modal-contente">
        <div>
          <div className="modal-inputs">
            <span
              style={{
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {translations.confirmar}
            </span>
            <p>{translations.conferirDados}</p>

            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              accessKey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              // altera o texto da mensagem de não sou um robô para o idioma selecionado
              hl={language === 'pt' ? 'pt-BR' : 'en'}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <button
                className="button-dados"
                type="button"
                onClick={() => {
                  onClose()
                }}
              >
                {translations.check}
              </button>
              <button className="button" type="submit">
                {translations.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
