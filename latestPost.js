//setup markdown-it
var md = window.markdownit();

var query = {
  limit: 10,
  tag: 'ajayyy',
  category: 'utopian-io'
}

steem.api.getDiscussionsByBlog(query, function(err, result) {
  if(!err){

    var post = null;

    for(var i = result.length - 1; i >= 0; i--) {
      if(result[i].category === 'utopian-io' && JSON.parse(result[i].json_metadata).tags.indexOf('development')  > -1){
        post = result[i];
      }
    }

    if(post === null) {
      document.getElementById('recentPostTitle').innerHTML = "Error Fetching Post";
    } else {
      document.getElementById('recentPostTitle').innerHTML = post.title;
      document.getElementById('recentPostBody').innerHTML = md.render(post.body);
      hljs.initHighlighting();
    }
  }
});
