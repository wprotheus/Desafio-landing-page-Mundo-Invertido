import {subscribeToHellfireClub} from './firebase/hellfire-club.js';

const state = {
    media: {
        normal: new Audio('./assets/sounds/normal.mp3'),
        upsideDown: new Audio('./assets/sounds/upside.mp3'),
    },
    dataUser: {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        level: document.getElementById('level'),
        character: document.getElementById('character'),
    }
};

function createMediaElements() {
    const audioContainer = document.querySelector('.container-audio-content');
    const audio = document.createElement('audio');
    audio.className = 'audio';
    audio.id = 'music';
    audio.src = state.media.normal.src;
    audio.loop = true;
    audio.volume = 0.2;
    audioContainer.appendChild(audio);
    audio.play().catch(() => {
    });
}

function switchTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'upsideDown' : 'normal';
    const audio = document.getElementById('music');
    if (audio) {
        audio.pause();
        audio.src = state.media[theme].src;
        audio.currentTime = 0;
        audio.volume = 0.2;
        audio.play().catch(() => {
        });
    }
}

function clearFields() {
    Object.values(state.dataUser).forEach(input => input.value = '');
}

function validateFields() {
    return Object.values(state.dataUser).every(input => input && input.value.trim() !== '');
}

async function handleSubscribe() {
    if (!validateFields()) {
        alert('Preencha todos os campos!');
        return;
    }
    const subscription = {
        name: state.dataUser.name.value,
        email: state.dataUser.email.value,
        level: state.dataUser.level.value,
        character: state.dataUser.character.value,
    };
    try {
        const subscriptionId = await subscribeToHellfireClub(subscription);
        clearFields();
        alert(`Inscrito com sucesso: ${subscriptionId}`);
    } catch (error) {
        alert('Erro ao inscrever. Tente novamente.');
        console.error(error);
    }
}

function initMedia() {
    createMediaElements();
}

document.addEventListener('DOMContentLoaded', () => {
    initMedia();
    document.getElementById('switch-theme-button').addEventListener('click', switchTheme);
    document.getElementById('btnSubscribe').addEventListener('click', handleSubscribe);
});