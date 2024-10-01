import G20 from './../../assets/g20.svg';
import Arrow from './../../assets/airplane.svg';
import Logo from './../../assets/Logo-bg.png';

import './styles.scss';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const Header = () => {
 return (
    <div className="header">
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
        <LanguageSwitcher />
      </div>
  );
};
