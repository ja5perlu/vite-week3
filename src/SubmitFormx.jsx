import axios from "axios"
import { useEffect, useState } from "react"

const TodoList = ({ token }) => {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [todoEdit, setTodoEdit] = useState({})

    useEffect(() => {
        getTodos();
    }, [])

    const getTodos = async () => {
        try {
            const res = await axios.get(`${host}/todos/`, {
                headers: {
                    authorization: token
                }
            })
            console.log(res)
            setTodos(res.data.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    const addTodo = async () => {
        if (!newTodo) return
        const todo = {
            content: newTodo
        }
        await axios.post(`${host}/todos`, todo, {
            headers: {
                authorization: token
            }
        })
        setNewTodo('')
        getTodos()
    }

    const deleteTodo = async (id) => {
        await axios.delete(`${host}/todos/${id}`, {
            headers: {
                authorization: token
            }
        })
        getTodos()
    }

    const updateTodo = async (id) => {
        const todo = todos.find((todo) => todo.id === id)
        todo.content = todoEdit[id]
        await axios.put(`${host}/todos/${id}`, todo, {
            headers: {
                authorization: token
            }
        })
        getTodos()
        setTodoEdit({
            ...todoEdit,
            [id]: ''
        })
    }

    const toggleStatus = async (id) => {
        await axios.patch(`${host}/todos/${id}/toggle`, {},
            {
                headers: {
                    authorization: token
                }
            }
        )
        getTodos()

    }

    return (<>
        <h3>TODO LIST</h3>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="New Todo" />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
            {todos.map((item) => {
                return (<li key={item.id}>
                    {item.content} {item.status ? '完成' : '未完成'} | {todoEdit[item.id]}
                    <input type="text" placeholder="更新值" onChange={(e) => {
                        const newTodoEdit = { ...todoEdit }
                        newTodoEdit[item.id] = e.target.value
                        setTodoEdit(newTodoEdit)
                    }} />
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                    <button onClick={() => updateTodo(item.id)}>Update</button>
                    <button onClick={() => toggleStatus(item.id)}>Toggle Status</button>

                </li>)
            })}
        </ul>
    </>)
}
const host = "https://todolist-api.hexschool.io"
function SubmitForm() {
    // const [email, setEmail] = useState('')
    // const [check, setCheck] = useState(false)
    // const [checkList, setCheckList] = useState([])

    const [form, setForm] = useState({
        email: '',
        password: '',
        nickname: ''
    })

    const [token, setToken] = useState('')
    const TodoToken = document.cookie.split('; ').find((row) => row.startsWith('hexschoolTodo='))?.split('=')[1]
    useEffect(() => {
        if (TodoToken) {
            setToken(TodoToken)
        }
    }, [])
    const [tokenStatus, setTokenStatus] = useState('')
    const [signUpStatus, setSignUpStatus] = useState('')
    const [checkoutStatus, setCheckoutStatus] = useState('')
    const [signOutStatus, setSignOutStatus] = useState('')


    function handleInput(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const signUp = () => {
        console.log('signup');
        (async () => {
            try {
                const res = await axios.post(`${host}/users/sign_up`, form)
                console.log(res)
                if (res.data.status) {
                    setSignUpStatus(`註冊成功!!!`)
                }
            } catch (error) {
                console.log(error.message)
                setSignUpStatus(`註冊失敗: ${error.message}`)
            }
        })()
    }

    const signIn = () => {
        (async () => {
            try {
                const res = await axios.post(`${host}/users/sign_in`, form)
                setTokenStatus(`user token: ${res.data.token}`)
            } catch (error) {
                setTokenStatus(`登入失敗: ${error.message}`)
            }
        })()
    }

    const checkout = () => {
        (async () => {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate + 1)
            document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`
            console.log(document.cookie.split('; ').find(row => row.startsWith('hexschoolTodo')))
            try {
                const res = await axios.get(`${host}/users/checkout`, {
                    headers: {
                        authorization: token
                    }
                })
                console.log(res)
                if (res.data.status) {
                    setCheckoutStatus(`驗證成功!!! UID: ${res.data.uid}`)
                }
            } catch (error) {
                setCheckoutStatus(`驗證失敗: ${error.message}`)
            }
        })()
    }

    const signout = () => {
        (async () => {
            try {
                const res = await axios.post(`${host}/users/sign_out`, {}, {
                    headers: {
                        authorization: token
                    }
                })
                console.log(res)
                if (res.data.status) {
                    setSignOutStatus(res.data.message)
                    document.cookie = `hexschoolTodo=${token}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
                    setToken('')
                } else {
                    setSignOutStatus(res.message)
                }
            } catch (error) {
                setSignOutStatus(`登出失敗: ${error.message}`)
            }
        })()
    }

    return (<>
        <h2>註冊</h2>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => {
                handleInput(e)
            }} />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" onChange={(e) => {
                handleInput(e)
            }} />
        </div>
        <div>
            <label htmlFor="nickname">nickname</label>
            <input type="text" id="nickname" name="nickname" onChange={(e) => {
                handleInput(e)
            }} />
        </div>
        <button onClick={() => {
            signUp()
        }}>註冊</button>
        <p>{signUpStatus}</p>
        <hr />
        <h2>登入</h2>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => {
                handleInput(e)
            }} />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" onChange={(e) => {
                handleInput(e)
            }} />
        </div>
        <button onClick={() => {
            signIn()
        }}>登入</button>
        <p>{tokenStatus}</p>
        <hr />
        <h2>驗證</h2>
        <div>
            <label htmlFor="Token">Token</label>
            <input type="text" id="token" name="Token" onChange={(e) => {
                setToken(e.target.value)
            }} />
        </div>
        <button onClick={() => {
            checkout()
        }}>驗證</button>
        <p>{checkoutStatus}</p>
        <hr />
        <h2>登出</h2>
        <div>
            <label htmlFor="Token">Token</label>
            <input type="text" id="token" name="Token" onChange={(e) => {
                setToken(e.target.value)
            }} />
        </div>
        <button onClick={() => {
            signout()
        }}>登出</button>
        <p>{signOutStatus}</p>
        <hr />
        <h2>Todo List</h2>
        {
            token && <TodoList token={token}></TodoList>
        }
    </>)
}
export default SubmitForm