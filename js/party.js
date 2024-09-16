$(document).ready(function () {

	const waiting = $("#waiting");
	const layers = $("#layers");
	const letters = $("#letters");
	const birthday = $("#birthday");
	const bigcard = $("#bigcard");
	const bodypages = $("#body");
	const checkpages = $("#checkpages");
	const footer = $("#footer");
	const letname = "HELEM";
	const regs = [ 
		{
			c1: "#9046cf", c2: "#cc59d2", c3: "#490062", 
			t1: "Mañana será un día muy especial",
			t2: "Helemsita, Dios te regala un año más de vida, un año más lleno de alegrías, retos y logros. \"Oye, hijo mío, y recibe mis razones,Y se te multiplicarán años de vida.\" (Prov. 4:10)",
			img: "pastel.png"
		},
		{
			c1: "#ffcc4f", c2: "#73cfc4", c3: "#154e48",
			t1: "Lunes 16 de Setiembre del 2024",
			t2: "En medio de una gran aventura junto a toda tu familia, visitando una de las maravillas del mundo, recorriendo paisajes maravillosos que demuestran el gran poder divino, un viaje que simplemente un día se te ocurrió, te decidiste, y lo estás haciendo realidad al lado de los que te aman",
			img: "bt21.png"
		},
		{
			c1: "#65def1", c2: "#dce2c8", c3: "#3a6669",
			t1: "Única y de edición limitada",
			t2: "Siempre me sorprendo del gran corazón que tienes, no solo piensas en ti, piensas en todos los que te rodean y compartes lo que tienes, afortunados los que podemos estar cerca de ti y recibir la calidez de tu gran corazón. Estoy seguro que tus padres están orgullosos de la gran persona en la que te convertiste",
			img: "tany.png"
		},
		{
			c1: "#f05365", c2: "#ffdd50", c3: "#ac0e4a",
			t1: "De parte de Cri, quiero decirte..",
			t2: "Feliz cumpleaños, que este viaje marque el inicio de muchos más, Japón, Corea, Egipto... lugares que de niños nunca imaginamos conocer, pero con la ayuda de Dios se hará realidad. Pásala bonito, disfruta y diviertete, que en casa hay pequeños corazoncitos esperando tu regreso ❤️🧡💜💚, y estos recuerdos que estás creando son para toda la vida",
			img: "heart.png"
		},
		{
			c1: "#9cff89", c2: "#ffc08f", c3: "#bb5200",
			t1: "Y recuerda...",
			t2: "We are Forever Young 💜",
			img: "youme.jpg"
		}
	];

	f_Start();

	function f_NewLetters(letname, callback){

		letters.empty();

		var words = letname.split("");

		$.each(words, function(i, v) {
			
			var htWord = $('<div class="word">' + v + '</div>');

			setTimeout(function() { htWord.addClass("word-eff"); }, 50);

			letters.append(htWord);

		});

		setTimeout(function() {	callback.finish();}, 3500);

	}
	

	function f_Letters(letname, callback){

		letters.empty();

		var words = letname.split("");

		$.each(words, function(i, v) {
			
			var htWord = $('<div class="word">' + v + '</div>');

			var delay = i == 0 ? 1 : 2500 + (i * 250);

			setTimeout(function() {	

				letters.append(htWord);
				setTimeout(function() { htWord.addClass("word-eff"); }, 10);

				if(i == words.length - 1){
					setTimeout(function() {	callback.finish();}, 1500);
				}

			}, delay);

		});
	}

	function f_StartCard() {
		bigcard.removeClass("opacity");
		footer.removeClass("opacity");
	}

	function f_Start(){

		checkpages.empty();
		layers.empty();
		bodypages.empty();

		var firstReg = null;
		$.each(regs, function(i, v) {

			var pageRad = $("<label class='iradio flex-center fn-radlabel' style='--color-rad: " + v.c1 + "'><input class='fn-radpage' type='checkbox' name='radpages' value='" + i + "'><div class='radmark flex-center transition'></div></label>");
			var pageLayer = $("<div class='layer transition fn-layer' data-ly='" + i + "' style='--color-l1: " + v.c1 + "; --color-l2: " + v.c2 + "'></div>");
			var bodyPg = "";
			bodyPg += "<div class='pg-wrap transition fn-pgwrap'>";
			bodyPg += /**/"<div class='inn-page'>";
			bodyPg += /**/	"<div class='b-title transition'>" + v.t1 + "</div>";
			bodyPg += /**/	"<div class='b-subt'>" + v.t2 + "</div>";
			bodyPg += /**/	"<div class='b-image' style='background-image: url(../images/" + v.img + ")'></div>";
			bodyPg += /**/"</div>";
			bodyPg += "</div>";
			bodyPg = $(bodyPg);

			var elmRadio = pageRad.find(".fn-radpage").first();

			elmRadio.on("click", function(){
				checkpages.find(".fn-radpage").prop("checked", false);
				elmRadio.prop("checked", true);

				layers.find(".fn-layer").removeClass("shown-op");
				pageLayer.addClass("shown-op");

				bodypages.find(".fn-pgwrap").removeClass("shown-op");
				bodyPg.addClass("shown-op");

				f_SetPage(i);
			});

			if(i == 0){
				firstReg = elmRadio;
			}

			checkpages.append(pageRad);
			layers.append(pageLayer);
			bodypages.append(bodyPg);

		});

		if(firstReg){
			firstReg.trigger("click");
		}

		setTimeout(function() {

			waiting.addClass("show-wait");

			waiting.on("click", function(){

				if(waiting.data("isclick")){
					return false;
				}

				waiting.data("isclick", true);

				waiting.addClass("opacity");

				setTimeout(function() {

					waiting.remove();
				}, 1000);

				let audio = new Audio("../sound/wallsound.mp3");
				audio.loop = true;
				audio.play();

				setTimeout(function() {
					f_NewLetters(letname, {
						finish: function(){
							birthday.removeClass("opacity");

							setTimeout(function() {	f_StartCard(); }, 1500);

						}
					});
				}, 2000);
			});

		}, 500);

		

	}

	function f_SetPage(order) {
		var elm = regs[order];
		document.documentElement.style.setProperty('--color1', elm.c1);
		document.documentElement.style.setProperty('--color2', elm.c2);
		document.documentElement.style.setProperty('--color-text', elm.c3);

	}

	$("#toPrev").on("click", function(){
		f_ArrowPage(true);
	});

	$("#toNext").on("click", function(){
		f_ArrowPage(false);
	});

	function f_ArrowPage(isPrev){

		checkpages.find(".fn-radpage:checked").each(function(){

			var _elm = null;

			if(isPrev){
				_elm = $(this).closest(".fn-radlabel").prev();
			}
			else {
				_elm = $(this).closest(".fn-radlabel").next();
			}

			if(_elm && _elm.length){
				_elm.find(".fn-radpage").first().trigger("click");
			}

		});

	}

});
