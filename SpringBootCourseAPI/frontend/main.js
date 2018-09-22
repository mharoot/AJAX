$(document).ready(function(){
    
    const baseUrlBackEndJava = "http://localhost:8080/";
    let $index = $('#index');
    let $form  = $('#form');
    $form.on('submit', create);
    index();


    // CREATE
    function create(){
        event.preventDefault();
        var id = $(this).find("input[name=id]").val();
        var name =  $(this).find("input[name=name]").val();
        var description = $(this).find("input[name=description]").val();
        // var postData = "id=" + id + "&name=" + name + "&description=" + description;
        
        var postData = {"id": id, "name": name, "description": description}
        console.log(postData);
        $.ajax({
            crossDomain:true,
            type: 'POST',
            contentType: "application/json",
            url: baseUrlBackEndJava+"topics",
            data: JSON.stringify(postData),
            dataType: 'json',
            cache: false,
            timeout: 600000,

            success: async function( jsonItem){
                    let tr = document.createElement('tr');
                    let tdId = document.createElement('td');
                    let tdName = document.createElement('td');
                    let tdDescription = document.createElement('td');
                    
                    // DELETE FORM
                    let tdDeleteForm  = document.createElement('form')
                    let tdDeleteFormInput = document.createElement('input');
                    let tdDeleteFormBtn   = document.createElement('button');
                    let tdDeleteFormBtnSpan = document.createElement('span');

                    tdId.appendChild(document.createTextNode(jsonItem.id));
                    tdName.appendChild(document.createTextNode(jsonItem.name));
                    tdDescription.appendChild(document.createTextNode(jsonItem.description));

                    // DELETE FORM
                    tdDeleteFormInput.type = "hidden";
                    tdDeleteFormInput.name = "id";
                    tdDeleteFormInput.value = jsonItem.id;
                    tdDeleteFormBtn.className = "btn btn-danger"
                    tdDeleteFormBtnSpan.className = "glyphicon glyphicon-remove";
                    tdDeleteFormBtn.appendChild(tdDeleteFormBtnSpan);
                    tdDeleteForm.appendChild(tdDeleteFormInput);
                    tdDeleteForm.appendChild(tdDeleteFormBtn);
                    tdDeleteForm.addEventListener("submit", remove);

                    tr.appendChild(tdId);
                    tr.appendChild(tdName);
                    tr.appendChild(tdDescription);
                    tr.appendChild(tdDeleteForm);
                    $index.append(tr);
                
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log(jqXhr);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    // READ
    function index(){
        $.ajax({
            crossDomain:true,
            url: baseUrlBackEndJava+"topics",
            type: 'GET',
            dataType: 'json',
            // data: postData,
            success: async function( data, textStatus, jQxhr ){
                for (var i = 0; i < data.length; i++)
                {
                    let jsonItem = data[i];
                    let tr = document.createElement('tr');
                    let tdId = document.createElement('td');
                    let tdName = document.createElement('td');
                    let tdDescription = document.createElement('td');
                    // DELETE FORM
                    let tdDeleteForm  = document.createElement('form')
                    let tdDeleteFormInput = document.createElement('input');
                    let tdDeleteFormBtn   = document.createElement('button');
                    let tdDeleteFormBtnSpan = document.createElement('span');

                    tdId.appendChild(document.createTextNode(jsonItem.id));
                    tdName.appendChild(document.createTextNode(jsonItem.name));
                    tdDescription.appendChild(document.createTextNode(jsonItem.description));

                    // DELETE FORM
                    tdDeleteFormInput.type = "hidden";
                    tdDeleteFormInput.name = "id";
                    tdDeleteFormInput.value = jsonItem.id;
                    tdDeleteFormBtn.className = "btn btn-danger"
                    tdDeleteFormBtnSpan.className = "glyphicon glyphicon-remove";
                    tdDeleteFormBtn.appendChild(tdDeleteFormBtnSpan);
                    tdDeleteForm.appendChild(tdDeleteFormInput);
                    tdDeleteForm.appendChild(tdDeleteFormBtn);
                    tdDeleteForm.addEventListener("submit", remove);

                    tr.appendChild(tdId);
                    tr.appendChild(tdName);
                    tr.appendChild(tdDescription);
                    tr.appendChild(tdDeleteForm);
                    tr.addEventListener('dblclick', editForm);
                    $index.append(tr);
                }
            },
            error: function( jqXhr, textStatus, errorThrown ){
                alert("error");
            }
        });
    }

    // UPDATE
    function update(){
        event.preventDefault();
        $ctx = $(this);
        let id = $ctx.parent().find("input[name=id]").val();
        let name = $ctx.parent().find("input[name=name]").val();
        let description = $ctx.parent().find("input[name=description]").val();
        // console.log(id+', '+ name+', '+description);
        let postData = {"id":id, "name":name, "description":description}

        $.ajax({
            url: baseUrlBackEndJava+"topics/"+id,
            type: 'PUT',
            crossDomain:true,
            contentType: "application/json",
            data: JSON.stringify(postData),
            dataType: 'json',
            cache: false,
            timeout: 600000,

            success: async function( jsonItem ) {
                console.log("success:");
                console.log(JSON.stringify(jsonItem));
            },
            error: function() {
                console.log("error");
            }
        });
    }

    // DELETE
    function remove(){
        event.preventDefault();
        let $ctx = $(this);
        var $id = $ctx.find("input[name=id]");
        $.ajax({
            url: baseUrlBackEndJava+"topics/"+$id.val(),
            type: 'DELETE',
            dataType:'text',
            success: async function(data) {
                $ctx.parent().fadeOut("slow");
                await new Promise(resolve => setTimeout(resolve, 1000));
                $ctx.parent().detach();
            }
        })

    }


    function editForm(){
        let tdId = $(this).find(':nth-child(1)')[0];
        let tdName = $(this).find(':nth-child(2)')[0];
        let tdDescription = $(this).find(':nth-child(3)')[0];
        let tdUpdateForm   = $(this).find(':nth-child(4)')[0];
        let id = tdId.textContent;
        let name = tdName.textContent;
        let description = tdDescription.textContent;

        // clear all form content and a submit button to finish the update.
        
        let updateForm = document.createElement('form');
        let inputId = document.createElement('input');
        let inputName  = document.createElement('input');
        let inputDescription = document.createElement('input');
        let updateFormBtn = document.createElement('button');

        // UPDATE FORM

        
        inputId.value = id;
        inputId.name = "id";
        inputName.value = name;
        inputName.name = "name";
        inputDescription.value = description;
        inputDescription.name = "description";

        tdUpdateFormBtn = document.createElement("td");
        updateFormBtn.className = "btn btn-primary";
        updateFormBtn.textContent = "Update";
        tdUpdateFormBtn.appendChild(updateFormBtn);

        // clear columns
        tdId.innerHTML = "";
        tdName.innerHTML = "";
        tdDescription.innerHTML ="";
        tdUpdateForm.innerHTML = "";

        tdId.appendChild(inputId);
        tdName.appendChild(inputName);
        tdDescription.appendChild(inputDescription);
        tdUpdateForm.appendChild(tdId);
        tdUpdateForm.appendChild(tdName);
        tdUpdateForm.appendChild(tdDescription);
        tdUpdateForm.appendChild(tdUpdateFormBtn);

        tdUpdateForm.removeEventListener("submit", remove);
        tdUpdateForm.addEventListener("submit", update);


        $(this).empty();
        $(this).append(tdId);
        $(this).append(tdName);
        $(this).append(tdDescription);
        $(this).append(tdUpdateForm);
        

    }



});