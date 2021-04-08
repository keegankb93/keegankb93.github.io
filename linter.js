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
    console.log(event.target.id)
    console.log(this.jargon)
    if (event.target.id === "jargon-replace") {
      if (event.target.checked) {
        this.jargon = true;
        console.log(this.jargon);
      }
      else {
        this.jargon = false;
      }
    }

    if (event.target.id === "grammar-replace") {
      if (event.target.checked) {
        return this.grammar = true;
      }
      else {
        return this.grammar = false;
      }
    }
   }


}

const textInput = () => {
  return document.querySelector('#text-input');
}

const initiate = () => {
  //initializes output and counter selector
  const textOutput = document.querySelector('#text-output');
  const counter = document.querySelector('#counter');
  const submitInput = document.querySelector('#submit-button');

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
      console.log(settings.jargon)
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

const betterSentences = string => {

  let splitSentence = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

  if (settings.jargon) {
    splitSentence.forEach((sentence, i) => {
        splitSentence[i] = jargonReplace(sentence);
      });
    }

  if (settings.grammar) {
    splitSentence.forEach((sentence, i) => {
        splitSentence[i] = grammarReplace(sentence);
      });
    }

  return splitSentence.join('');
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

  //counter.innerHTML = '0/'+textInput.getAttribute('maxlength');
  if (currentCount === counterMax){
    counter.style.color = "#f15b60";
  }
  else {
    counter.style.color = "#177bc0";
  }

  return counter.innerHTML = currentCount+'/'+counterMax;

}

initiate()
