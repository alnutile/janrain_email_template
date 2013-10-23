(function ($) {



    Drupal.janrain_email = {};

    Drupal.janrain_email.post_content = function(parameters, url){
        $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(parameters),
                dataType: "json",
                async: false,
                contentType: 'application/json'
            }
        ).done(function(data){
                console.log("Data return");
                console.log(data);
                results = data;
            });
        return results;
    };

    Drupal.janrain_email.disable_link = function(context) {
        $('a.disabled', context).click(function(e){
            e.preventDefault();
            console.log("Prevented");
        });
    }

    Drupal.janrain_email.make_file = function(type, context) {

        var body = $('.'+type+'-body').html();
        var title = $('#edit-janrain-emails-title').val();
        var filename = $('#edit-janrain-emails-filename').val();
        var parameters = {
            "body": body,
            "title": title,
            "filename": filename + '.'+type+'.txt',
            "type": type
        };
        var url = '/janrain/emails/';
        var response = Drupal.janrain_email.post_content(parameters, url);
        Drupal.janrain_email.prepare_file_link(response.file, context, type);
    }


    Drupal.janrain_email.prepare_file_link = function(response, context, type) {
        $('a.'+type+'-file-link', context).attr('href', response).fadeIn();
    }


    Drupal.behaviors.janrain_emails = {
        attach: function (context) {

            $('#edit-janrain-emails-title').on('change', function(){
                var title = $('#edit-janrain-emails-title').val();
                $('.html-title').empty().text(title);
                $('.text-title').empty().text(title);
            });

            $('#edit-janrain-emails-body').on('change', function(){
                var body = $('#edit-janrain-emails-body').val();
                $('.html-body').empty().html(body);
                console.log(body);
            });

            $('#edit-janrain-emails-body-text').on('change', function(){
                var body = $('#edit-janrain-emails-body-text').val();
                $('.text-body').empty().html(body.replace(/\n/g,"<br>"));
            });

            $('#edit-get-html').on('click', function(e){
                e.preventDefault();
                Drupal.janrain_email.make_file('html', context);
            });

            $('#edit-get-text').on('click', function(e){
                e.preventDefault();
                Drupal.janrain_email.make_file('text', context);
            });


        }
    };

})(jQuery);