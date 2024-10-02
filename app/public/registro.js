const btnRegister = document.getElementById('registro');
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Recoge los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtiene la lista de usuarios desde el localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica si el email ya está registrado
    if (users.some(user => user.email === email)) {
        alert('Este usuario ya está registrado.'); // Mensaje de error
        return; // Salir de la función para evitar el registro
    }

    // Prepara los datos para enviar al backend
    const data = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(response.ok) {
            alert('Registro exitoso');
            // Agregar el nuevo usuario al array y guardar en el localStorage
            users.push(data);
            localStorage.setItem('users', JSON.stringify(users));

            // Redirecciona al usuario a otra página si lo deseas
            window.location.href = '/index.html';
        } else {
            alert(result.msg || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar registrarse');
    }
});
