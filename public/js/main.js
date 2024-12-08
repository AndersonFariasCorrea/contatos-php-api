$.fn.extend({ 
    disableSelection: function() { 
        this.each(function() { 
            if (typeof this.onselectstart != 'undefined') {
                this.onselectstart = function() { return false; };
            } else if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            } else {
                this.onmousedown = function() { return false; };
            }
        }); 
    } 
});

let u = $('#userid').text();

let domainProtol = window.location.protocol;
let domainName = window.location.hostname;
let domainPort = window.location.port == '80' ? '' : `:${window.location.port}`;

$(document).ready(()=>{
    $('h1').disableSelection();
    $('h1').hover(()=>{
        $('h1').css('cursor', 'default');
    });
});

function refresh() {
    location.reload();
}
let refreshBtn = `<button type="button" class="btn btn-danger" onclick="refresh()">Recarregar</button>`;

function popUpWait(select){
    var paragraph = '<div style="width:100%; display: flex; justify-content: space-evenly; margin-top: 20%;" class="loaderIcon"><div class="loader"></div></div>';
    $(select).html(paragraph);
}

let entryN = null;
let entryT = null;

function verifyRequiredInputs() {
    //verify first-name length
    $('#first-name').on('input change', function() {
        var inputVal = $(this).val();
        if(inputVal.length > 5){
            entryN = 1;
        }else{
            entryN = null;
        }
    });
    //verify phonelength
    $('#phone').on('input change', function() {
        var inputVal = $(this).val();
        if(inputVal.length > 8){
            entryT = 1;
        }else{
            entryT = null;
        }
    });
    // Event listener for required input
    $('#first-name, #phone').on('input change', ()=> {
        var button = $('.submit-contact-action');
        if (entryN != null && entryT != null) {
            button.attr('type', 'button');
        } else {
            button.attr('type', 'submit');
        }
    });
}

function viewContacts(){
    ;
    let styles = $('<style>')
        .text(`
        .input-icons i {
            position: absolute;
        }
        .icon {
            padding: 10px;
            min-width: 40px;
        }
        .input-icons {
            width: 100%;
            margin-bottom: 10px;
        }
        .input-fild{
            text-align: left;
            padding-left: 35px;
        }
        .dropdown-button{
            height: 38px;
        }
        .dropdown-button i{
            padding: 0px 2 px;
            position: relative;
            bottom: -6px;
        }
        .dropdown-button i:hover{
            cursor: pointer;
        }
        .dropdown a::after{
            content: none !important;
        }
        thead{
            background-color: #fff;
            position: sticky;
            top: 0px;
        }
        .contacts-table{ 
            overflow: auto;
            max-height: 550px;
        }`);
    $('head').append(styles);

    $('.popup-form-content').html(`<h1 class="pt-2 fw-bold action-name text-center">Contatos</h1>
    <div class="row">
        <div class="col-11">
            <div class="input-icons">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" class="form-control input-fild pesquisa" id="InputName" name="fullname"  pattern="^[0-9a-zA-Zá-ú\s]+$" aria-describedby="fullnameHelp" placeholder="Pesquisar...">
            </div>
        </div>
        <div class="col dropdown-button">
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="newContact('.popup-form-content')">Novo contato</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="contacts-table">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th class="w-75">Nome</th>
                    <th class="text-center">#</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>`)

    function listContacts(areaAppend, seach = ''){
        $('tbody').empty();
        let areaToAppend = $(areaAppend);
        if(areaToAppend.length > 0){
            let u = $('#userid').text();

            $.ajax({
                url: `${domainProtol}//${domainName}${domainPort}/api/list.php?userid=${u}&stwith=${seach}`,
                method: 'GET'
            }).done(function(result){
                if(result.query.rows_count && result.query.rows_count !== 0){
                    result.data.forEach(el => {
                        var row = $('<tr>');
                            var nomeCol = $('<td>')
                                .text(el.nome + " " + el.sobrenome)
                                .addClass('w-75');
                            row.append(nomeCol);
                            var nomeCol = $('<td>').html(`
                            <a href="#" onclick="viewContact(${el.id})" title="ver contato"> 
                                <i class="fa-regular fa-eye"></i>
                            </a>
                            &nbsp;
                            <a href="#" onclick="editContact(${el.id})" title="editar contato">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </a>
                            &nbsp;
                            <a href="#" onclick="deleteContact(${el.id})" title="editar contato">
                                <i class="fa-solid fa-trash"></i>
                            </a>`)
                            .addClass('text-center');
                            row.append(nomeCol);
                        $('tbody').append(row);
                    });
                }
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.error('An error occurred, errorThrown:', errorThrown);
                console.error('An error occurred, status:', textStatus);
                console.error('An error occurred, jqXHR:', jqXHR);
            });
        }
    }

    listContacts(".popup-form-content");
    
    $('.pesquisa').on('input change', function(){
        $(this).val().replace(/^[0-9a-zA-Zá-ú\s]+$/, "")
        listContacts(".popup-form-content", $(this).val());
    });  
}

