import { useContext, useState } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import G20 from './../../assets/g20.svg';
import Arrow from './../../assets/airplane.svg';
import Logo from './../../assets/Logo-bg.png';
import pt from './../../assets/br.svg';
import en from './../../assets/us.svg';
import es from './../../assets/es.svg';

export const LanguageSwitcher = () => {
  const { setLanguage, language } = useContext(LanguageContext)!;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="language-switcher">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div>
            <img src={Logo} alt="" style={{ width: '240px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginRight: '50px',
              marginLeft: '50px',
            }}
          >
            <img src={Arrow} alt="" />
            <img src={Arrow} alt="" />
            <img src={Arrow} alt="" />
          </div>

          <div>
            <img src={G20} alt="" style={{ width: '80px' }} />
          </div>
        </div>

        <div className="language-switcher__dropdown-container" style={{ position: 'relative' }}>
          {/* Botão de idioma */}
          <span className="language-switcher__label">
            {language === 'pt' ? 'Idioma' : language === 'en' ? 'Language' : 'Idioma'}
            </span>
          <button onClick={toggle} className="flag-button">
            <img
              src={language === 'pt' ? pt : language === 'en' ? en : es}
              alt="Language"
              className="selected"              
            />
          </button>

          {/* Menu dropdown */}
          {isOpen && (
            <div className={`menu-drop-down ${isOpen ? 'open' : ''}`}>
              <button onClick={() => { setLanguage('pt'); setIsOpen(false); }}>
                <img src={pt} alt="Português" className={language === 'pt' ? 'selected' : 'flag'} /> Português
              </button>
              <button onClick={() => { setLanguage('en'); setIsOpen(false); }}>
                <img src={en} alt="English" className={language === 'en' ? 'selected' : 'flag'} /> English
              </button>
              <button onClick={() => { setLanguage('es'); setIsOpen(false); }}>
                <img src={es} alt="Español" className={language === 'es' ? 'selected' : 'flag'} /> Español
              </button>
            </div>
          )}
        </div>
      </div>
  );
};
