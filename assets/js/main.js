
(function() {
//===== Prealoder

	window.onload = function () {
		window.setTimeout(fadeout, 500);
	}

	function fadeout() {
		document.querySelector('.preloader').style.opacity = '0';
		document.querySelector('.preloader').style.display = 'none';
	}


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }



        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    // Get the navbar


    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');
    
    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });


    //===== close navbar-collapse when a  clicked
    let navbarToggler = document.querySelector(".navbar-toggler");    
    var navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove('show')
        })
    );
    navbarToggler.addEventListener('click', function() {
        navbarToggler.classList.toggle("active");
        window.setTimeout(() => {
            if (!navbarCollapse.classList.contains("show")) {
                closeAllSubmenus();
            }
        }, 0);
    })

    function isMobileNav() {
        return window.matchMedia("(max-width: 991px)").matches;
    }

    function closeAllSubmenus() {
        document.querySelectorAll(".has-submenu.open").forEach(item => {
            item.classList.remove("open");
            const trigger = item.querySelector(".compare-toggle");
            const toggler = item.querySelector(".sub-nav-toggler");
            if (trigger) trigger.setAttribute("aria-expanded", "false");
            if (toggler) toggler.setAttribute("aria-expanded", "false");
        });
    }

    function toggleSubmenu(menuItem) {
        const shouldOpen = !menuItem.classList.contains("open");
        closeAllSubmenus();
        const trigger = menuItem.querySelector(".compare-toggle");
        const toggler = menuItem.querySelector(".sub-nav-toggler");
        if (shouldOpen) {
            menuItem.classList.add("open");
            if (trigger) trigger.setAttribute("aria-expanded", "true");
            if (toggler) toggler.setAttribute("aria-expanded", "true");
        } else {
            menuItem.classList.remove("open");
            if (trigger) trigger.setAttribute("aria-expanded", "false");
            if (toggler) toggler.setAttribute("aria-expanded", "false");
        }
        return shouldOpen;
    }

    document.querySelectorAll(".has-submenu").forEach(menuItem => {
        const trigger = menuItem.querySelector(".compare-toggle");
        const toggler = menuItem.querySelector(".sub-nav-toggler");
        const submenuLinks = menuItem.querySelectorAll(".sub-menu a");

        if (trigger) {
            trigger.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleSubmenu(menuItem);
            });

            trigger.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleSubmenu(menuItem);
                } else if (event.key === "Escape") {
                    closeAllSubmenus();
                    trigger.focus();
                }
            });
        }

        if (toggler) {
            toggler.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleSubmenu(menuItem);
            });

            toggler.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleSubmenu(menuItem);
                } else if (event.key === "Escape") {
                    closeAllSubmenus();
                    if (trigger) trigger.focus();
                }
            });
        }

        submenuLinks.forEach(link => {
            link.addEventListener("click", () => {
                closeAllSubmenus();
                if (isMobileNav()) {
                    navbarToggler.classList.remove("active");
                    navbarCollapse.classList.remove("show");
                }
            });
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".navbar-nav")) {
            closeAllSubmenus();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllSubmenus();
        }
    });

    document.querySelectorAll(".navbar-nav .nav-item > a:not(.compare-toggle)").forEach(link => {
        link.addEventListener("click", () => {
            closeAllSubmenus();
            if (isMobileNav()) {
                navbarToggler.classList.remove("active");
                navbarCollapse.classList.remove("show");
            }
        });
    });


	// WOW active
    new WOW().init();

    
    //====== counter up 
    if (typeof counterUp !== "undefined") {
        var cu = new counterUp({
            start: 0,
            duration: 2000,
            intvalues: true,
            interval: 100,
            append: " ",
        });
        cu.start();
    }

	//======== tiny slider (solo se il contenitore esiste)
	var testimonialEl = document.querySelector('.testimonial-active');
	if (testimonialEl) {
		var slider = new tns({
			container: '.testimonial-active',
			slideBy: 'page',
			autoplay: false,
			mouseDrag: true,
			gutter: 0,
			items: 1,
			nav: false,
			controls: true,
			controlsText: [
				'<i class="lni lni-chevron-left prev"></i>',
				'<i class="lni lni-chevron-right next"></i>'
			],
			responsive: {
				1200: { items: 3 },
				992: { items: 2 },
				0: { items: 1 }
			}
		});
	}

})();