function appendCreateContactFrom(areaToAppend){
    let createNewContactForm = `<h1 class="pt-2 fw-bold action-name text-center">Novo contato</h1>
    <form class="presentationForm mt-2">
        <label for="first-name"></label>
        <input class="form-control" type="text" id="first-name" name="firstname" pattern="^[0-9a-zA-Zá-ú\s]+$" title="Nome" placeholder="Nome *" required>

        <label for="last-name"></label>
        <input class="form-control" type="text" id="last-name" name="lastname" pattern="^[0-9a-zA-Zá-ú\s]+$" title="Sobrenome" placeholder="Sobrenome">

        <label for="phone"></label>
        <input class="form-control" type="tel" id="phone" name="phone" pattern="+\d{1,14}" placeholder="Celular: +55 (99) 9 9999-9999 / (99) 9 9999-9999 *" required>

        <label for="whatsapp"></label>
        <input class="form-control" type="tel" id="whatsapp" name="phone" pattern="+\d{1,14}" placeholder="WhatsApp: +55 (99) 9 9999-9999 / (99) 9 9999-9999">

        <label for="email"></label>
        <input class="form-control" type="email" id="email" name="email" placeholder="Email">

        <div class="row mt-5 buttons-area">
            <div class="col">
                <button type="submit" class="submit-contact-action btn btn-primary w-100">Salvar</button>
            </div>
            <div class="col">
                <button type="button" class="cancel-contact-action btn btn-danger w-100" onclick="viewContacts()">Cancelar</button>
            </div>
        </div>
    </form>`;

    $(areaToAppend).html(createNewContactForm);
}

