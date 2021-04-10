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


const textInput = () => {
  return document.querySelector('#text-input');
}

const editor = {
  input: "",

}

const initiate = () => {
  //initializes output and counter selector
  const textOutput = document.querySelector('#text-output');
  const counter = document.querySelector('#counter');
  const submitInput = document.querySelector('#submit-button');

  editor.input = textInput().value
  document.querySelectorAll('.switch-input[data-toggle="setting-toggle"]').forEach(toggle => {
  toggle.addEventListener('change', settings.changeSettings.bind(settings))});

  textInput().addEventListener('focusin', () => {
    textInput().style.color = "black";
    counter.style.visibility = "visible";
  });

  textInput().addEventListener('input', () => {
    count(textInput().value);
  });


  submitInput.addEventListener('click', () => {
    let errorMessage = document.querySelector('.submit-error-message');

    if (textInput().value === ""){
      errorMessage.innerHTML = "Please type something first!"
      errorMessage.style.visibility = "visible";
    }
    else {
      textOutput.innerHTML = betterSentences(textInput().value);
      errorMessage.style.visibility = "hidden";
    }
  });


  //adds listenter to reset textarea when unfocused and textarea is blank and resets counter to 0
  textInput().addEventListener('focusout', () => {
    if(textInput().value === "") {
      textInput().style.color = "gray";
      textOutput.innerHTML = "";
      counter.style.visibility = "hidden";
    }
  });

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

const count = value => {
  let counterMax = document.querySelector('#text-input').getAttribute('maxlength');
  let currentCount = value.length;

  if (currentCount === counterMax){
    counter.style.color = "#f15b60";
  }
  else {
    counter.style.color = "#177bc0";
  }

  return counter.innerHTML = currentCount+'/'+counterMax;

}

initiate()
