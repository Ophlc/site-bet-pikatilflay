
        let saldo = 10000;
        let saldoFormatado = saldo.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        function formatarSaldo(valor) {
            return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            });
        }

        function criarParticulas(tipo) {
            const particles = document.getElementById('particles');
            const particleCount = tipo === 'vitoria' ? 50 : 30;
            const colors = tipo === 'vitoria' 
                ? ['#4ade80', '#22c55e', '#86efac'] 
                : ['#ef4444', '#dc2626', '#f87171'];

            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: fixed;
                        width: 8px;
                        height: 8px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        border-radius: 50%;
                        pointer-events: none;
                        left: ${Math.random() * 100}vw;
                        top: 100vh;
                        animation: particle-fall 2s linear forwards;
                        z-index: 1000;
                    `;
                    particles.appendChild(particle);

                    setTimeout(() => particle.remove(), 2000);
                }, i * 20);
            }
        }

        function apostar() {
            const valorInput = document.getElementById("aposta");
            const resultado = document.getElementById("resultado");
            let valor = parseInt(valorInput.value.replace(/\D/g, ''));

            if (!valor || valor <= 0 || valor > saldo) {
                resultado.textContent = "❌ Valor inválido!";
                resultado.className = "resultado";
                return;
            }

            valorInput.value = '';

            const ganhou = Math.random() < 0.5;
            resultado.className = "resultado";

            if (ganhou) {
                saldo += valor;
                resultado.innerHTML = "🎉 <strong>PARABÉNS AE!</strong>";
                resultado.classList.add("vitoria");
                criarParticulas('vitoria');
            } else {
                saldo -= valor;
                resultado.innerHTML = "💥 <strong>SSSEEE FUDDEEUUU!</strong> AKAKAKAKAKA ";
                resultado.classList.add("derrota");
                criarParticulas('derrota');
            }

            document.getElementById("saldo").textContent = formatarSaldo(saldo);

            // Reset resultado após 4 segundos
            setTimeout(() => {
                resultado.textContent = "";
                resultado.className = "resultado";
            }, 4000);
        }

        // Enter para apostar
        document.getElementById("aposta").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                apostar();
            }
        });

        // Formatar input de valor em tempo real
        document.getElementById("aposta").addEventListener("input", function(e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value ? parseInt(value).toLocaleString('pt-BR') : '';
        });
    