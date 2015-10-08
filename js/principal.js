document.querySelector("#mudaLayout").addEventListener("click", function () {
	var mural = document.querySelector(".mural");

	mural.classList.toggle("mural--linhas");

	if (mural.classList.contains("mural--linhas")) {
		this.textContent = "Blocos";
	} else {
		this.textContent = "Linhas";
	}
});


var contador = $(".cartao").length;


$("#busca").on("input", function(){
	var busca = $(this).val().trim();

	if (busca.length) {
		$(".cartao").addClass("hide").filter(function() {
			return $(this).find(".cartao-conteudo").text().match(new RegExp(busca, "i"));
		}).removeClass("hide");
	} else {
		$(".cartao").removeClass("hide");
	}
});

$("#pegaInfo").click(function(){
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
		function(res){
			console.log(res);

			res.instrucoes.forEach(function(instrucao){
				controladorDeCartoes.adicionaCartao(instrucao.conteudo, instrucao.cor);
				});
		}
	);
});