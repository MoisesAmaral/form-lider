import "./styles.css";
export const Footer = () => {
  return (
    <>
    <div>
      <div className="linha-footer-1">
        <ul
          id="menu-rodape"
          className="plugdados-widgets-menus menu-horizontal"
        >
          <li className="parceiro plugdados-widget-menu-url-externa">
            <a href="javascript:;" target="_self" title="ASSOCIADA">
              ASSOCIADA
            </a>
            <ul>
              <li className="parceiro-item plugdados-widget-menu-url-externa">
                <a href="https://www.abag.org.br/" target="_blank" title="ABAG">
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
            <a href="javascript:;" target="_self" title="CERTIFICAÇÕES">
              CERTIFICAÇÕES
            </a>
            <ul>
              <li className="certificacao-item plugdados-widget-menu-url-externa">
                <a
                  href="./certificacoes-e-homologacoes"
                  target="_self"
                  title="CERTIFICAÇÕES"
                >
                  CERTIFICAÇÕES ITEM
                </a>
              </li>
            </ul>
          </li>
          <li className="redes-sociais plugdados-widget-menu-url-externa">
            <a href="javascript:;" target="_self" title="ACOMPANHE A LIDER">
              ACOMPANHE A LIDER
            </a>
            <ul>
              <li className="icon-facebook plugdados-widget-menu-url-externa">
                <a
                  href="https://www.facebook.com/lideraviacao?fref=ts"
                  target="_blank"
                  title="Facebook"
                >
                  Facebook
                </a>
              </li>
              <li className="icon-instagram plugdados-widget-menu-url-externa">
                <a
                  href="https://www.instagram.com/lider_aviacao/"
                  target="_blank"
                  title="Instagram"
                >
                  Instagram
                </a>
              </li>
              <li className="icon-linkedin plugdados-widget-menu-url-externa">
                <a
                  href="https://www.linkedin.com/company/lider-aviation/"
                  target="_blank"
                  title="Linkedin"
                >
                  Linkedin
                </a>
              </li>
              <li className="icon-twitter plugdados-widget-menu-url-externa">
                <a
                  href="https://twitter.com/Lider_Aviacao"
                  target="_blank"
                  title="Twitter"
                >
                  Twitter
                </a>
              </li>
              <li className="icon-youtube plugdados-widget-menu-url-externa">
                <a
                  href="https://www.youtube.com/user/TheLiderAviacao"
                  target="_blank"
                  title="Youtube"
                >
                  Youtube
                </a>
              </li>
              <li className="icon-wp plugdados-widget-menu-url-externa">
                <a
                  href="http://blog.lideraviacao.com.br/"
                  target="_blank"
                  title="Blog"
                >
                  Blog
                </a>
              </li>
            </ul>
          </li>
          <li className="politica-privacidade plugdados-widget-menu-url-externa">
            <a
              href="https://www.lideraviacao.com.br/pt-br/politica-de-privacidade"
              target="_blank"
              title="Política de Privacidade"
            >
              Política de Privacidade
            </a>
          </li>
        </ul>
      </div>
      
    </div>
    <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    color:"#534541",
    marginBottom: "20px",
    }}>
    © 2024 Todos os direitos reservados - Líder Aviação -{" "}
    <span className="org">Sede</span> - Av. Santa Rosa, 123, São Luiz, Belo
    Horizonte/<span className="region">MG</span> - 31270 - 750 - Tel:
    (31)3490-4500
  </div>
  </>
  );
};
