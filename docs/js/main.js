'use strict';
window.onload=function(){
	const suits=['spade','diamond','heart','club'];
	const cards=[];
	class Card{
		constructor(suit,num){
			this.suit=suit;
			this.num=num;
			this.front=`card_${this.suit}_${this.num<10?'0':''}${this.num}.png`;
			if(num==1){
				this.num=14;
			}
		}
	}

	for(let i=0;i<suits.length;i++){
		for(let j=1;j<=13;j++){
			let card=new Card(suits[i],j);
			cards.push(card);
		}
	}

	function shuffle(){
		let i=cards.length;
		while(i){
			let index=Math.floor(Math.random()*i--);
			let temp=cards[index];
			cards[index]=cards[i];
			cards[i]=temp;
		}
	}

	const mode1score=document.getElementById('mode1score');
	const mode2score=document.getElementById('mode2score');
	const card1=document.getElementById("card1");
	const card2=document.getElementById('card2');
	const msg=document.getElementById("msg");
	const modeA=document.getElementById("modeA");
	const modeB=document.getElementById("modeB");
	const next=document.getElementById("next");
	const high=document.getElementById("high");
	const low=document.getElementById("low");
	const result=document.getElementById("result");
	let count=0;
	let score=0;
	let highScoreA=0;
	let highScoreB=0;
	let mode="";
	let select="";
	let limit=10;

	const modeSelect=()=>{
		card1.src='images/card_back.png';
		card2.src='images/card_back.png';
		msg.textContent='モードを選んでください'
		modeA.classList.remove('none');
		modeB.classList.remove('none');
		retry.classList.add('none');
	}
	modeSelect();

	const highLow=()=>{
		card1.src=`images/${cards[count].front}`;
		card2.src='images/card_back.png';
		msg.textContent='次の数字は今の数字より';
		next.classList.add('none');
		high.classList.remove('none');
		low.classList.remove('none');
	}

	const gameStart=(eve)=>{
		count=0;
		score=0;
		limit=10;
		modeA.classList.add('none');
		modeB.classList.add('none');
		mode=eve.target.id;
		console.log(mode);
		shuffle();
		highLow();
	}

	modeA.addEventListener('click',gameStart);
	modeB.addEventListener('click',gameStart);

	const gameEnd=(eve)=>{
		msg.textContent=`今回の正解数は${score}回でした`;
		if(mode=='modeA' && highScoreA!=0){
			mode1score.textContent=`最高記録(外れるまでモード):${highScoreA}回`;
		}else if(mode=='modeB' && highScoreB!=0){
			mode2score.textContent=`最高記録( 10回までモード ):${highScoreB}回`;
		}
		next.classList.add('none');
		high.classList.add('none');
		low.classList.add('none');
		result.classList.add('none');
		retry.classList.remove('none');
	}

	const prepareResult=()=>{
					next.classList.add('none');
					result.classList.remove('none');
	}

	const judge=(eve)=>{
		next.textContent='次へ';
		next.classList.remove('none');
		high.classList.add('none');
		low.classList.add('none');
		card1.src=`images/${cards[count].front}`;
		card2.src=`images/${cards[count+1].front}`;
		select=eve.target.textContent;
		if(cards[count].num==cards[count+1].num){
			msg.textContent='同値です';
			limit++;
		}else if(select=='高い'){
			if(cards[count].num<cards[count+1].num){
				msg.textContent='当たりです！';
				score++;
			}else{
				msg.textContent='ハズレです！';
				if(mode=='modeA'){
					prepareResult();
				}
			}
		}else if(select=='低い'){
			if(cards[count].num>cards[count+1].num){
				msg.textContent='当たりです！';
				score++;
			}else{
				msg.textContent='ハズレです！';
				if(mode=='modeA'){
					prepareResult();
				}
			}
		}
		if((mode=='modeA') && (score>highScoreA)){
			highScoreA=score;
		}else if((mode=='modeB') && (score>highScoreB)){
			highScoreB=score;
		}
		count++;
		console.log(`count=${count},score=${score}`);
		if((mode=='modeB')&&(count==limit)){
			prepareResult();
		}
		if((mode=='modeA')&&(count==cards.length-1)){
			prepareResult();
		}
	};

	next.addEventListener('click',highLow);
	high.addEventListener('click',judge);
	low.addEventListener('click',judge);
	result.addEventListener('click',gameEnd);
	retry.addEventListener('click',modeSelect);
};
