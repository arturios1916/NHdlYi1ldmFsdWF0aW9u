/*
* Numeric Input Component
*   HTML (initial state): <input type="text" class="c-numeric-input" />
*   Requirement:
*   - should only accept numeric value only such as: 1, 1.2, -5, or 1000

*   - if user enters leading zero, or .  when user moves focus away from the input, it should
*     change to correct format:
*       .1 ==> 0.1 and 01 => 1

*   - if user enter invalid character/value, HTML should change to this
*       <input type="text" class="c-numeric-input c-numeric-input--error" />
*       <span class="c-numeric-input__error-msg">invalid input</span>

*   - if user enter valid value and move focus away from the input HTML should change to this:
*       <input type="text" class="c-numeric-input c-numeric-input--valid" />

*   - if user focus on the input or user clear value from the input,
*     HTML should return to initial stage
*
* Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
* red or green border to the input
* */

const validationCssClass = {
  VALID: 'c-numeric-input--valid',
  ERROR: 'c-numeric-input--error',
};

const validationHintClass = 'c-numeric-input__error-msg';

const NumericInput = {
  init: () => {
    document.querySelectorAll('.c-numeric-input').forEach(elem => {
      NumericInput.appendListeners(elem);
    });
  },
  appendListeners: (inputElem) => {
    inputElem.addEventListener('blur', NumericInput.onBlurHandler);
    inputElem.addEventListener('focus', NumericInput.onFocusHandler);
  },
  onBlurHandler: ({ target }) => {
    if (target.value.length === 0) {
      NumericInput.reset(target);
      return;
    }
    const correctedValue = NumericInput.valueCorrector(target.value);
    target.value = correctedValue;
    const isValid = NumericInput.numericValidator(correctedValue);
    
    NumericInput.triggerValidation(target, isValid);

    if (isValid) {
      NumericInput.removeValidationHint(target);
    } else {
      if (!NumericInput.getValidationHint(target)) {
        NumericInput.appendValidationHint(target, NumericInput.createValidationHint('invalid input'))
      }
    }

  },
  onFocusHandler: ({ target }) => {
    NumericInput.reset(target);
  },
  valueCorrector: (input) => {
    try {
      if (input?.length === 0) {
        return input;
      }
      const correctedValue = Number(input)
      if (isNaN(correctedValue)) {
        return input;
      }
      return correctedValue;
    } catch (error) {
      return input;
    }
  },
  numericValidator: (inputValue) => {
    try {
      if (inputValue?.length === 0) {
        return true;
      }
      const numericVal = Number(inputValue);
      if (isNaN(numericVal)) {
        return false;
      } 
      return true;
    } catch (error) {
      return false;
    }
  },
  triggerValidation: (inputElem, valid) => {
    inputElem.classList.remove(
      valid ? validationCssClass.ERROR : validationCssClass.VALID
    );
    inputElem.classList.add(
      valid ? validationCssClass.VALID : validationCssClass.ERROR
    );
  },
  clearValidation: (inputElem) => {
    console.log(inputElem);
    inputElem.classList.remove(
      ...Object.values(validationCssClass)
    )
  },
  createValidationHint: (text) => {
    const elem = document.createElement('span')
    elem.classList.add(validationHintClass);
    elem.innerHTML = text; 
    return elem;
  },
  appendValidationHint: (inputElem, hintElem) => {
    inputElem.insertAdjacentElement('afterend', hintElem);
  },
  removeValidationHint: (inputElem) => {
    const hintElem = NumericInput.getValidationHint(inputElem);
    hintElem?.remove();
  },
  getValidationHint: (inputElem) => {
    const hintElem = inputElem.nextElementSibling;
    if (hintElem?.nodeName !== 'SPAN') {
      return null;
    } else {
      return hintElem;
    }
  },
  reset: (inputElem) => {
    NumericInput.clearValidation(inputElem);
    NumericInput.removeValidationHint(inputElem);
  }

};
document.addEventListener('DOMContentLoaded', NumericInput.init);
