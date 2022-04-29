window.addEventListener("load",function(event) {
   let elementToEventMap = ["resume-pdf", "resume-github", "resume-linkedin"];
   elementToEventMap.forEach(element => {
       document.getElementById(element).addEventListener("click", function(){
          mixpanel.track(element.replace('-', '.'))
       });
   });
});