function ajax(){function n(n){$("*").unbind(),$.ajax({type:"GET",url:"/login/"+n.dir,dataType:"json",data:n,success:function(e){console.log(n.dir+" login success"),console.log(e)},error:function(e){console.log(n.dir+" login fail"),console.log(e)}})}$.fn.serializeObject=function(){var n={},e=this.serializeArray();return $.each(e,function(){void 0!==n[this.name]?(n[this.name].push||(n[this.name]=[n[this.name]]),n[this.name].push(this.value||"")):n[this.name]=this.value||""}),n},$(".res .results li").click(function(n){n.preventDefault();var e=$(this).children(".vidId").val(),i=$("header form input[type=text]").val();window.location.replace("/search/one/youtube?q="+i+"&vidId="+e)}),$(".logins .button").click(function(e){e.preventDefault();var i=$(this).children("span"),t={dir:i[0].classList[1].slice(3)};n(t)})}$(document).on("ready ajaxComplete",function(){ajax()});