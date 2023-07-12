# contatos
API REST que armazenará as pessoas e seus contatos. Uma pessoa pode ter vários 
contatos como telefone, e-mail ou whatsapp

# listar contatos
Enviar uma requisição http GET para /contatos/api/list.php?userid=idDoUsuario

# listar um contato
Enviar uma requisição http GET para /contatos/api/list-one.php?userid=idDoUsuario&cid=contatoId

resposta de sucesso:

{
    "username": "Anderson",
    "id": 7,
    "nome": "primeiroNome",
    "sobrenome": "ultimoNome",
    "telefone": "+5562999999999",
    "whatsapp": "+5562999999999",
    "email": "email@domain.com",
    "created_at": "2023-07-12 10:19:09"
}

ou

{
    "status": 0,
    "msg": "no data was found"
}

resposta de erro em razão do userid:
header http 401

resposta de erro em razão do cid:
header http 400


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

