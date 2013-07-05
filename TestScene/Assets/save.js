#pragma strict


var rdm: int;
var counter:int;
	
var races:Array = new Array();
var raceNumber = 0;


function Start ()
{
	InitHighscore(5);
	// instantiate if does not exist already!
	// Highscore->Object!
}



function Update() {
	
	
	if(Input.GetKeyDown(KeyCode.R) && Input.GetKey(KeyCode.H))
	{
		ResetHigscore();
	}
	
	if(Input.GetKeyDown(KeyCode.X) && Input.GetKey(KeyCode.R))
	{
		PlayerPrefs.DeleteAll();
	}
	
	if(Input.GetKeyDown(KeyCode.S))
	{
		SaveScore("NEW", 1.3f);
	}
	
	if(Input.GetKeyDown(KeyCode.D))
	{
		DisplayHeigscore();
	}
}

// save a scor into the heigscore
function SaveScore( name:String,  time:float)
{
	var i:int = 0;
	while(PlayerPrefs.HasKey("time"+i))
	{
		i++;
	}
		
	PlayerPrefs.SetInt("time"+i, time);
	PlayerPrefs.SetString("name"+i, name);
	
	Debug.Log("SaveScore"+i+" n:"+name+" t:"+time);
}

// ATTENTION! deled the Heigscroe and set default values
function ResetHigscore(){
	Debug.Log("ResetHigscore");
	var i:int = 0;
	
	while(PlayerPrefs.HasKey("time"+i))
	{
		PlayerPrefs.DeleteKey("name"+i);
		PlayerPrefs.DeleteKey("time"+i);
		i++;
	}
	
	InitHighscore(5);	
}

// set default scoreCount values into the Heigscore!
function InitHighscore(scoreCount:int)
{	
	Debug.Log("ResetHigscore");
	if(!PlayerPrefs.HasKey("name"+0)){
	
		var fastes:float = 1.5;
		var steps:float = 0.5;
		
		for(var i=0; i<scoreCount; i++)
		{
			var t:float = fastes+(steps*i);
			PlayerPrefs.SetString("name"+i,"YES");
			PlayerPrefs.SetFloat("time"+i,t);
		}
	}
}

// get all sores and sort
function DisplayHeigscore()
{	

	races = new Array();
	var i:int = 0;
	while(PlayerPrefs.HasKey("name"+i))
	{
		var race:Array = new Array(i, PlayerPrefs.GetString("name"+i), PlayerPrefs.GetFloat("time"+i));
		races.Add(race);
		Debug.Log("fill: "+i+" score"+PlayerPrefs.GetFloat("time"+i));
		i++;
	}
	
	
	//todo: Sort arrayList!
	//todo: remove rest!
}


function OnGUI(){
	GUI.Box(Rect(0,0,Screen.width, 50),"score:"+rdm);
	if(races.length > 0){
		for(var i:int=0; i<races.Count; i++)
		{
			GUI.Box(Rect(0,(25*i),200, 25),""+races[i]);
		}
	}
}