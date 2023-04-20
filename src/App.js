import React, { useContext } from 'react'
import "./App.css"
import { CustomInput } from './Components/CustomInput'
import { DynamicInputContext, INPUT_TYPES } from './context/dynamicInput.context'

export const App = () => {
	const { fileSubInputs, dropdownSubInputs, textSubInputs } = useContext(DynamicInputContext)

	const handleSubmit = (e) => {
		e.preventDefault();
		
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<CustomInput type={INPUT_TYPES.FILE} values={fileSubInputs} />
			<CustomInput type={INPUT_TYPES.DROP_DOWN} values={dropdownSubInputs} />
			<CustomInput type={INPUT_TYPES.TEXT} values={textSubInputs} />
			<button className='btn'>Submit</button>
		</form>
	)
}
