const projectsData = {
    1: {
        title: 'Brand Identity Design',
        description: 'Complete branding package including logo design, color palette, typography system, and visual guidelines. This project involved extensive research and multiple design iterations to create a cohesive brand identity.',
        category: 'Design',
        year: '2024',
        tools: 'Adobe Illustrator, Photoshop',
        media: {
            type: 'image',
            src: 'images/p1.jpg'
        }
    },
    2: {
        title: 'Product Video Showcase',
        description: 'Professional product video featuring cinematic shots, color grading, and motion graphics. The video showcases product features with smooth transitions and engaging visual effects.',
        category: 'Video',
        year: '2024',
        tools: 'Adobe Premiere Pro, After Effects',
        media: {
            type: 'video',
            src: 'videos/v1.mp4'
        }
    },
    3: {
        title: 'Social Media Graphics',
        description: 'Engaging social media content designed for multiple platforms including Instagram, Facebook, and TikTok. Each design is optimized for platform-specific dimensions and engagement.',
        category: 'Design',
        year: '2024',
        tools: 'Figma, Adobe Illustrator',
        media: {
            type: 'image',
            src: 'images/p3.jpg'
        }
    },
    4: {
        title: 'Corporate Video',
        description: 'High-quality corporate video for company presentation. Features professional editing, color grading, and background music. Perfect for website and marketing materials.',
        category: 'Video',
        year: '2024',
        tools: 'Adobe Premiere Pro, DaVinci Resolve',
        media: {
            type: 'video',
            src: 'videos/v2.mp4'
        }
    },
    5: {
        title: 'UI/UX Design',
        description: 'Modern interface design for a web application. Includes wireframes, prototypes, and interactive elements. Designed with user experience and accessibility in mind.',
        category: 'Design',
        year: '2024',
        tools: 'Figma, Adobe XD',
        media: {
            type: 'image',
            src: 'images/p5.jpg'
        }
    },
    6: {
        title: 'Event Highlight Reel',
        description: 'Dynamic event highlight video featuring the best moments from a corporate event. Includes music synchronization, transitions, and professional color grading.',
        category: 'Video',
        year: '2024',
        tools: 'Adobe Premiere Pro, After Effects',
        media: {
            type: 'video',
            src: 'videos/v3.mp4'
        }
    }
};

const roles = ['Social Media Manager', 'Video Editor', 'Graphic Designer', 'Content Creator'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50;
let deletingSpeed = 30;
let pauseTime = 1000;

function typeRole() {
    const roleElement = document.getElementById('roleText');
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseTime);
            return;
        }
        setTimeout(typeRole, typingSpeed);
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
            return;
        }
        setTimeout(typeRole, deletingSpeed);
    }
}

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const projectButtons = document.querySelectorAll('.project-btn');

function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalCategory').textContent = project.category;
    document.getElementById('modalYear').textContent = project.year;
    document.getElementById('modalTools').textContent = project.tools;

    const mediaContainer = document.getElementById('modalMedia');
    mediaContainer.innerHTML = '';

    if (project.media.type === 'image') {
        const img = document.createElement('img');
        img.src = project.media.src;
        img.alt = project.title;
        mediaContainer.appendChild(img);
    } else if (project.media.type === 'video') {
        const video = document.createElement('video');
        video.src = project.media.src;
        video.controls = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        mediaContainer.appendChild(video);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    const video = document.querySelector('#modalMedia video');
    if (video) {
        video.pause();
    }
}

projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectCard = button.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project-id');
        openModal(projectId);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectButtons = document.querySelectorAll('.project-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (projectButtons.length > 0) {
        projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectCard = button.closest('.project-card');
                const projectId = projectCard.getAttribute('data-project-id');
                openModal(projectId);
            });
        });
    }

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('active');
    }

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                navMenu.classList.remove('active');
            }
        });
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
        }
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    typeRole();
});
const elements = document.querySelectorAll("section, .card, .content, img");
elements.forEach(el => {
  el.classList.add("auto-reveal");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

// Observe all
elements.forEach(el => observer.observe(el));

