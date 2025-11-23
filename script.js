// 1. Grab display element once for reuse
const display = document.getElementById('display');

// 2. Current input string (builds what user sees)
let current = '0';

// 3. Flag to lock input after result to prevent concatenation
let resetOnNext = false;

// 4. Central function triggered by every button
function handleInput(value) {
  switch (value) {
    case 'clear':            // C button
      current = '0';
      resetOnNext = false;
      break;

    case 'backspace':        // ⌫ button
      current = current.length === 1 ? '0' : current.slice(0, -1);
      break;

    case 'equals':           // = button
      try {
        // Evaluate math string safely (basic ops only)
        current = eval(current).toString(); // Simple demo; sanitise in prod
      } catch (e) {
        current = 'Error';
      }
      resetOnNext = true;   // Next number press will clear error/result
      break;

    default:                 // Number or operator
      if (resetOnNext) {
        current = '0';
        resetOnNext = false;
      }
      // Prevent multiple leading zeros
      if (current === '0' && value !== '.') current = '';
      current += value;
  }
  updateDisplay();          // Refresh screen
}

// 5. Utility to sync display with current string
function updateDisplay() {
  display.value = current;
}