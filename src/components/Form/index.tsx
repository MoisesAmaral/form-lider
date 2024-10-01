import React, { useContext, useState } from "react";
import { LanguageContext } from "./../../context/LanguageContext";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import Warning from "./../../assets/warning-circle.svg";
import Arrow from "./../../assets/arrow.svg";
import { ReactSVG } from 'react-svg';
import "./styles.scss";

export const MultiStepForm = () => {
  const { translations } = useContext(LanguageContext)!;
  const [step, setStep] = useState(1);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (recaptchaToken) {
      toast("Por favor, complete o reCAPTCHA", { type: "error" });
      return;
    }
    nextStep();
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const totalSteps = 5;

  return (
    <div className="form-container">
      <h1>{translations.formTitle}</h1>

      <div className="progress-bar-container">
        <div className="progress-bar">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`step ${step === i + 1 ? "active" : step > i + 1 ? "completed" : ""}`}
            >
              <div className="step-item">
                <div className="circle">{i + 1}</div>
                <div className="label">{translations[`step${i + 1}Label`]}</div>
                <div className="setas">
                  {i + 1 < totalSteps && <ReactSVG src={Arrow} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="step-content">
            <div className="input-row">
              <input type="text" name="nomeContato" placeholder={translations.nomeContato} />
              <input type="tel" name="telefoneContato" placeholder={translations.telefoneContato} />
            </div>
            <div className="input-row">
              <input type="email" name="emailContato" placeholder={translations.emailContato} />
              <input type="text" name="operador" placeholder={translations.operador} />
            </div>
            <input type="text" name="prefixo" placeholder={translations.prefixo} className="full-width" />
            <div className="navigation-buttons">
              <button type="button" onClick={nextStep}>Próximo</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <div className="input-row">
              <input type="text" name="modelo" placeholder={translations.modelo} />
              <input type="number" name="mtow" placeholder={translations.mtow} />
            </div>
            <div className="input-row">
              <input type="datetime-local" name="eta" placeholder={translations.eta} />
              <input type="text" name="origem" placeholder={translations.origem} />
            </div>
            <div className="input-row">
              <input type="datetime-local" name="etd" placeholder={translations.etd} />
              <input type="text" name="destino" placeholder={translations.destino} />
            </div>
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>Anterior</button>
              <button type="button" onClick={nextStep}>Próximo</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <div className="input-row">
              <input type="text" name="comandante" placeholder={translations.comandante} />
              <input type="number" name="numeroPax" placeholder={translations.numeroPax} />
            </div>
            <input type="text" name="avoePermit" placeholder={translations.avoePermit} className="full-width" />
            <textarea name="propositoVoo" placeholder={translations.propositoVoo}></textarea>

            <span>{translations.headOnBoard}</span>
            <select name="headOnBoard">
              <option value="S">S</option>
              <option value="N">N</option>
            </select>
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>Anterior</button>
              <button type="button" onClick={nextStep}>Próximo</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h2>{translations.paymentDetails}</h2>
            <div className="input-row">
              <input type="text" name="pagamentoResponsavel" placeholder={translations.pagamentoResponsavel} />
              <input type="text" name="pagamentoContatoNome" placeholder={translations.pagamentoContatoNome} />
            </div>
            <div className="input-row">
              <input type="tel" name="pagamentoContatoTelefone" placeholder={translations.pagamentoContatoTelefone} />
              <input type="email" name="pagamentoContatoEmail" placeholder={translations.pagamentoContatoEmail} />
            </div>
            <div className="input-row">
              <input type="text" name="pagamentoLogradouro" placeholder={translations.pagamentoLogradouro} />
              <input type="text" name="pagamentoNumero" placeholder={translations.pagamentoNumero} />
            </div>
            <ReCAPTCHA sitekey="SUA_CHAVE_DO_SITE_AQUI" onChange={handleRecaptchaChange} />
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>Anterior</button>
              <button type="submit">{translations.submit}</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-content">
            <h3>{translations.success}</h3>
            <div className="setep-link-alerta">
              <div className="setep-link-alerta-header">
                <ReactSVG src={Warning} />
               {translations.aguardandoPagamento}
              </div>
              <div className="setep-link-alerta-content">
                <p>
                  <b>{translations.linkDePagamento}: </b>
                  <a href={translations.linkPagamento} target="_blank">{translations.linkPagamento}</a>
                </p>
              </div>
            </div>
            <div className="navigation-buttons">
              <button type="button">{translations.acessarLink}</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
