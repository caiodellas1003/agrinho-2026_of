// ==========================================
// CONFIGURAÇÃO INICIAL DO JOGO
// ==========================================
let saude = 100;
let agua = 100;
let energia = 100;
let pontos = 0;
let fase = 1;

// Banco de dados dos dias/cenários do jogo
const cenarios = {
    1: {
        texto: "☀️ **DIA 1: O Calor do Meio-Dia**<br><br>O sol está muito forte e a temperatura dentro da estufa subiu para 35°C! As plantas de tomate estão começando a murchar rápido. O que você faz?",
        opcaoA: "Ligar o sistema de irrigação por gotejamento e os ventiladores no máximo.",
        opcaoB: "Ativar as telas de sombreamento ecológicas e abrir as janelas manuais.",
        consequenciaA: { saude: 10, agua: -20, energia: -20, pontos: 5, msg: "Boa reação imediata! Mas o uso excessivo de água e energia da rede pesou no bolso e no planeta." },
        consequenciaB: { saude: 5, agua: -5, energia: 0, pontos: 20, msg: "Excelente! O manejo físico/sustentável controlou a temperatura poupando recursos valiosos." }
    },
    2: {
        texto: "🐛 **DIA 2: A Invasão dos Pulgões**<br><br>Você detectou o início de uma infestação de pulgões (pragas) em um canteiro. Como resolver?",
        opcaoA: "Aplicar defensivo químico forte em toda a estufa para erradicar logo o problema.",
        opcaoB: "Introduzir joaninhas (predadores naturais) e aplicar calda orgânica de fumo.",
        consequenciaA: { saude: -15, agua: 0, energia: 0, pontos: -10, msg: "Os pulgões sumiram, mas o produto químico afetou a qualidade do solo e a saúde geral do ecossistema." },
        consequenciaB: { saude: 15, agua: -5, energy: 0, pontos: 25, msg: "Incrível! O controle biológico funcionou perfeitamente e manteve sua estufa 100% orgânica." }
    },
    3: {
        texto: "🌧️ **DIA 3: O Céu Fechou**<br><br>Uma tempestade forte começou e deve durar dois dias. Os painéis solares não estão gerando energia e o ar está super úmido.",
        opcaoA: "Manter as luzes LED de crescimento ligadas na potência máxima usando a rede elétrica comum.",
        opcaoB: "Ativar o modo economia, usando sensores de umidade para cortar a rega automática.",
        consequenciaA: { saude: 10, agua: 0, energia: -30, pontos: 5, msg: "As plantas continuaram recebendo luz artificial, mas o consumo de energia elétrica convencional disparou." },
        consequenciaB: { saude: 5, agua: 10, energia: -5, pontos: 20, msg: "Ótima visão tecnológica! Você aproveitou a umidade natural, economizou luz e ainda coletou água da chuva." }
    },
    4: {
        texto: "🍓 **DIA 4: Hora da Grande Colheita**<br><br>Chegou o momento de colher os frutos! Como você vai gerenciar os resíduos e a finalização?",
        opcaoA: "Colher tudo rapidamente e descartar as folhas secas e restos de plantas no lixo comum.",
        opcaoB: "Separar os frutos bons e destinar todo o resto de matéria vegetal para a composteira.",
        consequenciaA: { saude: 0, agua: 0, energia: 0, pontos: -5, msg: "Você colheu os frutos, mas desperdiçou matéria orgânica preciosa que viraria adubo." },
        consequenciaB: { saude: 10, agua: 0, energia: 0, pontos: 30, msg: "Sensacional! A compostagem fecha o ciclo sustentável, gerando adubo natural para o próximo plantio." }
    }
};

// ==========================================
// FUNÇÕES DE ATUALIZAÇÃO DA TELA (DOM)
// ==========================================
function atualizarInterface() {
    // Garante que os status fiquem entre 0 e 100
    saude = Math.max(0, Math.min(100, saude));
    agua = Math.max(0, Math.min(100, agua));
    energia = Math.max(0, Math.min(100, energia));

    document.getElementById('saude').innerText = saude;
    document.getElementById('agua').innerText = agua;
    document.getElementById('energia').innerText = energia;
    document.getElementById('pontos').innerText = pontos;
}

function carregarFase() {
    if (fase <= 4) {
        const dadosFase = cenarios[fase];
        document.getElementById('texto-cenario').innerHTML = dadosFase.texto;
        document.getElementById('btnA').innerText = dadosFase.opcaoA;
        document.getElementById('btnB').innerText = dadosFase.opcaoB;
    } else {
        finalizarJogo();
    }
}

// ==========================================
// LÓGICA DE JOGO E DECISÕES
// ==========================================
function escolha(opcao) {
    const dadosFase = cenarios[fase];
    let resultado;

    if (opcao === 'A') {
        resultado = dadosFase.consequenciaA;
    } else {
        resultado = dadosFase.consequenciaB;
    }

    // Aplica os impactos nos recursos
    saude += resultado.saude;
    agua += resultado.agua;
    energia += (resultado.energia || 0);
    pontos += resultado.pontos;

    atualizarInterface();
    alert(resultado.msg);

    // Checa se o jogador perdeu por falta de recursos críticos
    if (agua <= 0 || energia <= 0 || saude <= 0) {
        finalizarJogoPorFracasso();
        return;
    }

    // Avança de dia
    fase++;
    carregarFase();
}

// ==========================================
// TELAS DE FINALIZAÇÃO
// ==========================================
function finalizarJogo() {
    let titulo = "";
    let medalha = "";

    if (pontos >= 65 && saude >= 75) {
        medalha = "🥇";
        titulo = "Mestre do Agro Sustentável! Sua estufa foi um sucesso total, servindo de exemplo ecológico e tecnológico para o Agrinho 2026!";
    } else if (pontos >= 40) {
        medalha = "🥈";
        titulo = "Técnico Agrícola Consciente! Você conseguiu produzir bem, mas ainda pode otimizar o uso de recursos renováveis.";
    } else {
        medalha = "🥉";
        titulo = "Produtor Iniciante! A estufa sobreviveu, mas dependeu muito de químicos e recursos caros. Vale a pena tentar dinâmicas mais verdes!";
    }

    exibirTelaFinal(medalha, titulo);
}

function finalizarJogoPorFracasso() {
    let motivo = "";
    if (agua <= 0) motivo = "Sua água acabou e as plantas secaram!";
    if (energia <= 0) motivo = "Faltou energia e os sistemas inteligentes da estufa desligaram!";
    if (saude <= 0) motivo = "As pragas ou o calor extremo destruíram a saúde da sua plantação!";

    exibirTelaFinal("❌", `Game Over! ${motivo} Tente equilibrar melhor suas escolhas de manejo sustentável.`);
}

function exibirTelaFinal(icone, mensagem) {
    const containerJogo = document.getElementById('jogo');
    containerJogo.innerHTML = `
        <div style="animation: fadeIn 0.5s ease; padding: 20px;">
            <h2 style="font-size: 3rem; margin: 10px 0;">${icone}</h2>
            <p class="cenario" style="text-align: center; font-weight: 500;">${mensagem}</p>
            <h3 style="color: #1b5e20;">Sua Pontuação Final: ${pontos} Pontos</h3>
            <button onclick="window.location.reload()" class="btn-recomecar" style="text-align: center; width: auto; display: inline-block; margin-top: 15px;"> jogar Novamente 🔄</button>
        </div>
    `;
}

// Inicializa o jogo quando a página carrega
window.onload = function() {
    atualizarInterface();
    carregarFase();
};