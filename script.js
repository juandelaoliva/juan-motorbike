// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Configura Firebase con tu configuración personalizada
const firebaseConfig = {
    apiKey: "AIzaSyDUvpgttLRgN1Ckk93irvOhaaAxhetQ3zM",
    authDomain: "insta360-dbd66.firebaseapp.com",
    projectId: "insta360-dbd66",
    storageBucket: "insta360-dbd66.appspot.com",
    messagingSenderId: "429747119644",
    appId: "1:429747119644:web:adcd319f3e02522a8521d9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variables de la barra de progreso
const goalAmount = 559.99;
let currentAmount = 0;

// Elementos de la interfaz
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const collaboratorList = document.getElementById('collaborator-list');

// Función para actualizar la barra de progreso
function updateProgress(amount) {
    currentAmount += amount;
    const percentage = (currentAmount / goalAmount) * 100;
    progressBar.style.width = percentage + '%';
    progressPercentage.textContent = `${percentage.toFixed(1)}% - €${currentAmount.toFixed(2)}`;
}

// Función para añadir colaboradores a la lista sin mostrar la cantidad de dinero
function addCollaborator(name) {
    const li = document.createElement('li');
    li.textContent = name;
    collaboratorList.appendChild(li);
}

// Cargar colaboradores desde Firebase y actualizar la interfaz
const collaboratorsRef = collection(db, 'collaborators');
const q = query(collaboratorsRef, orderBy('amount', 'desc'));

onSnapshot(q, (snapshot) => {
    collaboratorList.innerHTML = '';  // Limpiar la lista antes de añadir
    currentAmount = 0;  // Reiniciar el monto actual
    snapshot.forEach((doc) => {
        const collaborator = doc.data();
        addCollaborator(collaborator.name); // Añadir colaborador sin mostrar la cantidad
        if (collaborator.amount) {
            updateProgress(collaborator.amount); // Actualizar progreso basado en la cantidad
        }
    });
});

// Función para cambiar el idioma
function changeLanguage(language) {
    document.querySelectorAll('[data-es], [data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });
}

// Eventos para los botones de idioma
document.getElementById('es-btn').addEventListener('click', () => {
    changeLanguage('es');
    document.getElementById('es-btn').classList.add('active');
    document.getElementById('en-btn').classList.remove('active');
});

document.getElementById('en-btn').addEventListener('click', () => {
    changeLanguage('en');
    document.getElementById('en-btn').classList.add('active');
    document.getElementById('es-btn').classList.remove('active');
});


document.getElementById('copy-btn').addEventListener('click', function() {
    const phoneNumber = document.getElementById('phone-number').value;
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Número de teléfono copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar el número de teléfono: ', err);
    });
});