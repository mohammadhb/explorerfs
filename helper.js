
function getUnifiedRegex(key_word){

  if( typeof key_word ==="object" && input.exec && input.text)
    return key_word;
  else if (typeof key_word ==="string")
    return new RegExp(key_word,'iy');

}
