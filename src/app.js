import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  // Elementos DOM
  const cardElement = document.getElementById('card');
  const cardValueElement = document.getElementById('card-value');
  const cardSuitElement = document.getElementById('card-suit');
  const generateBtn = document.getElementById('generate-btn');
  const widthInput = document.getElementById('width-input');
  const heightInput = document.getElementById('height-input');
  const applySizeBtn = document.getElementById('apply-size-btn');
  const timerStatus = document.getElementById('timer-status');
  const timerToggleBtn = document.getElementById('timer-toggle-btn');
  
  // Variables para el temporizador
  let timerInterval;
  let isTimerRunning = false;
  let timerSeconds = 10;
  
  // Valores y palos posibles
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits = [
    { name: 'hearts', symbol: '♥', color: 'red' },
    { name: 'diamonds', symbol: '♦', color: 'red' },
    { name: 'clubs', symbol: '♣', color: 'black' },
    { name: 'spades', symbol: '♠', color: 'black' }
  ];
  
  // Función para generar una carta aleatoria
  function generateRandomCard() {
    const randomValueIndex = Math.floor(Math.random() * values.length);
    const randomSuitIndex = Math.floor(Math.random() * suits.length);
    
    const value = values[randomValueIndex];
    const suit = suits[randomSuitIndex];
    
    return { value, suit };
  }
  
  // Función para actualizar la carta en pantalla
  function updateCard() {
    const card = generateRandomCard();
    
    // Actualizar elementos visuales
    cardValueElement.textContent = card.value;
    cardSuitElement.textContent = card.suit.symbol;
    
    // Actualizar clases CSS para el palo
    cardElement.className = 'card';
    cardElement.classList.add(card.suit.name);
    
    // Actualizar color del símbolo
    cardSuitElement.style.color = card.suit.color;
    
    // Mostrar información en consola
    console.log(`Nueva carta generada: ${card.value} de ${card.suit.name}`);
  }
  
  // Función para aplicar el tamaño personalizado
  function applyCustomSize() {
    const width = widthInput.value;
    const height = heightInput.value;
    
    // Validar valores
    if (width && height) {
      if (width < 50 || width > 500 || height < 50 || height > 700) {
        alert('Por favor ingresa valores entre 50 y 500 para ancho, y entre 50 y 700 para alto.');
        return;
      }
      
      cardElement.style.width = `${width}px`;
      cardElement.style.height = `${height}px`;
      
      console.log(`Tamaño de carta actualizado: ${width}px x ${height}px`);
    } else {
      alert('Por favor ingresa valores válidos para ancho y alto.');
    }
  }
  
  // Función para reiniciar al tamaño predeterminado
  function resetSize() {
    cardElement.style.width = '';
    cardElement.style.height = '';
    widthInput.value = '';
    heightInput.value = '';
  }
  
  // Función para manejar el temporizador
  function toggleTimer() {
    if (isTimerRunning) {
      // Detener el temporizador
      clearInterval(timerInterval);
      timerToggleBtn.textContent = 'Iniciar Temporizador (10s)';
      timerStatus.textContent = 'Temporizador detenido';
      timerStatus.className = 'badge bg-danger';
      isTimerRunning = false;
      console.log('Temporizador detenido');
    } else {
      // Iniciar el temporizador
      timerToggleBtn.textContent = 'Detener Temporizador';
      timerStatus.textContent = 'Generando nueva carta cada 10 segundos';
      timerStatus.className = 'badge bg-success';
      isTimerRunning = true;
      
      // Generar carta inmediatamente
      updateCard();
      
      // Configurar intervalo
      timerInterval = setInterval(updateCard, timerSeconds * 1000);
      console.log('Temporizador iniciado: nueva carta cada 10 segundos');
    }
  }
  
  // Event listeners
  generateBtn.addEventListener('click', updateCard);
  applySizeBtn.addEventListener('click', applyCustomSize);
  timerToggleBtn.addEventListener('click', toggleTimer);
  
  // Botón para resetear tamaño
  document.getElementById('reset-size-btn').addEventListener('click', resetSize);
  
  // Generar carta inicial
  updateCard();
  
  console.log("Generador de cartas aleatorias listo!");
};