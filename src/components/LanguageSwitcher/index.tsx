import { useContext } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import Pt from './../../assets/br.png';
import En from '../../assets/ing.png';
import Es from './../../assets/es.png';
import G20 from './../../assets/g20.svg';
import Arrow from './../../assets/airplane.svg';
import Logo from './../../assets/Logo-bg.png';

export const LanguageSwitcher = () => {
  const { setLanguage, language } = useContext(LanguageContext)!;

  return (
    <div className="language-switcher">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}>
          <div>
          <img src={Logo} alt="" style={{
            width: '240px',
          }} />
        </div> 
       
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginRight: '50px',
          marginLeft: '50px',
        }}>
          <img src={Arrow} alt="" />
          <img src={Arrow} alt="" />
          <img src={Arrow} alt="" />
        </div>
        <div>
          <img src={G20} alt="" style={{
            width: '80px',
          }} />
        </div>
      
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}>
        <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '10px',
        
      }}>
          <button onClick={() => setLanguage('pt')} className="flag-button">
            <img src={Pt} alt="Português" className={language === 'pt' ? 'selected' : 'flag'} />
          </button>
          <button onClick={() => setLanguage('en')} className="flag-button">
            <img src={En} alt="English" className={language === 'en' ? 'selected' : 'flag'} />
          </button>
          <button onClick={() => setLanguage('es')} className="flag-button">
            <img src={Es} alt="Spanish" className={language === 'es' ? 'selected' : 'flag'} />
          </button>
        </div>        
        <span style={{
          color: '#fff',
          fontWeight: 'bold',
          width: '160px',
          fontSize: '15px',
          textAlign: 'center',
        }}>{language === 'pt' ? 'Escolha o idioma' : language === 'en' ? 'Choose the language' : 'Elija el idioma'
                   
          }</span>
      </div>
      
    </div>
  );
};
