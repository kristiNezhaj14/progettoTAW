document.getElementById('show-register').addEventListener('click', function() {
    document.querySelector('.login-form').classList.remove('active');
    document.querySelector('.register-form').classList.add('active');
  });
  
  document.getElementById('show-login').addEventListener('click', function() {
    document.querySelector('.register-form').classList.remove('active');
    document.querySelector('.login-form').classList.add('active');
  });
  
  // Initialize the form to show login by default
  document.querySelector('.login-form').classList.add('active');
  