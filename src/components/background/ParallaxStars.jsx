import { useEffect } from "react";

export default function ParallaxStars() {
    useEffect(() => {
        function generateStars(count) {
            const shadows = [];
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * 2000);
                const y = Math.floor(Math.random() * 2000);
                shadows.push(`${x}px ${y}px #FFF`);
            }
            return shadows.join(", ");
        }

        const smallStars = generateStars(700);
        const mediumStars = generateStars(200);
        const largeStars = generateStars(100);

        const stars1 = document.getElementById("stars");
        const stars2 = document.getElementById("stars2");
        const stars3 = document.getElementById("stars3");

        if (stars1) stars1.style.boxShadow = smallStars;
        if (stars2) stars2.style.boxShadow = mediumStars;
        if (stars3) stars3.style.boxShadow = largeStars;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
        #stars::after { box-shadow: ${smallStars}; }
        #stars2::after { box-shadow: ${mediumStars}; }
        #stars3::after { box-shadow: ${largeStars}; }
      `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div className="parallax-wrapper">
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
        </div>
    );
}