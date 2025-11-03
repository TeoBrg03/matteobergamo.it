(function(){
      const svg = document.querySelector('svg');
      const pLight = document.getElementById('pLight');
      const wrap = document.querySelector('.wrap');

      // dimensioni di riferimento della viewBox
      const vb = {w:1000, h:300};

      // when the user moves mouse, update the pointLight position and tilt the svg slightly
      function onMove(e){
        // get coordinates relative to the svg element center
        const rect = svg.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top + rect.height/2;
        const mx = e.clientX;
        const my = e.clientY;

        // map mouse coords into viewBox coords
        const x = ((mx - rect.left) / rect.width) * vb.w;
        const y = ((my - rect.top) / rect.height) * vb.h;
        const z = 250 + ( (rect.height/2 - (my - rect.top)) / rect.height ) * 300; // z vary a bit with Y

        // update point light in filter
        // note: some browsers require setting attributes on the fePointLight directly
        pLight.setAttribute('x', x);
        pLight.setAttribute('y', y);
        pLight.setAttribute('z', z);

        // tilt svg lightly (for 3D parallax)
        const rx = ( (my - cy) / rect.height ) * 10; // rotateX
        const ry = ( (mx - cx) / rect.width ) * -10; // rotateY
        svg.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      // subtle animation when idle
      let idleTimer;
      function startIdleWiggle(){
        let t=0;
        function step(){
          t+=0.01;
          const x = vb.w/2 + Math.sin(t)*40;
          const y = vb.h/2 + Math.cos(t*1.2)*20;
          const z = 320 + Math.cos(t*0.8)*30;
          pLight.setAttribute('x', x);
          pLight.setAttribute('y', y);
          pLight.setAttribute('z', z);
          svg.style.transform = `perspective(900px) rotateX(${Math.cos(t)*3}deg) rotateY(${Math.sin(t)*3}deg)`;
          idleTimer = requestAnimationFrame(step);
        }
        idleTimer = requestAnimationFrame(step);
      }

      // stop idle when user interacts
      function stopIdle(){ if(idleTimer){ cancelAnimationFrame(idleTimer); idleTimer = null; }}

      // bind events
      window.addEventListener('mousemove', function(e){ stopIdle(); onMove(e); });
      window.addEventListener('touchmove', function(e){ stopIdle(); onMove(e.touches[0]); }, {passive:true});
      window.addEventListener('mouseleave', function(){ startIdleWiggle(); });

      // start with idle wiggle
      startIdleWiggle();

      // accessibility: if user prefers reduced motion, remove animations
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      if(media.matches){
        svg.style.transition = 'none';
        stopIdle();
        pLight.setAttribute('x', vb.w/2);
        pLight.setAttribute('y', vb.h/2);
        pLight.setAttribute('z', 300);
      }

      // small performance tweak on resize
      let resizeTO;
      window.addEventListener('resize', ()=>{
        clearTimeout(resizeTO);
        resizeTO = setTimeout(()=>{
          // nothing heavy needed here, just ensure svg reflows
        },120);
      });

    })();
