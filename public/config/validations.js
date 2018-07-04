function notBlank(val) {
  return val.length > 0;
}

function testByRegExp(val, pat) {
  return pat.test(val);
}

function isChecked(val) {
  return !val.checked;
}

function isAnItemSelected(val) {
  return val.selectedItemLabel === undefined;
}

function validate(formData, config) {
  return Object.keys(config).reduce((acc, field) => {
    if(formData[field] !== undefined && !config[field].func(formData[field])) {
      acc.push(field);
    }
    return acc;
  }, []);
}

function fieldValues(config) {
  return Object.keys(config).reduce((acc, field) => {
    const element = document.querySelector('#' + field);
    let v;
    switch(element.nodeName) {
      case 'PAPER-INPUT':
        v = element.value;
        break;
      case "PAPER-CHECKBOX":
        v = element.checked;
        break;
      case 'PAPER-DROPDOWN-MENU':
        v = element.selectedItemLabel;
        break;
      default:
        v = '';
    }
    if(element) {
      acc[field] = v;
    }
    return acc;
  }, {});
}

const config = {
  suggestions: {
    fname: {
      label: 'First Name',
      message: 'First Name is Required!',
      func: val => notBlank(val)
    },
    lname: {
      label: 'Last Name',
      message: 'Last Name is Required!',
      func: val => notBlank(val)
    },
    email: {
      label: 'E-Mail',
      message: 'The Email You Entered Was in the Wrong Format',
      func: val => testByRegExp(
        val,
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    },
    country: {
      label: 'Country',
      message: 'You Must Select a Country!',
      func: val => isAnItemSelected(val)
    },
    terms: {
      label: "I have read and agree to the Terms of Use of Data Entry",
      message: "You Must Agree to the Terms!",
      func: val => isChecked(val)
    },
    suggestion: {
      label: "Enter Your Suggestion",
      message: "Suggestion is Required",
      func: val => notBlank(val)
    }
  }
};

function getFormConfig(formName) {
  return config[formName] ? config[formName] : {};
}
