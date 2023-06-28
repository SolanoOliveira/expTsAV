const signupForm = document.getElementById('signup-form');
signupForm.onsubmit = () => {
  const senha = document.getElementById('senha').value;
  const confirmSenha = document.getElementById('confirm-senha').value;
  if (senha != confirmSenha) {
    document.getElementById('confirm-senha-error').innerHTML =
      'As senhas precisam ser iguais';
    return false;
  }
};
