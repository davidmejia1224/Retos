var host = "http://localhost:8081/api";

function mostrarInformacionDoc() {
    $.ajax({
        url: host + '/Doctor/all',
        type: 'GET',
        dataType: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            tableRespuestaDoc(respuesta);
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }
    });
}

$(document).ready(function () {
    mostrarInformacionDoc();
})

function tableRespuestaDoc(items) {
    let myTableDoc = `<table BORDER CELLPADDING=2 BORDERCOLOR='#7c65b1'><th scope='col'> FULL NAME </th><th> DEPARTMENT </th><th> GRADUATE YEAR </th><th> DESCRIPTION </th><th> SPECIALTY</th>`;
    for (let i = 0; i < items.length; i++) {
        myTableDoc += `<tr>`;
        myTableDoc += `<td>${items[i].name}</td>`;
        myTableDoc += `<td>${items[i].department}</td>`;
        myTableDoc += `<td>${items[i].year}</td>`;
        myTableDoc += `<td>${items[i].description}</td>`;
        myTableDoc += `<td>${items[i].specialty.name}</td>`;
        myTableDoc += `<td> <button onclick="finishActuDoc( ${items[i].id}, '${items[i].name}', '${items[i].department}', ${items[i].year}, '${items[i].specialty.name}', '${items[i].description}')" style="background-color:#7c65b1; border-color:#563856; color:white;">Change</button></td>`;
        myTableDoc += `<td> <button onclick="borrarInformacionDoc(${items[i].id})" style="background-color:#7c65b1; border-color:#563856; color:white;">Delete</button></td>`;
        myTableDoc += `</tr>`;
        const element = items[i];
        $('#specialty').append(`<option value="${element.specialty.id}">${element.specialty.name}</option>`);
        $("#specialty").val("");
    }
    $("#resultadoDoc").append(myTableDoc);
    myTableDoc = `</table>`;
}

function agregarInformacionDoc() {
    $.ajax({
        type: "POST",
        url: host + "/Doctor/save",
        data: JSON.stringify({
            id: $("#idDoc").val(),
            specialty: $("#specialty").val(),
            graduate_year: $("#graduate_year").val(),
            department_id: $("#department").val(),
            name: $("#nameDoc").val(),
            description: $("#description").val(),
        }),
        contentType: "application/json"
    }).done(function (data) {
        $("#resultadoDoc").empty();
        $("#specialty").val("");
        $("#graduate_year").val("");
        $("#department").val("");
        $("#nameDoc").val("");
        $("#description").val("");
        mostrarInformacionDoc();
        alert("Elementos de doctor agregados");//imprimimos respuesta
    }).fail(function (e) {
        alert("Algo salió mal");
    });
}

function finishActuDoc(id, name, department, graduate_year, specialty, description) {
    $("#nameDoc").val(name);
    $("#department").val(department);
    $("#graduate_year").val(graduate_year);
    $("#description").val(description);
}

function actualizarInformacionDoc() {
    $.ajax({
        method: 'PUT',
        url: host + '/Doctor/update',
        data: JSON.stringify({
            id: $("#idDoc").val(),
            specialty: $("#specialty").val(),
            graduate_year: $("#graduate_year").val(),
            department_id: $("#department").val(),
            name: $("#nameDoc").val(),
            description: $("#description").val(),
        }),
        contentType: "application/JSON",
    }).done(function (data) {
        $("#resultadoDoc").empty();
        $("#idDoc").val("");
        $("#graduate_year").val("");
        $("#department").val("");
        $("#nameDoc").val("");
        $("#description").val()
        mostrarInformacionDoc();
        alert("Elementos de doctor actualizados");//imprimimos respuesta
    }).fail(function (e) {
        console.log(e);
        alert("Algo salió mal");
    });

}

function borrarInformacionDoc(id) {
    $.ajax({
        method: 'DELETE',
        url: host + '/Doctor/delete/' + id,
        data: JSON.stringify({id}),
        contentType: "application/JSON",
        success: function (data) {
            console.log(data);
            $("#resultadoDoc").empty();
            alert("Elementos de doctor se han eliminado");//imprimimos respuesta
        }, error: function (e) {
            console.log(e);
            alert("Algo salió mal");
        }, complete: function () {
            mostrarInformacionDoc();
        }
    });
}

