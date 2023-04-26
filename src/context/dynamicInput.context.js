import { createContext, useState } from "react";

//Having 3 types of main inputs
export const INPUT_TYPES = {
    FILE: "FILE",
    DROP_DOWN: "DROP_DOWN",
    TEXT: "TEXT"
}

//context
export const DynamicInputContext = createContext({
    form: [],
    addNew: () => { },
    removeOne: () => { },
})

export const DynamicInputProvider = ({ children }) => {
    const [form, setForm] = useState([])

    /**
     * Add new field to the form
     * @param {*} newInput : new input to be added
     */
    const addNew = (newInput) => {
        setForm([...form, newInput])
    }

    /**
     *  Remove  field from the form
     * @param {*} id : id of the field to be removed
     */
    const removeOne = (id) => {
        setForm(form.filter((input) => input.id !== id))
    }

    const value = { form, addNew, removeOne }
    return <DynamicInputContext.Provider value={value} >
        {children}
    </DynamicInputContext.Provider>
}

