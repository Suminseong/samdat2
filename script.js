document.addEventListener('DOMContentLoaded', () => {
    // Scroll Indicator Logic
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollUl = scrollIndicator ? scrollIndicator.querySelector('ul') : null;
    let isScrolling;

    // Page Indicators Configuration
    const pageIndicators = {
        'home': [
            { id: 'hero', label: 'B-Side' },
            { id: 'whatif', label: 'WhatIF?' },
            { id: 'makers-log', label: 'Makers Log' },
            { id: 'tech-tock', label: 'Tech Tock' },
            { id: 'ai-play', label: 'AI Play' }
        ],
        'play': [
            { id: 'play-hero', label: 'Play' },
            { id: 'play-intro', label: 'Intro' },
            { id: 'play-techtock', label: 'Tech Tock' },
            { id: 'play-aiplay', label: 'AI Play' }
        ],
        'archive': [
            { id: 'archive-hero', label: 'Archive' },
            { id: 'archive-intro', label: 'Intro' },
            { id: 'archive-list', label: 'List' },
            { id: 'archive-vote', label: 'Vote' }
        ],
        'recipe': [
            { id: 'recipe-hero', label: 'Recipe' },
            { id: 'recipe-intro', label: 'Intro' },
            { id: 'recipe-list', label: 'Pro\'s Recipe' },
            { id: 'recipe-goodlock', label: 'Good Lock' },
            { id: 'recipe-scroll', label: 'Modules' }
        ]
    };

    let currentSections = [];
    let currentNavLi = [];

    const updateScrollIndicator = (pageId) => {
        if (!scrollUl) return;
        
        // Clear existing
        scrollUl.innerHTML = '';
        
        const indicators = pageIndicators[pageId];
        
        if (indicators) {
            scrollIndicator.style.display = 'block';
            indicators.forEach(item => {
                const li = document.createElement('li');
                li.dataset.target = item.id;
                li.innerHTML = `
                    <span class="label">${item.label}</span>
                    <span class="dot"></span>
                `;
                
                // Click to scroll
                li.addEventListener('click', () => {
                    const targetSection = document.getElementById(item.id);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
                
                scrollUl.appendChild(li);
            });
            
            // Update references
            currentNavLi = scrollUl.querySelectorAll('li');
            // Select sections only within the active page to avoid conflicts
            const activePage = document.getElementById(`page-${pageId}`);
            if (activePage) {
                currentSections = Array.from(activePage.querySelectorAll('section'));
            }
        } else {
            scrollIndicator.style.display = 'none';
            currentSections = [];
            currentNavLi = [];
        }
    };

    // Initial Setup (Home)
    updateScrollIndicator('home');

    window.addEventListener('scroll', () => {
        if (currentSections.length === 0) return;

        let current = '';
        
        currentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if section is visible
            if (sectionHeight > 0 && pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        currentNavLi.forEach(li => {
            li.classList.remove('active');
            if (li.dataset.target === current) {
                li.classList.add('active');
            }
        });

        // Show labels on scroll
        if (scrollIndicator && scrollIndicator.style.display !== 'none') {
            scrollIndicator.classList.add('scrolling');
            window.clearTimeout(isScrolling);
            isScrolling = window.setTimeout(() => {
                scrollIndicator.classList.remove('scrolling');
            }, 1000);
        }
    });

    // Carousel Logic (Enhanced)
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const cards = document.querySelectorAll('.card');
    
    if (track && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 440, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -440, behavior: 'smooth' });
        });

        // Active card detection
        track.addEventListener('scroll', () => {
            const center = track.scrollLeft + track.offsetWidth / 2;
            
            cards.forEach(card => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(center - cardCenter);
                
                if (distance < 200) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    }

    // Play Section Logic
    const playItems = document.querySelectorAll('.play-item');
    const previewImg = document.querySelector('.preview-img');
    const previewInfo = document.querySelector('.preview-info');
    const previewTitle = document.querySelector('.preview-info h3');
    const defaultMsg = document.querySelector('.default-msg');

    playItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.getAttribute('data-img');
            const title = item.getAttribute('data-title');

            if (img) {
                previewImg.src = img;
                previewImg.style.display = 'block';
                defaultMsg.style.display = 'none';
                
                if (title) {
                    previewTitle.innerHTML = title;
                    previewInfo.style.display = 'none';
                } else {
                    previewInfo.style.display = 'none';
                }
            }
        });
    });

    // Bubble Logic
    const matchContainer = document.querySelector('.match-container');
    const hoverCard = document.getElementById('hover-card');
    
    const bubblesData = [
        { class: 'b1', icon: '🔋', title: '충전 완료 알림', desc: '두고가는 일 없이 충전 시작한 버즈에게서 알람...' },
        { class: 'b2', icon: '🎵', title: '아침엔 자동으로 음악 재생', desc: '휴대폰 무음 밝기 낮추기, AOD로 시간 확인...' },
        { class: 'b3', icon: '🧹', title: '잠금 해제 시 자동 청소', desc: '아침에 일어났을 때 귀찮지 않게 청소기가 알아서...' },
        { class: 'b4', icon: '🚗', title: '차 시동걸면 티맵 자동 실행', desc: '차 시동걸면 티맵 자동으로 실행시키기 루틴' },
        { class: 'b5', icon: '🎬', title: '버튼 한 번으로 영화관 모드', desc: '휴대폰 무음 밝기 낮추기, AOD로 시간 확인...' },
        { class: 'b6', icon: '🏠', title: '회사오면 홈캠 연결', desc: '세팅 없이 간편하게 홈캠 연결해서 상태를 확...' }
    ];

    const bgBubblesData = [
        { class: 'bg-b1', icon: '🔋', title: '충전 완료 알림', desc: '두고가는 일 없이 충전 시작한 버즈에게서 알람...' },
        { class: 'bg-b2', icon: '🏠', title: '회사오면 홈캠 연결', desc: '세팅 없이 간편하게 홈캠 연결해서 상태를 확...' }
    ];

    if (matchContainer) {
        // Render Background Bubbles
        bgBubblesData.forEach(data => {
            const bubble = document.createElement('div');
            bubble.className = `bubble bg-bubble ${data.class}`;
            bubble.innerHTML = `
                <div class="icon">${data.icon}</div>
                <div class="text">
                    <strong>${data.title}</strong>
                    <span>${data.desc}</span>
                </div>
            `;
            matchContainer.appendChild(bubble);
        });

        let hideTimeout;

        // Render Interactive Bubbles
        bubblesData.forEach(data => {
            const bubble = document.createElement('div');
            bubble.className = `bubble ${data.class}`;
            bubble.innerHTML = `
                <div class="icon">${data.icon}</div>
                <div class="text">
                    <strong>${data.title}</strong>
                    <span>${data.desc}</span>
                </div>
            `;
            
            // Hover Events
            bubble.addEventListener('mouseenter', (e) => {
                if (hoverCard) {
                    clearTimeout(hideTimeout);
                    hoverCard.classList.add('visible');
                    
                    // Position only on enter
                    const offsetX = 20;
                    const offsetY = 20;
                    
                    let left = e.clientX + offsetX;
                    let top = e.clientY + offsetY;

                    // Boundary checks
                    if (left + hoverCard.offsetWidth > window.innerWidth) {
                        left = e.clientX - hoverCard.offsetWidth - offsetX;
                    }
                    if (top + hoverCard.offsetHeight > window.innerHeight) {
                        top = e.clientY - hoverCard.offsetHeight - offsetY;
                    }

                    hoverCard.style.left = `${left}px`;
                    hoverCard.style.top = `${top}px`;
                }
            });

            bubble.addEventListener('mouseleave', () => {
                if (hoverCard) {
                    hideTimeout = setTimeout(() => {
                        hoverCard.classList.remove('visible');
                    }, 100);
                }
            });

            matchContainer.appendChild(bubble);
        });

        // Card Interaction
        if (hoverCard) {
            hoverCard.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
            });

            hoverCard.addEventListener('mouseleave', () => {
                hideTimeout = setTimeout(() => {
                    hoverCard.classList.remove('visible');
                }, 100);
            });

            // Icon Toggle Logic
            const icons = hoverCard.querySelectorAll('.c-icon');
            icons.forEach(icon => {
                icon.addEventListener('click', () => {
                    // icon.classList.toggle('active');
                });
            });
        }
    }

    // Page Navigation Logic
    const navLinks = document.querySelectorAll('.top-nav a, .mobile-bottom-nav a');
    const pages = document.querySelectorAll('.page');
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = link.getAttribute('data-page');
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(`page-${targetPageId}`);
            if (targetPage) {
                targetPage.classList.add('active');
                window.scrollTo(0, 0); // Reset scroll
                
                // Update scroll indicator for the new page
                updateScrollIndicator(targetPageId);

                // Update Bottom Nav Active State
                bottomNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-page') === targetPageId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Search Logic with GPT API
    const searchInput = document.getElementById('mobile-search-input');
    const searchBtn = document.getElementById('mobile-search-btn');
    
    // Base64 Encoded API Key
    const ENCODED_KEY = 'c2stcHJvai1tWTEtTGFHZ25OQWxTdV9XcGVsNTRUbUpoQkY5TXFjTzFUY0NCaVNXeWR0WklYdENIMGVaaGJmcko3eWhQbXNRRzV6YzBEZVRkYVQzQmxia0ZKTUExSUZCdVZQZzdFYlNhc0FmLThFWW1fRWFheGltZ2R2ZzZDdVd5V3hUNGx1VEY1M0xseE9uNHVPTnJSYkdqcEpfSDVmZElmSUE=';
    
    // Decode API Key
    const OPENAI_API_KEY = atob(ENCODED_KEY);

    const performSearch = async () => {
        const query = searchInput.value.trim();
        if (!query) return;

        if (!OPENAI_API_KEY) {
            alert('OpenAI API Key가 설정되지 않았습니다. script.js 파일에서 키를 설정해주세요.');
            return;
        }

        // UI Loading State
        const originalBtnContent = searchBtn.innerHTML;
        searchBtn.innerHTML = '...';
        searchBtn.style.pointerEvents = 'none';
        searchInput.disabled = true;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that identifies Samsung Electronics product codes based on user search queries. Your goal is to find the most relevant product code (e.g., SM-S918N, RF85C900001, etc.). If the user searches for a general term (e.g., 'Galaxy S24'), provide the most representative model code. Return ONLY the product code string. Do not include any other text."
                        },
                        {
                            role: "user",
                            content: `Find the Samsung product code for: ${query}`
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 50
                })
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const productCode = data.choices[0].message.content.trim();
                console.log('Identified Product Code:', productCode);
                
                // Redirect to Samsung Search
                window.location.href = `https://www.samsung.com/sec/aisearch/?searchvalue=${encodeURIComponent(productCode)}`;
            } else {
                alert('제품 코드를 찾을 수 없습니다. 다시 시도해주세요.');
            }

        } catch (error) {
            console.error('Error fetching from GPT API:', error);
            alert('검색 중 오류가 발생했습니다.');
        } finally {
            // Reset UI
            searchBtn.innerHTML = originalBtnContent;
            searchBtn.style.pointerEvents = 'auto';
            searchInput.disabled = false;
        }
    };

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});
