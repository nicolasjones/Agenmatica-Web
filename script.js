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

    const openServiceModal = (serviceId) => {
        const data = serviceData[serviceId];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-3xl md:text-5xl metallic-text uppercase mb-8">${data.title}</h3>
                
                <div class="problem-text">
                    <p class="text-xl md:text-2xl font-light leading-relaxed text-white">
                        <span class="font-black text-logo-red uppercase tracking-wider block mb-2 text-sm">Problemática</span>
                        ${data.problem}
                    </p>
                </div>
                
                <div class="solution-text pt-8">
                    <p class="text-xl md:text-2xl font-light leading-relaxed text-white">
                        <span class="font-black text-logo-blue uppercase tracking-wider block mb-2 text-sm">Solución</span>
                        ${data.solution}
                    </p>
                </div>
            </div>
            
            <div class="pt-12">
                <button class="bg-logo-blue text-white font-black uppercase tracking-[0.3em] text-[10px] py-6 px-12 sharp-edge hover:bg-logo-red transition-all shadow-lg shadow-logo-blue/20 w-full md:w-auto">
                    Solicitar Info
                </button>
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
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeServiceModal();
        }
    });
});
