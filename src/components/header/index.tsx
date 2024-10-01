import G20 from './../../assets/g20.svg';
import Arrow from './../../assets/airplane.svg';
import Logo from './../../assets/Logo-bg.png';

import './styles.scss';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const Header = () => {
 return (
    <div className="header">
      <div className='header__content'>     
        <div>
          <img src={Logo} alt="" className='imgHeader' />
        </div>
        <div >
          <img src={Arrow} alt=""className='imgArrow' />
        </div>
        <div >
          <img src={G20} alt="" className='imgG20' />
        </div>
      </div>     
          <LanguageSwitcher />
    </div>
  );
};
