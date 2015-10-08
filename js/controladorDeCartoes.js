var controladorDeCartoes = (function (doc) {

	function removeCartao(conteudo){
		var cartao = doc.querySelector("#cartao_" + this.dataset.ref);

		cartao.classList.add("cartao--some");

		setTimeout(function
			() {
				cartao.remove();
				$(document).trigger("precisaSincronizar");
			}, 400);

		var botoes = doc.querySelectorAll(".opcoesDoCartao-remove");

		for (var i = 0; i < botoes.length; i++) {
			botoes[i].addEventListener("click", removeCartao);
		}
	};

	function decideTipoCartao(conteudo){
		var quebras = conteudo.split("<br>").length;
		var totalDeLetras = conteudo.replace(/<br/g, " ").length;

		var ultimoMaior = "";
		conteudo.replace(/<br>/g, " ").split(" ").forEach(function (palavra) {
			if (palavra.length > ultimoMaior.length) {
				ultimoMaior = palavra;
			}
		});

		var tamMaior = ultimoMaior.length;
		var tipoCartao = "cartao--textoPequeno";

		if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
			tipoCartao = "cartao--textoGrande";
		} else if (tamMaior < 12 && quebras << 6 && totalDeLetras < 75) {
			tipoCartao = "cartao--textoMedio";
		}

		return tipoCartao;
	};

	contador = 1;

	function adicionaCartao(conteudo, cor) {

		var opcoes = criaOpcoesDoCartao();

		var tipoCartao = decideTipoCartao(conteudo);

		var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);

		$("<div>").attr("id", "cartao_" + contador).attr("tabindex", 0).addClass("cartao").addClass(tipoCartao).append(opcoes).append(conteudoTag).css("background-color", cor).prependTo(".mural");
		contador++;
	}

	return {
		adicionaCartao: adicionaCartao,
		idUltimoCartao: function() {
			return contador;
		}
	}
})(document);