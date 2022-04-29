window.onload = () => {
   document.getElementById("resume-pdf").addEventListener("click", function() {
     mixpanel.track("resume.pdf.click");
   });
}