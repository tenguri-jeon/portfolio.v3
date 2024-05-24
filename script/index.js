gsap.registerPlugin(ScrollTrigger);

gsap.to(".ex_box1", {
    scrollTrigger: {
        trigger: "#text-container", // ex_box1을 트리거로 설정
        start:  "0% 50%",
        end: "100% 65%",
        toggleActions: "play restart reset none" // 스크롤 방향에 따라 재생할 액션 설정
    },
    x: 100,
    opacity: 1,
    duration: 2
});

gsap.to(".ex_box2", {
    scrollTrigger: {
        trigger: ".ex_box2", // ex_box2를 트리거로 설정
        start:  "0% 50%",
        end: "100% 65%",
        toggleActions: "play restart none none" // 스크롤 방향에 따라 재생할 액션 설정
    },
    x: 100,
    opacity: 1,
    duration: 2
});

gsap.to(".ex_box3", {
    scrollTrigger: {
        trigger: ".ex_box3", // ex_box3를 트리거로 설정
        start:  "0% 50%",
        end: "100% 65%",
        toggleActions: "play restart none none" // 스크롤 방향에 따라 재생할 액션 설정
    },
    x: 100,
    opacity: 1,
    duration: 2
});


let sections = gsap.utils.toArray(".panel");

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".main-page-wrap",
        pin: true,
        start: "top top",  
        end: "+=1500", 
        // markers: {
        //     startColor: 'yellow',
        //     endColor: 'black',
        //     fontSize: '1rem',
        //     indent: 200
        // },
    }
});

gsap.set(".black-bg", {
    display: "none",  
    opacity: 0,       
    scale: 0.5       
});

const textContainer = document.querySelector('.text-container');
const modalWrapContainer = document.querySelector('.modal-wrap-container');

let initialScrollY = 0; 

// 스크롤이 163px 맞춰 움직이도록 이벤트 설정
function syncScroll() {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - initialScrollY;
    const steps = Math.floor(scrollDifference / 163);
    textContainer.scrollTop = steps * 163;
    const friendButtons = document.querySelectorAll('.friend-button');
    const speechBubble = document.querySelector('.speech-bubble');         
    const speechTexts = [
        "첫 번째",
        "두 번째",
        "세에 번째"
    ];

    friendButtons.forEach((button, index) => {
        if (index === steps % friendButtons.length) {
            button.classList.add('button-active');
        } else {
            button.classList.remove('button-active');
        }
    });

    textContainer.scrollTop = steps * 163;

    // .speach-bubble의 innerHTML 변경
    if (steps < speechTexts.length) {
        speechBubble.innerHTML = speechTexts[steps % speechTexts.length];
    } else {
        speechBubble.innerHTML = speechTexts[speechTexts.length - 1]; 
    }

        // textContainer의 스크롤이 끝나면 스크롤 위임
    // if (textContainer.scrollTop + textContainer.clientHeight >= textContainer.scrollHeight) {
        // 스크롤 이벤트 리스너 제거
        // window.removeEventListener('scroll', syncScroll);

        // setTimeout(() => {
        // // modalWrapContainer로 스크롤 위임
        //     window.addEventListener('scroll', syncScrollModalWrap);
        // }, 1000); // 1초 대기 (1000밀리초)
    // }
}

// modal부분 이벤트 관련
ScrollTrigger.create({
    trigger: ".goal",
    start: "top top",
    // endTrigger: "#section2-text-container",
    end: "+=490",
    // markers: {
    // 	startColor: 'yellow',
    //     endColor: 'black',
    //     fontSize: '1rem',
    //     indent: 200
    // },
    pin: true,
    pinSpacing: false,
    onEnter: () => {
        gsap.to(".first-modal", {
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            css: { display: "block", opacity: "1", transform: "scale(1) translate(50%, 0%)" }
        });
        gsap.to(".goal", {
            opacity: 1,
            scale: 1,
            duration: 1,
            css: { display: "block", opacity: "1", transform: "scale(1)" }
        });

        initialScrollY = window.scrollY;

            // 스크롤 위임 이벤트
        window.addEventListener('scroll', syncScroll);
    },
    onLeaveBack: () => {
        window.removeEventListener('scroll', syncScroll)
        gsap.to(".first-modal", { opacity: 0, duration: 1});
        gsap.to(".goal", { opacity: 0  });
        gsap.to(".main", { opacity: 1 , scale : 1});
    },
    onLeave: () => {
        window.removeEventListener('scroll', syncScroll);
        gsap.to(".first-modal", {
            opacity: 0,  
            scale: 0,   
            duration: 1
        });
        gsap.to(".goal", {
            opacity: 0,  
            scale: 0,   
            duration: 1
        });
        gsap.to(".main", {
            opacity: 0,  
            scale: 0,   
            duration: 1
        });
    },
});

window.scrollTo(0, 0);

// function syncScrollModalWrap() {
//     const currentScrollY = window.scrollY;
//     modalWrapContainer.scrollTop = currentScrollY - textContainer.scrollHeight;
// }

gsap.to(sections, {
    xPercent: -100 * (sections.length),
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        pin: true,
        start: "0% 30%",
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: "+=1200",
        onComplete: () => {
            gsap.to(sections, { xPercent: 0, ease: "none" });
        }
    }
});

const memolist = document.querySelectorAll('.memo-wrap li')
const button = document.querySelectorAll('.button-wrap button')

// main 버튼 클릭 시 해당 내용 표출
button.forEach((element, index) => {
    element.addEventListener('click', () => {
        memolist.forEach((memo, memoIndex) => {
            switch (index + 1) {
                case 1:
                    if (memoIndex === 0) {
                        memo.style.display = 'block';
                    } else {
                        memo.style.display = 'none';
                    }
                    break;
                case 2:
                    if (memoIndex === 1) {
                        memo.style.display = 'block';
                    } else {
                        memo.style.display = 'none';
                    }
                    break;
                case 3:
                    if (memoIndex === 2) {
                        memo.style.display = 'block';
                    } else {
                        memo.style.display = 'none';
                    }
                    break;
                case 4:
                    if (memoIndex === 3) {
                        memo.style.display = 'block';
                    } else {
                        memo.style.display = 'none';
                    }
                    break;
                default:
                    break;
            }
        });
        element.classList.add('clicked')
    });
});
