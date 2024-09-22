import  { useContext } from 'react';
import { LanguageContext } from './../../context/LanguageContext';


export const Form = () => {
  const { translations } = useContext(LanguageContext)!;

  return (
    <div className="form-container">
      <h1>{translations.formTitle}</h1>
      <form>
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

        <button type="submit">{translations.submit}</button>
      </form>
    </div>
  );
};
