import { useState } from "react";
import './home.css';
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

async function handleLogin(e){
    e.preventDefault();

    if (email !== '' && password !== ''){

        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/admin', {replace: true})
        })
        .catch(() => {
            console.log("Erro")
        })
    }else{
        alert('Preencha todos os campos');
    }
}

    return (
      <div className="home-container">
        <img className="img-containera" src="https://img.freepik.com/fotos-gratis/homem-saltando-sobre-o-impossivel-ou-possivel-sobre-o-penhasco-no-fundo-do-por-do-sol-ideia-de-conceito-de-negocios_1323-265.jpg"></img>
        <div className="box-container">
        <h1>Lista de Tarefas</h1>
        <span>O sucesso começa com pequenos atos!</span>

        <form className="form" onSubmit={handleLogin}>
            <input 
                type="text"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value) }
            />

            <input 
                type="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value) }
            />
            <button type="submit">Entrar</button>
        </form>
        <Link className="button-link" to="/register">Cadastre-se</Link>
        <h6>v1.0</h6>
        </div>
      </div>
    );
  }
  
export default Home;