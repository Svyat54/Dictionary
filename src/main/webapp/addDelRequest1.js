function addRequest(){
    $.ajax({
        url: '/Dictionary_war_exploded/hello-servlet',
        method: 'GET',
        dataType:'html',
        data: {
            task: "add",
            keyword: $('#keyword').val(),
        },
        success: function (data) {
            refreshData();
        }
    });
}
function deleteRequest(){
    $.ajax({
        url: '/Dictionary_war_exploded/hello-servlet',
        method: 'GET',
        dataType:'html',
        data: {
            task: "delete",
            keyword: $('#select').val(),
        },
        success: function (data) {
            refreshData();
        }
    });
}

function getOption(data){
    let option = document.createElement("option");
    option.innerHTML = data;
    return option;
}
function select(){
    for(let i = 0; i < dictionary.length; i++)
        for(let j = 1; j < dictionary[i].length; j++)
            $('#select').append(getOption(dictionary[i][j]));
}

function refreshData(){
    flushDictionaryDiv();
    flushSelect();
    getDataBase();
    setTimeout((function (){select()}), 500);
    flushInput();
}
function flushDictionaryDiv() {
    let div = $('#dictionary');
    if(div.children().length !== 0) div.children().remove();
}
function flushSelect(){
    let select = $("#select");
    if(select.children().length !== 0) select.children().remove();
}
function flushInput(){
    let input = $('#keyword');
    if(input.length !== 0)
        input.val("");
}

