#pragma strict

var speed: float;
var dir:Vector3;

var dir2:Vector3;
var speed2: float;

var center: Vector3;

var size: float;

var explosionPrefab:Transform;

var timer: float;


function Start () {
	speed = Random.value*2;
	dir = Random.insideUnitSphere;
	
	center = transform.position+Random.insideUnitSphere*10;
	speed2 = Random.value;
	dir2 = Random.insideUnitSphere;
	
	//size = 1+( Random.value*2);
	//transform.localScale = Vector3.one*size;
	timer = 1;
	transform.LookAt(Camera.main.transform.position);
}


function Update () {

	//transform.Rotate(dir*speed);
	//transform.RotateAround(Vector3.zero,dir2,speed2);
	
	//transform.LookAt(Camera.main.transform.position);
	
	timer-=Time.deltaTime;
	if(timer<0){
		timer = 2;
		Fire();
	}
}
function Fire(){
		
		dir = -(Camera.main.transform.position-transform.position).normalized;
		
	   	var plup = Instantiate (explosionPrefab, transform.position+(transform.up*2*size), transform.rotation);
	   	plup.transform.LookAt(Camera.main.transform.position+Random.insideUnitSphere*2);
	   	plup.rigidbody.velocity = plup.transform.forward*50;
	   	
	   	yield WaitForSeconds(0.1);
	   	plup = Instantiate (explosionPrefab, transform.position+(transform.up*2*size), transform.rotation);
	   	plup.transform.LookAt(Camera.main.transform.position+Random.insideUnitSphere*2);
	   	plup.rigidbody.velocity = plup.transform.forward*40;
	   	
	   	yield WaitForSeconds(0.1);
	   	plup = Instantiate (explosionPrefab, transform.position+(transform.up*2*size), transform.rotation);
	   	plup.transform.LookAt(Camera.main.transform.position+Random.insideUnitSphere*2);
	   	plup.rigidbody.velocity = plup.transform.forward*30;
	   	
	   	yield WaitForSeconds(0.1);
	   	plup = Instantiate (explosionPrefab, transform.position+(transform.up*2*size), transform.rotation);
	   	plup.transform.LookAt(Camera.main.transform.position+Random.insideUnitSphere*2);
	   	plup.rigidbody.velocity = plup.transform.forward*20;
	   	
	   
		/*plup = Instantiate (explosionPrefab, transform.position-(transform.forward*size)/2, transform.rotation);
		plup.transform.LookAt(Camera.main.transform.position);
		plup.rigidbody.velocity = plup.transform.forward*300;
		  
		plup = Instantiate (explosionPrefab, transform.position+(transform.up*size)/2, transform.rotation);
		plup.transform.LookAt(Camera.main.transform.position);
		plup.rigidbody.velocity = plup.transform.forward*300;
		   
		plup = Instantiate (explosionPrefab, transform.position-(transform.up*size)/2, transform.rotation);
		plup.transform.LookAt(Camera.main.transform.position);
		plup.rigidbody.velocity = plup.transform.forward*300;
		   
		plup = Instantiate (explosionPrefab, transform.position+(transform.right*size)/2, transform.rotation);
		plup.transform.LookAt(Camera.main.transform.position);
		plup.rigidbody.velocity = plup.transform.forward*300;
		   
		plup = Instantiate (explosionPrefab, transform.position-(transform.right*size)/2, transform.rotation);
		plup.transform.LookAt(Camera.main.transform.position);
		plup.rigidbody.velocity = plup.transform.forward*300;*/
}


function OnCollisionEnter(collision : Collision) {

	var script : Bullet;
	script = collision.gameObject.GetComponent("Bullet");
	if(script)
	{	
		// Rotate the object so that the y-axis faces along the normal of the surface
	    var contact : ContactPoint = collision.contacts[0];
	    var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
	    var pos : Vector3 = contact.point;
		var excount = Mathf.RoundToInt(size)*20;
		for (var i : int = 0;i < excount; i++) {
		
		    var plup = Instantiate (explosionPrefab, pos+Random.insideUnitSphere*size, rot);
		    plup.rigidbody.velocity = Random.insideUnitSphere*300;
		}
		
	    Destroy (script.gameObject);
		//Destroy (gameObject);
	}else{
		dir2*=-1;
	}
    
    
}