
function loadData(hash) {
  //setup markdown-it
  var md = window.markdownit();

  var username = 'ajayyy';

  if(hash !== "") {
    steem.api.getContent(username, hash, function(err, result) {
      if(!err) {
        document.getElementById('recentPostTitle').innerHTML = result.title;

        var body = md.render(result.body);
        //delete the "posted on utopian.io" footer
        body = body.split('<p>&lt;br /&gt;&lt;hr/&gt;&lt;em&gt;')[0];

        document.getElementById('recentPostBody').innerHTML = body;

        //highlight code blocks
        var blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
      }
    })
  } else {
    if(document.getElementById('recentPostTitle') !== null){
      document.getElementById('recentPostTitle').innerHTML = "";
      document.getElementById('recentPostBody').innerHTML = "<center> <p> Loading... </p> </center>";
    }
    var query = {
      limit: 40,
      tag: username,
      category: 'utopian-io'
    }
    steem.api.getDiscussionsByBlog(query, function(err, result) {
      if(!err) {
        for(var i = 0; i < result.length; i++) {
          if(result[i].category === 'utopian-io' && result[i].author === "ajayyy"){
            document.getElementById('recentPostTitle').innerHTML += "<a href='#" + result[i].permlink + "' onclick='loadData(\"" + result[i].permlink + "\")'> " + result[i].title + "</a><br/><br/>";
          }
        }

        //clear body of "Loading..."
        document.getElementById('recentPostBody').innerHTML = "";
      }
    });
  }
}

loadData(window.location.hash.substr(1));
