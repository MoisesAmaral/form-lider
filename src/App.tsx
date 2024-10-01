
import { useEffect, useState } from 'react';
import { LanguageProvider } from './../src/context/LanguageContext';
import {MultiStepForm} from './../src/components/Form';
import { Modal } from './components/Modal';
import { Footer } from './components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Header } from './components/header';


export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    setIsOpen(true);
  }
  , []);
  return (
    <LanguageProvider>
      <Header />
      <ToastContainer />
      
      <MultiStepForm />
      {isOpen &&
      <Modal  onClose={()=> setIsOpen(false)}/>
      }
      <Footer />
    </LanguageProvider>
  );
};