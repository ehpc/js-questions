function dasherize(input: string): string {
  return input
    .replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g, '$1$3-$2$4')
    .toLowerCase();
}

console.log(dasherize('createDocumentFragment')); // 'create-document-fragment'
console.log(dasherize('SuperMAN'));               // 'super-man'
console.log(dasherize('VirtualDOMFragment'));     // 'virtual-dom-fragment'

function dasherizeStepByStep(input: string): string {
  let result = '';
  let uppercasedSeq = '';
  for (const char of input) {
    if (char.toUpperCase() === char) {
      uppercasedSeq += char.toLowerCase();
    } else {
      if (uppercasedSeq) {
        if (uppercasedSeq.length === 1) {
          if (result) {
            result += '-';
          }
          result += uppercasedSeq;
        } else {
          const firstWord = uppercasedSeq.slice(0, -1);
          if (result) {
            result += '-';
          }
          result += firstWord + '-' + uppercasedSeq[uppercasedSeq.length - 1];
        }
      }
      uppercasedSeq = '';
      result += char;
    }
  }
  if (uppercasedSeq) {
    result += '-' + uppercasedSeq;
  }
  return result;
}

console.log(dasherizeStepByStep('createDocumentFragment')); // 'create-document-fragment'
console.log(dasherizeStepByStep('SuperMAN'));               // 'super-man'
console.log(dasherizeStepByStep('VirtualDOMFragment'));     // 'virtual-dom-fragment'