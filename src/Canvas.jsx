import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  const canvasRef = useRef(null)
  
  const allParticles = [ ];
  const draw = (canvas, context, particles) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(particle) {
      particle.draw(context);
    });
  }

  const particleRef = useRef(allParticles);
  
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth;
    canvas.height = document.body.clientHeight;

    let particles = particleRef.current;
    const context = canvas.getContext('2d')
    const area = canvas.width * canvas.height;
    const factor = 2000;
    const maxParticles = (area / factor);
    const diameterFactor = 1;
    let animationFrameId

    class Particle {
      constructor() {
        this.visible = true;
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() * 0.5) + 0.1;
        this.diameter = Math.random() * diameterFactor;
        this.color = "rgba(255, 255, 255, 0.8)";
      }

      update() {
        canvas.width = window.innerWidth;
        canvas.height = document.body.clientHeight;
        var pad = 0;
        this.x += this.vx;
        this.y += this.vy;

        if (!((pad <= this.x && this.x < canvas.width - pad) &&
              (pad <= this.y && this.y < canvas.height - pad))) {
          this.visible = false;
        }
      }

      draw(context) {
        if (!context) {
          return
        }
        context.fillStyle = this.color;
        context.shadowColor = "white";
        context.shadowBlur = 10;
        context.beginPath();
        context.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI, false);
        context.fill();
      }
    }

    const createParticles = (top) => {
      for (let i = particles.length; i < maxParticles; i++) {
        particles.push(new Particle(top));
      }
    };

    const validate = (context) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      /* Render each particle. */
      particles.forEach(function(particle) {
        particle.draw(context);
      });
    }
    
    const render = () => {
      createParticles()
      particles.forEach(function(particle) {
        particle.update();
      });

      particles = particles.filter(function(particle) {
        return particle.visible;
      });

      validate(context);

      draw(canvas, context, particles)
      animationFrameId = window.requestAnimationFrame(render)
    }

    createParticles();
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas