console.log(dasherize('createDocumentFragment')); // 'create-document-fragment'
console.log(dasherize('SuperMAN'));               // 'super-man'
console.log(dasherize('VirtualDOMFragment'));     // 'virtual-dom-fragment'
console.log(dasherize('VirtualDOM123Fragment'));     // 'virtual-dom-fragment'


function dasherize(str) {
  const isUpperCase = (char) => char === char.toUpperCase();
  const queue = [];

  return str.split('').reduce((result, char, index, array) => {
    if (index === 0) {
      result += char.toLowerCase();
      return result;
    }

    if (isUpperCase(char)) {
      if (!queue.length && !isUpperCase(array[index + 1])) {
        result += `-${char.toLowerCase()}`;
        return result;
      }

      if (array[index + 1] === undefined) {
        result += `-${queue.join('')}${char.toLowerCase()}`
        return result;
      }

      if (queue.length && !isUpperCase(array[index + 1])) {
        result += `-${queue.join('')}-${char.toLowerCase()}`
        return result;
      }

      queue.push(char.toLowerCase());
      return result;
    }

    result += char;
    return result;
  }, '');
}