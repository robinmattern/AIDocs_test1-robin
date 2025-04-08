const globalState = {
    promptValue: '',
  };
  
  export function setPromptValue(value) {
    globalState.promptValue = value;
  }
  
  export function getPromptValue() {
    return globalState.promptValue;
  }
  