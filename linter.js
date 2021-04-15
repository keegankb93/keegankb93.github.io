//linter object literal that contains all the parts to the webapp.
const linter = {
  //settings object literal that updates settings real-time and houses the functions that perform the respective task of that setting
  settings: {
  //default values are set to false since the default state is 'off' or 'unchecked'
  _jargon: false,
  _grammar: false,
  jargonWords: [],
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
  //changes the values of the setting based on the 'change' event on the setting toggle. Looping through each key and using data-attributes to match the settings and alter the values as needed. This allows me to add multiple toggles and only need to add it to the key/val of the object and HTML.
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
  //Takes two values from stored arrays in the settings obj. User inputs a remove and replace value. Then with a RegExp object we look for the word and replace it.
  userRemoveReplace: function(string) {
    for (let i = 0; i < this.removeWord.length; i++){
      const regexRemove = new RegExp(`\\b${this.removeWord[i]}\\b`, `ig`);
      string = string.replace(regexRemove, this.replaceWord[i]);
    }
    return string;
  },
  //executes all settings based on what the user selects.
  executeSettings: function(sentences) {
   if (this.jargon) {
      sentences.forEach((sentence, i) => {
        sentences[i] = this.jargonReplace(sentence);
      });
    }

    if (this.grammar) {
      sentences.forEach((sentence, i) => {
        sentences[i] = this.grammarReplace(sentence);
      });
    }

    sentences.forEach((sentence, i) => {
        sentences[i] = this.userRemoveReplace(sentence);
   });
  },
  //Is called from the reset button, resets all settings to default states.
  resetSettings: function () {
    this.removeWord = [];
    this.replaceWord = [];
    this.jargon = false;
    this.grammar = false;
    document.querySelector('#replace-submission-container').innerHTML = "";
    document.querySelectorAll('.switch-input[data-toggle="setting-toggle"]').forEach(toggle => {
      toggle.checked = false;
    });
  },
  //splits sentences and returns them into an array with each sentence taking an index. I then pass the sentences to the 'execute settings function' that will check to see what actions are needed to be performed based on the user's settings. I then return the results joined together into a string.
  betterSentences: function(string) {
    let sentence = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
    this.executeSettings(sentence);
    return sentence.join('');

  },
  //replace chain to filter through some Jargon.
  jargonReplace: function(string) {
    return string.replace(/\butilize\b/ig, 'use')
                 .replace(/\butilizing\b/ig, 'using')
                 .replace(/\boptimize\b/ig, 'improve')
                 .replace(/\boptimizing\b/ig, 'improving')
                 .replace(/\bleverage\b/ig, 'take the opportunity')
                 .replace(/\bpivot\b/ig, 'change direction')
                 .replace(/\bstopgap\b/ig, 'temporary')
                 .replace(/\breinvent the wheel\b/ig, 'start over')
                 .replace(/\bactionable\b/ig, 'functional')
                 .replace(/\bdeep dive\b/ig, 'closer look');
  },
  //replace chain to search out 'common' oxford commas and turn exclamations into periods.
  grammarReplace: function(string) {
    return string.replace(/\b, and\b/g, ' and')
                 .replace(/\b, or\b/g, ' or')
                 .replace(/!/g, '.');
  },
  //function that creates a div element with the user's input of a 'remove value' and a 'replace value'. The values are passed through "sanitization" to prevent any injections (not that anyone would do that on my app haha!) the created element is appended to the div it needs to be housed in which in this case is in the settings container. I push the values to parallel arrays that will be used to replace them when the user submits.
  userWordRemoveInput: function() {
    const removeWordDiv = document.createElement("div");
    const wordToRemove = sanitizeHTML(document.querySelector('#remove-word').value);
    const wordToReplace = sanitizeHTML(document.querySelector('#replace-word').value);
    removeWordDiv.innerHTML = `<mark class="remove-mark">${wordToRemove}</mark>`+`<i class="fas fa-rocket"></i>`+`<mark class="replace-mark">${wordToReplace}</mark>`;
    document.body.appendChild(removeWordDiv);
    removeWords.appendChild(removeWordDiv);

    this.removeWord.push(document.querySelector('#remove-word').value);
    this.replaceWord.push(document.querySelector('#replace-word').value);


    document.querySelector('#remove-word').value = "";
    document.querySelector('#replace-word').value = "";
  }
 },
 //editor object literal houses anything to do with the functioning of the  editor (input, output, buttons etc.)
 editor: {
  input: document.querySelector('#text-input'),
  output: document.querySelector('#text-output'),
  counter: document.querySelector('#counter'),
  errorMessage: document.querySelector('.submit-error-message'),
  //This method initializes a few event listeners after the user begins to type. No reason to begin listening until that has happened.
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
//This method keeps track of the amount of characters the user is typing by looking at the length of the input value.
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
  //This is a handler for all buttons in the editor. It takes the id of the event and executes the respective actions.
  editorButtons: function(event){
   //submit button
   if(event.currentTarget.id === "submit-button"){
    if (this.input.value === ""){
      this.errorMessage.style.visibility = "visible";
      return this.errorMessage.innerHTML = "Please type something first!"
    }
    else {
      this.visibility(event.currentTarget.id)
      return this.output.innerHTML = sanitizeHTML(linter.settings.betterSentences(this.input.value));
      }
    }

    //back buttons
    if (event.currentTarget.id === "back-button"){
      this.visibility(event.currentTarget.id);
      return;
    }

    //reset buttons
    if (event.currentTarget.getAttribute('data-button-type') === "reset"){
      if(event.currentTarget.id === "reset-button"){
        this.visibility(event);
      }
      this.input.value = "";
      this.output.innerHTML = "";
      this.counter.innerHTML = "";
      linter.settings.resetSettings();
      return;
    }
    //copy button
    if (event.currentTarget.getAttribute('data-button-type') === "copy"){
      const range = document.createRange();
      range.selectNode(this.output);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    }

    //settings cog button
    if(event.currentTarget.id === "settings-cog-button"){
      document.querySelector('.settings-column').classList.toggle('m-fadeIn');
      return;
    }

    //settings replace (+) button
    if(event.currentTarget.id === "replace-button"){
      if(document.querySelector('#remove-word').value === "") {
        document.querySelector('#remove-word').classList.add("remove-error-border");
      }
      else {
        document.querySelector('#remove-word').classList.remove("remove-error-border");
        linter.settings.userWordRemoveInput();
      }
      return;
    }

   },
   //this function/method controls the visibility of the elements. By adding and removing fade-in fade-out classes allowing the CSS transition property to do it's magic. Since multiple buttons handle the fades I can't just toggle on each one otherwise you get mismatched out of sync fade-ins and outs. So I have to make sure the correct fade-in or fade-out is on the element at the correct time.
   visibility: function(id){
     //submit button fade ins and outs.
     if (id === "submit-button"){
       document.querySelector('.settings-column').classList.remove('m-fadeIn');
       document.querySelector('.settings-column').classList.toggle('m-fadeOut');
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
     //Back button and 1 reset button manipulate visibility here. I only pass in the event if of the reset button that needs to call this function.
     if(id === "back-button" || id.currentTarget.getAttribute('data-button-type') === "reset") {
       document.querySelectorAll('.hide-me').forEach(element => {
          element.classList.toggle('m-fadeIn');
          element.classList.toggle('m-fadeOut');
          });
        document.querySelectorAll('.hidden').forEach(element => {
          element.classList.toggle('m-fadeOut');
          element.classList.toggle('m-fadeIn');
        });
       return;
     }
   }
 }
}

//Since I don't really need to share this across multiple objects, there isn't really a use to make a class here.
/*String.prototype.createSentences = function () {
  return this.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
}*/

//passes any values inputted by a user to a temporary textContent element to return the value as the user typed. textContent allows the return of special chars vs innerText etc.
const sanitizeHTML = function (str) {
	let temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

//A few listeners need to be ran through. Wait until page is loaded to execute.
window.onload = function() {
  document.querySelector('#text-input').addEventListener('focusin', linter.editor.focusInit.bind(linter.editor))
  document.querySelectorAll('.switch-input[data-toggle="setting-toggle"]').forEach(toggle => {
    toggle.addEventListener('change', linter.settings.changeSettings.bind(linter.settings))});
  document.querySelectorAll('.button[data-button="editor-button"]').forEach(button => {
    button.addEventListener('click', linter.editor.editorButtons.bind(linter.editor))});
  const removeWords = document.querySelector('#replace-submission-container');
}
