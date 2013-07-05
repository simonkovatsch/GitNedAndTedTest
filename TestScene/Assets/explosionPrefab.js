#pragma strict

var speed: float;
var dir:Vector3;

var dir2:Vector3;
var speed2: float;

var center: Vector3;

var size: float;

var explosionPrefab:Transform;

var timer:float;

function Start () {
	timer = 2;
}


function Update () {	
	timer-=Time.deltaTime;
	if(timer<0)Destroy(gameObject);
}
