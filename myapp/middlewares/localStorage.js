localStorage.setItem('userToken', '<TOKEN_JWT>');

document.querySelector('form').addEventListener('submit', function (e) {
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token';
    tokenInput.value = localStorage.getItem('userToken');
    this.appendChild(tokenInput);
});