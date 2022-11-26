import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const navAnimation = () => {
  let tl = gsap.timeline({ Defaults: { ease: "power3.inOut" } });
  tl.to(".navbar-container", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    y: "0",
    duration: 1,
    ease: "power3.inOut",
  }).to(".toTop", { opacity: 1, duration: 2 }, "-=0.5");
};

export const homeAnimation = () => {
  // let mm = gsap.matchMedia();
  let tl = gsap.timeline({ Defaults: { ease: "power3.inOut" } });
  tl.to(".hero-banner-container", {
    scale: 1.3,
    duration: 1.5,
    opacity: 1,
    ease: "power3.inOut",
  })
    .to(".hero-banner-container .extra", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: "0",
      duration: 1,
    })
    .to(".hero-banner-container", {
      scale: 1,
      duration: 2,
      ease: "power3.inOut",
      delay: 1,
    })
    .to(
      ".hero-banner-container .extra",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        left: "40px",
        ease: "power3.inOut",
        duration: 0.2,
      },
      "-=1.5"
    )
    .to(".navbar-container", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: "0",
      duration: 0.5,
      ease: "power3.inOut",
    })
    .to(
      ".products-heading",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: "0",
        duration: 0.5,
        height: "100vh",
        ease: "power3.inOut",
        padding: "120px 8vw",
      },
      "-=0.5"
    )
    .to("html, body", {
      overflowY: "auto",
    })
    .to(".toTop", { opacity: 1, duration: 2 }, "-=0.5");
  gsap.to(".product-card", {
    opacity: 1,
    duration: 2,
    scrollTrigger: {
      trigger: ".hero-banner-container",
      start: "bottom-=200px top",
      end: "bottom+=100px top",
      toggleActions: "play reverse restart reverse",
      // scrub: true,
      // markers: true,
    },
  });
  gsap.to(".hero-banner2-container .menu-items h1.extra", {
    marginLeft: "0",
    opacity: "1",
    duration: 3,
    scrollTrigger: {
      trigger: ".hero-banner2-container",
      start: "top bottom",
      toggleActions: "restart none none none",
      // scrub: true,
      // markers: true,
    },
  });
  gsap.to(".hero-banner2-container .img-right", {
    y: "0",
    opacity: "1",
    duration: 3,
    scrollTrigger: {
      trigger: ".hero-banner2-container",
      start: "top bottom",
      toggleActions: "restart none none none",
      // scrub: true,
      // markers: true,
    },
  });
};
