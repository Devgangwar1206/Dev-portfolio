import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  if (landingText && landingText.chars && landingText.chars.length > 0) {
    gsap.fromTo(
      landingText.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText1 = new SplitText(".landing-h2-1", TextProps);
  var landingText2 = new SplitText(".landing-h2-2", TextProps);

  if (landingText1 && landingText1.chars && landingText1.chars.length > 0) {
    gsap.fromTo(
      landingText1.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        y: 0,
        stagger: 0.025,
        delay: 0.3,
      }
    );
  }

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  LoopText(landingText1, landingText2);
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  if (!Text1?.chars?.length || !Text2?.chars?.length) return;

  // Ensure Text2 starts hidden and positioned below
  gsap.set(Text2.chars, { opacity: 0, y: 60 });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  const dur = 0.7;
  const holdDelay = 3;

  tl
    // Text1 ("Developer") slides up and fades out
    .to(Text1.chars, {
      y: -60,
      opacity: 0,
      duration: dur,
      ease: "power2.in",
      stagger: 0.02,
      delay: holdDelay,
    })
    // Text2 ("Engineer") slides in from below to center
    .fromTo(
      Text2.chars,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: dur,
        ease: "power2.out",
        stagger: 0.02,
      },
      "-=0.2"
    )
    // Text2 ("Engineer") slides up and fades out
    .to(Text2.chars, {
      y: -60,
      opacity: 0,
      duration: dur,
      ease: "power2.in",
      stagger: 0.02,
      delay: holdDelay,
    })
    // Text1 ("Developer") slides in from below back to center
    .fromTo(
      Text1.chars,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: dur,
        ease: "power2.out",
        stagger: 0.02,
      },
      "-=0.2"
    );
}
