
import { useEffect, useState } from 'react';
import { LanguageProvider } from './../src/context/LanguageContext';
import {Form} from './../src/components/Form';
import {LanguageSwitcher} from './../src/components/LanguageSwitcher';
import { Modal } from './components/Modal';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    setIsOpen(true);
  }
  , []);
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <ToastContainer />
      
      <Form />
      {isOpen &&
      <Modal  onClose={()=> setIsOpen(false)}/>
      }
      <Footer />
    </LanguageProvider>
  );
};