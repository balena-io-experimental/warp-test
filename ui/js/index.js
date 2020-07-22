$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function(){
    $('form').on('submit', function( event ) {
        event.preventDefault();

        let data = $(this).serializeObject();

        data['count'] = parseInt(data['count'], 10);

        let jsonData = JSON.stringify(data);

        console.log('>>', jsonData);

        $.ajax({
            url: '/api/connect',
            contentType: 'application/json',
            dataType: 'json',
            method: 'POST',
            data: jsonData,
            success: function(result){
                console.log('<<', JSON.stringify(result));
            }
        })
    });
});
