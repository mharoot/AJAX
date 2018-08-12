/**
 * Todays lesson
 * https://stackoverflow.com/questions/2722750/ajax-datatype
 * 
 * what is the difference between

contentType: "application/json; charset=utf-8",
dataType: "json",
vs.

contentType: "application/json",
dataType: "text",


contentType is the header sent to the server, specifying a particular format.
Example: I'm sending json or XML
dataType is you telling jQuery what kind of response to expect.
Expecting JSON, or XML, or HTML, etc....the default it for jQuery to try and figure it out.
The $.ajax() documentation has full descriptions of these as well.

In your particular case, the first is asking for the response to be in utf-8, the second doesn't care. Also the first is treating the response as a javascript object, the second is going to treat it as a string.

So the first would be:

success: function(data) {
  //get data, e.g. data.title;
}
The second:

success: function(data) {
  alert("Here's lots of data, just a string: " + data);
}
 */


$(document).ready(function(){
	var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

	$('#comment-add').on('submit', function(){
		event.preventDefault();
		var postID = $(this).find("input[name=post_id]").val();
		var postBody = $(this).find("textarea[name=body]");
		var postData = "post_id=" + postID + "&body=" + postBody.val();
		
		/*
contentType is the header sent to the server, specifying a particular format.
Example: I'm sending JSON or XML dataType is you telling jQuery what kind of response to expect.
Expecting JSON, or XML, or HTML, etc....the default it for jQuery to try and figure it out.
		*/
		$.ajax({
			url: "/comments-add.php",

			type: 'post',

			// dataType is you telling jQuery what kind of response to expect.
			// Expecting JSON, or XML, or HTML, etc....the default it for jQuery to try and figure it out.
			dataType: 'text',

			data: postData,
			success: function( data, textStatus, jQxhr ){
				console.log(data); // ajax is smart enough to know it is a json object if you configure the text pefectly
				jsonComment = data;
				// jsonComment = JSON.parse(data);
				// '<div class="well">' + 
				var div = document.createElement('DIV');
				div.className = "well";
				// 		'<h5>'+jsonComment["body"]+' [by <strong>'+jsonComment["name"]+'</strong>] </h5>' +
				var h5 = document.createElement('h5');
				var body = document.createTextNode(jsonComment["body"]+' [by ');
				var strong = document.createElement('strong');
				var name = document.createTextNode(jsonComment['name']);
				var body2 = document.createTextNode(']');

				h5.appendChild(body);
				strong.appendChild(name);
				h5.appendChild(strong);
				h5.appendChild(body2);

				div.appendChild(h5);

				// 		<form method="post" accept-charset="utf-8">' +
				var form = document.createElement('form');
				form.method="post";
				form.acceptCharset="utf-8";
				//			<input type="hidden" name="id" value="'+jsonComment["id"]+'">' +
				var input = document.createElement('input');
				input.type="hidden";
				input.name="id";
				input.value=jsonComment["id"];
				// 		 	<button class="btn btn-danger"> 
				var btn = document.createElement("button");
				btn.className="btn btn-danger";
				// 				<span class="glyphicon glyphicon-remove"></span>
				var span = document.createElement("span");
				span.className="glyphicon glyphicon-remove";

				btn.appendChild(span);
				form.appendChild(input);
				form.appendChild(btn);

				form.addEventListener("submit", deleteComment);

				div.appendChild(form);

				// var comment = 
				// '<div class="well">' + 
				// 	'<h5>'+jsonComment["body"]+' [by <strong>'+jsonComment["name"]+'</strong>] </h5>' +
				// 	'<form method="post" accept-charset="utf-8">' +
				// 		'<input type="hidden" name="id" value="'+jsonComment["id"]+'">' +
				// 		'<button class="btn btn-danger"> <span class="glyphicon glyphicon-remove"></span></button>' +
				// 	'</form>' +
				// '</div>';
				$( "#comments" ).append(div);
				postBody.val('');
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert("error");
			}
		});
	});

	$('.comment-delete').on('submit', deleteComment);

	function deleteComment()
	{
		event.preventDefault();
		let ctx = $(this);
		var $commentId = ctx.find("input[name=id]");
		var postData = "id=" + $commentId.val();
		
		$.ajax({
			url: "/comments-delete",
			type: 'post',
			dataType: 'text',
			data: postData,
			success: function( data, textStatus, jQxhr ){
				ctx.parent().detach();
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert("error");
			}
		});
	}
});
