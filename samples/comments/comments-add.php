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