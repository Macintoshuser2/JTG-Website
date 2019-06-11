var submitAndValidate = () => {
  const formConfig = getFormConfig('suggestions');
  const data = fieldValues(formConfig);
  const errorFields = validate(data, formConfig);

  function showErrors(name) {
    document.querySelector('#' + name + 'Error').innerHTML = formConfig[name].message;
    document.querySelector('#' + name + 'Error').style.display = 'inline';
  }

  function markFields(flds) {
    flds.forEach((field) => {
      showErrors(field);
    });
  }

  let formValid = (errorFields.length === 0)
  const clientOn = true;
  if(clientOn) {
    if(!formValid) {
      markFields(errorFields);
      formValid = true;
    }
  }
  
  if(formValid) {
    try {
      $.ajax({
        url: '/form',
        type: 'POST',
        data: data,
        dataType: 'json',
      }).done(function(data) {
        console.log(JSON.stringify(data));
        if(data.length === 0) {
          alert("Form Was Succussfully Submitted! Check Your Email For Confirmation.");
        } else {
          data.forEach((field) => {
            showErrors(field);
          });
        }
      });
    } catch(error) {
      console.log('Something went wrong!');
    }
  }
}
