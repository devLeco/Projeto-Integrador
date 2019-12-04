function fazLogin(){
    let lista=[];
    lista = localStorage.getItem("Clientes");
    lista = JSON.parse(lista);
    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;
    let acheiConta = false;
    for(let i=0;i<lista.length;i++){
        console.log("Entrei no looping");
        if( (email.localeCompare(lista[i].email) == 0) &&
            (senha.localeCompare(lista[i].senha) == 0) ){
            console.log("Entrei no if");
            acheiConta = true;
            console.log(lista[i]);
            document.getElementById("perfil").innerHTML="<p> Olá " + lista[i].nome + "</p>";
        }
    }
    if(acheiConta!=true){
        alert("EMAIL OU SENHA INCORRETO");
    }
}