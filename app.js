 // main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {

   var myFacebookToken =  'EAACEdEose0cBAMtVD8VHZAem5Mid2oyg38nIAKk0Abp1AUASypQmXkSzoagAljIQJ8y8zwJptUhDe20xJ6I2pwofjfkZCjuJGZCChFonPnjzOUpQ6LsSEt69bkBw3sC20mAPZBZCxdu5qlueWA2ZBjZAtkJ3PZCnJpPAx9AvfmoCfUZAkPs0l4MzodbZAucQaVVHsNrinpcp0XAAZDZD';
       function getFacebookInfo(){

        $.ajax('https://graph.facebook.com/me?fields=picture.width(250).height(250),cover.width(815).height(320)&access_token=' +myFacebookToken,{
  
                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');

                    // Cover photo
              $(".myCoverPic").attr("src", "" + response.cover.source + "");  
              
              // Profile photo
              $(".myProfilePic").attr("src",""+response.picture.data.url+"");




                }
            }//end argument list 


        );// end ajax call 


  $.ajax('https://graph.facebook.com/me?fields=id,name,first_name,last_name,birthday,about,hometown,languages,gender,education,work,relationship_status,quotes,family,website,email,cover&access_token=' +myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    $("#myEmail").text(response.email);
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
                    $("#myHomeTown").text(response.hometown.name);

                    $("#myGender").text(response.gender);

                    $("#myLanguages").text(response.languages[0].name);

                    $("#myName").text(response.name);

                    $("#myBirthday").text(response.birthday);

                    $("#myPicture").text(response.picture);

                    $("#myFirstname").text(response.first_name);

                    $("#myLastname").text(response.last_name);

                    $("#myQuotes").text(response.quotes);

                    $("#myFamily").text(response.family);

                    var education = response.education;
              var myEducation = $.map(education, function(index) {
                return index.school.name;
              });
              $("#myEducation").text(myEducation);



                }
            }//end argument list 


        );// end ajax call
}

    $("#facebookBtn").on('click',getFacebookInfo)



  });
   $( document ).ready(function() {

    $("p1,p2,p3,p5,p4").hide();
 
    $('#personal').click(function () {
$("h5,p2").hide();

 $("p1").show();
    });
    $('#details').click(function () {
   $("p2").show();
 $("h5,p1").hide();

});
      $('#Education').click(function () {
   $("p4").show();
 $("h5,p1,p2,p3,p5").hide();

});
        $('#Quotes').click(function () {
   $("p3").show();
 $("h5,p1,p2,p4,p5").hide();

});
           $('#Language').click(function () {
   $("p5").show();
 $("h5,p1,p2,p4,p3").hide();

});
     });
