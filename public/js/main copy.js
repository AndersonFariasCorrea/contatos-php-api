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
$(document).ready(()=>{
    $('h1').disableSelection();
    $('.main-question').disableSelection();
    $('h1').hover(()=>{
        $('h1').css('cursor', 'default');
    });
    $('.main-question').hover(()=>{
        $('.main-question').css('cursor', 'default');
    });
});
function choosenItem(item){
    switch (item) {
        case 1:
            item = "Chave de uma casa";
            break;
        case 2:
            item = "Um fone de ouvido";
            break;
        case 3:
            item = "Um batom";
            break;
        default:
            item = 'none';
            break;
    }
    return item;
}
function refresh() {
    location.reload();
}
$(document).ready(()=>{
    $('.close-popup').on("click", ()=>{
        window.location.href = '/eventos';
    });
});
let refreshBtn = `<button type="button" class="btn btn-danger" onclick="refresh()">Preencheer novamente</button>`;

function popUpWait(select){
        var paragraph = '<div style="width:100%; display: flex; justify-content: space-evenly; margin-top: 20%;" class="loaderIcon"><div class="loader"></div></div>';
        $(select).html(paragraph);
    }
let entryN = null;
let entryE = null;
let entryP = null;
let entryC = null;
let entryB = null;

 $(document).ready(function() {
  // Function to check if all form fields are filled
  function checkFormFields() {
    var allFilled = true;
    $('.presentationForm input, .presentationForm select').each(function() {
      if ($(this).val() === '') {
        allFilled = false;
        return false; // Stop the loop if any field is empty
      }
    });
    return allFilled;
  }
  
  $('#full-name').on('input change', function() {
	  var inputVal = $(this).val();
	  if(inputVal.length > 5){
		entryN = 1;
	  }else{
		entryN = null;
	  }
  });
  $('#email').on('input change', function() {
	  var inputVal = $(this).val();
	  if(inputVal.length > 5){
		entryE = 1;
	  }else{
		entryE = null;
	  }
  });
  $('#phone').on('input change', function() {
	  var inputVal = $(this).val();
	  if(inputVal.length > 13){
		entryP = 1;
	  }else{
		entryP = null;
	  }
  });
  $('#city').on('input change', function() {
	  var inputVal = $(this).val();
	  if(inputVal.length > 5){
		entryC = 1;
	  }else{
		entryC = null;
	  }
  });
  $('#bairro').on('input change', function() {
	  var inputVal = $(this).val();
	  if(inputVal.length > 0){
		entryB = 1;
	  }else{
		entryB = null;
	  }
  });
  
  // Event listener for input and select fields
  $('.presentationForm input, .presentationForm select').on('input change', ()=> {
    var button = $('.submit-question-form');
    if (entryN != null && entryE != null && entryP != null && entryC != null && entryB != null ) {
      button.attr('type', 'button');
    } else {
      button.attr('type', 'submit');
    }
  });
});


