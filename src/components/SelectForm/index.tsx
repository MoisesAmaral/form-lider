import type React from 'react'
import { useContext, useState } from 'react'
import './styles.css'

interface Option {
  value: string
  label: string
}

interface CustomDropdownProps {
  options: Option[]
  language?: string
  onOptionSelect: (selected: string) => void
}

export const SelectForm: React.FC<CustomDropdownProps> = ({
  options,
  language,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>('')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: Option) => {
    setSelected(option.label)
    onOptionSelect(option.value)
    setIsOpen(false)
  }

  return (
    <div className="custom-select">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="select-box" onClick={toggleDropdown}>
        <span className="selected">{selected || language}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="options-container">
          {options.map(option => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={option.value}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
