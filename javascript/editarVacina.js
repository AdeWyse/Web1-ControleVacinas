const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const logadoJSON = localStorage.getItem("usuarioLogado");
const logado = JSON.parse(logadoJSON);
if(!logadoJSON){
    window.location.href = "login.html";
}

const vacinasJSON = localStorage.getItem("vacinas");
const vacinas = vacinasJSON ? JSON.parse(vacinasJSON) : [];
const vacinaSelecionada = vacinas[id];
const container = document.getElementById("container");
var prox = vacinaSelecionada.dataProx;
if(prox[0] == 'N' || prox.length < 1){
    prox = '1999-01-01'
}
container.innerHTML = `   <label fname="dataVac"class="formLabel">Data de vacinação</label>
<input type="date" name="dataVac" class="formInput" id="dataVac" value="`+vacinaSelecionada.dataVacinacao+`">
<label for="vacina" class="formLabel">Vacina</label>
<input type="text" value="`+vacinaSelecionada.vacinaNome+`" name="vacinaNome" id="vacinaNome" class="formInput">
<div class="formLabel">Dose</div>
<div class="formInput" id="radios">
<input type="radio" name="dose" class="radio" id="1a. dose" value="1a. dose">
<label for="1a. dose" >1a. Dose</label>
<input type="radio" name="dose" class="radio" 
id="2a. dose" value="2a. dose">
<label for="2a. dose">2a. Dose</label>
<input type="radio" name="dose" class="radio" id="3a. dose" value="3a. dose">
<label for="3a. dose">3a. Dose</label>
<input type="radio" name="dose" class="radio" id="reforço" value="Reforço">
<label for="reforço">Reforço</label>
<input type="radio" name="dose" class="radio" id="dose única" value="Dose única">
<label for="dose única">Dose Única</label>
</div>
<div class="formLabel">Comprovante da vacina</div>
<div class="formInput2">
    <label for="comprovante" class="botao" id="labelComprovante">Selecionar imagem...</label> 
    <input type="file" name="comprovante" id="comprovante"></input>
    <img  class="comprovanteImagem" src="/img/comprovanteVacina.jpg" alt="comprovante de vacinação">
</div>
<label for="dataProx" class="formLabel">Próxima Vacinação</label>
<input type="date" name="dataProx" class="formInput" id="dataProx" value="`+prox+`">`;

const inputElement = document.getElementById("comprovante");
const imageElement = document.getElementById("selectedImage");

let reader;
//Pega imagem
inputElement.addEventListener("change", (event) => {
const file = event.target.files[0];
reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
    imageElement.src = reader.result;
};
});


function editarVacina(){
    const dataVacinacao = document.getElementById("dataVac").value;
    const vacinaNome = document.getElementById("vacinaNome").value;
    const doses = document.getElementsByName("dose");
    var dose = '';
    var i = 0;
    for(i = 0; i < doses.length; i++){
        if(doses[i].checked){
            dose = doses[i].value;
            break;
        }
    };
    //Ta salvando um caminho estático, dps vai salvar o caminho do firebase
    const comprovante = '/img/comprovanteVacina.jpg';
    const dataProx = document.getElementById("dataProx").value;
    var prox = dataProx;
    if(dose == 'Dose única' || dose == 'Reforço'){
        prox = 'Não há próxima dose'
    }
    const novaVacina = {
        dataVacinacao: dataVacinacao,
        vacinaNome: vacinaNome,
        dose: dose,
        comprovante: comprovante,
        dataProx: prox,
        usuario: logado[0].email
    };
    
    var j = 0;
    for(j=0; j < vacinas.length; j++){
        if(j == id){
            vacinas[id] = novaVacina;
        }
    }
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
    window.location.href = "home.html";
}

function excluirVacina(){
    vacinas.splice(id,1);
    localStorage.setItem("vacinas", JSON.stringify(vacinas));
    window.location.href = "home.html";
}