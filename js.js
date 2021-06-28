let tigaDetik = 3;
let soal = []
let lvl = 1
let jml
let userJawab = []
let jwbByPemain = ""
let mikir

function buka() {
	acak = angkaAcak(0,360)
	domCss('body','background: hsl('+acak+',100%,25%);')
	domInner('cssTambahan','* {color: hsl('+acak+',25%,100%);} #petunjuk{border-color: hsl('+acak+',25%,100%);} #petunjuk:active {color: hsl('+acak+',100%,25%);background: hsl('+acak+',25%,100%);}#timer, #timer2{background: hsl('+acak+',25%,100%);}')
}

function domCss(id, isi) {
	document.getElementById(id).style = isi
}

function domInner(id, isi) {
	document.getElementById(id).innerHTML = isi
}

function angkaAcak(awal, terakhir) {
	return Math.floor(Math.random() * terakhir) + awal
}

function mulai() {
	hitungMundur()
	for (var i = 0; i < lvl; i++) {
		soal[i] = angkaAcak(0,2)
	}
}

function hitungMundur() {
	domInner('judul', tigaDetik)
	if (tigaDetik < 1) {mulaiGame()} else {setTimeout(kurangiSatu,1000)}
}

function kurangiSatu() {
	tigaDetik -=1
	hitungMundur()
}

function mulaiGame() {
	domCss('pembukaan', 'display: none;')
	domCss('game', 'display: block;')
	domCss('timer', 'animation-name: durasi;')
	domInner('soal', tampilSoal())
	setTimeout(jawab, 10000)
}

function tampilSoal() {
	var tampil = ""
	for (var i = 0; i < lvl; i++) {
		tampil += (" "+soal[i])
	}
	return tampil
}

function jawab() {
	jml = lvl
	mikir = -1
	domCss('game', 'display: none;')
	domCss('jawab', 'display: block;')
	domCss('timer2', 'animation-name: durasi;')
	domInner('jumlah', jml)
	lamaMikir()
}

function menjawab(dijawab) {
	userJawab[(lvl-jml)] = dijawab
	jml -= 1
	domInner('jumlah', jml)
	jwbByPemain += " "+dijawab
	domInner('jwbByPemain', jwbByPemain)
	if (jml < 1) {setTimeout(cek,100)}
}

function cek() {
	var menangkah = 0
	for (var i = 0; i < lvl; i++) {
		if (soal[i] == userJawab[i]) {menangkah += 1}
	}
	
	if (mikir > 10) {
		selesai('kelamaan')
	} else if (menangkah == lvl) {
		lvl += 1
		selesai('selamat')
	} else {
		selesai('salah')
	}
}

function lamaMikir() {
	mikir += 1
	if (mikir <= 10) {setTimeout(lamaMikir, 1000)}
}

function selesai(pesan) {
	domCss('jawab', 'display: none;')
	domCss('pembukaan', 'display: block;')
	domInner('level', 'lvl. '+lvl)
	domInner('judul', pesan)
	tigaDetik = 3
	jwbByPemain = " "
	domInner('jwbByPemain', jwbByPemain)
	buka()
}