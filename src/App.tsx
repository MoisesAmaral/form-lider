
import { useEffect, useState } from 'react';
import { LanguageProvider } from './../src/context/LanguageContext';
import {Form} from './../src/components/Form';
import {LanguageSwitcher} from './../src/components/LanguageSwitcher';
import { Modal } from './components/Modal';


export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    setIsOpen(true);
  }
  , []);
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Form />
      {isOpen &&
      <Modal  onClose={()=> setIsOpen(false)}/>
      }
    </LanguageProvider>
  );
};