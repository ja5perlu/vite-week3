import { useState } from "react"

function SubmitForm() {
    // const [email, setEmail] = useState('')
    // const [check, setCheck] = useState(false)
    const [checkList, setCheckList] = useState([])

    const [form, setForm] = useState({
        email: '',
        password: '',
        checkList: []
    })


    function handleInput(e) {
        console.log(e.target.name)

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    function handleCheck(e) {
        const { name, value } = e.target;
        if (e.target.checked) {
            setForm({
                ...form,
                [name]: [...form[name], value]
            })
        } else {
            setForm({
                ...form,
                [name]: form[name].filter((item) => item !== value)
            })
        }
    }

    return (<>
        <div>
            <label htmlFor="email">Email: {form.email}</label>
            <input type="email" id="email" name="email" onChange={(e) => {
                handleInput(e)
            }} />
        </div>
        {/* Checkbox (true, false // multi select)
        <div>
            <label htmlFor="check">checkbox {check.toString()}</label>
            <input type="checkbox" id="check" onChange={(e) => {
                setCheck(e.target.checked)
            }} />
        </div> */}

        <div>
            checkList {form.checkList.toString()}
            <input type="checkbox" value="123" name="checkList" onChange={(e) => {
                handleCheck(e)
            }} />123
            <input type="checkbox" value="666" name="checkList" onChange={(e) => {
                handleCheck(e)
            }} />666
            <input type="checkbox" value="999" name="checkList" onChange={(e) => {
                handleCheck(e)
            }} />999
        </div>

        <div>
            <label htmlFor="password">password {form.password}</label>
            <input type="password" id="password" name="password" onChange={(e) => {
                handleInput(e)
            }} />
        </div>


    </>)
}
export default SubmitForm