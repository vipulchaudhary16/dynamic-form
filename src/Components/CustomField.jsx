import React, { useContext } from 'react'
import { DynamicInputContext, INPUT_TYPES } from '../context/dynamicInput.context'
import { CiCircleRemove } from 'react-icons/ci'
import { input_classes } from './styles'

export const CustomField = ({ field, setData }) => {
    const { id, label, options, type } = field
    const { removeOne } = useContext(DynamicInputContext)
    
    const handleRemoveField = () => {
        removeOne(id)
        setData(type, label, null)
    }
    return (
        <div className='w-full flex gap-4 items-center justify-end'>
            <label htmlFor="" className='mr-4'>{label}</label>
            {
                type == INPUT_TYPES.FILE && <input
                type="file"
                name={label}
                id={label}
                onChange={(e) => setData(INPUT_TYPES.FILE, e.target.name, e.target.files[0])}
                className={input_classes} />
            }
            {
                type == INPUT_TYPES.TEXT && <input
                type="text"
                name={label}
                id={label}
                onChange={(e) => setData(INPUT_TYPES.TEXT, e.target.name, e.target.value)}
                className={input_classes} />
            }
            {
                type == INPUT_TYPES.DROP_DOWN && <select
                    name={label}
                    id={label}
                    onChange={(e) => setData(INPUT_TYPES.DROP_DOWN, e.target.name, e.target.value)}
                    className={'w-96'}
                >
                    <option value=''>Select an option</option>
                    {options.map((option, ind) => <option key={option+ind} value={option}>{option}</option>)}
                </select>
            }
            <CiCircleRemove
                onClick={() => handleRemoveField()}
                className='remove-icon' />
        </div>
    )
}
