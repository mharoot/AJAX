# Working With JSON DATA in PHP

### comments.js
```javascript
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
```

### comments-add.php
```php
<?php 
// comment data
$jsonComment = '
{
    "id":%d,
    "post_id":%d, 
    "body":%s
}
';

printf($jsonComment, 1, (int) $_POST['post_id'], (string) $_POST['body']);
```

# READIBILITY in comments-add.php
- printf is not as fast as echoing but as you can see the json is alot more readable than echoing

```php
<?php 
// comment data
$jsonComment = '
{
    "id":'.1.',
    "post_id":'.$_POST['post_id'].', 
    "body":'.$_POST['body'].'
}
';

echo $jsonComment;
```