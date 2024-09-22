
import { LanguageProvider } from './../src/context/LanguageContext';
import {Form} from './../src/components/Form';
import {LanguageSwitcher} from './../src/components/LanguageSwitcher';


export const App = () => {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Form />
    </LanguageProvider>
  );
};