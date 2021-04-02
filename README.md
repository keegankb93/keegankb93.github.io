# keegankb93.github.io
Bug list:

textInput.FocusOut:

Removes counter. This started happening when the counter was converted
to an input event rather than keyup (which was implemented to fix input counter not resetting to 0 when textarea empty). Counter reappears when input begins. I need to refactor the focus events overall.


Low priority:
words with obscenely long character lengths (impossible words) create unlimited X axis scrolling (up to maxchar limit of 600)


To do:

create basic instructions or info div to explain usage and purpose. Most likely a toggable overlay.
More filters on business jargon/replacement words
Grammatical corrections such as capitalize first word of a sentence and a -> an when preceding a noun
Create function to remove excessive words such as 'very'
Toggle button preferences to determine which functions the user would like to perform on their input
Suggestions/links to articles for suitable replacement words based on the inputs
 - Article that links to good replacements for business jargon
 - grammatical mistakes that were in the original input etc. -> link to article on grammar

 The suggestions will be placed in a side nav
