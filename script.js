:root {
    --background-color: #121212;
    --card-background: #1e1e1e;
    --primary-text: #e0e0e0;
    --secondary-text: #b0b0b0;
    --border-color: #333;
    --accent-color: #007bff;
    --accent-hover: #0056b3;
    --error-color: #dc3545;
    --success-color: #28a745;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background-color);
    color: var(--primary-text);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.overlay.visible {
    opacity: 1;
    visibility: visible;
}

.modal {
    background-color: var(--card-background);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    width: 90%;
    max-width: 400px;
    text-align: center;
    border: 1px solid var(--border-color);
}

.modal h2 {
    margin-bottom: 10px;
    color: var(--primary-text);
}

.modal p {
    margin-bottom: 20px;
    color: var(--secondary-text);
    font-size: 14px;
}

.container {
    width: 100%;
    max-width: 700px;
}

header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text);
}

.card {
    background-color: var(--card-background);
    padding: 25px 30px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.card h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.card p {
    font-size: 14px;
    color: var(--secondary-text);
    margin-bottom: 25px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--secondary-text);
}

input[type="password"],
select,
textarea {
    width: 100%;
    padding: 12px;
    background-color: #2a2a2a;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--primary-text);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="password"]:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

textarea {
    resize: vertical;
}

button {
    width: 100%;
    padding: 12px;
    background-color: var(--accent-color);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

button:hover {
    background-color: var(--accent-hover);
}

button:disabled {
    background-color: #555;
    cursor: not-allowed;
}

.spinner {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 3px solid #fff;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.message {
    margin-top: 20px;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    display: none;
}

.message.success {
    background-color: rgba(40, 167, 69, 0.2);
    color: var(--success-color);
    display: block;
}

.message.error {
    background-color: rgba(220, 53, 69, 0.2);
    color: var(--error-color);
    display: block;
}

.error-message {
    color: var(--error-color);
    font-size: 14px;
    margin-top: 15px;
    height: 20px;
}

.hidden {
    display: none !important;
}

.visible {
    display: flex !important;
}
