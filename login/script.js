import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const loadingOverlay = document.getElementById('loading');
    const signInForm = document.querySelector('.sign-in form');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
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

    // Manipulação do formulário de registro
    const signUpForm = document.querySelector('.sign-up form');
    const signUpError = document.getElementById('sign-up-error');
    const signUpSuccess = document.getElementById('sign-up-success');

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = signUpForm.querySelector('input[type="text"]').value;
        const email = signUpForm.querySelector('input[type="email"]').value;
        const password = signUpForm.querySelector('input[type="password"]').value;

        if (!name || !email || !password) {
            signUpError.textContent = "Todos os campos são obrigatórios.";
            signUpError.style.display = 'block';
            return;
        }

        showLoading();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuário cadastrado com sucesso
                const user = userCredential.user;
                console.log('Usuário registrado:', user);
                hideLoading();
                signUpError.style.display = 'none';
                signUpSuccess.textContent = "Registro efetuado com sucesso!";
                signUpSuccess.style.display = 'block';
                setTimeout(() => {
                    signUpSuccess.style.display = 'none';
                    container.classList.remove("active");
                }, 2000); // Retorna ao login após 2 segundos
            })
            .catch((error) => {
                // Erro ao cadastrar o usuário
                console.error('Erro ao registrar usuário:', error);
                hideLoading();
                signUpSuccess.style.display = 'none';
                signUpError.textContent = `Erro: ${error.message}`;
                signUpError.style.display = 'block';
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

        // Oculta o conteúdo e mostra o carregamento após um breve atraso
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
