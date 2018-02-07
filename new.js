// main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {
    
    $("#Facebookfeed").hide();
    $("#Facebookprofile").hide();
    $("#goBackBtn").hide();
    $("#photos").hide();

  //Function for Button 1 for profile info  
  
    $(".facebookBtn1").on('click',function(){
      $("#photos").show();
        $("#Facebookfeed").hide("100");
        $("#Facebookprofile").show("100");
        $("#facebook").hide();
        $("#goBackBtn").show();
        $("#work").hide();
        $("#family").hide();
        $("#contact").hide();
        $("#basic").show();

    $("#feed").hide();

        
        
      // function for sidebar  
      $("#click1").on("click",function(){
        $("#basic").show();
        $("#work").hide();
        $("#family").hide();
        $("#contact").hide();
        $("#goBackBtn").show();
      });

      $("#click2").on("click",function(){
        $("#basic").hide();
        $("#work").show();
        $("#family").hide();
        $("#contact").hide();
        $("#goBackBtn").show();
      });

      $("#click3").on("click",function(){
        $("#basic").hide();
        $("#work").hide();
        $("#family").show();
        $("#contact").hide();
        $("#goBackBtn").show();
      });

      $("#click4").on("click",function(){
        $("#basic").hide();
        $("#work").hide();
        $("#family").hide();
        $("#contact").show();
        $("#goBackBtn").show();
      });  

        var myFacebookToken = $("#apiid").val(); //call api token from webpage
    
        $.ajax('https://graph.facebook.com/me?fields=picture.width(250).height(250),id,name,first_name,last_name,birthday,about,hometown,languages,gender,education,work,relationship_status,quotes,family,website,email,cover.width(815).height(320)&access_token='+myFacebookToken,{

          success : function(response){
              console.log(response);
              console.log(typeof(response));
              // Cover photo
              $(".myCoverPic").attr("src", "" + response.cover.source + "");  
              
              // Profile photo
              $(".myProfilePic").attr("src", "" + response.picture.data.url + "");
              
              //About me Section
              $("#myFirstName").text(response.first_name);
              $("#myLastName").text(response.last_name);
              $("#myName").text(response.name);
              $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
              $("#myGender").text(response.gender);
              $("#myBirthday").text(response.birthday);
              var languages = response.languages;
              var myLanguage = $.map(response.languages, function(index) {
                return index.name;
              });
              $("#myLanguage").text(myLanguage);
              $("#myHomeTown").text(response.hometown.name); 
              $("#myQuotes").text(response.quotes);

              // Work and Education  
              var work = response.work;
              var myWork = $.map(work, function(index) {
                return index.employer.name;
              });
              $("#myWork").text(myWork);

              var education = response.education;
              var myEducation = $.map(education, function(index) {
                return index.school.name;
              });
              $("#myEducation").text(myEducation);
      
              // Family and Relationship
              $("#myRelation").html(response.relationship_status);
              var family = response.family;
              var myFamily = $.map(family, function(index) {
                return index.name;
              });
              $("#myFamily").text(myFamily);

              //Contact
              $("#myEmail").text(response.email);            
              $("#myWebsite").html(response.website);

              
          }, // end of success      
                
          //error handling
          error: function(jqXHR) {
            alert(jqXHR.responseJSON.error.message + " Please reload the page and Enter valid API token");
          },
        });//end argument list end ajax call 
    });// end get facebookbtn1 info

    //Function for Button 2 for Feed info   
    $(".facebookBtn2").on('click',function(){

        $("#Facebookfeed").show();
        $("#Facebookprofile").hide();
        $("#facebook").hide();
        $("#goBackBtn").show();
        $("#fb-profile").hide();
        $("#photos").show();

    $("#feed").show();

        var myFacebookToken = $("#apiid").val();//call the api token from webpage
         

      $.ajax('https://graph.facebook.com/me?fields=name, first_name,posts{created_time,type,full_picture,story,message,source}&access_token=' + myFacebookToken,{

        timeout: 10000,

        success: function(response){
          console.log(response);
          console.log(typeof(response));
          $("#profile-name").text(response.first_name);
var i=0;
          $.each(response.posts.data, function(i, post){

    if( ++i > 10 )
        return; // break out of each() loop after 10th link

            if(post.type==="status" && post.message){
              $("#feed-post").append('<div class="feed-content"><div class="row"><img src="feed-pic.jpg" class="feed-pic"><h6 class="feed-post-heading"></h6></div><br><div class="row" class="feed-content-message">'+post.message+'</div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>');
            }

            else if(post.type==="photo" && post.message){
              $("#feed-post").append('<div class="feed-content"><div class="row"><img src="feed-pic.jpg" class="feed-pic"></div><br><div class="row" class="feed-content-message">'+post.message+'</div><br><div class="row"><img src='+post.full_picture+' style="width:760px; height:400px;"></div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>')
            }

            else if(post.type==="photo" && !post.message){
              $("#feed-post").append('<div class="feed-content"><div class="row"></div><br><div class="row"><img src='+post.full_picture+' style="width:760px; height: 400px; align-content:center;"></div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>')
            }

            else if(post.type==="video"){
              $("#feed-post").append('<div class="feed-content"></div><video src='+post.source+' type="video/mp4" controls>'+post.source+'</video></div><br><div class="row feed-time">Created time: '+post.created_time+'</div></div><hr>')
            }

          });

          $(".feed-post-heading").text(response.name);
        },

        error: function(xhr){
            console.log("Request not completed, check for your token, or some other error.");
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            if(response.error){
              console.log(response.error.message);
              alert(response.error.message);
            }
        },

        complete: function(xhr){
            console.log("REQUEST ENDED.")
        }

      } // end of argument list

    ); // end of ajax call     
  }); // end get facebookbtn2 info

    $("#goBackBtn").on("click",function(){

        $("#Facebookfeed").hide();
        $("#Facebookprofile").hide();
        $("#goBackBtn").hide();
        $("#facebook").show("100");
        $("#photos").hide();


    });// end it card on click
});