const colors = {
    blue: ["#5588a3", "#00334e", "#e8e8e8", "#A0616A"],
    orange: ["#f7931e", "#f05a28", "#fff0bc", "#FDB797"],
    pink: ["#ec3667", "#3f3d56", "#cbcdda", "#ffb9b9"],
    red: ["#e2434b", "#292725", "#fee9d7", "#BF7554"],
    yellow: ["#ffc60b", "#444444", "#feffdb", "#ffdbac"],
    green: ["#c6e377", "#36622b", "#fbfad3", "#f1c27d"],
    purple: ["#aa5c9f", "#7f4782", "#fdd043", "#B47556"],
    black: ["#2b2b28", "#c19898", "#ebebe3", "#FDB797"]
  };
  const feedback = document.querySelector('.feedback span');
  const illustration = document.querySelector(".illustration");
  const tl = new TimelineLite();
  
  function speechListener() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
      
    recognition.addEventListener("end", recognition.start);
  
    recognition.addEventListener("result", e => {
      const res = Array.from(e.results).map(result => result[0].transcript.toLowerCase());
          
          feedback.style.color = colors[res] ? colors[res][0] : '#cacaca';
          feedback.innerHTML = res;
      update(res);
    });
  
    recognition.start();
  }
  
  function radioListener() {
      const radioButtons = document.querySelector('.color-selector');
  radioButtons.addEventListener("click", function(e) {
      const value = radioButtons.querySelector('input[name="colors"]:checked').id;
      update(value)
  });  
  
  }
  
  function setColors() {
    const colorSelector = document.querySelector(".color-selector");
    Object.keys(colors).map((key, index) => {
      colorSelector.style.setProperty(`--${key}`, colors[key][0]);
    });
  }
  
  function update(response) {
    illustration.style.setProperty("--c-accent", colors[response][0]);
    illustration.style.setProperty("--c-dark", colors[response][1]);
    illustration.style.setProperty("--c-light", colors[response][2]);
    illustration.style.setProperty("--c-skin", colors[response][3]);
      tl.play(0);
  }
  
  function setupAnimation() {
      const geometry = ['#geometry #rectangle', '#geometry #circle-bottom', '#geometry #circle-center', '#geometry #circle-left', '#geometry #circle-right','#geometry #circle-top', '#geometry #circle-top-2']; 
          const items = ['#woman', '#flower #bottom', '#flower #top', '#flower #leaf', '#plant #left', '#plant #center', '#plant #right', '#geometry #big-circle', ...geometry];
      tl.set(items, { opacity: 0 });
  
      // background
          tl.fromTo('#geometry #big-circle', 2.5, { transformOrigin: '50% 50%', scale: 0, opacity: 0 }, { opacity: 1, scale: 1, ease: Elastic.easeOut });
      
      // Plant
      tl.fromTo('#plant #center', .6, { transformOrigin: '50% 100%', scale: 0, opacity: 1 }, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, '-=2');
      tl.fromTo('#plant #left', .6, { transformOrigin: '100% 100%', scale: 0, opacity: 0 }, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, '-=1.6');
      tl.fromTo('#plant #right', .6, { transformOrigin: '0% 100%', scale: 0, opacity: 0 }, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, '-=1.2');
      
      // Flower
      tl.fromTo('#flower #bottom', .5, { transformOrigin: '100% 100%', scale: 0, opacity: 1 }, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, '-=.5');
      tl.fromTo('#flower #top', .5, { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) },'-=.2');
          tl.fromTo('#flower #leaf', .5, { scale: 0, opacity: 0, transformOrigin: '100% 100%' }, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, '-=.2');
      
  
      tl.fromTo('#woman', .4, {x : 40, opacity: 0}, {x: 0, opacity: 1, ease: Back.easeOut }, '-=.4');
      
              tl.staggerFromTo(geometry, 1.4, { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, ease: Elastic.easeOut.config(0.9, 0.4)}, .1, '-=1.4');
  };
  
  function init() {
      const is_supported = window.SpeechRecognition != null || window.webkitSpeechRecognition != null;
      if(!is_supported) feedback.innerHTML = 'API not supported';
      
    setColors();
      radioListener();
      setupAnimation();
      is_supported && speechListener();
  }
  
  init();
  