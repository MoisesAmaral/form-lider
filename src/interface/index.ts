export interface Contato {
  nomeContato: string // Nome do contato
  telefoneContato: string // Telefone do contato (mínimo 6 caracteres)
  emailContato: string // Email do contato (formato de email)
  operador: string // Nome do operador
  prefixo: string // Prefixo do contato
  modelo: string // Modelo do contato
  mtow: string // MTOW do contato
  contratoHandler: string // Handler do contrato
  origem: string // Origem do voo
  destino: string // Destino do voo
  eta: string // ETA (Estimated Time of Arrival)
  etd: string // ETD (Estimated Time of Departure)
  comandante: string // Nome do comandante
  numeroPax: string // Número de passageiros
  avoemPermit: string // Permissão de AVOEM
  propositoVoo: string // Propósito do voo
  headOnBoard: string // Responsável a bordo
  pagamentoResponsavel: string // Responsável pelo pagamento
  pagamentoContatoNome: string // Nome do contato de pagamento
  pagamentoContatoTelefone: string // Telefone do contato de pagamento
  pagamentoContatoEmail: string // Email do contato de pagamento
  pagamentoInscricaoEstadual?: string // Inscrição estadual (opcional)
  pagamentoInscricaoMunicipal?: string // Inscrição municipal (opcional)
  pagamentoTipoContribuinte?: string // Tipo de contribuinte (opcional)
  pagamentoDataNascimento: string // Data de nascimento do responsável pelo pagamento
  pagamentoLogradouro: string // Logradouro do endereço de pagamento
  pagamentoNumero: string // Número do endereço de pagamento
  pagamentoComplemento: string // Complemento do endereço de pagamento
  pagamentoBairro: string // Bairro do endereço de pagamento
  pagamentoCep: string // CEP do endereço de pagamento
  pagamentoEhPessoaFisica: string // Indica se é pessoa física ou jurídica
  pagamentoCnpj: string // CNPJ do responsável pelo pagamento
  pagamentoCpf: string // CPF do responsável pelo pagamento
  pagamentoPaisNome: string // Nome do país do responsável pelo pagamento
  pagamentoMunicipioNome: string // Nome do município do responsável pelo pagamento
  pagamentoEstadoNome: string // Nome do estado do responsável pelo pagamento
  pagamentoEhEstrangeiro: string // Indica se o pagamento é de estrangeiro
  linkPagamento?: string // Link para o pagamento (opcional)
  idiomaLinkPagamento: string // Idioma do link de pagamento (opcional)
  token?: string // Token de autenticação (opcional)

  pagamentoEfetuado?: string // Indica se o pagamento foi efetuado (opcional)
  error?: Partial<Record<keyof Contato, string>>
}
