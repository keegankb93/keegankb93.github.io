const betterSentences = string => {

  const checkboxes = document.querySelectorAll("input[type='checkbox']")

  let splitSentence = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

  if (splitSentence === null){
    return "";
  }

  splitSentence.forEach((sentence, i) => {
    if (checkboxes[0].checked) {
      splitSentence[i] = wordReplace(sentence);

      if (checkboxes[1].checked) {
        splitSetence[i] = punctReplace(sentence);
      }
    }

  })


  /*else {
  splitSentence.forEach((sentence,i) => {
    splitSentence[i] = fullEdit(sentence)
  });
}*/

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

  //let counterZero = counter.innerHTML = '0/'+textInput.getAttribute('maxlength');
  let counterMax = textInput.getAttribute('maxlength');
  let currentCount = textInput.value.length;

  counter.style.display = "block";

  if (currentCount === 0) {
    textOutput.innerHTML = "";
  }

  if (value.length > counterMax - 1){
    counter.style.color = "#f15b60";
  }
  else {
    counter.style.color = "#177bc0";
  }

  return counter.innerHTML = value.length+'/'+counterMax;

}

const initiateInput = () => {
  //initializes output and counter selector
  const counter = document.querySelector('#counter');

  if(textInput.value === placeholder) {
    textInput.value= "";
  }

  //processes input on key release and performs replacements and edits via betterSentences function
  textInput.addEventListener('keyup', (event) => {
    textOutput.innerHTML = betterSentences(textInput.value);
  });

  //adds listener to input and counts # of characters
  textInput.addEventListener('input', () => {
    count(textInput.value);
  });

  //adds listenter to reset textarea when unfocused and textarea is blank and resets counter to 0
  textInput.addEventListener('focusout', () => {
    if(textInput.value === "") {
      textInput.style.color = "gray";
      textInput.value = placeholder;
      //counter.style.visibility = "hidden";
      //counter.innerHTML = "";
    }
  });



}

const textInput = document.querySelector('#text-input');
const textOutput = document.querySelector('#text-output');
let placeholder = textInput.getAttribute('data-placeholder');
textInput.innerHTML = placeholder;

textInput.addEventListener('focusin', () => {
  initiateInput()
  textInput.style.color = "black";
});

/*textInput.addEventListener('focusout', () => {
  if(textInput.value === "") {
    textInput.style.color = "gray";
    textInput.value = "Try using verbs like utilize and optimize or even inserting the dreaded oxford comma.";
    counter.innerHTML = '0/'+textInput.getAttribute('maxlength');
    counter.style.color = "white";
    textOutput.innerHTML = "";
  }
});*/




//let sentence = "Hello! I **just** wanted Leverage and Circle back and let you know that I will utilize, optimize, and leverage my Rocket Referrals account. Hello, I **just**wanted leverage and Circle back and let you know that I will utilize, optimize, and leverage my Rocket Referrals account."
//console.log(betterSentences(sentence));
