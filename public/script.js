document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        Name: document.getElementById('name').value,
        Title: document.getElementById('title').value,
        TargetedKeywords: document.getElementById('keywords').value,
        Education: document.getElementById('education').value,
        Certification: document.getElementById('certification').value,
        Contact: document.getElementById('contact').value
    };

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(error => console.error('Error:', error));
});
