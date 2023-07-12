# contatos
API REST que armazenará as pessoas e seus contatos. Uma pessoa pode ter vários 
contatos como telefone, e-mail ou whatsapp

# listar contatos
Enviar uma requisição http GET para /contatos/api/list.php?userid=idDoUsuario

# criar um novo contato
enviar um json através de uma requisição POST para /contatos/api/create.php?Content-Type=application/json

json exemplo:

{
    "nome":"primeiroNome",
    "sobrenome":"ultimoNome",
    "telefone":"+5562999999999",
    "whatsapp":"+5562999999999",
    "email":"email@domain.com"
    "userid":1
}

resposta de sucesso:

{
    "status": 1,
    "msg": "contato criado com sucesso"
}

resposta de erro:

{
    "status": 0,
    "msg": "error: \{nomeCampo\} não é valido"
}
acompanhado do header http 400