class App{constructor(){new d1ce.Screen("info_screen").Print(d1ce.timestamp),this.log_screen=new d1ce.Screen("log_screen"),this.main_screen=new d1ce.Screen("main_screen"),this.touch_screen=new d1ce.Screen("touch_screen"),this.hand=new Hand(this.touch_screen),this.cubes=new Cubes(this.main_screen)}Load(){this.hand.Load(),this.cubes.Load()}Store(){this.cubes.Store()}Update(){this.hand.Update(),this.hand.Tapped()?this.cubes.StartRolling():this.hand.Released()?this.hand.Released().Right()?this.cubes.StartChanging(1):this.hand.Released().Left()?this.cubes.StartChanging(-1):this.cubes.StartSelecting():this.hand.Swiping()?this.hand.Swiping().Right()?this.cubes.StartHolding(1):this.hand.Swiping().Left()?this.cubes.StartHolding(-1):this.cubes.StartHolding(0):this.hand.Holding()?this.cubes.StartHolding(0):this.hand.Touching()&&this.cubes.StartSelecting(),this.cubes.Update()}Draw(){}async Main(){for(this.Load();;)this.suspend?this.Store():(this.Update(),this.Draw(),await d1ce.Engine.Wait(1e3/60))}async Suspend(){for(this.suspend=!0;this.suspend;)await d1ce.Engine.Wait(1e3/60)}static Instance(){return null==this.instance&&(this.instance=new App),this.instance}}window.onload=(()=>App.Instance().Main()),document.visibilitychange=(()=>App.Instance().Suspend());class Hand{constructor(t){this.screen=t,this.input=new d1ce.Input(t),this.count=0,this.arrow=null,this.point=null,this.touching=null,this.holding=null,this.tapped=null,this.swiping=null,this.released=null}Load(){this.arrow=new d1ce.Sprite("arrow"),this.point=new d1ce.Sprite("point")}Touching(){return this.touching}StartTouching(){this.touching=this.input.Dirs(!0),this.input.Point()&&(this.arrow.SetAnime("selecting"),this.point.SetAnime("selecting"))}Holding(){return this.holding}StartHolding(){this.holding=this.input.Dirs(!0),this.input.Point()&&(this.arrow.SetAnime("holding"),this.point.SetAnime("holding"))}Swiping(){return this.swiping}StartSwiping(){if(this.swiping=this.input.Dirs(!0),this.input.Point()){let t=this.input.Point().Sub(this.input.Point(!0));this.arrow.SetDir(t),this.arrow.SetAnime("swiping"),this.point.SetAnime("swiping")}}Tapped(){return this.tapped}StartTapped(){this.tapped=this.input.Dirs(),this.input.Point()&&(this.arrow.SetAnime("decided"),this.point.SetAnime("decided"))}Released(){return this.released}StartReleased(){this.released=this.input.Dirs(),this.input.Point()&&(this.arrow.SetAnime("released"),this.point.SetAnime("released"))}Update(){this.touching=null,this.holding=null,this.tapped=null,this.swiping=null,this.released=null,this.input.UpdateDirs(1e3,2500,.5),null!=this.input.Dirs()?this.input.Dirs().IsEmpty()?this.StartTapped():this.StartReleased():null!=this.input.Dirs(!0)&&(this.input.Dirs(!0).Right()||this.input.Dirs(!0).Left()||this.input.Dirs(!0).Down()||this.input.Dirs(!0).Up()?this.StartSwiping():this.input.Dirs(!0).Far()?this.StartHolding():this.StartTouching()),this.input.Point()&&(this.arrow.SetPos(this.input.Point(!0)),this.point.SetPos(this.input.Point()),this.arrow.Enable(this.screen,!0),this.point.Enable(this.screen,!0))}}class Cubes{constructor(t){this.screen=t,this.option=new d1ce.Params(d1ce.identifier+"-option"),this.pips=[],this.random=new d1ce.Count,this.faces=null,this.update=null,this.count=0}Load(){this.faces=[];for(let t=0;t<Cubes.count_max;++t)this.faces[t]=new d1ce.Sprite("cubes");d1ce.Engine.Value("type")&&this.option.UpdateValue("type",Number(d1ce.Engine.Value("type"))),!isFinite(this.option.Value("type"))||this.option.Value("type")<1?(this.option.UpdateValue("type",1),d1ce.Engine.UpdateValue("type",this.option.Value("type"))):this.option.Value("type")>Cubes.count_max&&(this.option.UpdateValue("type",Cubes.count_max),d1ce.Engine.UpdateValue("type",this.option.Value("type"))),d1ce.Engine.Value("seed")&&this.option.UpdateValue("seed",d1ce.Engine.Value("seed")),isFinite(this.option.Value("seed"))||(this.option.UpdateValue("seed",0),d1ce.Engine.UpdateValue("seed",this.option.Value("seed"))),this.random=new d1ce.Count(this.option.Value("seed"));for(let t=0;t<Cubes.count_max;++t)this.faces[t].Enable(this.screen,t<this.option.Value("type"));0!=this.option.Value("seed")?this.StartRolled():this.StartSelecting()}Store(){}StartSelecting(){if(this.update==this.UpdateSelecting){this.update=this.UpdateSelecting;for(let t=0;t<this.faces.length;++t)this.faces[t].SetAnime("reselecting")}else{this.update=this.UpdateSelecting;for(let t=0;t<this.faces.length;++t)this.faces[t].SetAnime("selecting")}}StartRolled(){this.update=this.UpdateRolled,this.count=0,this.pips=[];for(let t=0;t<this.option.Value("type");++t)this.pips.push(this.random.Random(Cubes.number_max)+1);for(let t=0;t<this.faces.length;++t)this.faces[t].SetAnime("rolling")}StartRolling(){this.update=this.UpdateRolling,this.count=30;for(let t=0;t<this.faces.length;++t)this.faces[t].SetAnime("rolling")}StartHolding(t){this.update!=this.UpdateHolding&&(this.update=this.UpdateHolding);for(let e=0;e<this.faces.length;++e)t>0?this.faces[e].SetAnime("swiping_right"):t<0?this.faces[e].SetAnime("swiping_left"):this.faces[e].SetAnime("holding")}StartChanging(t){this.update=this.UpdateSelecting,t>0?(!isFinite(this.option.Value("type"))||this.option.Value("type")>Cubes.count_max?this.option.UpdateValue("type",Cubes.count_max):this.option.UpdateValue("type",this.option.Value("type")+1),d1ce.Engine.UpdateValue("type",this.option.Value("type"))):t<0&&(!isFinite(this.option.Value("type"))||this.option.Value("type")<=1?this.option.UpdateValue("type",1):this.option.UpdateValue("type",this.option.Value("type")-1),d1ce.Engine.UpdateValue("type",this.option.Value("type")));for(let t=0;t<this.faces.length;++t)this.faces[t].Enable(this.screen,t<this.option.Value("type"));for(let t=0;t<this.faces.length;++t)this.faces[t].SetAnime("selecting")}UpdateSelecting(){this.pips=[];let t=Math.floor(this.count/20)%Cubes.number_max+1;for(let e=0;e<this.faces.length;++e)this.pips.push(t);for(let t=0;t<this.faces.length;++t)this.faces[t].SetType("pip"+this.pips[t]);this.count+=1}UpdateRolling(){this.pips=[];for(let t=0;t<this.faces.length;++t){let t=this.random.Random(Cubes.number_max)+1;this.pips.push(t)}for(let t=0;t<this.faces.length;++t)this.faces[t].SetType("pip"+this.pips[t]);this.count-=1,this.count<=0&&(this.option.UpdateValue("seed",this.random.Seed()),d1ce.Engine.UpdateValue("seed",this.option.Value("seed")),this.StartRolled())}UpdateRolled(){for(let t=0;t<this.faces.length;++t)this.faces[t].SetType("pip"+this.pips[t])}UpdateHolding(){this.option.UpdateValue("seed",0),this.pips=[];let t=Math.floor(this.count/20)%Cubes.number_max+1;for(let e=0;e<this.faces.length;++e)this.pips.push(t);for(let t=0;t<this.faces.length;++t)this.faces[t].SetType("pip"+this.pips[t]);this.count+=1}Update(){null!=this.update&&this.update()}}Cubes.count_max=9,Cubes.number_max=6;