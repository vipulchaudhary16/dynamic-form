import React, { useContext, useState } from 'react'
import { DynamicInputContext, INPUT_TYPES } from '../context/dynamicInput.context'
import { button_classes, input_classes } from './styles'

export const FormMaker = () => {
    const [formField, setFormField] = useState({
        type: INPUT_TYPES.FILE,
        label: '',
        options: []
    })
    const [options, setOptions] = useState([])

    const { addNew } = useContext(DynamicInputContext)

    //generate unique id for each input field
    const generateUniqueId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            id += chars[randomIndex];
        }
        return id;
    }

    //handle add button click, add new input to the form
    const handleAdd = (e) => {
        e.preventDefault()

        if (!formField.label) {
            alert("Please enter label for the input")
            return
        }

        if (formField.type === INPUT_TYPES.DROP_DOWN && !formField.options.length) {
            alert("Please enter options for the dropdown")
            return
        }

        addNew({
            id: generateUniqueId(),
            label: formField.label,
            type: formField.type,
            options: formField.options
        })
        setOptions([])
        setFormField({
            label: '',
            options: []
        })
    }

    //handle add options button click, add new option to the dropdown
    const handleAddOptions = () => {
        setOptions([...options, ''])
    }

    const setOptionValue = (e, index) => {
        const newOptions = formField.options
        newOptions[index] = e.target.value
        setFormField({
            ...formField,
            options: newOptions
        })
    }

    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full'>
            <label htmlFor='form_maker_options' className='font-bold text-2xl'>Select an option to be insert in main form</label>
            <select id='form_maker_options' className='w-64' value={formField.type} onChange={(e) => { setFormField({ ...formField, type: e.target.value }) }}>
                <option value={INPUT_TYPES.FILE}>file</option>
                <option value={INPUT_TYPES.TEXT}>text</option>
                <option value={INPUT_TYPES.DROP_DOWN}>dropdown</option>
            </select>

            <input type="text" placeholder='Enter label for input' className={input_classes} value={formField.label} onChange={(e) => setFormField({ ...formField, label: e.target.value })} />

            {
                formField.type === INPUT_TYPES.DROP_DOWN && <>
                    {
                        options.map((_, index) => (
                            <input key={index} type="text" placeholder='Enter option' className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 px-4" onChange={(e) => setOptionValue(e, index)} />))
                    }
                    <button onClick={(e) => handleAddOptions(e)} className={button_classes}>Add options</button>
                </>
            }
            <button className={button_classes} onClick={(e) => handleAdd(e)} >Add</button>
        </div>
    )
}
