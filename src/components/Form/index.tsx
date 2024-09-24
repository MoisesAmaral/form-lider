import  { useContext, useState } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';


export const Form = () => {
  const { translations } = useContext(LanguageContext)!;
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // Função chamada ao submeter o formulário
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
        <label>{translations.name}</label>
        <input type="text" name="name" placeholder={translations.namePlaceholder} />

        <label>{translations.email}</label>
        <input type="email" name="email" placeholder={translations.emailPlaceholder} />

        <label>{translations.cpf}</label>
        <input type="text" name="cpf" placeholder={translations.cpfPlaceholder} />

        <label>{translations.cnpj}</label>
        <input type="text" name="cnpj" placeholder={translations.cnpjPlaceholder} />

        <label>{translations.companyName}</label>
        <input type="text" name="companyName" placeholder={translations.companyNamePlaceholder} />

        <label>{translations.phoneNumber}</label>
        <input type="tel" name="phoneNumber" placeholder={translations.phoneNumberPlaceholder} />

        <label>{translations.nationality}</label>
        <select name="nationality">
          <option>{translations.nationalFlight}</option>
          <option>{translations.internationalFlight}</option>
        </select>

        <fieldset>
          <legend>{translations.flightType}</legend>
          <label>
            <input type="radio" name="flightType" value="national" />
            {translations.nationalFlight}
          </label>
          <label>
            <input type="radio" name="flightType" value="international" />
            {translations.internationalFlight}
          </label>
        </fieldset>

        <label>{translations.servicesRequired}</label>
        <textarea name="servicesRequired" placeholder={translations.servicesRequiredPlaceholder}></textarea>
        <ReCAPTCHA
          sitekey="SUA_CHAVE_DO_SITE_AQUI"  // Substitua pela chave do site
          onChange={handleRecaptchaChange}
      />

        <button type="submit">{translations.submit}</button>
      </form>
    </div>
  );
};
