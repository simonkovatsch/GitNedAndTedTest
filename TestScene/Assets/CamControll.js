#pragma strict
// Js scripting

var camTrL: Transform;
var camTrR: Transform;
var camL: Camera;
var camR: Camera;

var testoffset: float;

var s1 : GUISkin[];

var boxPrefab: Transform;


var camControllerTr:Transform;

var camDist:float;
var camFieldOfView:float;

var textOffset:float;

var speed:float;

var boxCount:int;

var bulletPrefab:Transform;


function Start () {
	camFieldOfView = camL.fieldOfView;
	
	camTrR = camR.transform;
	camTrL = camL.transform;
	
	boxCount = 1;
	
	textOffset = 0;
}

function Update () {
	
	speed = 1;
	if (Input.GetKey (KeyCode.LeftShift) || Input.GetKey (KeyCode.RightShift))
	{
		speed = 4;
	}
	
	if (Input.GetKey (KeyCode.AltGr) || Input.GetKey (KeyCode.LeftAlt) || Input.GetKey (KeyCode.RightAlt))
	{
		speed = 10;
	}
	
	if (Input.GetKey (KeyCode.Q))
	{
		speed = 40;
	}

	if (Input.GetKey (KeyCode.W))
	{
		MoveCamsX(1);
	}
    	
	
	if (Input.GetKey (KeyCode.S))
	{
    	MoveCamsX(-1);
	}
	
	camDist = Vector3.Distance(camTrL.transform.position,camTrR.transform.position);
	
	if (Input.GetKey (KeyCode.UpArrow))
	{
		MoveCamsZ(1);
	}
    	
	if (Input.GetKey (KeyCode.DownArrow))
	{
    	MoveCamsZ(-1);
	}
	
	if (Input.GetKey (KeyCode.LeftArrow))
	{
		RotateCam(1);
	}
    	
	if (Input.GetKey (KeyCode.RightArrow))
	{
    	RotateCam(-1);
	}
	
	if (Input.GetKey (KeyCode.A))
	{
    	CamFOV(-1);
	}
	if (Input.GetKey (KeyCode.D))
	{
    	CamFOV(1);
	}
	if (Input.GetKeyDown (KeyCode.N))
	{
    	DeblicateBox();
	}
	
	if (Input.GetKey (KeyCode.K))
	{
    	TextOffset(1);
	}
	if (Input.GetKey(KeyCode.L))
	{
    	TextOffset(-1);
	}
	
	if (Input.GetKeyDown(KeyCode.Space))
	{
    	Fire();
	}
	
	if (Input.GetKeyDown(KeyCode.R))
	{
		Application.LoadLevel(0);
	}

}

function CamFOV( dir:int)
{
		camFieldOfView	+= dir*Time.deltaTime*speed;
		camL.fieldOfView = camFieldOfView;
    	camR.fieldOfView = camFieldOfView;
}

function MoveCamsX( dir:int)
{
		camTrL.transform.position.x += 0.01*dir*Time.deltaTime*speed;
    	camTrR.transform.position.x -= 0.01*dir*Time.deltaTime*speed;

}

function MoveCamsZ( dir:int)
{
		camControllerTr.transform.position += (camControllerTr.transform.forward*dir*Time.deltaTime*speed);

}
function RotateCam( dir:int)
{
		camControllerTr.transform.Rotate( Vector3.up*dir*Time.deltaTime*speed*5);

}

function DeblicateBox(){
	for (var i : int = 0;i < 10; i++) {
		boxCount++;
	    var newBox = Instantiate (boxPrefab, transform.position+Random.insideUnitSphere * 200, Quaternion.identity);
	    
	}
}

function TextOffset( dir:int)
{
		textOffset += dir*(speed/5);
}

function Fire(){
	var bullet:Transform;
    bullet = Instantiate (bulletPrefab, transform.position-transform.right*2, Quaternion.identity); 
	bullet.rigidbody.velocity = transform.TransformDirection (Vector3.forward * 20);
	
	bullet = Instantiate (bulletPrefab, transform.position+transform.right*2, Quaternion.identity); 
	bullet.rigidbody.velocity = transform.TransformDirection (Vector3.forward * 20);
}




function OnGUI()
{
 	GUI.skin = s1[0];
	GUI.Label(Rect(textOffset,25,Screen.width,25),"camDist:"+Mathf.Round(camDist*100)/100+" camFOV:"+Mathf.Round(camFieldOfView*10)/10+" txt: "+Mathf.Round(textOffset));
	GUI.Label(Rect(-textOffset,(Screen.height/2)+25,Screen.width,25),"camDist:"+Mathf.Round(camDist*100)/100+" camFOV:"+Mathf.Round(camFieldOfView*10)/10+" txt: "+Mathf.Round(textOffset));
	
		GUI.Label(Rect(textOffset,(Screen.height/2)-25,Screen.width,25),"CamDist = [W][S] | FoV = [A][D] | reloadLevel = [R] txtoffset: [K][L]|| Move/Rot = [Arrows] | speed = shift alt Q  boxCOunt:"+boxCount);
		GUI.Label(Rect(-textOffset,(Screen.height)-25,Screen.width,25),"CamDist = [W][S] | FoV = [A][D] | reloadLevel = [R] txtoffset: [K][L]|| Move/Rot = [Arrows] | speed = shift alt Q  boxCOunt:"+boxCount);
}