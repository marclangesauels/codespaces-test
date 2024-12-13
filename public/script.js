document.addEventListener('DOMContentLoaded', function() {
    fetch('/users')
        .then(response => response.json())
        .then(data => {
            const usersTableBody = document.querySelector('#usersTable tbody');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                usersTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
});
