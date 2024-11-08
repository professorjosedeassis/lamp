/**
 * Simples simulador de uma lâmpada
 * @author Professor José de Assis
 */

// variáveis de apoio  lógica
let chave = false // o interruptor inicia desligado
let lampada = true // a lâmpada está OK

// lanterna (pré carregamento)
let stream, track  //lanterna
inicializarLanterna()

// pré carregamento do áudio para sincronizar com atroca de imagem
let som = new Audio("sound/breaking-glass.mp3") // 1 arquivo só pode ser simplificado desta forma
som.volume = 1 // 0 - 0% 1 - 100%

function quebrar() {
    if (lampada === true) { //simplificar removendo === true
        document.getElementById('lamp').src = "img/broken.jpg"
        // reproduzindo um arquivo de áudio no JS
        // Passo 1: copiar o arquivo de áudio para o projeto
        // Passo 2: Usar a classe Audio(biblioteca interna do JS)
        // Passo 3: Pré carregar o arquivo de áudio para sincronizar com a quebra de imagem
        som.play()
        // apoo a lógica para o JS identificar a lâmpada quebrada
        lampada = false
    }
}

/*
function onoff() {
    if (chave === false && lampada === true) {
        // ligar a chave
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true //O JS agora sabe que a chave está ligada
        // acender a lâmpada
        document.getElementById('lamp').src = "img/on.jpg"

    } else if (chave === true && lampada === true) {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false
        //desligar a lâmpada
        document.getElementById('lamp').src = "img/off.jpg"
    } 
}
    */

function onoff() {
    if (chave === false) {
        // Ligar a chave
        document.getElementById('interruptor').src = "img/swon.png";
        chave = true

        // Verifica se a lâmpada está intacta antes de acender
        if (lampada === true) {
            document.getElementById('lamp').src = "img/on.jpg"
        }
    } else {
        // Desligar a chave
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false

        // Verifica se a lâmpada está intacta antes de desligar
        if (lampada === true) {
            document.getElementById('lamp').src = "img/off.jpg"
        }
    }
}

// Botão pressionado
const botao = document.getElementById('button');
const lampadaImg = document.getElementById('lamp');

//evento mousedown (quando o botão do mouse é pressionado)
//evento mouseup (quando o botão do mouse é solto)

// Acender a lâmpada enquanto o botão estiver pressionado (se ela não estiver quebrada) e se a chave estiver desligada
botao.addEventListener('mousedown', (event) => {
    event.preventDefault()
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/on.jpg"
    }
})

// Apagar a lâmpada ao soltar o botão (se ela não estiver quebrada) e chave estiver desligada
botao.addEventListener('mouseup', (event) => {
    event.preventDefault()
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/off.jpg"
    }
})

// Suporte para touchscreens
botao.addEventListener('touchstart', (event) => {
    event.preventDefault()
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/on.jpg"        
    }
})
botao.addEventListener('touchend', (event) => {
    event.preventDefault()
    if (lampada === true && chave === false) {
        lampadaImg.src = "img/off.jpg"        
    }
})

// Lanterna

// Inicializa o stream e configura o track apenas uma vez
async function inicializarLanterna() {
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        
        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]
        
        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities();
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.");
            return
        }
    } catch (error) {
        console.error("Erro ao inicializar a lanterna:", error)
    }
}

// Função para ligar a lanterna
async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error("Erro ao tentar ligar a lanterna:", error)
        }
    }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error("Erro ao tentar desligar a lanterna:", error)
        }
    }
}