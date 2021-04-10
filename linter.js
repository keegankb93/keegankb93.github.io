//object literal to store settings data + methods related to changing and checking setting values
const settings = {
  //default values are set to false since the default state is 'off' or 'unchecked'
  _jargon: false,
  _grammar: false,

  get jargon() {
    return this._jargon;
  },
  set jargon(value) {
    this._jargon = value;
  },
  get grammar() {
    return this._grammar;
  },
  set grammar(value) {
    this._grammar = value;
  },
  //changes the values of the setting based on the 'change' event on the setting toggle.
  changeSettings: function(event) {
    Object.keys(this).forEach(setting => {
      if (event.target.getAttribute("data-setting") === setting){
        if (event.target.checked) {
          return this[setting] = true;
        }
        else {
          return this[setting] = false;
        }
      }
    });
  },

  executeSettings: function(sentences) {
   if (this.jargon) {
      sentences.forEach((sentence, i) => {
        sentences[i] = jargonReplace(sentence);
      });
    }

    if (this.grammar) {
      sentences.forEach((sentence, i) => {
        sentences[i] = grammarReplace(sentence);
      });
    }
   }
}


/*const textInput = () => {
  return document.querySelector('#text-input');
}*/

const editor = {
  input: document.querySelector('#text-input'),
  output: document.querySelector('#text-output'),
  counter: document.querySelector('#counter'),

  focusInit: function() {
    this.input.style.color = "black";
    this.counter.style.visibility = "visible";

    this.input.addEventListener('input', () => {
      this.count(this.input.value);
    });

    this.input.addEventListener('focusout', () => {
      if(this.input.value === "") {
        this.input.style.color = "gray";
        this.output.innerHTML = "";
        this.counter.style.visibility = "hidden";
      }
    });
  },

  count: function(value) {
    let counterMax = this.input.getAttribute('maxlength');
    let currentCount = value.length;

    if (currentCount > counterMax - 1){
      this.counter.style.color = "#f15b60";
    }
    else {
      this.counter.style.color = "#177bc0";
    }

    return this.counter.innerHTML = currentCount+'/'+counterMax;

  },

  submitInput: function() {
  let errorMessage = document.querySelector('.submit-error-message');

    if (this.input.value === ""){
      errorMessage.innerHTML = "Please type something first!"
      errorMessage.style.visibility = "visible";
    }
    else {
      this.output.innerHTML = betterSentences(this.input.value);
      errorMessage.style.visibility = "hidden";
    }
  }
}

//Since I don't really need to share this across multiple objects, there isn't really a use to make a class here.
/*String.prototype.createSentences = function () {
  return this.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
}*/

const betterSentences = string => {
  let newParagraph = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
  settings.executeSettings(newParagraph);
  return newParagraph.join('');

}

const jargonReplace = string => {
   return string.replace(/\butilize/ig, 'use')
                .replace(/\butilizing/ig, 'using')
                .replace(/\boptimize/ig, 'improve')
                .replace(/\boptimizing/ig, 'improving')
                .replace(/\bleverage/ig, 'take the opportunity')
                .replace(/\bpivot/ig, 'change direction');


}

const grammarReplace = string => {
  return string.replace(/, and(?![^,]*^)/g, ' and')
               .replace(/, or(?![^,]*^)/g, ' or')
               .replace(/!/g, '.');
              // .replace(/, and/, ' and')

}

const initiate = () => {
  document.querySelector('#text-input').addEventListener('focusin', editor.focusInit.bind(editor))
  document.querySelectorAll('.switch-input[data-toggle="setting-toggle"]').forEach(toggle => {
  toggle.addEventListener('change', settings.changeSettings.bind(settings))});
  document.querySelector('#submit-button').addEventListener('click', editor.submitInput.bind(editor))

}

initiate()
