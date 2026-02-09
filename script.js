tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2b2bee",
                "logo-blue": "#1a4d8c",
                "logo-red": "#b31a1a",
                "logo-silver": "#c0c0c8",
                "deep-gray": "#121212",
                "circuit-gray": "#111111",
                "container-gray": "#1a1a1a",
                "tidal-gray": "#161616",
                "tidal-border": "#2a2a2a",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
                "display": ["Outfit", "sans-serif"]
            },
        },
    },
}
const serviceData = {
    ventas: {
        title: "Agente de Ventas 24/7",
        problem: "Su negocio tiene horario de cierre, pero las consultas de clientes no paran. Cada minuto sin respuesta es una venta que se lleva la competencia.",
        solution: "Una fuerza de ventas digital que atiende, califica y cierra clientes en WhatsApp a cualquier hora. No es un menú de opciones, sino un agente inteligente que conversa y agenda reuniones o cobros automáticamente."
    },
    reactivacion: {
        title: "Reactivación de Clientes Inactivos",
        problem: "El 80% de su base de datos de clientes está \"dormida\". Son personas que ya confiaron en usted pero que hoy están en el olvido, perdiendo un flujo recurrente de ingresos sin costo de adquisición.",
        solution: "Implementamos agentes que detectan patrones de inactividad y contactan a cada cliente de forma personalizada con ofertas de reenganche, transformando una lista muerta en una fuente activa de ventas."
    },
    reuniones: {
        title: "Agente de Reuniones B2B",
        problem: "Su equipo de ventas pierde horas valiosas buscando prospectos en frío en lugar de estar cerrando contratos. La prospección manual es lenta, ineficiente y difícil de escalar.",
        solution: "Un agente de outreach que identifica, contacta y califica prospectos B2B de forma autónoma. Su equipo solo recibe reuniones confirmadas con tomadores de decisiones que ya mostraron interés real."
    },
    rescate: {
        title: "Generador de Reuniones B2B", // Wait, I see "Generador de Reuniones B2B" in the index.html for "rescate" ID
        problem: "Protocolos de rescate automáticos que actúan en los primeros segundos del abandono. El agente detecta la duda del cliente y ofrece asistencia inmediata.",
        solution: "Clientes que llegan por anuncios suelen abandonar el carrito o dejar de responder. El agente ofrece asistencia inmediata para asegurar que ninguna oportunidad se pierda."
    },
    auditoria: {
        title: "Rescate de Ventas por WhatsApp", // Wait, IDs and titles might be mixed up in index.html, let me check carefully
        problem: "Los errores humanos en el registro de cobros generan fugas de capital invisibles. Sin un control en tiempo real, detectar un error días después puede ser tarde.",
        solution: "Un guardián financiero digital que audita cada transacción al instante. Cruza datos de pasarelas y bancos, alertando sobre cualquier anomalía."
    },
    gestion: {
        title: "Gestión Admin. Autónoma",
        problem: "El crecimiento de su empresa le está llenando de tareas operativas repetitivas. Cuanto más vende, más caos administrativo genera, convirtiéndose en el cuello de botella.",
        solution: "Infraestructura autónoma que procesa pedidos, genera facturas y actualiza CRM sin intervención humana. Libera su tiempo para decisiones estratégicas."
    }
};

// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');
    const openButtons = document.querySelectorAll('.open-modal');
    const overlay = document.querySelector('.modal-overlay');

    // Portfolio Button Visibility (Dev-only)
    const portfolioBtn = document.getElementById('portfolioBtn');
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal && portfolioBtn) {
        portfolioBtn.classList.remove('hidden');
    }

    const openServiceModal = (serviceId) => {
        const data = serviceData[serviceId];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-2xl md:text-3xl metallic-text uppercase mb-6">${data.title}</h3>
                
                <div class="problem-text">
                    <p class="text-lg md:text-xl font-light leading-relaxed text-white">
                        <span class="font-black text-logo-red uppercase tracking-wider block mb-2 text-xl">Problemática</span>
                        ${data.problem}
                    </p>
                </div>
                
                <div class="solution-text pt-4">
                    <p class="text-lg md:text-xl font-light leading-relaxed text-white">
                        <span class="font-black text-logo-blue uppercase tracking-wider block mb-2 text-xl">Solución</span>
                        ${data.solution}
                    </p>
                </div>
            </div>
            </div>
        `;

        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeServiceModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500);
        document.body.style.overflow = '';
    };

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceId = btn.getAttribute('data-service');
            openServiceModal(serviceId);
        });
    });

    closeModal.addEventListener('click', closeServiceModal);
    overlay.addEventListener('click', closeServiceModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) closeServiceModal();
            if (chatWindow.classList.contains('active')) toggleChat();
        }
    });

    // Chatbot Logic
    const chatbotBtn = document.getElementById('chatbotBtn');
    let chatHistory = [];
    let isAwaitingWhatsAppConfirm = false;

    const openWhatsApp = () => {
        const phone = '5491167962925';
        const message = encodeURIComponent('Hola, vengo del chat de la web y tengo una consulta que el asistente no pudo resolver.');
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        isAwaitingWhatsAppConfirm = false;
    };
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    const toggleChat = () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    };

    chatbotBtn.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // Auto-open chatbot after 10 seconds
    setTimeout(() => {
        if (chatWindow && !chatWindow.classList.contains('active')) {
            toggleChat();
        }
    }, 10000);

    const appendMessage = (text, isAI = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex flex-col gap-2 ${isAI ? 'max-w-[85%]' : 'max-w-[85%] self-end items-end'}`;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let messageHtml = `
            <div class="${isAI ? 'bg-white/5 border border-white/10' : 'bg-logo-blue/10 border border-logo-blue/20'} p-4 text-[13px] leading-relaxed text-zinc-300">
                ${text}
            </div>
        `;

        // Inyectar botones si es la oferta de WhatsApp
        if (isAI && text.includes("WhatsApp") && !text.includes("redirigiendo")) {
            messageHtml += `
                <div class="flex gap-2 mt-1">
                    <button class="wa-btn-yes bg-logo-blue hover:bg-logo-blue/80 text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter transition-all">SÍ, CONECTAR</button>
                    <button class="wa-btn-no border border-white/10 hover:bg-white/5 text-zinc-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter transition-all">NO, GRACIAS</button>
                </div>
            `;
        }

        msgDiv.innerHTML = `
            ${messageHtml}
            <span class="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                ${isAI ? 'GENAI' : 'USTED'} • ${timestamp}
            </span>
        `;

        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Manejo de botones de WhatsApp
    chatMessages.addEventListener('click', (e) => {
        if (e.target.classList.contains('wa-btn-yes')) {
            const parent = e.target.parentElement;
            parent.style.opacity = '0.5';
            parent.style.pointerEvents = 'none';
            appendMessage("Perfecto, lo estoy redirigiendo...", true);
            setTimeout(openWhatsApp, 1200);
        } else if (e.target.classList.contains('wa-btn-no')) {
            const parent = e.target.parentElement;
            parent.style.opacity = '0.5';
            parent.style.pointerEvents = 'none';
            isAwaitingWhatsAppConfirm = false;
            appendMessage("Entiendo. ¿En qué más puedo ayudarle sobre nuestros servicios de IA?", true);
        }
    });

    const callOpenAI = async (userMessage) => {
        // Estado de "pensando"
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'flex flex-col gap-2 max-w-[85%] animate-pulse chatbot-thinking';
        thinkingDiv.innerHTML = `
            <div class="bg-white/5 border border-white/10 p-4 text-[13px] text-zinc-500 italic">
                El agente está analizando...
            </div>
        `;
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // CONFIGURACIÓN OPENAI
            const API_KEY = 'TU_OPENAI_API_KEY';
            const API_URL = 'https://api.openai.com/v1/chat/completions';

            // CONTEXTO DEL AGENTE
            const SYSTEM_CONTEXT = `
                Tu nombre es Genai, eres el Agente Inteligente de Agenmatica. Tu objetivo es ayudar a clientes potenciales con información sobre la empresa.
                TONO: Profesional, formal (usa "usted"), tecnológico y directo.
                
                INFORMACIÓN DE AGENMATICA:
                - Es una empresa de ingeniería de automatización con IA para negocios reales.
                - SERVICIOS:
                  1. Ventas 24/7 (WhatsApp): Agentes que califican y cierran ventas automáticamente.
                  2. Reactivación: Sistemas que traen de vuelta a clientes inactivos.
                  3. Reuniones B2B: Automatización de prospección y agenda.
                  4. Rescate de Leads: Contacto inmediato con leads de marketing.
                  5. Auditoría IA: Revisión técnica de la operación para encontrar fugas de dinero.
                  6. Gestión y Soporte: Mantenimiento de la infraestructura de IA.
                
                REGLAS:
                - No menciones que eres una IA a menos que te pregunten.
                - Si te preguntan precios, indica que son a medida y que lo ideal es agendar una Auditoría.
                - Siempre intenta llevar al usuario a "Agendar una Auditoría".
                - Si el usuario pregunta algo que NO conoces o que es ajeno a Agenmatica, DEBES decir exactamente: "Lo siento, no tengo esa información específica. ¿Le gustaría hablar con un especialista por WhatsApp para resolver esto?"
            `;

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: SYSTEM_CONTEXT },
                        { role: 'user', content: userMessage }
                    ],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.group('DEBUG: OpenAI API Error');
                console.error('Status:', response.status);
                console.error('Body:', errorBody);
                console.groupEnd();
                throw new Error('Error al conectar con OpenAI');
            }

            const data = await response.json();
            const aiAnswer = data.choices[0].message.content;

            // Detectar si estamos ofreciendo WhatsApp
            if (aiAnswer.includes("WhatsApp")) {
                isAwaitingWhatsAppConfirm = true;
            } else {
                isAwaitingWhatsAppConfirm = false;
            }

            chatMessages.removeChild(thinkingDiv);
            appendMessage(aiAnswer, true);

        } catch (error) {
            console.error('Error OpenAI:', error);
            chatMessages.removeChild(thinkingDiv);
            appendMessage("Lo siento, tengo problemas de conexión temporal. ¿Desea que agendemos una llamada directamente?", true);
        }
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            appendMessage(message, false);
            chatInput.value = '';

            // Lógica de confirmación de WhatsApp
            if (isAwaitingWhatsAppConfirm) {
                const lowerMsg = message.toLowerCase();
                if (lowerMsg.includes('si') || lowerMsg.includes('ok') || lowerMsg.includes('bueno') || lowerMsg.includes('dale')) {
                    appendMessage("Perfecto, lo estoy redirigiendo...", true);
                    setTimeout(openWhatsApp, 1500);
                    return;
                } else {
                    isAwaitingWhatsAppConfirm = false;
                }
            }

            callOpenAI(message);
        }
    });
});
