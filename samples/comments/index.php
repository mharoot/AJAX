<html class="gr__reneefoundation_mywebcommunity_org">
  <head>
  </head>
  <body>
  </br>
    <form id="comment-add" method="post" accept-charset="utf-8">
    <!-- 
      The post_id should be tokenized and untokenized in the yii controllers
      https://stackoverflow.com/questions/18944326/basic-hidden-field-in-yii

      security practice is to tokenize what though? 
        - users login info
        - payments (obviously every field in that probably including name address and such?) 
          -  TODO: RESEARCH
                https://squareup.com/townsquare/what-does-tokenization-actually-mean
    -->
      <input type="hidden" name="post_id" value="1">


      <div class="form-group">
        <label>Body</label>
        <textarea name="body" class="form-control"></textarea>
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
    </br>
    <div id="comments">
    </div>
    <!-- 
      Loading javascript at bottom of page for faster page loads
    http://stevesouders.com/examples/js-bottom.php?t=1534115148277
     -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="comments.js"></script>
  </body>
  
</html>