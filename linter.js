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
               .replace(/\*\*/g, `"`)
               .replace(/!/g, '.');
              // .replace(/, and/, ' and')

}


const fullEdit = string => {
  string = wordReplace(string);
  string = punctReplace(string);
  return string;
}

const textInput = document.querySelector('#text-input');
const textOutput = document.querySelector('#text-output');
textInput.addEventListener('keyup', () => {
  textOutput.innerHTML = betterSentences(textInput.value);
});

textInput.addEventListener('focus', () => {
  textInput.style.color = "black";
  if(textInput.value === "Try using verbs like utilize and optimize or even inserting the dreaded oxford comma.") {
    textInput.value= "";
  }
});


//let sentence = "Hello! I **just** wanted Leverage and Circle back and let you know that I will utilize, optimize, and leverage my Rocket Referrals account. Hello, I **just**wanted leverage and Circle back and let you know that I will utilize, optimize, and leverage my Rocket Referrals account."
//console.log(betterSentences(sentence));
