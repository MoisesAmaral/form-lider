import { useContext } from 'react';
import { LanguageContext } from './../../context/LanguageContext';
import Pt from './../../assets/br.png';
import En from '../../assets/ing.png';
import Es from './../../assets/es.png';
import G20 from './../../assets/g20.svg';
import Arrow from './../../assets/arrow.svg';
import Logo from './../../assets/logo-remov.png';

export const LanguageSwitcher = () => {
  const { setLanguage } = useContext(LanguageContext)!;

  return (
    <div className="language-switcher">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}>
        <div>
          <img src={G20} alt="" style={{
            width: '100px',
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
          <img src={Logo} alt="" style={{
            width: '240px',
          }} />
        </div> 
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
      }}>
        <button onClick={() => setLanguage('pt')} className="flag-button">
          <img src={Pt} alt="Portuguese" className="flag" />
        </button>
        <button onClick={() => setLanguage('en')} className="flag-button">
          <img src={En} alt="English" className="flag" />
        </button>
        <button onClick={() => setLanguage('es')} className="flag-button">
          <img src={Es} alt="Spanish" className="flag" />
        </button>
      </div>
      
    </div>
  );
};
