import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCPCpnT75Vdw8CIbT5Q9T_-7Rxu_HUNK8s",
        authDomain: "eficiencia-21869.firebaseapp.com",
        projectId: "eficiencia-21869",
        storageBucket: "eficiencia-21869.appspot.com",
        messagingSenderId: "485464391877",
        appId: "1:485464391877:web:fb7883b68c9e98b8de30ac"
    };

    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Manipula a troca entre as seções
    const container = document.getElementById('container');
    const registerLink = document.getElementById('register');
    const loadingOverlay = document.getElementById('loading');
    const signInForm = document.querySelector('.sign-in form');
    const forgotPasswordForm = document.querySelector('.sign-up form');

    registerLink.addEventListener('click', () => {
        container.classList.add("active");
    });

    function showLoading() {
        setTimeout(() => {
            loadingOverlay.style.display = 'flex';
            document.querySelectorAll('.container').forEach(container => {
                container.classList.add('hide-during-loading');
            });
        }, 1000); // Atraso de 1 segundo
    }

    function hideLoading() {
        loadingOverlay.style.display = 'none';
        document.querySelectorAll('.container').forEach(container => {
            container.classList.remove('hide-during-loading');
        });
    }

    // Manipulação do formulário de recuperação de senha
    const forgotPasswordError = document.getElementById('sign-up-error');
    const forgotPasswordSuccess = document.getElementById('sign-up-success');

    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o comportamento padrão de envio do formulário

        const email = forgotPasswordForm.querySelector('input[type="email"]').value;

        if (!email) {
            forgotPasswordError.textContent = "O campo de email é obrigatório.";
            forgotPasswordError.style.display = 'block';
            return;
        }

        showLoading();

        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Email de redefinição enviado com sucesso
                hideLoading();
                forgotPasswordError.style.display = 'none';
                forgotPasswordSuccess.textContent = "Instruções para redefinir sua senha foram enviadas para seu email.";
                forgotPasswordSuccess.style.display = 'block';
            })
            .catch((error) => {
                // Erro ao enviar email de redefinição
                console.error('Erro ao enviar email de redefinição:', error);
                hideLoading();
                forgotPasswordSuccess.style.display = 'none';
                forgotPasswordError.textContent = `Erro: ${error.message}`;
                forgotPasswordError.style.display = 'block';
            });
    });

    // Manipulação do formulário de login
    const signInError = document.getElementById('sign-in-error');

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = signInForm.querySelector('input[type="email"]').value;
        const password = signInForm.querySelector('input[type="password"]').value;

        if (!email || !password) {
            signInError.textContent = "Todos os campos são obrigatórios.";
            signInError.style.display = 'block';
            return;
        }

        showLoading();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuário logado com sucesso
                const user = userCredential.user;
                console.log('Usuário logado:', user);
                setTimeout(() => {
                    // Redireciona para a página após login bem-sucedido
                    window.location.href = '/Painel/index.html';
                }, 1000); // Adiciona atraso de 1 segundo antes do redirecionamento
            })
            .catch((error) => {
                // Erro ao fazer login
                console.error('Erro ao fazer login:', error);
                hideLoading();
                signInError.textContent = `Erro: ${error.message}`;
                signInError.style.display = 'block';
            });
    });
});
