const betterSentences = string => {

  let splitSentence = string.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

  splitSentence.forEach((sentence,i) => {
    splitSentence[i] = fullEdit(sentence)
  });

  return splitSentence.join('');
}


const wordReplace = string => {
   return string.replace(/utilize/ig, 'use')
                .replace(/utilizing/ig, 'using')
                .replace(/optimize/ig, 'improve')
                .replace(/optimizing/ig, 'improving')
                .replace(/circle back/ig, 'follow up')
                .replace(/leverage/ig, 'take the opportunity')
                .replace(/pivot/ig, 'change direction');


}

const punctReplace = string => {
  return string.replace(/, and(?![^,]*^)/g, ' and')
               .replace(/, or(?![^,]*^)/g, ' or')
               .replace(/\*\*/g, `"`)
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

  if (textInput.value.length > counterMax - 1){
    counter.style.color = "#f15b60";
  }
  else {
    counter.style.color = "#177bc0";
  }

  return counter.innerHTML = textInput.value.length+'/'+counterMax;

}

const counter = document.querySelector('#counter');
const textInput = document.querySelector('#text-input');
const textOutput = document.querySelector('#text-output');

counter.innerHTML = '0/'+textInput.getAttribute('maxlength');

textInput.addEventListener('keyup', (event) => {

  textOutput.innerHTML = betterSentences(textInput.value);
  count(textInput.value);

});

textInput.addEventListener('focusin', () => {
  textInput.style.color = "black";
  if(textInput.value === "Try using verbs like utilize and optimize or even inserting the dreaded oxford comma.") {
    textInput.value= "";
  }

  textInput.addEventListener('focusout', () => {
    if(textInput.value === "") {
      textInput.style.color = "gray";
      textInput.value = "Try using verbs like utilize and optimize or even inserting the dreaded oxford comma.";
      counter.innerHTML = '0/'+textInput.getAttribute('maxlength');
      counter.style.color = "white";
      textOutput.innerHTML = "";
    }
  });
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
