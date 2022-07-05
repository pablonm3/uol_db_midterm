function delete_device(name){

    let text = "Are you sure you want to delete device: " + name + "?";
    if (confirm(text) == true) {
      console.log("You pressed OK!")
      document.getElementById("inputName").value = name
      document.getElementById("delete_form").submit()
    } else {
      console.log("You canceled!")
    }


}