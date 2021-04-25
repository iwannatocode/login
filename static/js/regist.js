$("button").click(function(){
    
      user = $(".user").val();
      pasw = $(".password").val();

    if( user && pasw ){
        alert( "Has sido registrado" );
    }
});