$('.submit-question-form').on("click", (event)=>{
    //event.preventDefault();
    let n = $('#full-name').val();
    let e = $('#email').val();
	let p = $('#phone').val();
    let c = $('#city').val();
    let b = $('#bairro').val();
    let s = $('.form-select').val();
    let domainProtol = window.location.protocol;
    let domainName = window.location.hostname;
    if(e && e != '' && n && n != '' && c && c != '' && b && b != '' && s && s != 'Escolher'){
        popUpWait('.popup-form-content');
        $('.submit-question-form').css("display", "none");
        $.ajax({
            url:`${domainProtol}//${domainName}/eventos/caixinha-premiada/answer.php`,
            method: 'POST',
            data: {
                    name: n,
                    email: e,
					phone: p,
                    city: c,
                    neighborhood: b,
                    choice: s
                },
            dataType: 'json'
        }).done((result)=>{
            $('.loaderIcon').remove();
            let item = null;
            console.log(result)
            if(result.status && result.status === 1){
                $(".popup-form-content").html('<h1 class="pt-2 fw-bold">Caixinha Premiada</h1><div class="check" style="margin: 0px auto; width:130px; height: 130px; margin-top: 2%; background-image: url(\'https://faculdadenoroeste.com.br/wp-content/uploads/2023/01/check-correct.gif\');background-position: center; background-repeat: no-repeat; background-size: cover;"></div><div class="response"></div>');
                setTimeout(()=>{
                    $(".check").css('background-image', 'url(https://faculdadenoroeste.com.br/wp-content/uploads/2023/05/check-correct.png)');
                    console.log('escolha: ' + s);
                    item = choosenItem(parseInt(s));
                    $(".response").html(`<div class="response" style="display: none;"><p>VocÃª escolheu: "<u>${item}</u>"<br>Sua escolha foi enviada com sucesso! Verifique a caixa de entrada de <span style="color: blue;">${e}</span> para o seu Resultado!</p><button type="button" class="btn btn-success" onclick="refresh()">Preencheer novamente</button></div>`);
                    $(".response").fadeIn();
                }, 1800);
                $('h1').disableSelection();
                $('h1').hover(()=>{
                    $('h1').css('cursor', 'default');
                });
                setTimeout(() => {
                    $('p').disableSelection();
                    $('p').hover(()=>{
                        $('p').css('cursor', 'default');
                    }); 
                }, 1200);
            }

            if(result.status === 0){
                $(".popup-form-content").html('<h1 class="pt-2 fw-bold">Caixinha Premiada</h1><div class="check" style="margin: 0px auto; width:130px; height: 130px; margin-top: 2%; background-image: url(\'./img/alert.gif\');background-position: center; background-repeat: no-repeat; background-size: cover;"></div><div class="response" style="display: none;"></div>');
                setTimeout(() => {
                    $(".check").css('background-image', 'url("./img/alert.PNG")');
                }, 2200);
                $('h1').disableSelection();
                $('h1').hover(() => {
                    $('h1').css('cursor', 'default');
                });
                setTimeout(() => {
                    $('p').disableSelection();
                    $('p').hover(()=>{
                        $('p').css('cursor', 'default');
                    }); 
                }, 1200);
                item = choosenItem(result.choice);
                switch (result.code) {
                    case "C-1":
                        // user has choosen
                        console.log(result.msg);
                        item = choosenItem(result.choice);
                        $(".response").html(`<p> VocÃª jÃ¡ realizou uma escolha utilizando <span style="color: blue;">${e}</span>, a escolha foi:<br> "<u>${item}</u>"!</p>${refreshBtn}`);
                        break;
                    case "C-0":
                        // Invalid choice
                        console.log(result.msg);
                        $(".response").html(`<p>A escolha informada nÃ£o Ã© vÃ¡lida!</p>${refreshBtn}`);
                        break;
                    case "E-0":
                        // Email error
                        console.log(result.msg);
                        $(".response").html(`<p> O email: "<span style="color: blue;">${e}</span>" <b>NÃ£o Ã© vÃ¡lido!</b></p>${refreshBtn}`);
                        break;
                    case "Q-0":
                        // choice not ok
                        console.log(result.msg);
                        $(".response").html(`<p>Desculpe, a aÃ§Ã£o nÃ£o pÃ´de ser finalizada: "<span style="color: red;">${result.msg}</span>".</p>${refreshBtn}`);
                        break;
                    case "N-0": // Neighborhood error 
                        console.log(result.msg); $(".response").html(`<p> O bairro informado: "<span style="color: blue;">${b}</span>" <b>NÃ£o Ã© vÃ¡lido!</b></p>${refreshBtn}`);
                        break;
                    case "M-0": // Email error 
                        console.log(result.msg); $(".response").html(`<p>Desculpe, a aÃ§Ã£o nÃ£o pÃ´de ser finalizada: "<span style="color: red;">${result.msg}</span>".</p>${refreshBtn}`);
                        break;
					case "P-0": // Email error 
                        console.log(result.msg); $(".response").html(`<p>Desculpe, a aÃ§Ã£o nÃ£o pÃ´de ser finalizada: "<span style="color: red;"> o nÃºmero/telefone informado nÃ£o Ã© vÃ¡lido</span>".</p>${refreshBtn}`);
                        break;
                    default:
                        console.log("nothing was returned");
                        $(".response").html(`<p>Null</p>${refreshBtn}`);
                        break;
                }
                $(".response").fadeIn();
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('An error occurred, errorThrown:', errorThrown);
            console.error('An error occurred, status:', textStatus);
            console.error('An error occurred, jqXHR:', jqXHR);
        });
    }
});