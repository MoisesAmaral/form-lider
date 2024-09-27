import { useContext, useState } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

export const Form = () => {
  const { translations } = useContext(LanguageContext)!;
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      toast('Por favor, complete o reCAPTCHA', { type: 'error' });
      return;
    }

    // Aqui você pode enviar o recaptchaToken ao seu backend para verificar a resposta
    console.log('reCAPTCHA Token:', recaptchaToken);
    // Enviar os dados do formulário
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="form-container">
      <h1>{translations.formTitle}</h1>
      <form onSubmit={handleSubmit}>
        <label>{translations.email}</label>
        <input type="email" name="email" placeholder={translations.email} />

        <label>{translations.operator}</label>
        <input type="text" name="operator" placeholder={translations.operator} />

        <label>{translations.registration}</label>
        <input type="text" name="registration" placeholder={translations.registration} />

        <label>{translations.aircraftModel}</label>
        <input type="text" name="aircraftModel" placeholder={translations.aircraftModel} />

        <label>{translations.mtow}</label>
        <input type="text" name="mtow" placeholder={translations.mtow} />

        <label>{translations.contractHandler}</label>
        <input type="text" name="contractHandler" placeholder={translations.contractHandler} />

        <label>{translations.eta}</label>
        <input type="datetime-local" name="eta" placeholder={translations.eta} />

        <label>{translations.from}</label>
        <input type="text" name="from" placeholder={translations.from} />

        <label>{translations.etd}</label>
        <input type="datetime-local" name="etd" placeholder={translations.etd} />

        <label>{translations.to}</label>
        <input type="text" name="to" placeholder={translations.to} />

        <label>{translations.pic}</label>
        <input type="text" name="pic" placeholder={translations.pic} />

        <label>{translations.passengers}</label>
        <input type="number" name="passengers" placeholder={translations.passengers} />

        <label>{translations.avoePermit}</label>
        <input type="text" name="avoePermit" placeholder={translations.avoePermit} />

        <label>{translations.purposeOfFlight}</label>
        <textarea name="purposeOfFlight" placeholder={translations.purposeOfFlight}></textarea>

        <label>{translations.headOnBoard}</label>
        <select name="headOnBoard">
          <option value="yes">{translations.headOnBoardYes}</option>
          <option value="no">{translations.headOnBoardNo}</option>
        </select>

        <h2>{translations.paymentDetails}</h2>
        <label>{translations.company}</label>
        <input type="text" name="company" placeholder={translations.company} />

        <label>{translations.contactPerson}</label>
        <input type="text" name="contactPerson" placeholder={translations.contactPerson} />

        <label>{translations.mobile}</label>
        <input type="tel" name="mobile" placeholder={translations.mobile} />

        <label>{translations.address}</label>
        <input type="text" name="address" placeholder={translations.address} />

        <ReCAPTCHA
          sitekey="SUA_CHAVE_DO_SITE_AQUI" // Substitua pela chave do site
          onChange={handleRecaptchaChange}
        />

        <button type="submit">{translations.submit}</button>
      </form>
    </div>
  );
};
