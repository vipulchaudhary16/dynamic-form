import React, { useContext, useState } from 'react'
import { DynamicInputContext, INPUT_TYPES } from '../context/dynamicInput.context'
import { CiCircleRemove } from 'react-icons/ci'

export const CustomInput = ({ type, values }) => {
    const [showData, setShowData] = useState(false) //state to handle data display
    const [subFormDisplay, setSubFormDisplay] = useState(false) //state to handle sub form display
    const { addNew, removeOne, saveData } = useContext(DynamicInputContext) //create, delete, save function for dynamic inputs

    const dynamicInput = { name: "" } //dynamic input that will be added when click on add field
    /**
     * function to toggle the subform by clicking on the toggle icon
     */
    const toggleSubForm = () => {
        setSubFormDisplay(!subFormDisplay)
    }

    /**
     * handle the changes in inputs
     * @param {*} e  : event for particular event
     * @param {*} ind : index of that dynamic input 
     */
    const handleFormChange = (e, ind) => {
        saveData(type, ind, e)
        setShowData(false)
    }

    /**
     * remove particular input 
     * @param {*} ind : index of that dynamic input
     */
    const handleRemoveField = (ind) => {
        removeOne(type, ind)
        setShowData(false)
    }

    /**
     * handle add  new field
     */
    const handleAddField = () => {
        setShowData(false)
        addNew(type, dynamicInput)
    }

    /**
     *  shows data to the user, if any field is empty shows alert
     */
    const handleSaveData = () => {
        const emptyFields = values.filter(item => !item.name)
        if (emptyFields.length) {
            alert("Please fill all fields you have created")
            return
        }
        setShowData(true)
    }

    return (
        <div className="container">
            <div className='input-container' >
                <div className='input-container-body' >
                    {
                        type === INPUT_TYPES.FILE && <>
                            <input type="file" name="" id="" />
                            <span className='toggle-icon' onClick={() => toggleSubForm()} >{subFormDisplay ? "-" : "+"}</span>
                        </>
                    }
                    {
                        type === INPUT_TYPES.DROP_DOWN && <>
                            <select name="" id="">
                                <option value="op1">option 1</option>
                                <option value="op2">option 2</option>
                                <option value="op3">option 3</option>
                            </select>
                            <span className='toggle-icon' onClick={() => toggleSubForm()} >{subFormDisplay ? "-" : "+"}</span>
                        </>
                    }
                    {
                        type === INPUT_TYPES.TEXT && <>
                            <input type="text" name="" id="text-input" placeholder='enter text here' />
                            <span className='toggle-icon' onClick={() => toggleSubForm()} >{subFormDisplay ? "-" : "+"}</span>
                        </>
                    }
                </div>
                {
                    subFormDisplay &&
                    <div className='sub-form'>
                        {
                            values.map((field, ind) => {
                                return <div className='sub-form-input-container' key={ind}>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder={`name ${ind + 1}`}
                                        onChange={(e) => handleFormChange(e, ind)}
                                        value={field.name}
                                    />
                                    <CiCircleRemove
                                        onClick={() => handleRemoveField(ind)}
                                        className='remove-icon' />
                                </div>
                            })
                        }
                        <button className='add-more-btn btn'
                            onClick={() => handleAddField()}
                        >Add field</button>
                        {
                            values.length !== 0 && <button className='save-btn btn'
                                onClick={() => handleSaveData()}
                            >Save</button>
                        }
                    </div>
                }
            </div>
            <div className='data-display'>
                <h3>Click save to see values</h3>
                {
                    showData && values.map(({ name }, ind) => <p key={ind} >{ind + 1}: {name}</p>)
                }
            </div>
        </div>
    )
}
