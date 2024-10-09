import { useEffect, useState } from 'react'
import { LanguageProvider } from './../src/context/LanguageContext'
import { MultiStepForm } from './../src/components/Form'
import { Modal } from './components/Modal'
import { Footer } from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './components/header'
import { Loader } from './components/Loader'
import { LoaderContext } from './context/LoaderContext'

export const RECAPTCHA_SITE_KEY = import.meta.env
  .VITE_REACT_APP_RECAPTCHA_SITE_KEY

export const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])
  return (
    <LoaderContext.Provider value={{ loader, setLoader }}>
      {loader && <Loader />}
      <LanguageProvider>
        <Header />
        <ToastContainer />

        <MultiStepForm />
        {isOpen && <Modal onClose={() => setIsOpen(false)} />}
        <Footer />
      </LanguageProvider>
    </LoaderContext.Provider>
  )
}
