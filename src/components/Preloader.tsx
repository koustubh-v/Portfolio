import { useEffect } from 'react';
import './Preloader.css';

export default function Preloader() {
  useEffect(() => {
    const gsap = (window as any).gsap;
    const CustomEase = (window as any).CustomEase;
    const SplitText = (window as any).SplitText;

    if (!gsap || !CustomEase || !SplitText) return;

    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create('hop', '0.9, 0, 0.1, 1');

    const createSplit = (selector: string, type: string, className: string) => {
      return SplitText.create(selector, {
        type: type,
        [`${type}Class`]: className,
        mask: type,
      });
    };

    const splitPreloaderHeader = createSplit('.preloader-header-text', 'chars', 'char');
    const splitPreloaderCopy = createSplit('.preloader-copy p', 'lines', 'line');

    const chars = splitPreloaderHeader.chars;
    const lines = splitPreloaderCopy.lines;

    if (!chars || !chars.length) return;

    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1];

    chars.forEach((char: HTMLElement, index: number) => {
      gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
    });

    gsap.set(lines, { yPercent: 100 });

    const preloaderImages = gsap.utils.toArray('.preloader-images .img-container');
    const preloaderImagesInner = gsap.utils.toArray('.preloader-images .img-container img');

    const tl = gsap.timeline({ delay: 0.25 });

    tl.to('.progress-bar', {
      scaleX: 1,
      duration: 4,
      ease: 'power3.inOut',
    })
      .set('.progress-bar', { transformOrigin: 'right' })
      .to('.progress-bar', {
        scaleX: 0,
        duration: 1,
        ease: 'power3.in',
      });

    preloaderImages.forEach((preloaderImg: any, index: number) => {
      tl.to(
        preloaderImg,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'hop',
          delay: index * 0.75,
        },
        '-=5'
      );
    });

    preloaderImagesInner.forEach((preloaderImageInner: any, index: number) => {
      tl.to(
        preloaderImageInner,
        {
          scale: 1,
          duration: 1.5,
          ease: 'hop',
          delay: index * 0.75,
        },
        '-=5.25'
      );
    });

    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 2,
        ease: 'hop',
        stagger: 0.1,
      },
      '-=5.5'
    );

    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: 'hop',
        stagger: 0.025,
      },
      '-=5'
    );

    tl.to(
      '.preloader-images',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: 'hop',
      },
      '-=1.5'
    );

    tl.to(
      lines,
      {
        y: '-125%',
        duration: 2,
        ease: 'hop',
        stagger: 0.1,
      },
      '-=2'
    );

    tl.to(
      chars,
      {
        yPercent: (index: number) => {
          if (index === 0 || index === chars.length - 1) {
            return 0;
          }
          return index % 2 === 0 ? 100 : -100;
        },
        duration: 1,
        ease: 'hop',
        stagger: 0.025,
        delay: 0.5,
        onStart: () => {
          const initialCharMask = initialChar.parentElement;
          const lastCharMask = lastChar.parentElement;

          if (initialCharMask && initialCharMask.classList.contains('char-mask')) {
            initialCharMask.style.overflow = 'visible';
          }

          if (lastCharMask && lastCharMask.classList.contains('char-mask')) {
            lastCharMask.style.overflow = 'visible';
          }

          const viewportWidth = window.innerWidth;
          const centerX = viewportWidth / 2;
          const initialCharRect = initialChar.getBoundingClientRect();
          const lastCharRect = lastChar.getBoundingClientRect();

          gsap.to([initialChar, lastChar], {
            duration: 1,
            ease: 'hop',
            delay: 0.5,
            x: (i: number) => {
              if (i === 0) {
                return centerX - initialCharRect.left - initialCharRect.width;
              } else {
                return centerX - lastCharRect.left;
              }
            },
            onComplete: () => {
              gsap.set('.preloader-header', { mixBlendMode: 'difference' });
              gsap.to('.preloader-header', {
                y: '2rem',
                scale: 0.35,
                duration: 1.75,
                ease: 'hop',
                onComplete: () => {
                  gsap.to('.preloader-header', {
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    onComplete: () => {
                      const preloaderEl = document.querySelector('.preloader');
                      if (preloaderEl) (preloaderEl as HTMLElement).style.display = 'none';
                      const preloaderHeaderEl = document.querySelector('.preloader-header');
                      if (preloaderHeaderEl) (preloaderHeaderEl as HTMLElement).style.display = 'none';
                    }
                  });
                }
              });
            },
          });
        },
      },
      '-=2.5'
    );

    tl.to(
      '.preloader',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.75,
        ease: 'hop',
      },
      '-=0.5'
    );

  }, []);

  return (
    <>
      <div className="preloader">
        <div className="progress-bar"></div>

        <div className="preloader-images">
          <div className="img-container"><img src="/Assets/Images/Img-1.png" alt="Reveal 1" /></div>
          <div className="img-container"><img src="/Assets/Images/Img-2.png" alt="Reveal 2" /></div>
          <div className="img-container"><img src="/Assets/Images/Img-3.png" alt="Reveal 3" /></div>
          <div className="img-container"><img src="/Assets/Images/Img-4.png" alt="Reveal 4" /></div>
        </div>

        <div className="preloader-copy">
          <p>
            Building AI-powered solutions with Machine Learning, Competitive Programming, and Full Stack Development.
          </p>
        </div>
      </div>

      <div className="preloader-header">
        <div className="preloader-header-text">Koustubh Verma</div>
      </div>
    </>
  );
}
