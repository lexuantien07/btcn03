$(function(){
    $.ajax({
        url: "/search?q=1",
        type: "GET",
        data: {
            page: 1,
            pagelimit: 10
        },
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, erroeThrow) {
            console.log(jqXHR);
        }
    })
})