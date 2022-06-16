
const form = document.forms.registration;
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target));
  if (
    data.firstName.trim() &&
    data.secondName.trim() &&
    data.password.trim() &&
    data.confirmPassword.trim() &&
    data.email.trim() &&
    data.password === data.confirmPassword
  ) {
    const response = await fetch('/registr', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      window.location = '/';
    }
  } else {
    alert('Пароли должны совпадать');
  }
});
