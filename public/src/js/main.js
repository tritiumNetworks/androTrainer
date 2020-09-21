window.onload = () => {
  const input = document.getElementById('input')
  const output = document.getElementById('output')
  const han = 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡㅃㅉㄸㄲㅆㅒㅖ '
  const eng = 'qwertyuiopasdfghjklzxcvbnmQWERTOP '
  let awnser = '', origin = []

  var bar = new ProgressBar.Line(document.getElementsByClassName('progress')[0], {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: {width: '100%', height: '100%'},
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  });

  const xhr = new XMLHttpRequest()
  xhr.open('GET', '/scripts/rimnamu')
  xhr.onreadystatechange = () => {
    if (xhr.status !== 200) return
    origin = xhr.responseText.split(' ')
    randr()
    input.addEventListener('keypress', (ev) => {
      if (ev.key !== 'Enter') return
      if (input.value !== awnser) return
  
      input.value = ''
      input.classList.add('green')
      randr()

      bar.set(0)
      bar.animate(1, {
        from: { color: '#FFEA82'},
        to: { color: '#5aed7a'}
      })

      setTimeout(() => {
        bar.set(0)
        input.classList.remove('green')
      }, 500)
    })
  }
  input.value = ''
  xhr.send()

  function randr () {
    let random = []
    for (let i = 0; i < 3; i++) {
      random.push(origin[Math.floor(Math.random() * origin.length)])
    }
    const rendered = random.join(' ')
    output.innerText = Hangul.disassemble(rendered).map((x) => han.includes(x) ? eng.charAt(han.indexOf(x)) : x).join('')
    awnser = rendered
  }
}
