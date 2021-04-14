//linter object literal that contains all the parts to the webapp.
const linter = {
  //settings object literal that updates settings real-time and houses the functions that perform the respective task of that setting
  settings: {
  //default values are set to false since the default state is 'off' or 'unchecked'
  _jargon: false,
  _grammar: false,
  removeWord: [],
  replaceWord: [],

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

  userRemoveReplace: function(string) {
    for (let i = 0; i < this.removeWord.length; i++){
      const regexRemove = new RegExp(`\\b${this.removeWord[i]}`, `ig`);
      string = string.replace(regexRemove, this.replaceWord[i]);
    }
    return string;
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

    sentences.forEach((sentence, i) => {
        sentences[i] = this.userRemoveReplace(sentence);
   });
  },

  resetSettings: function () {

  }
 },
 //editor object literal houses anything to do with the editor (input, output, buttons etc.)
 editor: {
  input: document.querySelector('#text-input'),
  output: document.querySelector('#text-output'),
  counter: document.querySelector('#counter'),
  errorMessage: document.querySelector('.submit-error-message'),

  focusInit: function() {
    this.counter.style.visibility = "visible";
    this.input.style.color = "black";
    this.errorMessage.innerHTML = "";

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
      this.counter.style.color = "#FFF";
    }

    return this.counter.innerHTML = currentCount+' / '+counterMax;

  },
  editorButtons: function(event){

    if(event.currentTarget.id === "submit-button"){
      if (this.input.value === ""){
        this.errorMessage.style.visibility = "visible";
        return this.errorMessage.innerHTML = "Please type something first!"
      }
      else {
        this.visibility(event.currentTarget.id)
        this.output.innerHTML = betterSentences(this.input.value);
      }
     }

    if (event.currentTarget.id === "back-button"){
      this.visibility(event.currentTarget.id);
    }

    if (event.currentTarget.id === "reset-button"){
      this.visibility(event.currentTarget.id);
      this.input.value = "";
      this.output.innerHTML = "";
      this.counter.innerHTML = "";
    }

   },
   visibility: function(id){
     if (id === "submit-button"){
       document.querySelectorAll('.hide-me').forEach(element => {
          element.classList.toggle('m-fadeOut');
          element.classList.remove('m-fadeIn');
        });
        document.querySelectorAll('.hidden').forEach(element => {
          element.classList.toggle('m-fadeIn');
          element.classList.remove('m-fadeOut');
        });
       return;
     }

     if(id === "back-button" || id === "reset-button"){
       document.querySelectorAll('.hide-me').forEach(element => {
          element.classList.toggle('m-fadeIn');
          element.classList.toggle('m-fadeOut');
          });
        document.querySelectorAll('.hidden').forEach(element => {
          element.classList.toggle('m-fadeOut');
          element.classList.toggle('m-fadeIn');
        });
        /*document.querySelectorAll('.button[data-button-type="output-button"]').forEach(button => {
          button.style.visibility = "hidden";
          //button.style.transition = "transition: visibility 1s ease-out 3s, opacity 1s";
      });*/
       return;
     }
   }
 }
}

//Since I don't really need to share this across multiple objects, there isn't really a use to make a class here.
/*String.prototype.createSentences = function () {
  return this.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
}*/
const userWordRemoveInput = function(event) {
  const removeWordDiv = document.createElement("li");
  const wordToRemove = document.querySelector('#remove-word').value;
  const wordToReplace = document.querySelector('#replace-word').value;
  removeWordDiv.innerHTML = wordToRemove+` &#8594; `+wordToReplace;
  document.body.appendChild(removeWordDiv);
  settings.removeWord.push(document.querySelector('#remove-word').value);
  settings.replaceWord.push(document.querySelector('#replace-word').value);
  removeWords.appendChild(removeWordDiv);
  document.querySelector('#remove-word').value = "";
  document.querySelector('#replace-word').value = "";
}

const betterSentences = string => {
  let newParagraph = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
  linter.settings.executeSettings(newParagraph);
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


document.querySelector('#text-input').addEventListener('focusin', linter.editor.focusInit.bind(linter.editor))
document.querySelectorAll('.switch-input[data-toggle="setting-toggle"]').forEach(toggle => {
  toggle.addEventListener('change', linter.settings.changeSettings.bind(linter.settings))});
document.querySelectorAll('.button[data-button="editor-button"]').forEach(button => {
  console.log(button)
  button.addEventListener('click', linter.editor.editorButtons.bind(linter.editor))});
const removeWords = document.querySelector('#replace-submission-container');
//document.querySelector('#replace-button').addEventListener('click', userWordRemoveInput)
