import { createContext, useState } from "react";

//Having 3 types of main inputs
export const INPUT_TYPES = {
    FILE: "FILE",
    DROP_DOWN: "DROP_DOWN",
    TEXT: "TEXT"
}

//context
export const DynamicInputContext = createContext({
    fileSubInputs: [],
    dropdownSubInputs: [],
    textSubInputs: [],
    addNew: () => { },
    removeOne: () => { },
    saveData: () => { }
})

export const DYNAMIC_FIELD = { name: "" }

export const DynamicInputProvider = ({ children }) => {
    const [fileSubInputs, setFileSubInputs] = useState([])
    const [dropdownSubInputs, setDropDownSubInputs] = useState([])
    const [textSubInputs, setTextSubInputs] = useState([])

    /**
     * Add new field to the stack
     * @param {*} type : type of input field
     * @param {*} newInput : value need to be added
     */
    const addNew = (type, newInput) => {
        switch (type) {
            case INPUT_TYPES.FILE: {
                setFileSubInputs([...fileSubInputs, newInput])
                break
            }
            case INPUT_TYPES.DROP_DOWN: {
                setDropDownSubInputs([...dropdownSubInputs, newInput])
                break
            }
            case INPUT_TYPES.TEXT: {
                setTextSubInputs([...textSubInputs, newInput])
                break
            }

            default:
                console.log("Undefined type of input")
        }
    }

    /**
     * remove particular input from the list
     * @param {*} type : type of input field
     * @param {*} ind : index of that input
     */
    const removeOne = (type, ind) => {
        switch (type) {
            case INPUT_TYPES.FILE: {
                let fields = [...fileSubInputs]
                fields.splice(ind, 1)
                setFileSubInputs(fields)
                break
            }
            case INPUT_TYPES.DROP_DOWN: {
                let fields = [...dropdownSubInputs]
                fields.splice(ind, 1)
                setDropDownSubInputs(fields)
                break
            }
            case INPUT_TYPES.TEXT: {
                let fields = [...textSubInputs]
                fields.splice(ind, 1)
                setTextSubInputs(fields)
                break
            }

            default:
                console.log("Undefined type of input")
        }
    }

    /**
     * save data of the input 
     * @param {*} type : type of the input
     * @param {*} ind : index of that input
     * @param {*} e : event of that input
     */
    const saveData = (type, ind, e) => {
        switch (type) {
            case INPUT_TYPES.FILE: {
                let fields = [...fileSubInputs]
                fields[ind][e.target.name] = e.target.value
                setFileSubInputs(fields)
                break
            }
            case INPUT_TYPES.DROP_DOWN: {
                let fields = [...dropdownSubInputs]
                fields[ind][e.target.name] = e.target.value
                setDropDownSubInputs(fields)
                break
            }
            case INPUT_TYPES.TEXT: {
                let fields = [...textSubInputs]
                fields[ind][e.target.name] = e.target.value
                setTextSubInputs(fields)
                break
            }

            default:
                console.log("Undefined type of input")
        }
    }

    const value = { fileSubInputs, dropdownSubInputs, textSubInputs, addNew, removeOne, saveData }
    return <DynamicInputContext.Provider value={value} >
        {children}
    </DynamicInputContext.Provider>
}

