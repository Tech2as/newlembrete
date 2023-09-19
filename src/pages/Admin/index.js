import './admin.css';
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc,getDoc,setDoc,getDocs, } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Admin(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState('');
    const [tarefas,setTarefas] = useState([]);

    useEffect (() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db,"tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid","==",data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id:doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                            created: doc.data().created,
                                  
                        })
                      
                    })
                    setTarefas(lista)
                   

                  
                })

            }
        }
        loadTarefas()
    },[])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput == ''){
            alert("Digite sua tarefa!")
            return;
        }
        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() =>{
            console.log("Registrado sua tarefa")
            setTarefaInput('')
        })
        .catch((error)=>{
            console.log(error)
        })

    }

    async function handleLogout(){
        await signOut(auth);
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas",id)
        await deleteDoc(docRef);
    }


     async function sendTarefa(id){
        //const colecaoExistenteRef = collection(db, "tarefas");
        const colecaoExistenteRef = query(collection(db, "tarefas"), where("id","==",id))
        const novaColecaoRef = collection(db, "concluidas");
        // Lê os dados da coleção existente
        const querySnapshot = await getDocs(colecaoExistenteRef);
        querySnapshot.forEach(async (docSnap) => {
          const data = docSnap.data();
          // Cria uma referência para o novo documento na nova coleção
          const novoDocumentoRef = doc(novaColecaoRef, docSnap.id);
       
          // Escreve os dados na nova coleção
          try {
            await setDoc(novoDocumentoRef, data);
            console.log('Dados movidos com sucesso');
          } catch (error) {
            console.error('Erro ao mover dados:', error);
          }
        });
   
      }
   

    
    return(
        <div className="admin-container">
            <h1>Tarefas</h1>
            
            <form className="form" onSubmit={handleRegister}>
                <textarea
                placeholder="Digite sua tarefa.."
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />
                
                <button className="btn-register" type="submit">Registrar</button>
            </form>

            {tarefas.map((item)  =>(
              <article key={item.id}className="list">
              <p>{item.tarefa}</p>
              <div className="list-button">
                  <button className="btn-edit">Editar</button>
                  <button className="btn-delete"  onClick={() => deleteTarefa(item.id)}>Excluir</button>
                  <button className="btn-finish" onClick={() => sendTarefa(item.id)}>Concluir</button>
                 
              </div>
              <h5 className="list-created">Data da Postagem: {(new Date(item.created.seconds * 1000).toLocaleString())}</h5>
             </article>
            ))}

    
                <button className="btn-logout" onClick={handleLogout}>Deslogar</button>
              <Link to="/finish" className="btn-concluida">Tarefas concluídas</Link>
        </div>
    );
}

export default Admin;