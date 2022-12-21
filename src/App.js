import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {

    const SERVER = "https://ana2.onrender.com/"; //remote
    const [myToken, setmyToken] = useState("")
    const [logged, setlogged] = useState(false)
    const [username, setuName] = useState("")
    const [password, setpwd] = useState("")
    const [products, setproducts] = useState([])

    // methods
    const doLogin = async() => {
       await axios.post(SERVER + "token/", { username, password }).then((res) => (setmyToken(res.data.access)));
       setlogged(true)
    }
    
    const getProducts = async () => {
        let response = await axios.get(SERVER + "products", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + myToken,
            },
        });
        setproducts(response.data);
    };
    return (
        <div>
            <h1>{logged && `Welcome ${username}`}</h1>
            {/* <img src='logo192.png' alt='aaa'></img> */}
            <hr></hr>
            Uname:<input onChange={(e) => setuName(e.target.value)} />
            pwd:<input onChange={(e) => setpwd(e.target.value)} type="password" />
            <button onClick={() => doLogin()}>Login</button>
            <button onClick={() => getProducts()}>Get Products</button>
            <div className="row row-cols-1 row-cols-md-5 g-4">
                {products.map((produ, i) => <div className="col" key={i}>
                        <div className="card h-100">
                            <img src={`https://picsum.photos/20${i}`}  className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{produ.desc}</h5>
                                <p className="card-text">
                                    <button className='btn btn-success' >BUY</button>
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{produ.price}</small>
                            </div>
                        </div>
                     </div>)}
            </div>
        </div>
    )
}

export default App


