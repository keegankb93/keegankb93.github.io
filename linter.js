const initiateInput = () => {
  //initializes output and counter selector
  const textInput = document.querySelector('#text-input');
  const textOutput = document.querySelector('#text-output');
  const submitInput = document.querySelector('#submit-button');
  const counter = document.querySelector('#counter');
  let placeholder = textInput.getAttribute('data-placeholder');
  textInput.innerHTML = placeholder;

  textInput.addEventListener('focusin', () => {
    textInput.style.color = "black";

    if(textInput.value === placeholder) {
      textInput.value= "";
    }

    textInput.addEventListener('input', () => {
      count(textInput.value);
    });

  });

  //const submitInput = document.querySelector('#submit-button');

  /*if(textInput.value === placeholder) {
    textInput.value= "";
  }*/

  submitInput.addEventListener('click', () => {
    textOutput.innerHTML = betterSentences(textInput.value);
  });

  //processes input on key release and performs replacements and edits via betterSentences function
  /*textInput.addEventListener('keyup', (event) => {
    textOutput.innerHTML = betterSentences(textInput.value);
  });*/

  //adds listener to input and counts # of characters
  /*textInput.addEventListener('input', () => {
    count(textInput.value);
  });*/

  //adds listenter to reset textarea when unfocused and textarea is blank and resets counter to 0
  textInput.addEventListener('focusout', () => {
    if(textInput.value === "") {
      textInput.style.color = "gray";
      textInput.value = placeholder;
      textOutput.innerHTML = "";
      counter.style.visibility = "hidden";
      //counter.innerHTML = "";
    }
  });

}

const betterSentences = string => {

  const checkboxes = document.querySelectorAll("input[type='checkbox']")

  let splitSentence = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);


  if (splitSentence === null){
    return "";
  }

  if (checkboxes[0].checked) {
    splitSentence.forEach((sentence, i) => {
        splitSentence[i] = wordReplace(sentence);
      });
    }

  if (checkboxes[1].checked) {
    splitSentence.forEach((sentence, i) => {
        splitSentence[i] = punctReplace(sentence);
      });
    }

  return splitSentence.join('');
}


const wordReplace = string => {
   return string.replace(/\butilize/ig, 'use')
                .replace(/\butilizing/ig, 'using')
                .replace(/\boptimize/ig, 'improve')
                .replace(/\boptimizing/ig, 'improving')
                .replace(/\bleverage/ig, 'take the opportunity')
                .replace(/\bpivot/ig, 'change direction');


}

const punctReplace = string => {
  return string.replace(/, and(?![^,]*^)/g, ' and')
               .replace(/, or(?![^,]*^)/g, ' or')
               .replace(/!/g, '.');
              // .replace(/, and/, ' and')

}


const fullEdit = string => {
  string = wordReplace(string);
  string = punctReplace(string);
  return string;
}

const count = value => {


  let counterMax = textInput.getAttribute('maxlength');
  let currentCount = textInput.value.length;

  //counter.innerHTML = '0/'+textInput.getAttribute('maxlength');
  counter.style.visibility = "visible";

  if (currentCount === counterMax){
    counter.style.color = "#f15b60";
  }
  else {
    counter.style.color = "#177bc0";
  }

  return counter.innerHTML = value.length+'/'+counterMax;

}

initiateInput()
/*const textInput = document.querySelector('#text-input');
const textOutput = document.querySelector('#text-output');
const submitInput = document.querySelector('#submit-button');
let placeholder = textInput.getAttribute('data-placeholder');
textInput.innerHTML = placeholder;*/

/*textInput.addEventListener('focusin', () => {
  initiateInput()
  textInput.style.color = "black";
});*/
