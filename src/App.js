import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import { DynamicInputContext, INPUT_TYPES } from './context/dynamicInput.context'
import { FormMaker } from './Components/FormMaker'
import { CustomField } from './Components/CustomField'

export const App = () => {
	const { form } = useContext(DynamicInputContext)
	const [formData, setFormData] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault();
		alert('Form submitted, check console for data')
		console.log(formData)
	}

	const setData = (type, name, data) => {
		formData[name] = data
	}

	return (
		<div className='flex items-start gap-4 p-8 '>
			<FormMaker />
			<form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col  justify-center items-center gap-2'>
				<h1 className='font-bold text-2xl mb-8'>Your form</h1>
				<div className="h-full flex flex-col">
					{
						form.length === 0 && <p className='text-gray-500'>No fields added yet</p>
					}
					{
						form.filter((field) => field.type == INPUT_TYPES.FILE).map((field) => <CustomField key={field.id} field={field} setData={setData} />)
					}
					{
						form.filter((field) => field.type == INPUT_TYPES.TEXT).map((field) => <CustomField key={field.id} field={field} setData={setData} />)
					}
					{
						form.filter((field) => field.type == INPUT_TYPES.DROP_DOWN).map((field) => <CustomField key={field.id} field={field} setData={setData} />)
					}
				</div>
				<button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"  >Submit</button>
			</form>
		</div>
	)
}
