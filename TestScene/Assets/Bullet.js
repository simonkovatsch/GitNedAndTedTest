#pragma strict

var timer:float;

function Start () {
	//timer = 10000;
	transform.localScale = Vector3.one*10;
}


function Update () {	
	//timer-=Time.deltaTime;
	//if(timer<0)Destroy(gameObject);
}


function OnCollisionEnter(collision : Collision) {

	if(collision.gameObject.GetComponent("CamController"))
	{	
	  Destroy (gameObject);
	}
}