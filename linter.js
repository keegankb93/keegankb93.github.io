const initiate = () => {
  //initializes output and counter selector
  const textInput = document.querySelector('#text-input');
  const textOutput = document.querySelector('#text-output');
  const counter = document.querySelector('#counter');
  const submitInput = document.querySelector('#submit-button');
  let placeholder = textInput.getAttribute('data-placeholder');
  textInput.innerHTML = placeholder;

  textInput.addEventListener('focusin', () => {
    textInput.style.color = "black";
    counter.style.visibility = "visible";

    if(textInput.value === placeholder) {
      textInput.value= "";
    }
  });


  textInput.addEventListener('input', () => {
    count(textInput.value);
  });

  submitInput.addEventListener('click', () => {
    textOutput.innerHTML = betterSentences(textInput.value);
  });

  //adds listenter to reset textarea when unfocused and textarea is blank and resets counter to 0
  textInput.addEventListener('focusout', () => {
    if(textInput.value === "") {
      textInput.style.color = "gray";
      textInput.value = placeholder;
      textOutput.innerHTML = "";
      counter.style.visibility = "hidden";
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
