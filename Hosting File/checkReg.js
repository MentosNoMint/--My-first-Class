document.getElementById("authButton").addEventListener("click", function() {
    
    var isAuthenticated = true; 
  
    
    if (!isAuthenticated) {
      window.location.href = "mainPage.html"; 
    } 
  });