function newContact(areaAppend){
    
    let areaToAppend = $(areaAppend)
    if(areaToAppend.length > 0){

        // would it be using doom? yep, but i decided not
        appendCreateContactFrom(areaToAppend);
    
        $('.submit-contact-action').on("click", ()=>{
            let n = $('#first-name').val();
            let s = $('#last-name').val();
            let e = $('#email').val();
            let p = $('#phone').val();
            let w = $('#whatsapp').val();
            let u = $('#userid').text();

            if(n && n != '' && p && p != '' && u != ''){
                popUpWait(areaToAppend);
                $('.submit-contact-action').css("display", "none");
                var newContactData = {
                    nome:n,
                    sobrenome:s,
                    telefone:p,
                    whatsapp:w,
                    email:e,
                    userid:u
                };
                $.ajax({
                    url:`${domainProtol}//${domainName}${domainPort}/api/create.php`,
                    method: 'PUT',
                    data: JSON.stringify(newContactData),
                    dataType: 'json'
                }).done(function(result){
                    $('.loaderIcon').remove();
                    if(result.status === 1){
                        $(areaToAppend).html(`<h1 class="pt-2 fw-bold text-center">Salvo</h1>
                        <div class="row d-flex justify-content-center">
                            <img class="check text-center" src="./public/img/check-correct.gif" alt="check-right" style="width:150px; margin-top: 2%;">
                        </div>
                        <p align="center" class="response">${result.msg}</p>
                            <div class="row mt-5">
                                <div class="col">
                                    <button type="button" class="submit-contact-action btn btn-primary w-100" onclick="newContact('.popup-form-content')">Criar novo</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="cancel-contact-action btn btn-danger w-100" onclick="viewContacts()">Voltar</button>
                                </div>
                            </div>
                        `);
                        setTimeout(()=>{
                            $(".check").attr('src','./public/img/check-correct.png');
                        }, 2200)
                    }
                    if(result.status === 0){
                        $(areaToAppend).html('');
                        $(".response").fadeIn();
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    $('.loaderIcon').remove();
                    if(jqXHR.status && jqXHR.responseJSON){
                        $(areaToAppend).html(`<h1 class="pt-2 fw-bold">Erro</h1><img class="check" src="./public/img/alert.gif" alt="check-right" style="width:150px; margin-top: 2%;"><div class="response"></div><span style="color: red;"><p>${jqXHR.responseJSON.msg}</p></span>
                            <div class="row mt-5">
                                <div class="col">
                                    <button type="button" class="submit-contact-action btn btn-primary w-100" onclick="newContact('.popup-form-content')">Tentar novamente</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="cancel-contact-action btn btn-danger w-100">Cancelar</button>
                                </div>
                            </div>
                        `);
                        setTimeout(()=>{
                            $(".check").attr('src','./public/img/alert.png');
                        }, 2200)
                    }
                    console.error('An error occurred, errorThrown:', errorThrown);
                    console.error('An error occurred, status:', textStatus);
                    console.error('An error occurred, jqXHR:', jqXHR);
                });
            }
        });
    }else{
        console.log('the area to append the form is invalid');
    }
}

function viewContact(cid){
    let areaToAppend = $('.popup-form-content');
    if(areaToAppend.length > 0) {
        // would it be using doom? yep, but i decided not
        appendCreateContactFrom(areaToAppend);

        $('.action-name').text('Ver Contato')

        $('.buttons-area').empty();
        
        $("input").prop("disabled",true);

        $('.buttons-area').html(`<input type="button" class="btn btn-secondary w-100" value="Voltar" onclick="viewContacts()">`);

        var reg = /\d/;
        if (reg.test(u) && reg.test(cid)) {
            $.ajax({
                url: `${domainProtol}//${domainName}${domainPort}/api/list-one.php?userid=${u}&cid=${cid}`,
                method: 'GET'
            }).done(function(result){
                $('#first-name').val('Nome: ' + result.nome).removeAttr('pattern');
                $('#last-name').val('Sobrenome: ' + result.sobrenome).removeAttr('pattern');
                $('#phone').val('Telefone: ' + result.telefone).removeAttr('pattern');
                $('#whatsapp').val('WhatsApp: ' + result.whatsapp).removeAttr('pattern');
                $('#email').val('Email: ' + result.email).removeAttr('pattern');
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.error('An error occurred, errorThrown:', errorThrown);
                console.error('An error occurred, status:', textStatus);
                console.error('An error occurred, jqXHR:', jqXHR);
            });
        }
    }
}

function editContact(cid){
    let areaToAppend = $('.popup-form-content');
    if(areaToAppend.length > 0) {
        // would it be using doom? yep, but i decided not
        appendCreateContactFrom(areaToAppend);

        var reg = /\d/;
        if (reg.test(u) && reg.test(cid)) {
            $.ajax({
                url: `${domainProtol}//${domainName}${domainPort}/api/list-one.php?userid=${u}&cid=${cid}`,
                method: 'GET'
            }).done(function(result){
                $('#first-name').val(result.nome).removeAttr('pattern');
                $('#last-name').val(result.sobrenome).removeAttr('pattern');
                $('#phone').val(result.telefone).removeAttr('pattern');
                $('#whatsapp').val(result.whatsapp).removeAttr('pattern');
                $('#email').val(result.email).removeAttr('pattern');
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.error('An error occurred, errorThrown:', errorThrown);
                console.error('An error occurred, status:', textStatus);
                console.error('An error occurred, jqXHR:', jqXHR);
            });
        }
        
        $('.action-name').text('Editar contato');

        $('.submit-contact-action').on("click", ()=>{
            let n = $('#first-name').val();
            let s = $('#last-name').val();
            let e = $('#email').val();
            let p = $('#phone').val();
            let w = $('#whatsapp').val();
            let u = $('#userid').text();

            if (reg.test(u) && reg.test(cid)) {
                popUpWait(areaToAppend);
                $('.submit-contact-action').css("display", "none");
                var updatedContactData = {
                    nome:n,
                    sobrenome:s,
                    telefone:p,
                    whatsapp:w,
                    email:e,
                    cid:cid,
                    userid:u
                };
                $.ajax({
                    url:`${domainProtol}//${domainName}${domainPort}/api/update.php`,
                    method: 'POST',
                    data: JSON.stringify(updatedContactData),
                    dataType: 'json'
                }).done(function(result){
                    $('.loaderIcon').remove();
                    if(result.status === 1){
                        $(areaToAppend).html(`<h1 class="pt-2 fw-bold text-center">Editar contato</h1>
                        <div class="row d-flex justify-content-center">
                            <img class="check text-center" src="./public/img/check-correct.gif" alt="check-right" style="width:150px; margin-top: 2%;">
                        </div>
                        <p align="center" class="response text-center">${result.msg}</p>
                            <div class="row mt-5">
                                <div class="col">
                                    <button type="button" class="submit-contact-action btn btn-primary w-100" onclick="viewContact(${cid})">Ver</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="cancel-contact-action btn btn-secondary w-100" onclick="viewContacts()">Voltar</button>
                                </div>
                            </div>
                        `);
                        setTimeout(()=>{
                            $(".check").attr('src','./public/img/check-correct.png');
                        }, 2200)
                        $(".response").fadeIn();
                    }
                    if(result.status === 0){
                        $(areaToAppend).html(`<h1 class="pt-2 fw-bold text-center">Erro</h1>
                        <div class="row d-flex justify-content-center">
                            <img class="check" src="./public/img/alert.gif" alt="check-right" style="width:150px; margin-top: 2%;"><div class="response">
                        </div>
                        <span style="color: red;">
                            <p align="center">${result.msg}</p>
                        </span>
                        <div class="row mt-5 buttons-area">
                            <div class="col">
                                <button type="submit" class="submit-contact-action btn btn-primary w-100" onclick="editContact(${cid})">Tentar Novamente</button>
                            </div>
                            <div class="col">
                                <button type="button" class="cancel-contact-action btn btn-danger w-100" onclick="viewContacts()">Cancelar</button>
                            </div>
                        </div>
                        `);
                        setTimeout(()=>{
                            $(".check").attr('src','./public/img/alert.png');
                        }, 2200)
                        $(".response").fadeIn();
                    }
                }).fail(function(jqXHR, textStatus, errorThrown){
                    console.error('An error occurred, errorThrown:', errorThrown);
                    console.error('An error occurred, status:', textStatus);
                    console.error('An error occurred, jqXHR:', jqXHR);

                    var errors = xhr.responseJSON;
                    var error = errors.name[0];

                    $(areaToAppend).html(`<h1 class="pt-2 fw-bold text-center">Erro</h1><img class="check" src="./public/img/alert.gif" alt="check-right" style="width:150px; margin-top: 2%;"><div class="response"></div><span style="color: red;"><p>${error}</p></span>
                        <div class="row mt-5">
                            <div class="col">
                                <button type="button" class="submit-contact-action btn btn-primary w-100" onclick="editContact(${cid})">Tentar novamente</button>
                            </div>
                            <div class="col">
                                <button type="button" class="cancel-contact-action btn btn-danger w-100" onclick="viewContacts()>Cancelar</button>
                            </div>
                        </div>
                    `);
                    setTimeout(()=>{
                        $(".check").attr('src','./public/img/alert.png');
                    }, 2200)
                });
            }
        });
    }
}
function deleteContact(cid){
    $(".fullscreen-container").fadeTo(200, 1);
    let areaToAppend = $('.popup-form-content');
    if(areaToAppend.length > 0) {

        var reg = /\d/;
        if (reg.test(u) && reg.test(cid)) {
            $.ajax({
                url: `${domainProtol}//${domainName}${domainPort}/api/list-one.php?userid=${u}&cid=${cid}`,
                method: 'GET'
            }).done(function(result){
                $('.alert-content').html(
                    `<h4 class="text-center">Confirmar</h4>
                    <div class="container mt-5">
                            <p align="center">Você tem certeza que deseja <span class="text-danger fw-bold fst-italic">apagar</span> o contato de ${result.nome + ' ' + result.sobrenome}?</p>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-danger w-100 succeed-delete" type="button">Confirmar</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-secondary w-100 cancel-delete" type="button">Cancelar</button>
                            </div>
                        </div>
                    </div>`).css('padding', '8px');
                    $(".cancel-delete").on("click", ()=> {
                        $(".fullscreen-container").fadeOut(200);
                    });
                $('.succeed-delete').on("click", ()=>{
                    var contactToDelete = {
                        cid:cid,
                        userid:u
                    };
                    $.ajax({
                        url:`${domainProtol}//${domainName}${domainPort}/api/delete.php`,
                        method: 'DELETE',
                        data: JSON.stringify(contactToDelete),
                        dataType: 'json'
                    }).done(function(result){
                        if(result.status === 1){
                            let successMsg = `
                            <h1 class="pt-2 fw-bold text-center">Editar contato</h1>
                            <div class="row d-flex justify-content-center">
                                <img class="check text-center" src="./public/img/check-correct.gif" alt="check-right" style="width:150px; margin-top: 2%;">
                            </div>
                            <p align="center" class="response text-center">${result.msg}</p>`;

                            $('.alert-content').empty().html(successMsg);

                        }else if(result.status === 0){
                            let errorMsg = `<h1 class="pt-2 fw-bold text-center">Erro</h1>
                            <div class="row d-flex justify-content-center">
                                <img class="check" src="./public/img/alert.gif" alt="check-right" style="width:150px; margin-top: 2%;">
                            </div>
                            <span style="color: red;">
                                <p align="center">${result.msg}</p>
                            </span>`;

                            $('.alert-content').empty().html(errorMsg);
                        }

                        setTimeout(()=>{
                            $(".fullscreen-container").fadeOut(200);
                        }, 2200)

                        viewContacts();
                    }).fail(function(jqXHR, textStatus, errorThrown){
                        console.error('An error occurred, errorThrown:', errorThrown);
                        console.error('An error occurred, status:', textStatus);
                        console.error('An error occurred, jqXHR:', jqXHR);

                        var errors = xhr.responseJSON;
                        var error = errors.name[0];

                        let errorMsg = `<h1 class="pt-2 fw-bold text-center">Erro</h1><img class="check" src="./public/img/alert.gif" alt="check-right" style="width:150px; margin-top: 2%;"></div><span style="color: red;"><p>${error}</p></span>
                        `;

                        $('.alert-content').empty().html(errorMsg);

                        setTimeout(()=>{
                            $(".fullscreen-container").fadeOut(200);
                        }, 2200)

                        viewContacts();
                    });
                })

            }).fail(function(jqXHR, textStatus, errorThrown){
                console.error('An error occurred, errorThrown:', errorThrown);
                console.error('An error occurred, status:', textStatus);
                console.error('An error occurred, jqXHR:', jqXHR);

                var errors = xhr.responseJSON;
                var error = errors.name[0];

                let errorMsg = `<h1 class="pt-2 fw-bold text-center">Erro</h1><img class="check" src="./public/img/alert.gif" alt="check-right" style="width:150px; margin-top: 2%;"><div class="response"></div><span style="color: red;"><p>${error}</p></span>
                `;

                $('.alert-content').empty().html(errorMsg);

                setTimeout(()=>{
                    $(".fullscreen-container").fadeOut(200);
                }, 2200)

                viewContacts()
            });
        }
    }
}
viewContacts();