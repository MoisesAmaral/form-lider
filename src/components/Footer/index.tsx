import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { ReactSVG } from 'react-svg'
import tel from '../../assets/tel.svg'
import email from '../../assets/email.svg'
import zap from '../../assets/zap.svg'
import './styles.css'

export const Footer = () => {
  const { translations } = useContext(LanguageContext)!
  return (
    <>
      <div className="linha-footer-1">
        <ul
          id="menu-rodape"
          className="plugdados-widgets-menus menu-horizontal"
        >
          <li className="parceiro plugdados-widget-menu-url-externa">
            <a href="javascript" target="_self" title={translations.associada}>
              {translations.associada}
            </a>
            <ul>
              <li className="parceiro-item plugdados-widget-menu-url-externa">
                <a
                  href="https://www.abag.org.br/"
                  target="_blank"
                  title="ABAG"
                  rel="noreferrer"
                >
                  <span className="plugdados-widgets-menu-imagem">
                    <img
                      src="https://www.lideraviacao.com.br/pt-br/vector/arquivos/plugdados/menus/abag-1009.png"
                      alt="Imagem do menu"
                      height="100"
                    />
                  </span>
                  <span className="plugdados-widgets-menu-texto">ABAG</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="certificacoes plugdados-widget-menu-url-externa">
            <a href="javascript" target="_self" title="CERTIFICAÇÕES">
              {translations.certificacoes}
            </a>
            <ul>
              <li className="certificacao-item plugdados-widget-menu-url-externa">
                <a
                  href="./certificacoes-e-homologacoes"
                  target="_self"
                  title={translations.certificacoes}
                >
                  CERTIFICAÇÕES ITEM
                </a>
              </li>
            </ul>
          </li>
          <li className="redes-sociais plugdados-widget-menu-url-externa">
            <a href="javascript" target="_self" title="ACOMPANHE A LIDER">
              ACOMPANHE A LIDER
            </a>
            <ul>
              <li className="icon-facebook plugdados-widget-menu-url-externa">
                <a
                  href="https://www.facebook.com/lideraviacao?fref=ts"
                  target="_blank"
                  title="Facebook"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li className="icon-instagram plugdados-widget-menu-url-externa">
                <a
                  href="https://www.instagram.com/lider_aviacao/"
                  target="_blank"
                  title="Instagram"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="icon-linkedin plugdados-widget-menu-url-externa">
                <a
                  href="https://www.linkedin.com/company/lider-aviation/"
                  target="_blank"
                  title="Linkedin"
                  rel="noreferrer"
                >
                  Linkedin
                </a>
              </li>
              <li className="icon-twitter plugdados-widget-menu-url-externa">
                <a
                  href="https://twitter.com/Lider_Aviacao"
                  target="_blank"
                  title="Twitter"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li className="icon-youtube plugdados-widget-menu-url-externa">
                <a
                  href="https://www.youtube.com/user/TheLiderAviacao"
                  target="_blank"
                  title="Youtube"
                  rel="noreferrer"
                >
                  Youtube
                </a>
              </li>
              <li className="icon-wp plugdados-widget-menu-url-externa">
                <a
                  href="http://blog.lideraviacao.com.br/"
                  target="_blank"
                  title="Blog"
                  rel="noreferrer"
                >
                  Blog
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://www.lideraviacao.com.br/pt-br/politica-de-privacidade"
              target="_blank"
              title={translations.politicaPrivacidade}
              rel="noreferrer"
            >
              {translations.politicaPrivacidade}
            </a>
          </li>
        </ul>
      </div>

      <div className="containner-footer">
        <div className="content-footer">
          <p
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '30px',
            }}
          >
            {translations.duvidas}
          </p>
          <div className="icons-display">
            <div>
              <ReactSVG src={tel} />
              <a
                style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                href="tel:+551150904016"
                title="0800 729 7474"
              >
                +55 11 5090-4016 / 4017 / 4018
              </a>
            </div>
            <div>
              <ReactSVG src={zap} />
              <a
                style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                href="https://wa.me/5511948770024"
                title="WhatsApp"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div>
              <ReactSVG src={email} />
              <a
                style={{ color: 'white' }}
                href="mailto:lider.ops@lideraviacao.com.br"
                title="lider.ops@lideraviacao.com.br"
              >
                lider.ops@lideraviacao.com.br
              </a>
            </div>
          </div>
          <p className="spanitem">{translations.footerInfo}</p>
        </div>
      </div>
    </>
  )
}
