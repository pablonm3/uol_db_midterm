function validate_device_name(){
    var field = document.getElementById("inputName")
    let text = field.value;
    // If x is Not a Number or less than one or greater than 10
    let error_text = "";
    if (!text) {
        error_text = "Please enter a device name";
    }
    else{
        if(text.length <3 || text.length >14){
            error_text = "Device name must be between 3 and 14 characters";
        }
    }
    field.setCustomValidity(error_text); 
    if(error_text){
        document.getElementById("device_name_error").innerHTML = error_text;
        return false
    }
    return true
}


function validate_device_type(){
    var field = document.getElementById("selectType")
    let text = field.value;
    // If x is Not a Number or less than one or greater than 10
    let error_text = "";
    if (!text) {
        error_text = "Please select a device type";
    }
    field.setCustomValidity(error_text); 
    if(error_text){
        document.getElementById("device_type_error").innerHTML = error_text;
        return false
    }
    return true
}

function validate_device_temperature(){
    var field = document.getElementById("temperature_input")
    let text = field.value;
    // If x is Not a Number or less than one or greater than 10
    let error_text = "";
    const int_val = text? parseInt(text) : 9999
    if (int_val<16 || int_val>30) {
        error_text = "Please enter a valid temperature between 16 and 30 degrees";
    }
    field.setCustomValidity(error_text); 
    if(error_text){
        document.getElementById("temperature_error").innerHTML = error_text;
        return false
    }
    return true
}


function form_init() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
         let v1 = validate_device_name(),
             v2 =  validate_device_type(),
             v3 = validate_device_temperature()
         let is_valid = v1 && v2 && v3
         if (is_valid) {
            console.log("valid form")
            //form.submit()
          }
          else{
            console.error("form is not valid")
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  }


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}  


docReady(form_init)