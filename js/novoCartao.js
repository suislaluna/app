(function() { 
	$(".novoCartao").submit(function(event) {

	var campoConteudo = $(".novoCartao-conteudo");
		var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/, "<b>$1</b>").replace(/\*(.*?)\*/, "<em>$1</em>");

	if(conteudo) {

		contador++;

		controladorDeCartoes.adicionaCartao(conteudo);
		$(document).trigger("precisaSincronizar");
	}

	campoConteudo.val("");

	event.preventDefault();

	});
})()