import { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc,getDoc,setDoc,getDocs, } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db,auth } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
function Finish(){
const [user, setUser] = useState('');
const [tarefas,setTarefas] = useState([]);

useEffect (() => {
    async function loadTarefas(){
        const userDetail = localStorage.getItem('@detailUser')
        setUser(JSON.parse(userDetail))

        if(userDetail){
            const data = JSON.parse(userDetail);

            const tarefaRef = collection(db,"concluidas")
            const q = query(tarefaRef, orderBy("timestamp", "desc"), where("userUid","==",data?.uid))
            const unsub = onSnapshot(q, (snapshot) => {
                let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id:doc.id,
                        tarefa: doc.data().tarefa,
                        userUid: doc.data().userUid,
                        created: doc.data().created,
                        timestamp: doc.data().timestamp,
                              
                    })
                  
                })
                setTarefas(lista)
               

              
            })

        }
    }
    loadTarefas()
},[])

async function deleteTarefa(id){
    const docRef = doc(db, "concluidas",id)
    await deleteDoc(docRef);
}

async function handleLogout(){
    await signOut(auth);
}
return(
    <div className="admin-container">
        <div className="top-container">
            <img className="img-container" src="https://img.freepik.com/vetores-premium/empresario-andando-a-escada-para-simbolo-de-sucesso_185038-309.jpg"/>
            <h1>Tarefas concluídas</h1>
            <span>Por mais longa que seja a caminhada o mais importante é dar o primeiro passo.</span>
        </div>

        {tarefas.map((item)  =>(
          <article key={item.id} className="list">
           <p>{item.tarefa}</p>
          <div className="list-button">
              <button className="btn-delete" onClick={() => deleteTarefa(item.id)}>Excluir</button>
          </div>
          <h5 className="list-created">Data da Conclusão:{(new Date(item.timestamp.seconds * 1000).toLocaleString())}</h5>
         </article>
         ))}
         <Link className="btn-back" to="/admin">Voltar</Link>
         <button className="btn-logout" onClick={handleLogout}>Deslogar</button>


    </div>
);
}

export default Finish;