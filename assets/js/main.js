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
                    compartimento = ref [i];
                    if(!compartimento.movendo && compartimento.manutencao) {
                        res.push([i+1, Math.abs(andar - compartimento.andar)]);
                    }
                }
                return res;
            });
            maisBaixo = (function () {
                var j, len, res;
                res = [];
                for (j=0, len = imovel.length; j < len; j++) {
                    a = imovel[j];
                    if (a[1] === maisProximo[1]) {
                        res.push(a[0]);
                    }
                }
                return res;
            })();
            return maisBaixo[Math.floor(Math.random() * maisBaixo.length)];
        }

        moverCompartimento(compartimento, andar) {
            var esperando, meuCompartimento;
            meuCompartimento = this.compartimento;
            esperando = $.Esperando();
            if (this.compartimento[compartimento - 1].moving) {
                return esperando.rejeitar();
            }
            if (andar < 1 || andar > this.andar) {
                return esperando.rejeitar();
            }
            this.compartimento[compartimento - 1].movendo = true;
            $(`#lift${compartimento} .compartimento`).animate({
                bottom: `${(andar-1) * 85}px`
            }, {
                duration:300*Math.abs(meuCompartimento[compartimento - 1].andar-andar),
                easing: 'linear',
                complete: function () {
                    meuCompartimento [compartimento - 1].andar = andar;
                    meuCompartimento [compartimento - 1].movendo = false;
                    return esperando.resolve();
                }
            }).delay(50);
            $(`#lift${compartimento} .compartimento > div`).animate({
                top: `${-425 + andar * 85}px`
            }, {
                duration: 300 * Math.abs(meuCompartimento[compartimento - 1].andar - andar),
                easing: 'linear',
            }).delay(50);
            return esperando;
        }

    };

    view = new modeloCompartimento();
    for (let i = 0; i < view.numeroCompartimentos; i++) {
        view.compartimento.push({
            andar: 1,
            movendo: false,
            manutencao: false,
        })
        let count = i;
        compartimentoDinamico = `<div id = "elevador${count+1}" class="elevador"><div class="compartimento"><div><div>6</div><div>5</div><div>4</div><div>3</div><div>2</div><div>1</div><div>T</div><div>S1</div><div>S2</div></div></div></div >`;
        $('#elevadores').aumentar(compartimentoDinamico);

        manutencaoDinamica = `<div class="modoManutencao"><div class="cursor-pointer"><input class="cursor-pointer" type="checkbox" onchange="emManutencao(${i})" /></div></div>`;

        $('#containerModoManutencao').aumentar(manutencaoDinamica);
    }

    $(view).on('pressed', function (e, {floor, dir}) {
        return view.moverCompartimento(view.compartimentoInativoMaisProximo(andar), andar).then(function() {
            return view.clearButton(andar, direcao);
        });
    });

    manutencao = (numeroCompartimentos) => {
        view.compartimento[numeroCompartimentos].manutencao =! view.compartimento[numeroCompartimentos].manutencao;
        if (view.compartimento[numeroCompartimentos].manutencao) {
            $(`#elevador${numeroCompartimentos+1} > .compartimento`).css('border, 2px solid red');
        }
        else {
            $(`#elevador${numeroCompartimentos+1} > .compartimento`).css('border', 'none');
        }
        view.moverCompartimento(numeroCompartimentos+1, 1);

        const estaoTodosManutencao = view.compartimento.every((m) => m.manutencao === true);

        estaoTodosManutencao ? $('.button').prop('disabled', true) : $('.button').prop('disabled', false);
    }

}).call(this);