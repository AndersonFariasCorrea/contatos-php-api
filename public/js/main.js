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

$(document).ready(function() {
    $('#first-name').on('input change', function() {
        var inputVal = $(this).val();
        if(inputVal.length > 5){
            entryN = 1;
        }else{
            entryN = null;
        }
        console.log('first-name' + entryN);
    });
    $('#phone').on('input change', function() {
        var inputVal = $(this).val();
        if(inputVal.length > 8){
            entryT = 1;
        }else{
            entryT = null;
        }
        console.log('phone' + entryT);
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
});

$('.submit-contact-action').on("click", ()=>{
    let n = $('#first-name').val();
    let s = $('#last-name').val();
    let e = $('#email').val();
	let p = $('#phone').val();
    let w = $('#whatsapp').val();
    let u = $('#userid').text();

    if(n && n != '' && p && p != '' && u != ''){
        popUpWait('.popup-form-content');
        $('.submit-contact-action').css("display", "none");
        var newContactData = {
            "nome":"contato",
            "sobrenome":"teste",
            "telefone":"+5562999999999",
            "whatsapp":"+5562999999999",
            "email":"email@domain.com",
            "userid":5
        };
        $.ajax({
            url:`${domainProtol}//${domainName}/contatos/api/create.php`,
            method: 'PUT',
            data: JSON.stringify(newContactData),
            dataType: 'json'
        }).done((result)=>{
            $('.loaderIcon').remove();
            let item = null;
            console.log(result)
            if(result.status && result.status === 1){
                var status = xhr.status;
                alert(status);
                $(".popup-form-content").html('');
            }

            if(! result.status){
                $(".popup-form-content").html('');
                $(".response").fadeIn();
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('An error occurred, errorThrown:', errorThrown);
            console.error('An error occurred, status:', textStatus);
            console.error('An error occurred, jqXHR:', jqXHR);
        });
    }
});