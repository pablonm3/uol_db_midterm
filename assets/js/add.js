function validate_device_name(){
    var field = document.getElementById("inputName")
    let text = field.value;
    // If x is Not a Number or less than one or greater than 10
    let error_text = "";
    if (!text) {
        error_text = "Please enter a device name";
    }
    else{
        if(text.length <3 || text.length >30){
            error_text = "Device name must be between 3 and 30 characters";
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


function form_submit(event) {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    var form = forms[0]
    let v1 = validate_device_name(),
        v2 =  validate_device_type(),
        v3 = validate_device_temperature()
    let is_valid = v1 && v2 && v3
    form.classList.add('was-validated')
    if (is_valid) {
        console.log("valid form")
    }
    else{
        console.error("form is not valid")
        event.preventDefault();
    }  
}




function listen_select() {
    console.log("TYPE_FIELDS_MAP: ", TYPE_FIELDS_MAP)
console.log("ALL_TYPES: ", ALL_TYPES)

    let select = document.getElementById('selectType');
    let on_off_container = document.getElementById('on_off_container');
    let open_locked_container = document.getElementById('open_locked_container');
    let open_closed_container = document.getElementById('open_closed_container');
    let volume_container = document.getElementById('volume_container');
    let temperature_container = document.getElementById('temperature_container');
    let type_element_map = {
        "on_off": on_off_container,
        "open_locked": open_locked_container,
        "open_closed": open_closed_container,
        "volume": volume_container,
        "temperature": temperature_container
    }
    select.addEventListener('change', function() {
      selectedValue = select.value

      console.log("selected value: ", selectedValue);
      console.log("TYPE_FIELDS_MAP: ", TYPE_FIELDS_MAP)
      let types_to_show = TYPE_FIELDS_MAP[selectedValue] || []
      console.log("types_to_show: ", types_to_show)
      ALL_TYPES.forEach(type=>{
        if(types_to_show.includes(type)){
            type_element_map[type].classList.remove("hidden");
        }
        else{
            type_element_map[type].classList.add('hidden');
        }
      })


    });
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

docReady(listen_select)