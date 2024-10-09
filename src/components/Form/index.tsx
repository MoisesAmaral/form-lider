import { useCallback, useContext, useEffect, useState } from 'react'
import { LanguageContext } from './../../context/LanguageContext'
import type { Contato } from '../../interface/index'
import { toast } from 'react-toastify'
import Warning from './../../assets/warning-circle.svg'
import Arrow from './../../assets/arrow.svg'
import { ReactSVG } from 'react-svg'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { apiToCall } from '../../services/api'

import './styles.scss'
import { ModalConfirm } from '../ModalConfirm'
import { LoaderContext } from '../../context/LoaderContext'
import { SelectForm } from '../SelectForm'

dayjs.extend(customParseFormat)

export const MultiStepForm = () => {
  const { translations, language } = useContext(LanguageContext)!
  const [step, setStep] = useState(1)
  const [formValues, setFormValues] = useState<Contato>({} as Contato)
  const [newLinkPagamento, setNewLinkPagamento] = useState<string | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [openModalConfirm, setModalConfirm] = useState(false)
  const [isentoEstadual, setIsentoEstadual] = useState(false)
  const [isentoMunicipal, setIsentoMunicipal] = useState(false)

  const { setLoader } = useContext(LoaderContext)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setFormValues({
      ...formValues,
      pagamentoEhEstrangeiro: language === 'pt' ? 'N' : 'S',
      idiomaLinkPagamento: language === 'pt' ? 'P' : 'I',
    })
  }, [language])
  const handleReturnMessage = (messagePt: string, messageEn: string) =>
    language === 'pt' ? messagePt : messageEn

  const handleReturnMensageCaptcha = () =>
    handleReturnMessage(
      'Por favor, complete o reCAPTCHA',
      'Please, complete the reCAPTCHA'
    )

  const handleReturnMensageSendSucess = () =>
    handleReturnMessage(
      'Formulário enviado com sucesso!',
      'Form successfully submitted!'
    )

  const handleReturnMensageSendError = () =>
    handleReturnMessage(
      'Erro ao enviar o formulário, tente novamente mais tarde ou entre em contato!',
      'Error sending the form, try again later or contact us!'
    )

  const dataPost = {
    nomeContato: formValues.nomeContato,
    telefoneContato: formValues.telefoneContato,
    emailContato: formValues.emailContato,
    operador: formValues.operador,
    prefixo: formValues.prefixo,
    modelo: formValues.modelo,
    mtow: Number(formValues.mtow),
    contratoHandler: formValues.contratoHandler,
    eta: formValues.eta,
    origem: formValues.origem,
    etd: formValues.etd,
    destino: formValues.destino,
    comandante: formValues.comandante,
    numeroPax: formValues.numeroPax,
    avoemPermit: formValues.avoemPermit,
    propositoVoo: formValues.propositoVoo,
    headOnBoard: formValues.headOnBoard,
    pagamentoResponsavel: formValues.pagamentoResponsavel,
    pagamentoContatoNome: formValues.pagamentoContatoNome,
    pagamentoContatoTelefone: formValues.pagamentoContatoTelefone,
    pagamentoContatoEmail: formValues.pagamentoContatoEmail,
    pagamentoCpf: formValues.pagamentoCpf,
    pagamentoInscricaoEstadual: formValues.pagamentoInscricaoEstadual,
    pagamentoInscricaoMunicipal: formValues.pagamentoInscricaoMunicipal,
    pagamentoTipoContribuinte: formValues.pagamentoTipoContribuinte,
    pagamentoDataNascimento: formValues.pagamentoDataNascimento,
    pagamentoLogradouro: formValues.pagamentoLogradouro,
    pagamentoNumero: formValues.pagamentoNumero,
    pagamentoComplemento: formValues.pagamentoComplemento,
    pagamentoBairro: formValues.pagamentoBairro,
    pagamentoCep: formValues.pagamentoCep,
    pagamentoEhPessoaFisica: formValues.pagamentoEhPessoaFisica,
    pagamentoCnpj: formValues.pagamentoCnpj,
    pagamentoPaisNome: formValues.pagamentoPaisNome,
    pagamentoMunicipioNome: formValues.pagamentoMunicipioNome,
    pagamentoEstadoNome: formValues.pagamentoEstadoNome,
    pagamentoEhEstrangeiro: formValues.pagamentoEhEstrangeiro,
    idiomaLinkPagamento: formValues.idiomaLinkPagamento,
    pagamentoEfetuado: formValues.pagamentoEfetuado,
  }

  const validateFields = useCallback(() => {
    const error: Partial<Record<string, string>> = {}

    if (!formValues.nomeContato) {
      error.nomeContato =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.telefoneContato) {
      error.telefoneContato =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.emailContato) {
      error.emailContato =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    } else if (!/\S+@\S+\.\S+/.test(formValues.emailContato)) {
      error.emailContato =
        language === 'pt' ? 'Email inválido' : 'Invalid Email'
    }
    if (!formValues.operador) {
      error.operador =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.prefixo) {
      error.prefixo = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.modelo) {
      error.modelo = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.mtow) {
      error.mtow = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.eta) {
      error.eta = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.origem) {
      error.origem = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }

    if (!formValues.etd) {
      error.etd = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.destino) {
      error.destino = language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.contratoHandler) {
      error.contratoHandler =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.comandante) {
      error.comandante =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.numeroPax) {
      error.numeroPax =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.avoemPermit) {
      error.avoemPermit =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.propositoVoo) {
      error.propositoVoo =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.headOnBoard) {
      error.headOnBoard =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.contratoHandler) {
      error.contratoHandler =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoResponsavel) {
      error.pagamentoResponsavel =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoContatoNome) {
      error.pagamentoContatoNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoContatoTelefone) {
      error.pagamentoContatoTelefone =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoContatoEmail) {
      error.pagamentoContatoEmail =
        language === 'pt' ? 'Email inválido' : 'Invalid Email'
    }
    if (!formValues.pagamentoPaisNome) {
      error.pagamentoPaisNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoComplemento) {
      error.pagamentoComplemento =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoMunicipioNome) {
      error.pagamentoMunicipioNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoEstadoNome) {
      error.pagamentoEstadoNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoLogradouro) {
      error.pagamentoLogradouro =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoNumero) {
      error.pagamentoNumero =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoBairro) {
      error.pagamentoBairro =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoCep) {
      error.pagamentoCep =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (formValues.pagamentoEhEstrangeiro === 'N') {
      if (!formValues.pagamentoEhPessoaFisica) {
        error.pagamentoEhPessoaFisica =
          language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
      }
      if (formValues.pagamentoEhPessoaFisica === 'S') {
        if (!formValues.pagamentoCpf) {
          error.pagamentoCpf =
            language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
        }
        if (!formValues.pagamentoDataNascimento) {
          error.pagamentoDataNascimento =
            language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
        }
      }
      if (formValues.pagamentoEhPessoaFisica === 'N') {
        if (!formValues.pagamentoCnpj) {
          error.pagamentoCnpj =
            language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
        }
        if (!formValues.pagamentoInscricaoEstadual) {
          error.pagamentoInscricaoEstadual =
            language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
        }
        if (!formValues.pagamentoInscricaoMunicipal) {
          error.pagamentoInscricaoMunicipal =
            language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
        }
        if (!formValues.pagamentoTipoContribuinte) {
          error.pagamentoTipoContribuinte =
            language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
        }
      }
    }
    if (!formValues.pagamentoPaisNome) {
      error.pagamentoPaisNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoMunicipioNome) {
      error.pagamentoMunicipioNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    if (!formValues.pagamentoEstadoNome) {
      error.pagamentoEstadoNome =
        language === 'pt' ? 'Campo Obrigatório' : 'Required Field'
    }
    return error
  }, [formValues, language])

  const handlePostFormG20 = async () => {
    try {
      const response = await apiToCall.post('/FormularioG20', dataPost)
      const { data } = response

      toast(handleReturnMensageSendSucess(), { type: 'success' })
      setNewLinkPagamento(data.linkPagamento)

      if (data.linkPagamento) {
        setModalConfirm(false)
        setStep(5)
        setLoader(false)
      }
    } catch (__error) {
      toast(handleReturnMensageSendError(), { type: 'error' })
      setLoader(false)
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoader(true)
    if (!recaptchaToken) {
      toast(handleReturnMensageCaptcha(), { type: 'error' })
      setLoader(false)
      return
    }
    const error = validateFields()
    setFormValues({
      ...formValues,
      error,
    })
    if (Object.keys(error).length > 0) {
      toast('Por favor, confira os campos obrigatórios', { type: 'error' })
      setStep(1)
      setLoader(false)
    }
    setTimeout(() => {
      if (Object.keys(error).length === 0) {
        handlePostFormG20()
      }
    }, 2000)
  }
  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const totalSteps = 5

  const handleIsento = useCallback((state: boolean, fieldName: string) => {
    setFormValues(prevValues => {
      if (fieldName === 'inscricaoEstadual') {
        return {
          ...prevValues,
          pagamentoInscricaoEstadual: state ? 'ISENTO' : '',
        }
      }
      if (fieldName === 'inscricaoMunicipal') {
        return {
          ...prevValues,
          pagamentoInscricaoMunicipal: state ? 'ISENTO' : '',
        }
      }
      return prevValues
    })
  }, [])

  const handleSelect = (value: string) => {
    if (value === 'Schefe') {
      setFormValues({
        ...formValues,
        headOnBoard: 'S',
      })
    }
    if (value === 'Nchefe') {
      setFormValues({
        ...formValues,
        headOnBoard: 'N',
      })
    }
    if (value === 'PFisica') {
      setFormValues({
        ...formValues,
        pagamentoEhPessoaFisica: 'S',
      })
    }
    if (value === 'PJuridica') {
      setFormValues({
        ...formValues,
        pagamentoEhPessoaFisica: 'N',
      })
    }
    if (value === 'I') {
      setFormValues({
        ...formValues,
        pagamentoTipoContribuinte: 'I',
      })
    }
    if (value === 'C') {
      setFormValues({
        ...formValues,
        pagamentoTipoContribuinte: 'C',
      })
    }
  }

  return (
    <div className="form-container">
      <h1>{translations.formTitle}</h1>

      <div className="progress-bar-container">
        <div className="progress-bar">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={Number(i)}
              className={`step ${step === i + 1 ? 'active' : step > i + 1 ? 'completed' : ''}`}
            >
              <div className="step-item">
                <div className="circle">{i + 1}</div>
                <div className="setas">
                  {i + 1 < totalSteps && <ReactSVG src={Arrow} />}
                </div>
                <div className="label">{translations[`step${i + 1}Label`]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* button abaixo apenas para uso em desenvolvimento */}
        {/* <button type="button" onClick={() => prevStep()}>
          voltar
        </button> */}
      </div>

      <form onSubmit={e => onSubmit(e)}>
        {step === 1 && (
          <div className="step-content">
            <h4
              style={{
                marginBottom: '1rem',
                color: '#006048',
              }}
            >
              {translations.step1Label}
            </h4>
            <div className="input-row">
              <label
                className={
                  formValues.error?.nomeContato ? 'labelFormError' : 'labelForm'
                }
                htmlFor="nomeContato"
              >
                {translations.nomeContato}*
              </label>
              <input
                className={
                  formValues.error?.nomeContato ? 'inputFormError' : 'inputForm'
                }
                id="nomeContato"
                type="text"
                placeholder={formValues.error?.nomeContato}
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    nomeContato: e.target.value,
                  })
                }}
                defaultValue={formValues.nomeContato}
              />
            </div>
            <div className="input-row">
              <label
                className={
                  formValues.error?.telefoneContato
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="telefoneContato"
              >
                {translations.telefoneContato}*
              </label>
              <input
                defaultValue={formValues.telefoneContato}
                placeholder={formValues.error?.telefoneContato}
                className={
                  formValues.error?.telefoneContato
                    ? 'inputFormError'
                    : 'inputForm'
                }
                id="telefoneContato"
                type="tel"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    telefoneContato: e.target.value,
                  })
                }}
              />
            </div>
            <div className="input-row">
              <label
                className={
                  formValues.error?.emailContato
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="emailContato"
              >
                {translations.emailContato}*
              </label>
              <input
                defaultValue={formValues.emailContato}
                placeholder={formValues.error?.emailContato}
                className={
                  formValues.error?.emailContato
                    ? 'inputFormError'
                    : 'inputForm'
                }
                id="emailContato"
                type="email"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    emailContato: e.target.value,
                  })
                }}
              />
            </div>
            <div className="navigation-buttons">
              <button type="button" onClick={nextStep}>
                {translations.proximo}
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="step-content">
            <h4
              style={{
                marginBottom: '1rem',
                color: '#006048',
              }}
            >
              {translations.step2Label}
            </h4>
            <div className="input-row">
              <label
                className={
                  formValues.error?.operador ? 'labelFormError' : 'labelForm'
                }
                htmlFor="operador"
              >
                {translations.operador}*
              </label>
              <input
                defaultValue={formValues.operador}
                placeholder={formValues.error?.operador}
                className={
                  formValues.error?.operador ? 'inputFormError' : 'inputForm'
                }
                id="operador"
                type="text"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    operador: e.target.value,
                  })
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '50%',
                }}
              >
                <label
                  className={
                    formValues.error?.prefixo ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="prefixo"
                >
                  {translations.prefixo}*
                </label>
                <input
                  defaultValue={formValues.prefixo}
                  placeholder={formValues.error?.prefixo}
                  className={
                    formValues.error?.prefixo ? 'inputFormError' : 'inputForm'
                  }
                  id="prefixo"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      prefixo: e.target.value,
                    })
                  }}
                />
              </div>
              <div
                style={{
                  width: '50%',
                }}
              >
                <label
                  className={
                    formValues.error?.modelo ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="modelo"
                >
                  {translations.modelo}*
                </label>
                <input
                  defaultValue={formValues.modelo}
                  placeholder={formValues.error?.modelo}
                  className={
                    formValues.error?.modelo ? 'inputFormError' : 'inputForm'
                  }
                  id="modelo"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      modelo: e.target.value,
                    })
                  }}
                />
              </div>

              <div
                style={{
                  width: '30%',
                }}
              >
                <label
                  className={
                    formValues.error?.mtow ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="mtow"
                >
                  {translations.mtow}*
                </label>
                <input
                  defaultValue={formValues.mtow}
                  placeholder={formValues.error?.mtow}
                  className={
                    formValues.error?.mtow ? 'inputFormError' : 'inputForm'
                  }
                  id="mtow"
                  type="number"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      mtow: e.target.value,
                    })
                  }}
                />
              </div>
            </div>

            <div className="containnerMedia3">
              <div className="containnerMedia3__item">
                <label
                  className={
                    formValues.error?.eta ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="eta"
                >
                  {translations.eta}*
                </label>
                <input
                  defaultValue={dayjs(formValues.eta).format(
                    'YYYY-MM-DDTHH:mm'
                  )}
                  placeholder={formValues.error?.eta}
                  className={
                    formValues.error?.eta ? 'inputFormError' : 'inputForm'
                  }
                  id="eta"
                  type="datetime-local"
                  onChange={e => {
                    const selectedDateTime = e.target.value
                    const isoDateTime = dayjs(selectedDateTime).toISOString()
                    setFormValues({
                      ...formValues,
                      eta: isoDateTime,
                    })
                  }}
                />
              </div>
              <div className="containnerMedia3__item1">
                <label
                  className={
                    formValues.error?.origem ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="origem"
                >
                  {translations.origem}*
                </label>
                <input
                  defaultValue={formValues.origem}
                  placeholder={formValues.error?.origem}
                  className={
                    formValues.error?.origem ? 'inputFormError' : 'inputForm'
                  }
                  id="origem"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      origem: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div className="containnerMedia3">
              <div className="containnerMedia3__item">
                <label
                  className={
                    formValues.error?.etd ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="etd"
                >
                  {translations.etd}*
                </label>
                <input
                  defaultValue={dayjs(formValues.etd).format(
                    'YYYY-MM-DDTHH:mm'
                  )}
                  placeholder={formValues.error?.etd}
                  className={
                    formValues.error?.etd ? 'inputFormError' : 'inputForm'
                  }
                  id="etd"
                  type="datetime-local"
                  onChange={e => {
                    const selectedDateTime = e.target.value
                    const isoDateTime = dayjs(selectedDateTime).toISOString()
                    setFormValues({
                      ...formValues,
                      etd: isoDateTime,
                    })
                  }}
                />
              </div>
              <div className="containnerMedia3__item1">
                <label
                  className={
                    formValues.error?.destino ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="destino"
                >
                  {translations.destino}*
                </label>
                <input
                  defaultValue={formValues.destino}
                  placeholder={formValues.error?.destino}
                  className={
                    formValues.error?.destino ? 'inputFormError' : 'inputForm'
                  }
                  id="destino"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      destino: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>
                {translations.anterior}
              </button>
              <button type="button" onClick={nextStep}>
                {translations.proximo}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h4
              style={{
                marginBottom: '1rem',
                color: '#006048',
              }}
            >
              {translations.step3Label}
            </h4>
            <div className="input-row">
              <label
                className={
                  formValues.error?.comandante ? 'labelFormError' : 'labelForm'
                }
                htmlFor="comandante"
              >
                {translations.comandante}*
              </label>
              <input
                defaultValue={formValues.comandante}
                placeholder={formValues.error?.comandante}
                className={
                  formValues.error?.comandante ? 'inputFormError' : 'inputForm'
                }
                id="comandante"
                type="text"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    comandante: e.target.value,
                  })
                }}
              />
            </div>
            <div className="containnerMedia2">
              <div className="containnerMedia2__item">
                <label
                  className={
                    formValues.error?.numeroPax ? 'labelFormError' : 'labelForm'
                  }
                  htmlFor="numeroPax"
                >
                  {translations.numeroPax}*
                </label>
                <input
                  defaultValue={formValues.numeroPax}
                  placeholder={formValues.error?.numeroPax}
                  className={
                    formValues.error?.numeroPax ? 'inputFormError' : 'inputForm'
                  }
                  id="numeroPax"
                  type="number"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      numeroPax: e.target.value,
                    })
                  }}
                />
              </div>
              <div className="containnerMedia2__item">
                <label
                  className={
                    formValues.error?.headOnBoard
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="headOnBoard"
                >
                  {translations.headOnBoard}*
                </label>

                <SelectForm
                  options={[
                    { value: '', label: translations.selecione },
                    { value: 'Schefe', label: translations.yes },
                    { value: 'Nchefe', label: translations.no },
                  ]}
                  language={language === 'pt' ? 'Selecione' : 'Select'}
                  onOptionSelect={handleSelect}
                />
              </div>
            </div>
            <div className="input-row">
              <label
                className={
                  formValues.error?.avoemPermit ? 'labelFormError' : 'labelForm'
                }
                htmlFor="avoemPermit"
              >
                {translations.avoemPermit}*
              </label>
              <input
                defaultValue={formValues.avoemPermit}
                placeholder={formValues.error?.avoemPermit}
                className={
                  formValues.error?.avoemPermit ? 'inputFormError' : 'inputForm'
                }
                id="avoemPermit"
                type="text"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    avoemPermit: e.target.value,
                  })
                }}
              />
            </div>
            <div>
              <label
                className={
                  formValues.error?.propositoVoo
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="propositoVoo"
              >
                {translations.propositoVoo}*
              </label>
              <textarea
                defaultValue={formValues.propositoVoo}
                placeholder={formValues.error?.propositoVoo}
                className={
                  formValues.error?.propositoVoo
                    ? 'inputFormError'
                    : 'inputForm'
                }
                style={{
                  width: '100%',
                  height: '90px',
                }}
                id="propositoVoo"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    propositoVoo: e.target.value,
                  })
                }}
              />
            </div>
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>
                {translations.anterior}
              </button>
              <button type="button" onClick={nextStep}>
                {translations.proximo}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h4
              style={{
                marginBottom: '1rem',
                color: '#006048',
              }}
            >
              {translations.step4Label}
            </h4>

            <div className="input-row">
              <label
                className={
                  formValues.error?.contratoHandler
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="operador"
              >
                {translations.contratoHandler}*
              </label>
              <input
                defaultValue={formValues.contratoHandler}
                placeholder={formValues.error?.contratoHandler}
                className={
                  formValues.error?.contratoHandler
                    ? 'inputFormError'
                    : 'inputForm'
                }
                id="contratoHandler"
                type="text"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    contratoHandler: e.target.value,
                  })
                }}
              />
            </div>

            {formValues.pagamentoEhEstrangeiro === 'N' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '40%',
                  }}
                >
                  <label
                    className={
                      formValues.error?.pagamentoResponsavel
                        ? 'labelFormError'
                        : 'labelForm'
                    }
                    htmlFor="pagamentoResponsavel"
                  >
                    {translations.pagamentoEhPessoaFisica}*
                  </label>

                  <SelectForm
                    options={[
                      { value: '', label: translations.selecione },
                      { value: 'PFisica', label: translations.yes },
                      { value: 'PJuridica', label: translations.no },
                    ]}
                    language={language === 'pt' ? 'Selecione' : 'Select'}
                    onOptionSelect={handleSelect}
                  />
                </div>
                {formValues.pagamentoEhPessoaFisica === 'S' && (
                  <div
                    style={{
                      width: '60%',
                    }}
                  >
                    <label
                      className={
                        formValues.error?.pagamentoCpf
                          ? 'labelFormError'
                          : 'labelForm'
                      }
                      htmlFor="pagamentoCpf"
                    >
                      {translations.pagamentoCpf}
                    </label>
                    <input
                      defaultValue={formValues.pagamentoCpf}
                      placeholder={formValues.error?.pagamentoCpf}
                      className={
                        formValues.error?.pagamentoCpf
                          ? 'inputFormError'
                          : 'inputForm'
                      }
                      id="pagamentoCpf"
                      type="text"
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          pagamentoCpf: e.target.value,
                        })
                      }}
                    />
                  </div>
                )}
                {formValues.pagamentoEhPessoaFisica === 'N' && (
                  <div
                    style={{
                      width: '60%',
                    }}
                  >
                    <label
                      className={
                        formValues.error?.pagamentoCnpj
                          ? 'labelFormError'
                          : 'labelForm'
                      }
                      htmlFor="pagamentoCnpj"
                    >
                      {translations.pagamentoCnpj}
                    </label>
                    <input
                      defaultValue={formValues.pagamentoCnpj}
                      placeholder={formValues.error?.pagamentoCnpj}
                      className={
                        formValues.error?.pagamentoCnpj
                          ? 'inputFormError'
                          : 'inputForm'
                      }
                      id="pagamentoCnpj"
                      type="text"
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          pagamentoCnpj: e.target.value,
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {formValues.pagamentoEhPessoaFisica === 'N' && (
              <div className="containnerMedia">
                <div className="containnerMedia__item">
                  <label
                    className={
                      formValues.error?.pagamentoInscricaoEstadual
                        ? 'labelFormError'
                        : 'labelForm'
                    }
                    htmlFor="pagamentoInscricaoEstadual"
                  >
                    {translations.pagamentoInscricaoEstadual}
                  </label>
                  <input
                    value={formValues.pagamentoInscricaoEstadual}
                    placeholder={formValues.error?.pagamentoInscricaoEstadual}
                    className={
                      formValues.error?.pagamentoInscricaoEstadual
                        ? 'inputFormError'
                        : 'inputForm'
                    }
                    id="pagamentoInscricaoEstadual"
                    type="text"
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        pagamentoInscricaoEstadual: e.target.value,
                      })
                    }}
                  />
                  <div className="form-check form-switch isento">
                    <input
                      checked={
                        formValues.pagamentoInscricaoEstadual === 'ISENTO'
                      }
                      className="form-check-input"
                      type="checkbox"
                      onClick={() => {
                        setIsentoEstadual(!isentoEstadual) // Alterna o estado
                        handleIsento(!isentoEstadual, 'inscricaoEstadual') // Atualiza o formValues
                      }}
                    />
                    <label
                      className="form-check-label-isento"
                      htmlFor="tipoPessoa"
                      data-tip="Pessoa física ou jurídica"
                      data-for="tooltip"
                    >
                      Isento
                    </label>
                  </div>
                </div>
                <div className="containnerMedia__item">
                  <label
                    className={
                      formValues.error?.pagamentoInscricaoMunicipal
                        ? 'labelFormError'
                        : 'labelForm'
                    }
                    htmlFor="pagamentoInscricaoMunicipal"
                  >
                    {translations.pagamentoInscricaoMunicipal}
                  </label>
                  <input
                    value={formValues.pagamentoInscricaoMunicipal}
                    placeholder={formValues.error?.pagamentoInscricaoMunicipal}
                    className={
                      formValues.error?.pagamentoInscricaoMunicipal
                        ? 'inputFormError'
                        : 'inputForm'
                    }
                    id="pagamentoInscricaoMunicipal"
                    type="text"
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        pagamentoInscricaoMunicipal: e.target.value,
                      })
                    }}
                  />
                  <div className="form-check form-switch isento">
                    <input
                      checked={
                        formValues.pagamentoInscricaoMunicipal === 'ISENTO'
                      }
                      className="form-check-input"
                      type="checkbox"
                      onClick={() => {
                        setIsentoMunicipal(!isentoMunicipal) // Alterna o estado
                        handleIsento(!isentoMunicipal, 'inscricaoMunicipal') // Atualiza o formValues
                      }}
                    />
                    <label
                      className="form-check-label-isento"
                      htmlFor="tipoPessoa"
                      data-tip="Pessoa física ou jurídica"
                      data-for="tooltip"
                    >
                      Isento
                    </label>
                  </div>
                </div>
                <div className="containnerMedia__item1">
                  <label
                    className={
                      formValues.error?.pagamentoTipoContribuinte
                        ? 'labelFormError'
                        : 'labelForm'
                    }
                    htmlFor="pagamentoTipoContribuinte"
                  >
                    {translations.pagamentoTipoContribuinte}*
                  </label>
                  <SelectForm
                    options={[
                      { value: 'I', label: 'Industrial' },
                      { value: 'C', label: 'Comercial' },
                    ]}
                    language={language === 'pt' ? 'Selecione' : 'Select'}
                    onOptionSelect={handleSelect}
                  />

                  <div
                    style={{
                      height: '25px',
                      marginBottom: '12px',
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <div
                style={{
                  width: '100%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoResponsavel
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoPaisNome"
                >
                  {translations.pagamentoPaisNome}*
                </label>
                <input
                  defaultValue={formValues.pagamentoPaisNome}
                  placeholder={
                    formValues.error?.pagamentoPaisNome
                      ? translations.obrigatorio
                      : ''
                  }
                  className={
                    formValues.error?.pagamentoPaisNome
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoPaisNome"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoPaisNome: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '50%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoEstadoNome
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoEstadoNome"
                >
                  {translations.pagamentoEstadoNome}*
                </label>
                <input
                  defaultValue={formValues.pagamentoEstadoNome}
                  placeholder={formValues.error?.pagamentoEstadoNome}
                  className={
                    formValues.error?.pagamentoEstadoNome
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoEstadoNome"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoEstadoNome: e.target.value,
                    })
                  }}
                />
              </div>

              <div
                style={{
                  width: '50%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoMunicipioNome
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoMunicipioNome"
                >
                  {translations.pagamentoMunicipioNome}*
                </label>
                <input
                  defaultValue={formValues.pagamentoMunicipioNome}
                  placeholder={formValues.error?.pagamentoMunicipioNome}
                  className={
                    formValues.error?.pagamentoMunicipioNome
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoMunicipioNome"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoMunicipioNome: e.target.value,
                    })
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '50%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoBairro
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoBairro"
                >
                  {translations.pagamentoBairro}*
                </label>
                <input
                  defaultValue={formValues.pagamentoBairro}
                  placeholder={formValues.error?.pagamentoBairro}
                  className={
                    formValues.error?.pagamentoBairro
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoBairro"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoBairro: e.target.value,
                    })
                  }}
                />
              </div>
              <div
                style={{
                  width: '50%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoLogradouro
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoLogradouro"
                >
                  {translations.pagamentoLogradouro}*
                </label>
                <input
                  defaultValue={formValues.pagamentoLogradouro}
                  placeholder={formValues.error?.pagamentoLogradouro}
                  className={
                    formValues.error?.pagamentoLogradouro
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoLogradouro"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoLogradouro: e.target.value,
                    })
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '30%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoNumero
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoNumero"
                >
                  {translations.pagamentoNumero}*
                </label>
                <input
                  defaultValue={formValues.pagamentoNumero}
                  placeholder={formValues.error?.pagamentoNumero}
                  className={
                    formValues.error?.pagamentoNumero
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoNumero"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoNumero: e.target.value,
                    })
                  }}
                />
              </div>

              <div
                style={{
                  width: '40%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoComplemento
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoComplemento"
                >
                  {translations.pagamentoComplemento}*
                </label>
                <input
                  defaultValue={formValues.pagamentoComplemento}
                  placeholder={formValues.error?.pagamentoComplemento}
                  className={
                    formValues.error?.pagamentoComplemento
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoComplemento"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoComplemento: e.target.value,
                    })
                  }}
                />
              </div>

              <div
                style={{
                  width: '60%',
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoCep
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoCep"
                >
                  {translations.pagamentoCep}*
                </label>
                <input
                  defaultValue={formValues.pagamentoCep}
                  placeholder={formValues.error?.pagamentoCep}
                  className={
                    formValues.error?.pagamentoCep
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoCep"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoCep: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <div className="input-row">
              <label
                className={
                  formValues.error?.pagamentoResponsavel
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="pagamentoResponsavel"
              >
                {translations.pagamentoResponsavel}*
              </label>
              <input
                defaultValue={formValues.pagamentoResponsavel}
                placeholder={formValues.error?.pagamentoResponsavel}
                className={
                  formValues.error?.pagamentoResponsavel
                    ? 'inputFormError'
                    : 'inputForm'
                }
                id="pagamentoResponsavel"
                type="text"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    pagamentoResponsavel: e.target.value,
                  })
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: `${formValues.pagamentoEhPessoaFisica === 'S' ? '50%' : '100%'}`,
                }}
              >
                <label
                  className={
                    formValues.error?.pagamentoContatoNome
                      ? 'labelFormError'
                      : 'labelForm'
                  }
                  htmlFor="pagamentoContatoNome"
                >
                  {translations.pagamentoContatoNome}*
                </label>
                <input
                  defaultValue={formValues.pagamentoContatoNome}
                  placeholder={formValues.error?.pagamentoContatoNome}
                  className={
                    formValues.error?.pagamentoContatoNome
                      ? 'inputFormError'
                      : 'inputForm'
                  }
                  id="pagamentoContatoNome"
                  type="text"
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      pagamentoContatoNome: e.target.value,
                    })
                  }}
                />
              </div>
              {formValues.pagamentoEhPessoaFisica === 'S' && (
                <div
                  style={{
                    width: '50%',
                  }}
                >
                  <label
                    className={
                      formValues.error?.pagamentoContatoTelefone
                        ? 'labelFormError'
                        : 'labelForm'
                    }
                    htmlFor="pagamentoDataNascimento"
                  >
                    {translations.pagamentoDataNascimento}*
                  </label>
                  <input
                    placeholder={formValues.error?.pagamentoDataNascimento}
                    className={
                      formValues.error?.pagamentoDataNascimento
                        ? 'inputFormError'
                        : 'inputForm'
                    }
                    id="pagamentoDataNascimento"
                    type="date"
                    onChange={e => {
                      const selectedDate = e.target.value
                      const isoDate = dayjs(selectedDate).toISOString()
                      setFormValues({
                        ...formValues,
                        pagamentoDataNascimento: isoDate,
                      })
                    }}
                    defaultValue={dayjs(
                      formValues.pagamentoDataNascimento
                    ).format('YYYY-MM-DD')}
                  />
                </div>
              )}
            </div>
            <div className="input-row">
              <label
                className={
                  formValues.error?.pagamentoContatoEmail
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="pagamentoContatoTelefone"
              >
                {translations.pagamentoContatoTelefone}*
              </label>
              <input
                defaultValue={formValues.pagamentoContatoTelefone}
                placeholder={formValues.error?.pagamentoContatoTelefone}
                className={
                  formValues.error?.pagamentoContatoTelefone
                    ? 'inputFormError'
                    : 'inputForm'
                }
                id="pagamentoContatoTelefone"
                type="text"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    pagamentoContatoTelefone: e.target.value,
                  })
                }}
              />
            </div>
            <div className="input-row">
              <label
                className={
                  formValues.error?.pagamentoContatoEmail
                    ? 'labelFormError'
                    : 'labelForm'
                }
                htmlFor="pagamentoContatoEmail"
              >
                {translations.pagamentoContatoEmail}*
              </label>
              <input
                defaultValue={formValues.pagamentoContatoEmail}
                placeholder={formValues.error?.pagamentoContatoEmail}
                className={
                  formValues.error?.pagamentoContatoEmail
                    ? 'inputFormError'
                    : 'inputForm'
                }
                id="pagamentoContatoEmail"
                type="email"
                onChange={e => {
                  setFormValues({
                    ...formValues,
                    pagamentoContatoEmail: e.target.value,
                  })
                }}
              />
            </div>
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep}>
                {translations.anterior}
              </button>
              <button type="button" onClick={() => setModalConfirm(true)}>
                {translations.submit}
              </button>
            </div>
          </div>
        )}
        {openModalConfirm && (
          <ModalConfirm
            reCaptchaToken={setRecaptchaToken}
            onClose={() => setModalConfirm(false)}
          />
        )}

        {step === 5 && (
          <div className="step-content">
            <h3>{translations.success}</h3>
            <div className="setep-link-alerta">
              <div className="setep-link-alerta-header">
                <ReactSVG src={Warning} />
                {translations.aguardandoPagamento}
              </div>
              <div className="setep-link-alerta-content">
                <p>
                  <b>{translations.linkDePagamento}: </b>
                  <a
                    href={newLinkPagamento || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {newLinkPagamento}
                  </a>
                </p>
              </div>
            </div>
            <div className="navigation-buttons">
              <button
                type="button"
                onClick={() => {
                  if (newLinkPagamento) {
                    window.open(newLinkPagamento, '_blank')
                  }
                }}
              >
                {translations.acessarLink}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
