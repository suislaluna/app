
(function () {
	var usuario = "seu.email@exemplo.com.br";

	$(document).on("precisaSincronizar", function() {
		$("#sync").removeClass("botaoSync--sincronizado");
		$("#sync").addClass("botaoSync--esperando");
	});

	$(document).on("precisaSincronizar", function (){
		var cartoes = [];

		$(".cartao").each(function() {
			var cartao = {};
			cartao.conteudo = $(this).find(".cartao-conteudo").html();
			cartao.cor = $(this).css("background-color");
			cartoes.push(cartao);
		});

		var mural = {
			usuario: usuario,
			cartoes: cartoes
		}

		$.ajax({
			url:"https://ceep.herokuapp.com/cartoes/salvar",
			method: "POST", 
			data: mural, 
			success: function (res) {
				$("#sync").addClass("botaoSync--sincronizado");
				console.log(res.quantidade + " cartões salvos em " + res.usuario);

				var quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade;
				console.log(quantidadeRemovidos + " cartoes removidos")
			},
			error: function() {
				$("#sync").addClass("botaoSync--deuRuim");
				console.log("Não foi possível salvar o mural");
			},
			complete: function() {
				$("#sync").removeClass("botaoSync--esperando");
			}
		});
	});

	$.getJSON (
		"https://ceep.herokuapp.com/cartoes/carregar?callback=?",
		{usuario: usuario},
		function(res){
			var cartoes = res.cartoes;
			console.log(cartoes.length + " carregados em " + res.usuario);
			cartoes.forEach(function(cartao){
				controladorDeCartoes.adicionaCartao(cartao.conteudo, cartao.cor);
			});
		}
	);

	$("#sync").click(function(){
		$(document).trigger("precisaSincronizar");
	});
})();
