import { useContext, useState } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import pt from './../../assets/br.svg';
import en from './../../assets/us.svg';
import './styles.scss';

export const LanguageSwitcher = () => {
  const { setLanguage, language } = useContext(LanguageContext)!;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <div className='language-switcher'>
        <div className="language-switcher__dropdown-container" style={{ position: 'relative' }}>
          <button onClick={toggle} className="flag-button">
            <img
              src={language === 'pt' ? pt :  en }
              alt="Language"
              className="selected"              
            />
          </button>

          {/* Menu dropdown */}
          {isOpen && (
            <div className={`menu-drop-down ${isOpen ? 'open' : ''}`}>
              <button  className='button' onClick={() => { setLanguage('pt'); setIsOpen(false); }}>
                <img src={pt} alt="Português" className={language === 'pt' ? 'selected' : 'flag'} /> Português
              </button>
              <button  className='button' onClick={() => { setLanguage('en'); setIsOpen(false); }}>
                <img src={en} alt="English" className={language === 'en' ? 'selected' : 'flag'} /> English
              </button>              
            </div>
          )}
        </div> 
        </div>       
  );
};
