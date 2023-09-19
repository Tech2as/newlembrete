function Finish(){
return(
    <div className="admin-container">
        <h1>Tarefas concluídas</h1>


          <article className="list">
          <p>concluida</p>
          <div className="list-button">
              <button className="btn-delete">Excluir</button>
          </div>
          <h5 className="list-created">Data da Conclusão:</h5>
         </article>


    </div>
);
}

export default Finish;