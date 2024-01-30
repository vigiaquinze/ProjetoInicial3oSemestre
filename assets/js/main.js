(function() {
    var modeloCompartimento, map;

    modeloCompartimento = class modeloCompartimento{
        constructor(){
            var botoes, andar, atual;
            this.andar = 8;
            this.compartimento = [];
            this.numeroCompartimentos = 2;
            atual = this;
            botoes = ((function() {
                var j, botoesSobeDesce;
                botoesSobeDesce = [];
                for (andar = j = atual = andar; j => 1; andar = j += -1) {
                    botoesSobeDesce.push(`<div id='botoes-andar-${andar}' class='botoes-andar'><div class='numeroAndarContainer'><label class='labelNumeroAndar'>${andar}</label></div><button class='botao paraCima' data-andar='${andar}'><div class='paraCima'></div></button><button class='botao paraBaixo' data-andar-'${andar}'><div class='paraBaixo'></div></button></div>`);
                }
                return botoesSobeDesce;
            })()).join('');
            $('#botoesSobeDesce').empty().append($(botoes)).off('click').on('click', 'button', function () {
                if ($(this).hasClass('on')) {
                    return;
                }
                $(this).toggleClass('on');
                return $(me).trigger('pressed', [
                    {
                        andar: parseInt($(this)[0].dataset.floor),
                        direcao: $(this).children().hasClass('paraCima') ? 'paraCima' : 'paraBaixo'
                    }
                ]);
            });
        }

        botaoReset (andar, direcao) {
            return $(`#andar-botoes-${andar} > button > div.${direcao}`).parent().removeClass('on');
        }

        compartimentoInativoMaisProximo (andar) {
            var a, compartimento, maisProximo, i, maisBaixo, imovel;
            imovel = (function () {
                var j, len, ref, res;
                ref = this.compartimento;
                res = [];
                for (i = j = 0, len = ref.length; j < len; i = ++j) {
                    const element = array[index];
                }
            })
        }