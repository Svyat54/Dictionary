function addRequest(){
    $.ajax({
        url: '/Dictionary_war_exploded/hello-servlet',
        method: 'post',
        dataType:'html',
        data: {
            text: document.oninput.text.value,
        },
        success: function (data) {
            alert(JSON.parse(data));
        }
    });
}