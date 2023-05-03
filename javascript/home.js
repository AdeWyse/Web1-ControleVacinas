const vacinasJSON = localStorage.getItem("vacinas");

const vacinas = JSON.parse(vacinasJSON);

const logadoJSON = localStorage.getItem("usuarioLogado");
const logado = JSON.parse(logadoJSON);

if(!logadoJSON){
    window.location.href = "index.html";
}


if(vacinasJSON){
    const list = document.getElementById("listaVacinas");
    //Contador temporário enquando as vacinas não tem id
    var id = 0;
vacinas.forEach(vacina => {
    if(vacina.usuario == logado[0].email){
        const novoItem = cardVacina(vacina, id);
        list.appendChild(novoItem);
        id++;
    };
    });
};

function cardVacina(vacina, id){
    const dataVac = vacina.dataVacinacao;
    const dataVacObj = new Date(dataVac);
    const dataVacFormatada = dataVacObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dataProx = vacina.dataProx;
    var dataProxFormatada = dataProx;
    if(dataProx[0] != 'N'){
        const dataProxObj = new Date(dataProx);
        dataProxFormatada = dataProxObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    const src = vacina.comprovante;
    const cardVacina = document.createElement("li");

    cardVacina.innerHTML = `
    <a href="editarVacina.html?id=`+id+`" class="listItem">
      <h2>`+vacina.vacinaNome+`</h2>
      <div class="botao dose"><p class="doseText">`+vacina.dose+`</p></div>
      <div class="data">`+dataVacFormatada+`</div>
      <div class="vacinaImagemDiv"><img class="vacinaImagem" src="`+src+`"></div>
      <div class="dataProx">`+dataProxFormatada+`</div>
    </a>
  `;
  return cardVacina;
}

