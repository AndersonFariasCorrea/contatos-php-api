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

let domainProtol = window.location.protocol;
let domainName = window.location.hostname;

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
            padding: 0px 4px;
            position: relative;
            bottom: -6px;
        }
        .dropdown-button i:hover{
            cursor: pointer;
        }
        .dropdown a::after{
            content: none !important;
        }`);
        $('head').append(styles);

        function listContacts(areaAppend, seach = ''){
            let areaToAppend = $(areaAppend)
            if(areaToAppend.length > 0){
                $('tbody').remove();
                let mainScreen = `<h1 class="pt-2 fw-bold action-name text-center">Contatos</h1>
                <div class="row">
                    <div class="col-11">
                        <div class="input-icons">
                            <i class="fa-solid fa-magnifying-glass icon"></i>
                            <input type="email" class="form-control input-fild pesquisa" id="InputEmail" name="fullname"  attern="^[0-9a-zA-Zá-ú\s]+$" aria-describedby="fullnameHelp" placeholder="Pesquisar...">
                        </div>
                    </div>
                    <div class="col dropdown-button">
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Novo contato</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="w-75">Nome</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>`;

                areaToAppend.append(mainScreen);

                let u = $('#userid').text();

                $.ajax({
                    url: `${domainProtol}//${domainName}/contatos/api/list.php?userid=${u}&cid=${seach}`,
                    method: 'GET'
                }).done(function(result){
                    let count = result.query.rows_count;
                    result.data.forEach(el => {
                        console.log(el.nome);
                        var row = $('<tr>');
                            var nomeCol = $('<td>').text(el.nome + ' ' + el.sobrenome);
                            row.append(nomeCol);
                            var nomeCol = $('<td>').html(`<a href="#" onclick="viewContact(${el.id})"><i class="fa-regular fa-eye"></i></a>`);
                            row.append(nomeCol);
                        $('tbody').append(row);
                    });
                }).fail(function(jqXHR, textStatus, errorThrown){
                    console.error('An error occurred, errorThrown:', errorThrown);
                    console.error('An error occurred, status:', textStatus);
                    console.error('An error occurred, jqXHR:', jqXHR);
                });

            }
            
        }

        listContacts(".popup-form-content");
        
        $('.pesquisa').on('input change', function(){
            listContacts(".popup-form-content", $(this).val());
        });
        
}

function appendCreateContactFrom(areaToAppend){
    let createNewContactForm = `<h1 class="pt-2 fw-bold action-name">Novo contato</h1>
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

        <div class="row mt-5">
            <div class="col">
                <button type="submit" class="submit-contact-action btn btn-primary w-100">Salvar</button>
            </div>
            <div class="col">
                <button type="button" class="cancel-contact-action btn btn-danger w-100">Cancelar</button>
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
                    url:`${domainProtol}//${domainName}/contatos/api/create.php`,
                    method: 'PUT',
                    data: JSON.stringify(newContactData),
                    dataType: 'json'
                }).done(function(result){
                    $('.loaderIcon').remove();
                    if(result.status === 1){
                        $(areaToAppend).html(`<h1 class="pt-2 fw-bold">Salvo</h1><img class="check" src="./public/img/check-correct.gif" alt="check-right" style="width:150px; margin-top: 2%;"><div class="response"></div><span"><p>${result.msg}</p></span>
                            <div class="row mt-5">
                                <div class="col">
                                    <button type="button" class="submit-contact-action btn btn-primary w-100" onclick="newContact('.popup-form-content')">Criar novo</button>
                                </div>
                                <div class="col">
                                    <button type="button" class="cancel-contact-action btn btn-danger w-100">Voltar</button>
                                </div>
                            </div>
                        `);
                        setTimeout(()=>{
                            $(".check").attr('src','./public/img/check-correct.PNG');
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
                            $(".check").attr('src','./public/img/alert.PNG');
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
//appendCreateContact
//newContact(".popup-form-content");
viewContacts();